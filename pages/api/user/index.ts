import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getCustomerByDni,
  getUserByEmail,
  getUserByEmailAndPassword,
  pool,
  updateCustomerPartially,
  updateUser,
} from "../../../db";
import { UserConfigData, UserConfigFormValues } from "../../../types";
import { isValidSession } from "../../../utils/validateSession";
import { sessionOptions } from "../../../lib/withSession";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { user: UserConfigFormValues };
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<UserConfigData | { message: string }>
) => {
  if (req.method === "GET") {
    const user = req.session.user;

    try {
      if (!isValidSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      const foundUser = await getCustomerByDni(user!.data!.dni);
      if (foundUser.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
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
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }

  if (req.method === "PUT") {
    const user = req.session.user;
    const client = await pool.connect();

    try {
      if (!isValidSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      await client.query("BEGIN");

      const userDni = user!.data!.dni;
      const userData = req.body.user;

      const currentUser = await getCustomerByDni(userDni, client);
      const existentUser = await getUserByEmail(userData.email, client);

      if (
        existentUser.length === 1 &&
        (existentUser[0].Dni === null ||
          existentUser[0].Dni !== currentUser[0].Dni)
      ) {
        return res
          .status(422)
          .json({ message: "El correo ingresado ya se encuentra en uso" });
      }

      if (userData.newPassword.length > 0) {
        const authenticatedUser = await getUserByEmailAndPassword(
          currentUser[0].CorreoElectronico,
          userData.currentPassword,
          client
        );

        if (authenticatedUser.length === 0) {
          return res
            .status(422)
            .json({ message: "La contraseña ingresada es incorrecta" });
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

      await client.query("COMMIT");
      client.release();

      return res
        .status(200)
        .json({ message: "Información actualizada correctamente" });
    } catch (error) {
      await client.query("ROLLBACK");
      client.release();
      console.log(error);
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
