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
import { pool } from "../../db/index";
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
    const client = await pool.connect();

    try {
      // 1) Iniciar transacción
      await client.query("BEGIN");

      // 2) Validar no existencia del cliente
      const foundUsers = await getUserByDniOrEmail(
        user.dni,
        user.email,
        client
      );
      if (foundUsers.length > 0) {
        return res.status(422).json({
          message:
            "El DNI o correo electrónico ingresados ya se encuentra en uso.",
        });
      }

      // 3) Agregar al cliente a la BD
      const userPassword = generator.generate({ length: 10, numbers: true });
      await insertNewUser(user, userPassword, client);

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
      const invoiceNumber: number = insertedInvoice.rows[0].NroFactura;

      await insertInvoiceDetails(
        invoiceNumber,
        services,
        promotionNumber,
        client
      );

      // 7) Enviar contraseña al correo
      // TODO: mejorar este mensaje
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_SENDER_EMAIL!,
        subject: "Servicios Contratados!",
        html: `<b>Tu contraseña es: </b>${userPassword}`,
      };

      await sgMail.send(msg);

      // 8) Guardar cambios de la transacción
      await client.query("COMMIT");
      client.release();

      return res.status(201).json({ message: "Servicio contratado!" });
    } catch (error) {
      await client.query("ROLLBACK");
      client.release();

      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default handler;
