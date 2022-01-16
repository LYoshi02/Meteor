import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { updateInvoiceStatus } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const user = req.session.user;

    try {
      if (!isValidAdminSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      const invoiceNumber = req.query.invoiceNumber as string;
      const isInvoicePaid = req.body.isPaid as boolean;

      const result = await updateInvoiceStatus(invoiceNumber, isInvoicePaid);

      return res.status(200).json({
        message: "Factura actualizada correctamente",
        invoice: result.rows[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
