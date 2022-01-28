import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getDetailsByInvoiceNumber,
  getCustomerInvoiceById,
  getCustomerByDni,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";
import { generateInvoice } from "../../../../utils/invoicePdf";

const getInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;
  const userDni = user!.data!.dni;
  const invoiceNumber = +req.query.id;

  const userResult = await getCustomerByDni(userDni);
  if (userResult.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const invoiceResult = await getCustomerInvoiceById(invoiceNumber, userDni);
  if (invoiceResult.length === 0) {
    return res.status(404).json({ message: "Factura no encontrada" });
  }

  const invoiceDetails = await getDetailsByInvoiceNumber(invoiceNumber);
  if (invoiceDetails.length === 0) {
    return res
      .status(404)
      .json({ message: "Detalles de factura no encontrados" });
  }

  const userData = userResult[0];
  const invoiceData = invoiceResult[0];
  const invoice = generateInvoice(invoiceData, invoiceDetails, userData);
  invoice.pipe(res);
  invoice.end();
};

const handler = {
  get: getInvoice,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresUserAuth: true }),
  sessionOptions
);
