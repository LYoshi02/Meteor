import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import {
  getCustomerByDni,
  getUserByEmail,
  pool,
  updateUser,
  updateCustomer,
} from "../../../../db";
import { sessionOptions } from "../../../../lib/withSession";
import { UserFormValues } from "../../../../types";
import { isValidAdminSession } from "../../../../utils/validateSession";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: { customer: UserFormValues };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;

  if (!isValidAdminSession(user)) {
    return res
      .status(401)
      .json({ message: "No estas autorizado para realizar esta acción" });
  }

  const customerDni = req.query.customerDni as string;

  if (req.method === "GET") {
    try {
      const result = await getCustomerByDni(customerDni);
      if (result.length === 0) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }

      return res.status(200).json({
        customer: result[0],
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }

  if (req.method === "PUT") {
    const userData = req.body.customer;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const currentUser = await getCustomerByDni(customerDni, client);
      const existentUser = await getUserByEmail(userData.email, client);

      if (
        existentUser.length === 1 &&
        (existentUser[0].Dni === null ||
          existentUser[0].Dni !== currentUser[0].Dni)
      ) {
        return res
          .status(422)
          .json({ message: "El correo ingresado ya se encuentra en uso" });
      }

      await updateUser(
        {
          currentEmail: currentUser[0].CorreoElectronico,
          password: "",
          newEmail: userData.email,
        },
        client
      );
      await updateCustomer(userData, customerDni, client);

      await client.query("COMMIT");
      client.release();

      return res.status(200).json({
        message: "Cliente actualizado correctamente",
      });
    } catch (error) {
      await client.query("ROLLBACK");
      client.release();

      console.log(error);
      return res
        .status(500)
        .json({ message: "Se produjo un error en el servidor" });
    }
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
