import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { deleteServiceById } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;
  if (!isValidAdminSession(user)) {
    return res
      .status(401)
      .json({ message: "No estas autorizado para realizar esta acción" });
  }

  if (req.method === "DELETE") {
    try {
      const serviceNumber = req.query.serviceNumber as string;
      await deleteServiceById(serviceNumber);

      return res.status(200).json({
        message: "Servicio eliminado correctamente",
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
