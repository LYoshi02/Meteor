import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../../lib/withSession";
import { getUserByEmailAndPassword } from "../../../db";
import { AuthUser } from "../../../types";
import { ADMIN_ROLE } from "../../../utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body;

  try {
    const foundUser = await getUserByEmailAndPassword(
      user.email,
      user.password
    );

    if (foundUser.length === 0) {
      return res.status(422).json({
        message: "El correo o la contraseña ingresados son incorrectos",
      });
    }

    let authenticatedUser: AuthUser;
    if (foundUser[0].Rol === ADMIN_ROLE) {
      authenticatedUser = {
        isLoggedIn: true,
        isAdmin: true,
        data: null,
      };
    } else {
      authenticatedUser = {
        isLoggedIn: true,
        isAdmin: false,
        data: {
          dni: foundUser[0].Dni,
          firstName: foundUser[0].Nombre,
          lastName: foundUser[0].Apellido,
        },
      };
    }

    req.session.user = authenticatedUser;
    await req.session.save();

    return res.status(200).json(authenticatedUser);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Se produjo un error en el servidor" });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
