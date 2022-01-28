import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import {
  getLastContractByDni,
  getHiredServices,
  getPromotionById,
} from "../../../db";
import { sessionOptions } from "../../../lib/withSession";
import { PromotionSchema } from "../../../types";
import { apiHandler } from "../../../utils/api";

const getContractDetails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = req.session.user;

  const contractResult = await getLastContractByDni(user!.data!.dni);
  const userContract = contractResult[0];

  const hiredServices = await getHiredServices(userContract.NroContrato);

  let promotionDetails: PromotionSchema | null = null;
  if (userContract.NroPromocion) {
    const promotionResult = await getPromotionById(userContract.NroPromocion);
    promotionDetails = promotionResult[0];
  }

  return res.status(200).json({
    contract: {
      NroContrato: userContract.NroContrato,
      FechaInicio: userContract.FechaInicio,
      FechaFin: userContract.FechaFin,
    },
    services: hiredServices,
    promotion: promotionDetails,
  });
};

const handler = {
  get: getContractDetails,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresUserAuth: true }),
  sessionOptions
);
