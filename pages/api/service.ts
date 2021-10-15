import { NextApiRequest, NextApiResponse } from "next";

import { query } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { nombre, precio, tipoServicio } = req.body;
    let sqlQuery = "";
    const params = [nombre, precio];

    if (tipoServicio === "internet") {
      sqlQuery =
        "INSERT INTO internet (nombre, precio, velocidad) VALUES ($1, $2, $3)";
      params.push(req.body.velocidad);
    } else if (tipoServicio === "cable") {
      sqlQuery =
        "INSERT INTO cable (nombre, precio, cant_tvs, opcional) VALUES ($1, $2, $3, $4)";
      params.push(req.body.cantidadTvs, req.body.servicioOpcional);
    } else {
      return res.status(422).json({ message: "El tipo ingresado no existe" });
    }

    try {
      await query(sqlQuery, params);
      return res.status(201).json({ message: "Servicio creado exitosamente" });
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "GET") {
    const internetServices = await query(
      `SELECT "nroServicio", nombre, precio FROM internet`
    );
    const tvServices = await query(
      `SELECT "nroServicio", nombre, precio, opcional FROM cable`
    );
    return res.status(200).json({
      services: {
        internet: internetServices.rows,
        cable: tvServices.rows,
      },
    });
  }
};

export default handler;
