import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { updatePromotionStatus } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const user = req.session.user;

    if (!isValidAdminSession(user)) {
      return res
        .status(401)
        .json({ message: "No estas autorizado para realizar esta acción" });
    }

    try {
      const promotionNumber = req.query.promotionNumber as string;
      const isPromotionFinished = req.body.isFinished as boolean;

      const result = await updatePromotionStatus(
        promotionNumber,
        isPromotionFinished
      );

      return res.status(200).json({
        message: "Promoción actualizada correctamente",
        promotion: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
