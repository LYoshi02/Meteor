import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getContractById, updateContractStatus } from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { isValidAdminSession } from "../../../../utils/validateSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const user = req.session.user;

    try {
      if (!isValidAdminSession(user)) {
        return res
          .status(401)
          .json({ message: "No estas autorizado para realizar esta acción" });
      }

      const contractNumber = req.query.contractNumber as string;
      const isContractFinished = req.body.isFinished as boolean;

      const currentContract = await getContractById(contractNumber);

      if (currentContract.length === 0) {
        return res.status(404).json({ message: "Contrato no encontrado" });
      } else if (currentContract[0].FechaFin !== null) {
        return res
          .status(422)
          .json({ message: "No puedes reestablecer un contrato finalizado" });
      }

      const result = await updateContractStatus(
        contractNumber,
        isContractFinished
      );

      return res.status(200).json({
        message: "Factura actualizada correctamente",
        contract: result.rows[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
