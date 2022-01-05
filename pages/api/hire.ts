import { NextApiRequest, NextApiResponse } from "next";
import generator from "generate-password";

import {
  getAllInternetServices,
  getAllPromotions,
  getOptionalOrRequiredCableServices,
  getPromotionBySelectedServices,
  getUserByDniOrEmail,
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
} from "../../db/index";
import sgMail from "../../utils/sendEmail";
import { UserFormValues } from "../../types";

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
      const requiredCableServices = await getOptionalOrRequiredCableServices(
        false
      );
      const optionalCableServices = await getOptionalOrRequiredCableServices(
        true
      );
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

    try {
      // 1) Validar no existencia del cliente
      const foundUsers = await getUserByDniOrEmail(user.dni, user.email);
      if (foundUsers.length > 0) {
        return res.status(422).json({
          message:
            "El DNI o correo electrónico ingresados ya se encuentra en uso.",
        });
      }

      // 2) Agregar al cliente a la BD
      const userPassword = generator.generate({ length: 10, numbers: true });
      await insertNewUser(user, userPassword);

      // 3) Buscar promocion y crear contrato
      const promotion = await getPromotionBySelectedServices(services);

      let promotionNumber: number | undefined;
      if (promotion.length > 0) {
        promotionNumber = promotion[0].NroPromocion;
      }

      const insertedContract = await insertNewContract(
        user.dni,
        promotionNumber
      );

      // 4) Agregar servicios contratados
      const contractNumber = insertedContract.rows[0].NroContrato;
      await insertHiredServices(contractNumber, services);

      // 5) Generar 1er Factura con sus detalles
      const insertedInvoice = await insertInvoice(user.dni, contractNumber);
      const invoiceNumber: number = insertedInvoice.rows[0].NroFactura;

      await insertInvoiceDetails(invoiceNumber, services, promotionNumber);

      // 6) Enviar contraseña al correo
      // TODO: mejorar este mensaje
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_SENDER_EMAIL!,
        subject: "Servicios Contratados!",
        html: `<b>Tu contraseña es: </b>${userPassword}`,
      };

      await sgMail.send(msg);

      return res.status(201).json({ message: "Servicio contratado!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
