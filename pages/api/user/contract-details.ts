import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import {
  getCurrentContractByDni,
  getHiredServices,
  getPromotionById,
} from "../../../db";
import { isValidSession } from "../../../utils/validateSession";
import { sessionOptions } from "../../../lib/withSession";
import { PromotionSchema } from "../../../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = req.session.user;

    if (!isValidSession(user)) {
      res.status(401).end();
      return;
    }

    const contractResult = await getCurrentContractByDni(user!.data!.dni);
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
      },
      services: hiredServices,
      promotion: promotionDetails,
    });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
