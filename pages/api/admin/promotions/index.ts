import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getPromotionsWithServices,
  getPromotionsCount,
  getPromotionBySelectedServices,
  insertPromotion,
  insertServicesInPromotion,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";
import { PromotionFormValues, ValidationError } from "../../../../types";
import { Transaction } from "../../../../utils/transaction";

const getPromotionsData = async (req: NextApiRequest, res: NextApiResponse) => {
  const promotions = await getPromotionsWithServices();
  const result = await getPromotionsCount();

  res.status(200).json({ promotions, promotionsCount: +result[0].count });
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    promotion: PromotionFormValues;
  };
}

const savePromotionData = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const client = await Transaction.getClientInstance();
  const promotionData = req.body.promotion;

  try {
    await Transaction.start(client);

    const existentPromotion = await getPromotionBySelectedServices(
      promotionData.services,
      client
    );
    if (existentPromotion.length > 0 && !existentPromotion[0].Finalizado) {
      // TODO: handle the transaction
      throw new ValidationError(
        "Ya existe una promoción activa con los servicios seleccionados"
      );
    }

    const result = await insertPromotion(promotionData, client);
    const promotionNumber = result.rows[0].NroPromocion;

    await insertServicesInPromotion(
      promotionData.services,
      promotionNumber,
      client
    );

    await Transaction.saveChanges(client);
    Transaction.releaseClient(client);

    return res.status(201).json({
      message: "Promocion creada correctamente",
    });
  } catch (error) {
    await Transaction.removeChanges(client);
    Transaction.releaseClient(client);

    throw error;
  }
};

const handler = {
  get: getPromotionsData,
  post: savePromotionData,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
