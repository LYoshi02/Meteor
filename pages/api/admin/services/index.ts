import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getServices,
  getServicesCount,
  insertCableService,
  insertInternetService,
  insertNewService,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { ServiceFormValues } from "../../../../types";
import { apiHandler } from "../../../../utils/api";
import { Transaction } from "../../../../utils/transaction";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    service: ServiceFormValues;
  };
}

const getServicesData = async (req: NextApiRequest, res: NextApiResponse) => {
  const services = await getServices();
  const result = await getServicesCount();

  res.status(200).json({ services, servicesCount: +result[0].count });
};

const saveNewService = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const client = await Transaction.getClientInstance();

  try {
    await Transaction.start(client);

    const newServiceData = req.body.service;
    const result = await insertNewService(
      { name: newServiceData.name, price: newServiceData.price },
      client
    );
    const insertedService = { ...result.rows[0], Tipo: newServiceData.type };
    const newServiceNumber = insertedService.NroServicio;

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

    await Transaction.saveChanges(client);
    Transaction.releaseClient(client);

    return res
      .status(201)
      .json({
        service: insertedService,
        message: "Servicio creado correctamente",
      });
  } catch (error) {
    await Transaction.removeChanges(client);
    Transaction.releaseClient(client);

    throw error;
  }
};

const handler = {
  get: getServicesData,
  post: saveNewService,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
