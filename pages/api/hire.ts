import { NextApiRequest, NextApiResponse } from "next";
import generator from "generate-password";

import {
  getAllInternetServices,
  getAllPromotions,
  getOptionalCableServices,
  getRequiredCableServices,
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
import sgMail from "../../utils/sendEmail";
import { pool } from "../../db/index";
import { UserFormValues } from "../../types";
import { USER_ROLE } from "../../utils/constants";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    user: UserFormValues;
    services: number[];
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const internetServices = await getAllInternetServices();
      const requiredCableServices = await getRequiredCableServices();
      const optionalCableServices = await getOptionalCableServices();
      const promotions = await getAllPromotions();

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
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    const { user, services } = req.body;
    const client = await pool.connect();

    try {
      // 1) Iniciar transacción
      await client.query("BEGIN");

      // 2) Validar que no haya un contrato vigente
      const currentContact = await getCurrentCustomerContract(user.dni, client);
      if (currentContact.length > 0) {
        return res
          .status(422)
          .json({ message: "Usted ya tiene un contrato vigente" });
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
      const insertedInvoice = await insertInvoice(
        user.dni,
        contractNumber,
        client
      );
      const invoiceDetails = insertedInvoice.rows[0];

      await insertInvoiceDetails(
        { invoice: invoiceDetails, servicesIds: services, promotionNumber },
        client
      );

      // 7) Enviar contraseña al correo
      // TODO: mejorar este mensaje
      if (!userExists) {
        const msg = {
          to: user.email,
          from: process.env.SENDGRID_SENDER_EMAIL!,
          subject: "Servicios Contratados!",
          html: `<b>Tu contraseña es: </b>${userPassword}`,
        };
        await sgMail.send(msg);
      }

      // 8) Guardar cambios de la transacción
      await client.query("COMMIT");
      client.release();

      return res.status(201).json({
        message: "Servicio contratado!",
        existingUser: userExists ? currentUser[0] : null,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      client.release();
      console.log(error);
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default handler;
