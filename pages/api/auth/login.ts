import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../../lib/withSession";
import { getUserByEmailAndPassword } from "../../../db";
import { UserData } from "../../../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body;

  try {
    const foundUser = await getUserByEmailAndPassword(
      user.email,
      user.password
    );

    if (foundUser.length === 0) {
      return res.status(422).json({ message: "Email or password are wrong" });
    }

    const authenticatedUser: UserData = {
      dni: foundUser[0].Dni,
      firstName: foundUser[0].Nombre,
      lastName: foundUser[0].Apellido,
    };
    req.session.user = authenticatedUser;
    await req.session.save();

    res.status(200).json({
      isLoggedIn: true,
      data: authenticatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
