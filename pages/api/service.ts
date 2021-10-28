import { NextApiRequest, NextApiResponse } from "next";

import { query } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: modify the name of the attributes
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
      `SELECT * FROM "Internet" AS Int
       JOIN "Servicios" AS Ser ON Int."NroServicio" = Ser."NroServicio";`
    );
    const cableServices = await query(
      `SELECT * FROM "Cable" AS Cab
       JOIN "Servicios" AS Ser ON Cab."NroServicio" = Ser."NroServicio";`
    );
    const deals = await query(`
      SELECT Pro."NroPromocion", Pro."PorcentajeDto", Pro."Duracion", array_agg(Ser."NroServicio") AS "Servicios"
      FROM "Promociones" AS Pro
      JOIN "ServiciosEnPromocion" AS Ser 
        ON Pro."NroPromocion" = Ser."NroPromocion"
      GROUP BY Pro."NroPromocion";
    `);

    return res.status(200).json({
      services: {
        internet: internetServices.rows,
        cable: cableServices.rows,
      },
      deals: deals.rows,
    });
  }
};

export default handler;
