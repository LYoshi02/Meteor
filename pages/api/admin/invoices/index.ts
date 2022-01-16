import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getInvoices, getInvoicesCount } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = req.session.user;

    try {
      if (!isValidAdminSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      const invoices = await getInvoices();
      const result = await getInvoicesCount();

      res.status(200).json({ invoices, invoicesCount: +result[0].count });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
