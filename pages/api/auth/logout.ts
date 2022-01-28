import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../../lib/withSession";
import { apiHandler } from "../../../utils/api";
import { AuthUser } from "../../../types";

const logoutUser = (req: NextApiRequest, res: NextApiResponse<AuthUser>) => {
  req.session.destroy();
  return res
    .status(200)
    .json({ isLoggedIn: false, data: null, isAdmin: false });
};

const handler = {
  post: logoutUser,
};

export default withIronSessionApiRoute(apiHandler(handler), sessionOptions);
