import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getCustomerByDni,
  getUserByEmail,
  getUserByEmailAndPassword,
  updateCustomerPartially,
  updateUser,
} from "../../../db";
import {
  NotFoundError,
  UserConfigData,
  UserConfigFormValues,
  ValidationError,
} from "../../../types";
import { sessionOptions } from "../../../lib/withSession";
import { apiHandler } from "../../../utils/api";
import { Transaction } from "../../../utils/transaction";

const getUserData = async (
  req: NextApiRequest,
  res: NextApiResponse<UserConfigData>
) => {
  const user = req.session.user;

  const foundUser = await getCustomerByDni(user!.data!.dni);
  if (foundUser.length === 0) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const { Apellido, CorreoElectronico, Direccion, Nombre, Telefono } =
    foundUser[0];

  return res.status(200).json({
    address: Direccion,
    email: CorreoElectronico,
    firstName: Nombre,
    lastName: Apellido,
    phone: Telefono,
  });
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { user: UserConfigFormValues };
}

const updateUserData = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const user = req.session.user;
  const client = await Transaction.getClientInstance();

  try {
    await Transaction.start(client);

    const userDni = user!.data!.dni;
    const userData = req.body.user;

    const currentUser = await getCustomerByDni(userDni, client);
    const existentUser = await getUserByEmail(userData.email, client);

    if (
      existentUser.length === 1 &&
      (existentUser[0].Dni === null ||
        existentUser[0].Dni !== currentUser[0].Dni)
    ) {
      throw new ValidationError("El correo ingresado ya se encuentra en uso");
    }

    if (userData.newPassword.length > 0) {
      const authenticatedUser = await getUserByEmailAndPassword(
        currentUser[0].CorreoElectronico,
        userData.currentPassword,
        client
      );

      if (authenticatedUser.length === 0) {
        throw new ValidationError("La contraseña ingresada es incorrecta");
      }
    }

    await updateUser(
      {
        currentEmail: currentUser[0].CorreoElectronico,
        password: userData.newPassword,
        newEmail: userData.email,
      },
      client
    );
    await updateCustomerPartially(userData, userDni, client);

    await Transaction.saveChanges(client);
    Transaction.releaseClient(client);

    return res
      .status(200)
      .json({ message: "Información actualizada correctamente" });
  } catch (error) {
    await Transaction.removeChanges(client);
    Transaction.releaseClient(client);

    throw error;
  }
};

const handler = {
  get: getUserData,
  put: updateUserData,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresUserAuth: true }),
  sessionOptions
);
