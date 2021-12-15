import { NextApiRequest, NextApiResponse } from "next";
import {
  getDetailsByInvoiceNumber,
  getInvoiceById,
  getUserByDni,
} from "../../../db";

import { generateInvoice } from "../../../utils/invoicePdf";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const invoiceNumber = +req.query.id;

  const invoiceResult = await getInvoiceById(invoiceNumber);
  const invoiceData = invoiceResult[0];

  const invoiceDetails = await getDetailsByInvoiceNumber(invoiceNumber);

  const userResult = await getUserByDni(invoiceData.DniCliente);
  const userData = userResult[0];

  const invoice = generateInvoice(invoiceData, invoiceDetails, userData);
  invoice.pipe(res);
  invoice.end();
};

export default handler;
