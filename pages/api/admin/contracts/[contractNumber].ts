import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getContractById, updateContractStatus } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { apiHandler } from "../../../../utils/api";
import { NotFoundError, ValidationError } from "../../../../types";

const changeContractStatus = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const contractNumber = req.query.contractNumber as string;
  const isContractFinished = req.body.isFinished as boolean;

  const currentContract = await getContractById(contractNumber);

  if (currentContract.length === 0) {
    throw new NotFoundError("Contrato no encontrado");
  } else if (currentContract[0].FechaFin !== null) {
    throw new ValidationError("No puedes reestablecer un contrato finalizado");
  }

  const result = await updateContractStatus(contractNumber, isContractFinished);

  return res.status(200).json({
    contract: result.rows[0],
  });
};

const handler = {
  put: changeContractStatus,
};

export default withIronSessionApiRoute(
  apiHandler(handler, { requiresAdminAuth: true }),
  sessionOptions
);
