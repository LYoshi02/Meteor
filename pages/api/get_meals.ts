import { NextApiHandler } from "next";

import { query } from "../../lib/db";

const handler: NextApiHandler = async (_, res) => {
  try {
    const result = await query("SELECT * FROM meals");
    return res.status(200).json({ meals: result.rows });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
