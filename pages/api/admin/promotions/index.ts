import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getPromotions, getPromotionsCount } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = req.session.user;

    if (!isValidAdminSession(user)) {
      return res
        .status(401)
        .json({ message: "No estas autorizado para realizar esta acción" });
    }

    try {
      const promotions = await getPromotions();
      const result = await getPromotionsCount();

      res.status(200).json({ promotions, promotionsCount: +result[0].count });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
