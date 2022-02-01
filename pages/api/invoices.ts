import { NextApiRequest, NextApiResponse } from "next";
import {
  getInvoicesGenerationData,
  getUserByEmailAndPassword,
  insertInvoice,
  insertInvoiceDetails,
} from "../../db";
import {
  NotFoundError,
  AuthenticationError,
  ValidationError,
  GenericError,
} from "../../types";

import { apiHandler } from "../../utils/api";
import { ADMIN_ROLE } from "../../utils/constants";
import { Transaction } from "../../utils/transaction";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    user: { email: string; password: string };
  };
}

const generateMonthlyInvoices = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const { user } = req.body;

  if (!user) {
    throw new GenericError("Faltan datos para completar la petición", 400);
  }

  const foundUser = await getUserByEmailAndPassword(user.email, user.password);

  if (!foundUser || foundUser.length === 0) {
    throw new ValidationError("Correo o contraseña incorrectos");
  }

  if (foundUser[0].Rol !== ADMIN_ROLE) {
    throw new AuthenticationError("No estás autorizado a realizar esta acción");
  }

  const client = await Transaction.getClientInstance();

  try {
    await Transaction.start(client);
    const generationData = await getInvoicesGenerationData(client);

    if (generationData.length === 0) {
      throw new NotFoundError("No se encontraron facturas a generar");
    }

    for await (const data of generationData) {
      const invoiceResult = await insertInvoice(
        data.DniCliente,
        data.NroContrato,
        client
      );
      const invoiceNumber = invoiceResult.rows[0].NroFactura;

      await insertInvoiceDetails(
        {
          contractNumber: data.NroContrato,
          servicesIds: data.Servicios,
          invoiceNumber,
        },
        client
      );
    }

    await Transaction.saveChanges(client);
    Transaction.releaseClient(client);

    return res
      .status(201)
      .json({ message: "Facturas generadas correctamente" });
  } catch (error) {
    await Transaction.removeChanges(client);
    Transaction.releaseClient(client);

    throw error;
  }
};

const handler = {
  post: generateMonthlyInvoices,
};

export default apiHandler(handler);
