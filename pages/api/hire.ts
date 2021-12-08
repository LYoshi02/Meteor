import { NextApiRequest, NextApiResponse } from "next";

import {
  getAllInternetServices,
  getAllPromotions,
  getOptionalOrRequiredCableServices,
  getPromotionBySelectedServices,
  insertHiredServices,
  insertNewContract,
  insertNewUser,
  insertUserEmail,
  insertUserPhone,
} from "../../db/index";

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
    const { dni, firstName, lastName, address, birthDate, email, phone } = user;

    // 1) Agregar al cliente a la BD
    await insertNewUser({ dni, firstName, lastName, address, birthDate });

    // 2) Agregar telefono y correo del cliente
    await insertUserEmail(dni, email);
    await insertUserPhone(dni, phone);

    // 3) Buscar promocion y crear contrato
    const promotion = await getPromotionBySelectedServices(services);

    let promotionNumber = null;
    if (promotion.length > 0) {
      promotionNumber = promotion[0].NroPromocion;
    }

    const result = await insertNewContract(dni, promotionNumber);

    // TODO: if result.rows.length === 0 -> Throw error

    // 4) Agregar servicios contratados
    const contractNumber = result.rows[0].NroContrato;
    await insertHiredServices(contractNumber, services);

    return res.status(201).json({ message: "Servicio contratado!" });
  }
};

export default handler;
