import { NextApiRequest, NextApiResponse } from "next";

import { query } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const internetServices = await query(
      `SELECT * FROM "Internet" AS Int
        JOIN "Servicios" AS Ser ON Int."NroServicio" = Ser."NroServicio"`
    );
    const cableServices = await query(
      `SELECT * FROM "Cable" AS Cab
        JOIN "Servicios" AS Ser ON Cab."NroServicio" = Ser."NroServicio"`
    );
    const deals = await query(`
        SELECT Pro."NroPromocion", Pro."PorcentajeDto", Pro."Duracion", 
            array_agg(Ser."NroServicio") AS "Servicios"
        FROM "Promociones" AS Pro
        JOIN "ServiciosEnPromocion" AS Ser 
            ON Pro."NroPromocion" = Ser."NroPromocion"
        GROUP BY Pro."NroPromocion"
    `);

    return res.status(200).json({
      services: {
        internet: internetServices.rows,
        cable: cableServices.rows,
      },
      deals: deals.rows,
    });
  }

  if (req.method === "POST") {
    const { user, services } = req.body;

    // 1) Agregar al cliente a la BD
    await query(
      `
        INSERT INTO "Clientes" ("Dni", "Nombre", "Apellido", "FechaNacimiento", "Direccion")
        VALUES ($1, $2, $3, $4, $5)
    `,
      [user.dni, user.firstName, user.lastName, user.birthDate, user.address]
    );

    // 2) Agregar telefono y correo del cliente
    await query(
      `
        INSERT INTO "CorreosCliente" ("DniCliente", "CorreoElectronico")
        VALUES ($1, $2)
    `,
      [user.dni, user.email]
    );

    await query(
      `
          INSERT INTO "TelefonosCliente" ("DniCliente", "Telefono")
          VALUES ($1, $2)
      `,
      [user.dni, user.phone]
    );

    // 3) Buscar promocion y crear contrato
    const promotion = await query(
      `
        SELECT "NroPromocion" FROM (
            SELECT Pro."NroPromocion", array_agg(Ser."NroServicio") AS "Servicios"
                FROM "Promociones" Pro
            JOIN "ServiciosEnPromocion" Ser 
                ON Ser."NroPromocion" = Pro."NroPromocion"
            GROUP BY Pro."NroPromocion"
        ) AS Res
        WHERE array_length(Res."Servicios", 1) = array_length($1::Integer[], 1) AND
          Res."Servicios" @> $1::Integer[]
    `,
      [services]
    );

    let promotionNumber = null;
    if (promotion.rows.length > 0) {
      promotionNumber = promotion.rows[0].NroPromocion;
    }

    const result = await query(
      `
      INSERT INTO "Contratos" ("DniCliente", "NroPromocion")
      VALUES ($1, $2)
      RETURNING *
    `,
      [user.dni, promotionNumber]
    );

    // TODO: if result.rows.length === 0 -> Throw error

    // 4) Agregar servicios contratados
    const contractNumber = result.rows[0].NroContrato;
    await query(
      `
      INSERT INTO "ServiciosContratados" ("NroServicio", "NroContrato", "Cantidad")
      SELECT u.val, $1, 1
      FROM unnest(cast($2 as integer[])) AS u(val)
    `,
      [contractNumber, services]
    );

    return res.status(201).json({ message: "Servicio contratado!" });
  }
};

export default handler;
