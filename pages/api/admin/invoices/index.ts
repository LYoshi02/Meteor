import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getInvoices, getInvoicesCount } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";

const getInvoicesData = async (req: NextApiRequest, res: NextApiResponse) => {
  const invoices = await getInvoices();
  const result = await getInvoicesCount();

  res.status(200).json({ invoices, invoicesCount: +result[0].count });
};

const handler = {
  get: getInvoicesData,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
