import { NextApiRequest, NextApiResponse } from "next";

import { insertNewUser } from "../../../db";
import { ADMIN_ROLE } from "../../../utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await insertNewUser({ email, password, role: ADMIN_ROLE });

      return res
        .status(201)
        .json({ message: "Administrador creado correctamente" });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default handler;
