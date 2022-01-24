import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getPromotionsWithServices,
  getPromotionsCount,
  getPromotionBySelectedServices,
  insertPromotion,
  insertServicesInPromotion,
  pool,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";
import { PromotionFormValues } from "../../../../types";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    promotion: PromotionFormValues;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;
  if (!isValidAdminSession(user)) {
    return res
      .status(401)
      .json({ message: "No estas autorizado para realizar esta acción" });
  }

  if (req.method === "GET") {
    try {
      const promotions = await getPromotionsWithServices();
      const result = await getPromotionsCount();

      res.status(200).json({ promotions, promotionsCount: +result[0].count });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }

  if (req.method === "POST") {
    const client = await pool.connect();
    const promotionData = req.body.promotion;

    try {
      await client.query("BEGIN");

      const existentPromotion = await getPromotionBySelectedServices(
        promotionData.services,
        client
      );
      if (existentPromotion.length > 0 && !existentPromotion[0].Finalizado) {
        // TODO: handle the transaction
        return res.status(422).json({
          message:
            "Ya existe una promoción activa con los servicios seleccionados",
        });
      }

      const result = await insertPromotion(promotionData, client);
      const promotionNumber = result.rows[0].NroPromocion;

      await insertServicesInPromotion(
        promotionData.services,
        promotionNumber,
        client
      );
      await client.query("COMMIT");

      return res.status(201).json({
        message: "Promocion creada correctamente",
      });
    } catch (error) {
      console.log(error);
      await client.query("ROLLBACK");
      client.release();

      return res.status(500).json({
        message: "Se produjo un error en el servidor",
      });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
