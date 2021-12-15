import { NextApiRequest, NextApiResponse } from "next";
import generator from "generate-password";

import {
  getAllInternetServices,
  getAllPromotions,
  getOptionalOrRequiredCableServices,
  getPromotionBySelectedServices,
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
} from "../../db/index";
import sgMail from "../../utils/sendEmail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
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
  }

  if (req.method === "POST") {
    const { user, services } = req.body;

    // 1) Agregar al cliente a la BD
    const userPassword = generator.generate({ length: 10, numbers: true });
    await insertNewUser(user, userPassword);

    // 2) Buscar promocion y crear contrato
    const promotion = await getPromotionBySelectedServices(services);

    let promotionNumber: number | undefined;
    if (promotion.length > 0) {
      promotionNumber = promotion[0].NroPromocion;
    }

    const result = await insertNewContract(user.dni, promotionNumber);

    // TODO: if result.rows.length === 0 -> Throw error

    // 3) Agregar servicios contratados
    const contractNumber = result.rows[0].NroContrato;
    await insertHiredServices(contractNumber, services);

    // 4) Generar 1er Factura con sus detalles
    const invoiceResult = await insertInvoice(user.dni, contractNumber);
    // TODO: add validation to the invoiceResult
    const invoiceNumber: number = invoiceResult.rows[0].NroFactura;

    await insertInvoiceDetails(invoiceNumber, services, promotionNumber);

    // 5) Enviar contraseña al correo
    // TODO: mejorar este mensaje
    const msg = {
      to: user.email,
      from: process.env.SENDGRID_SENDER_EMAIL!,
      subject: "Servicios Contratados!",
      html: `<b>Tu contraseña es: </b>${userPassword}`,
    };

    await sgMail.send(msg);

    return res.status(201).json({ message: "Servicio contratado!" });
  }
};

export default handler;
