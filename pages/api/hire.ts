import { NextApiRequest, NextApiResponse } from "next";
import generator from "generate-password";

import {
  getVisibleInternetServices,
  getActivePromotions,
  getVisibleOptionalCableServices,
  getVisibleRequiredCableServices,
  getPromotionBySelectedServices,
  getCurrentCustomerContract,
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
  insertNewCustomer,
  getCustomerByDni,
} from "../../db/index";
import sgMail, { generateWelcomeEmail } from "../../utils/email";

import { UserFormValues, ValidationError } from "../../types";
import { USER_ROLE } from "../../utils/constants";
import { apiHandler } from "../../utils/api";
import { Transaction } from "../../utils/transaction";

const getHireData = async (req: NextApiRequest, res: NextApiResponse) => {
  const internetServices = await getVisibleInternetServices();
  const requiredCableServices = await getVisibleRequiredCableServices();
  const optionalCableServices = await getVisibleOptionalCableServices();
  const promotions = await getActivePromotions();

  return res.status(200).json({
    services: {
      internet: internetServices,
      cable: {
        required: requiredCableServices,
        optional: optionalCableServices,
      },
    },
    promotions: promotions,
  });
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    user: UserFormValues;
    services: number[];
  };
}

const saveHireData = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const { user, services } = req.body;
  const client = await Transaction.getClientInstance();

  try {
    // 1) Iniciar transacción
    await Transaction.start(client);

    // 2) Validar que no haya un contrato vigente
    const currentContact = await getCurrentCustomerContract(user.dni, client);
    if (currentContact.length > 0) {
      throw new ValidationError("Usted ya tiene un contrato vigente");
    }

    // 3) Agregar al cliente a la BD
    const currentUser = await getCustomerByDni(user.dni);
    const userExists = currentUser.length > 0;

    let userPassword = "";
    if (!userExists) {
      userPassword = generator.generate({ length: 10, numbers: true });
      await insertNewUser(
        { email: user.email, password: userPassword, role: USER_ROLE },
        client
      );
      await insertNewCustomer(user, client);
    }

    // 4) Buscar promocion y crear contrato
    const promotion = await getPromotionBySelectedServices(services, client);

    let promotionNumber: number | undefined;
    if (promotion.length > 0) {
      promotionNumber = promotion[0].NroPromocion;
    }

    const insertedContract = await insertNewContract(
      user.dni,
      promotionNumber,
      client
    );

    // 5) Agregar servicios contratados
    const contractNumber = insertedContract.rows[0].NroContrato;
    await insertHiredServices(contractNumber, services, client);

    // 6) Generar 1er Factura con sus detalles
    const invoiceResult = await insertInvoice(user.dni, contractNumber, client);
    const invoiceNumber = invoiceResult.rows[0].NroFactura;

    await insertInvoiceDetails(
      { invoiceNumber, contractNumber, servicesIds: services },
      client
    );

    // 7) Enviar contraseña al correo
    if (!userExists) {
      const userFullName = `${user.firstName} ${user.lastName}`;
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_SENDER_EMAIL!,
        subject: "Bienvenido A Meteor!",
        html: generateWelcomeEmail(userFullName, userPassword),
      };
      await sgMail.send(msg);
    }

    // 8) Guardar cambios de la transacción
    await Transaction.saveChanges(client);
    Transaction.releaseClient(client);

    return res.status(201).json({
      message: "Servicio contratado correctamente",
      existingUser: userExists ? currentUser[0] : null,
    });
  } catch (error) {
    await Transaction.removeChanges(client);
    Transaction.releaseClient(client);

    throw error;
  }
};

const handler = {
  get: getHireData,
  post: saveHireData,
};

export default apiHandler(handler);
