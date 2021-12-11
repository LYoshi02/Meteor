import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../../lib/withSession";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.status(200).json({ isLoggedIn: false, user: null });
};

export default withIronSessionApiRoute(handler, sessionOptions);
