import { NextApiRequest, NextApiResponse } from "next";

import { getTopActivePromotions } from "../../db";
import { apiHandler } from "../../utils/api";

const getPromotionsData = async (req: NextApiRequest, res: NextApiResponse) => {
  const fetchLimit = +req.query.limit || 3;

  const promotions = await getTopActivePromotions(fetchLimit);

  return res.status(200).json({
    promotions,
  });
};

const handler = {
  get: getPromotionsData,
};

export default apiHandler(handler);
