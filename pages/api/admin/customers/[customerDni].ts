import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getCustomerByDni,
  getUserByEmail,
  updateUser,
  updateCustomer,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import {
  NotFoundError,
  UserFormValues,
  ValidationError,
} from "../../../../types";
import { apiHandler } from "../../../../utils/api";
import { Transaction } from "../../../../utils/transaction";

const getCustomerData = async (req: NextApiRequest, res: NextApiResponse) => {
  const customerDni = req.query.customerDni as string;

  const result = await getCustomerByDni(customerDni);
  if (result.length === 0) {
    throw new NotFoundError("Cliente no encontrado");
  }

  return res.status(200).json({
    customer: result[0],
  });
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { customer: UserFormValues };
}

const updateCustomerData = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const customerDni = req.query.customerDni as string;
  const userData = req.body.customer;
  const client = await Transaction.getClientInstance();

  try {
    await Transaction.start(client);

    const currentUser = await getCustomerByDni(customerDni, client);
    const existentUser = await getUserByEmail(userData.email, client);

    if (
      existentUser.length === 1 &&
      (existentUser[0].Dni === null ||
        existentUser[0].Dni !== currentUser[0].Dni)
    ) {
      throw new ValidationError("El correo ingresado ya se encuentra en uso");
    }

    await updateUser(
      {
        currentEmail: currentUser[0].CorreoElectronico,
        password: "",
        newEmail: userData.email,
      },
      client
    );
    const result = await updateCustomer(userData, customerDni, client);

    await Transaction.saveChanges(client);
    Transaction.releaseClient(client);

    return res.status(200).json({
      message: "Cliente actualizado correctamente",
      customer: result.rows[0],
    });
  } catch (error) {
    await Transaction.removeChanges(client);
    Transaction.releaseClient(client);

    throw error;
  }
};

const handler = {
  get: getCustomerData,
  put: updateCustomerData,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
