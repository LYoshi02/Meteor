import { query } from "./index";

export const getAllInternetServices = async () => {
  const result = await query(`
    SELECT * FROM "Internet" AS Int
    JOIN "Servicios" AS Ser ON Int."NroServicio" = Ser."NroServicio"
  `);
  return result.rows;
};

export const getOptionalOrRequiredCableServices = async (
  optionalServices: boolean
) => {
  const result = await query(
    `
    SELECT * FROM "Cable" AS Cab
    JOIN "Servicios" AS Ser ON Cab."NroServicio" = Ser."NroServicio"
    WHERE Cab."Opcional" = $1
    `,
    [optionalServices]
  );
  return result.rows;
};

export const getAllPromotions = async () => {
  const result = await query(`
    SELECT Pro."NroPromocion", Pro."PorcentajeDto", Pro."Duracion", 
        array_agg(Ser."NroServicio") AS "Servicios"
    FROM "Promociones" AS Pro
    JOIN "ServiciosEnPromocion" AS Ser 
        ON Pro."NroPromocion" = Ser."NroPromocion"
    GROUP BY Pro."NroPromocion"
  `);
  return result.rows;
};

export const getPromotionBySelectedServices = async (
  selectedServices: string[]
) => {
  const result = await query(
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
    [selectedServices]
  );

  return result.rows;
};

export const getUserByEmailAndPassword = async (
  email: string,
  submittedPassword: string
) => {
  const result = await query(
    `
      SELECT "Dni", "Nombre", "Apellido" FROM "Clientes"
      WHERE "CorreoElectronico" = $1 AND
        "Contrasena" = crypt($2, "Contrasena")
  `,
    [email, submittedPassword]
  );

  return result.rows;
};
