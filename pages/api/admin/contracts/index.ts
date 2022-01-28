import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getContracts, getContractsCount } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";

const getContractsData = async (req: NextApiRequest, res: NextApiResponse) => {
  const contracts = await getContracts();
  const result = await getContractsCount();

  return res.status(200).json({ contracts, contractsCount: +result[0].count });
};

const handler = {
  get: getContractsData,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
