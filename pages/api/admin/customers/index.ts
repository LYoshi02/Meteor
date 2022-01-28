import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getCustomers, getCustomersCount } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";

const getCustomersData = async (req: NextApiRequest, res: NextApiResponse) => {
  const customers = await getCustomers();
  const result = await getCustomersCount();

  res.status(200).json({ customers, customersCount: +result[0].count });
};

const handler = {
  get: getCustomersData,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
