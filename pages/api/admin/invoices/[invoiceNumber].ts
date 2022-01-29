import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { updateInvoiceStatus } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    isPaid: boolean;
  };
}

const changeInvoiceStatus = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const invoiceNumber = req.query.invoiceNumber as string;
  const isInvoicePaid = req.body.isPaid;

  const result = await updateInvoiceStatus(invoiceNumber, isInvoicePaid);

  return res.status(200).json({
    invoice: result.rows[0],
    message: "Factura actualizada correctamente",
  });
};

const handler = {
  put: changeInvoiceStatus,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
