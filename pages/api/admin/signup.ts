import { NextApiRequest, NextApiResponse } from "next";

import { insertNewUser } from "../../../db";
import { apiHandler } from "../../../utils/api";
import { ADMIN_ROLE } from "../../../utils/constants";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

// TODO: secure this route
const saveNewAdmin = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const { email, password } = req.body;

  await insertNewUser({ email, password, role: ADMIN_ROLE });

  return res
    .status(201)
    .json({ message: "Administrador creado correctamente" });
};

const handler = {
  post: saveNewAdmin,
};

export default apiHandler(handler);
