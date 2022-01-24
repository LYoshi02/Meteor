import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  deleteServiceById,
  updateService,
  getServiceById,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    service: { name: string; price: string };
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;
  if (!isValidAdminSession(user)) {
    return res
      .status(401)
      .json({ message: "No estas autorizado para realizar esta acción" });
  }

  const serviceNumber = req.query.serviceNumber as string;

  if (req.method === "GET") {
    try {
      const result = await getServiceById(serviceNumber);
      if (result.length === 0) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }

      return res.status(200).json({
        service: result[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await deleteServiceById(serviceNumber);

      return res.status(200).json({
        message: "Servicio eliminado correctamente",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }

  if (req.method === "PUT") {
    const serviceData = req.body.service;

    try {
      await updateService(serviceNumber, serviceData);

      return res
        .status(200)
        .json({ message: "Servicio actualizado correctamente" });
    } catch (error) {
      return res.status(500).json({
        message: "Se produjo un error en el servidor",
      });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
