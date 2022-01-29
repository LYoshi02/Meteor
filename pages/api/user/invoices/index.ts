import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getCustomerInvoices, getCustomerInvoicesCount } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";

const getInvoices = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;
  const userDni = user!.data!.dni;

  const invoices = await getCustomerInvoices(userDni);
  const invoicesCount = await getCustomerInvoicesCount(userDni);

  res.status(200).json({ invoices, invoicesCount: +invoicesCount[0].count });
};

const handler = {
  get: getInvoices,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresUserAuth: true }),
  sessionOptions
);
