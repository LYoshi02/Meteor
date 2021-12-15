import { NextApiRequest, NextApiResponse } from "next";
import { getUserInvoices } from "../../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const userDni = req.body.user;
    const invoices = await getUserInvoices(userDni);

    res.status(200).json({ invoices });
  }
};

export default handler;
