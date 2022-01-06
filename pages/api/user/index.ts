import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getUserByDni,
  getUserByEmailAndPassword,
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

      const foundUser = await getUserByDni(user!.data!.dni);
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

    try {
      if (!isValidSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      const userData = req.body.user;
      if (userData.newPassword.length > 0) {
        const foundUser = await getUserByEmailAndPassword(
          userData.email,
          userData.currentPassword
        );

        if (foundUser.length === 0) {
          return res
            .status(422)
            .json({ message: "La contraseña ingresada es incorrecta" });
        }
      }

      const userDni = user!.data!.dni;
      await updateUser(req.body.user, userDni);

      return res
        .status(200)
        .json({ message: "Información actualizada correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
