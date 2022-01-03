import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getDetailsByInvoiceNumber,
  getUserInvoiceById,
  getUserByDni,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { generateInvoice } from "../../../../utils/invoicePdf";
import { isValidSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = req.session.user;

    if (!isValidSession(user)) {
      res.status(401).end();
      return;
    }

    const userDni = user!.data!.dni;
    const invoiceNumber = +req.query.id;

    const userResult = await getUserByDni(userDni);
    if (userResult.length === 0) {
      res.status(404).end();
      return;
    }

    const invoiceResult = await getUserInvoiceById(invoiceNumber, userDni);
    if (invoiceResult.length === 0) {
      res.status(404).end();
      return;
    }

    const invoiceDetails = await getDetailsByInvoiceNumber(invoiceNumber);
    if (invoiceDetails.length === 0) {
      res.status(404).end();
      return;
    }

    const userData = userResult[0];
    const invoiceData = invoiceResult[0];
    const invoice = generateInvoice(invoiceData, invoiceDetails, userData);
    invoice.pipe(res);
    invoice.end();
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
