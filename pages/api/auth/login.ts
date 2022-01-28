import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../../lib/withSession";
import { getUserByEmailAndPassword } from "../../../db";
import { AuthUser, ValidationError } from "../../../types";
import { ADMIN_ROLE } from "../../../utils/constants";
import { apiHandler } from "../../../utils/api";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    user: { email: string; password: string };
  };
}

const authenticateUser = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<AuthUser>
) => {
  const { user } = req.body;

  const foundUser = await getUserByEmailAndPassword(user.email, user.password);

  if (foundUser.length === 0) {
    throw new ValidationError(
      "El correo o la contraseña ingresados son incorrectos"
    );
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
};

const handler = {
  post: authenticateUser,
};

export default withIronSessionApiRoute(apiHandler(handler), sessionOptions);
