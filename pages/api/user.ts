import { NextApiRequest, NextApiResponse } from "next";

import { query } from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, dni, address, birthDate, email } = req.body;
    // TODO: validar que el dni no se encuentre en la base de datos

    try {
      await query(
        "INSERT INTO users (nombre, apellido, dni, direccion, fecha_nac, correo) VALUES ($1, $2, $3, $4, $5, $6)",
        [firstName, lastName, dni, address, birthDate, email]
      );
      return res
        .status(201)
        .json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      console.log(error);
      return res.json({ message: "error" });
    }
  }

  if (req.method === "GET") {
    const result = await query("SELECT * FROM users");
    return res.status(200).json({ users: result.rows });
  }
}

export default handler;
