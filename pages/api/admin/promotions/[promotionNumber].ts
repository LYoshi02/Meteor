import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { updatePromotionStatus } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    isFinished: boolean;
  };
}

const changePromotionStatus = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const promotionNumber = req.query.promotionNumber as string;
  const isPromotionFinished = req.body.isFinished;

  const result = await updatePromotionStatus(
    promotionNumber,
    isPromotionFinished
  );

  return res.status(200).json({
    promotion: result.rows[0],
  });
};

const handler = {
  put: changePromotionStatus,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
