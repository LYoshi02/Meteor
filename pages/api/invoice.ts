import { NextApiRequest, NextApiResponse } from "next";

import { generateInvoice } from "../../utils/invoicePdf";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const invoice = generateInvoice("Factura - 10000");
  invoice.pipe(res);
  invoice.end();
};

export default handler;
