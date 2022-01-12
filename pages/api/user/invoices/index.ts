import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getCustomerInvoices } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = req.session.user;

    try {
      if (!isValidSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      const userDni = user!.data!.dni;
      const invoices = await getCustomerInvoices(userDni);

      res.status(200).json({ invoices });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
