import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "../../../lib/withSession";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.session.user) {
    res.status(200).json({
      isLoggedIn: true,
      data: { ...req.session.user },
    });
  } else {
    res.status(200).json({
      isLoggedIn: false,
      data: null,
    });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
