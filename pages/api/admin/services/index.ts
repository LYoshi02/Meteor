import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getServices,
  getServicesCount,
  insertCableService,
  insertInternetService,
  insertNewService,
  pool,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { ServiceFormValues } from "../../../../types";
import { isValidAdminSession } from "../../../../utils/validateSession";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    service: ServiceFormValues;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = req.session.user;

    if (!isValidAdminSession(user)) {
      return res
        .status(401)
        .json({ message: "No estas autorizado para realizar esta acción" });
    }

    try {
      const services = await getServices();
      const result = await getServicesCount();

      res.status(200).json({ services, servicesCount: +result[0].count });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }

  if (req.method === "POST") {
    const user = req.session.user;

    if (!isValidAdminSession(user)) {
      return res
        .status(401)
        .json({ message: "No estas autorizado para realizar esta acción" });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const newServiceData = req.body.service;
      const result = await insertNewService(
        { name: newServiceData.name, price: newServiceData.price },
        client
      );
      const newServiceNumber = result.rows[0].NroServicio;

      if (newServiceData.type === "TV") {
        await insertCableService(
          newServiceNumber,
          newServiceData.optional,
          client
        );
      } else {
        await insertInternetService(
          newServiceNumber,
          newServiceData.speed,
          client
        );
      }

      await client.query("COMMIT");
      client.release();

      return res.status(201).json({ message: "Servicio creado correctamente" });
    } catch (error) {
      console.log(error);

      await client.query("ROLLBACK");
      client.release();

      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
