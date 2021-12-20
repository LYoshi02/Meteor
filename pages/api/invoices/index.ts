import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getUserInvoices } from "../../../db";
import { sessionOptions } from "../../../lib/withSession";
import { isValidSession } from "../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = req.session.user;

    if (!isValidSession(user)) {
      res.status(401).end();
      return;
    }

    const userDni = user!.data!.dni;
    const invoices = await getUserInvoices(userDni);

    res.status(200).json({ invoices });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
