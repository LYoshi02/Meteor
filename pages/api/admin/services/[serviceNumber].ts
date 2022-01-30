import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  deleteServiceById,
  updateService,
  getServiceById,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { NotFoundError } from "../../../../types";
import { apiHandler } from "../../../../utils/api";

const getServiceData = async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceNumber = req.query.serviceNumber as string;

  const result = await getServiceById(serviceNumber);
  if (result.length === 0) {
    throw new NotFoundError("Servicio no encontrado");
  }

  return res.status(200).json({
    service: result[0],
  });
};

const deleteServiceData = async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceNumber = req.query.serviceNumber as string;
  await deleteServiceById(serviceNumber);

  return res.status(200).json({
    message: "Servicio eliminado correctamente",
    serviceNumber,
  });
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    service: { name: string; price: string; hidden: boolean };
  };
}

const updateServiceData = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const serviceNumber = req.query.serviceNumber as string;
  const serviceData = req.body.service;

  const result = await updateService(serviceNumber, serviceData);

  return res.status(200).json({
    service: result.rows[0],
    message: "Servicio actualizado correctamente",
  });
};

const handler = {
  get: getServiceData,
  put: updateServiceData,
  delete: deleteServiceData,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
