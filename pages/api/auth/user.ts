import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../../lib/withSession";
import { AuthUser } from "../../../types";
import { apiHandler } from "../../../utils/api";

const getUserData = (req: NextApiRequest, res: NextApiResponse<AuthUser>) => {
  if (req.session.user) {
    return res.status(200).json({ ...req.session.user });
  } else {
    return res.status(200).json({
      isLoggedIn: false,
      data: null,
      isAdmin: false,
    });
  }
};

const handler = {
  get: getUserData,
};

export default withIronSessionApiRoute(apiHandler(handler), sessionOptions);
