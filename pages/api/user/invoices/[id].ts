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

    try {
      if (!isValidSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      const userDni = user!.data!.dni;
      const invoiceNumber = +req.query.id;

      const userResult = await getUserByDni(userDni);
      if (userResult.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const invoiceResult = await getUserInvoiceById(invoiceNumber, userDni);
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
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
