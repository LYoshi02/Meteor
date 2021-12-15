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

export const getValidPromotionFromContract = async (contractNumber: number) => {
  const result = await query(
    `
    SELECT * FROM "Contratos" cont
    JOIN "Promociones" prom
      ON prom."NroPromocion" = cont."NroPromocion"
    WHERE "NroContrato" = $1 AND 
      extract(month from age(CURRENT_DATE, cont."FechaInicio")) <= prom."Duracion"
  `,
    [contractNumber]
  );

  return result.rows;
};

export const getPromotionBySelectedServices = async (
  selectedServices: string[]
) => {
  const result = await query(
    `
      SELECT "NroPromocion" FROM (
          SELECT pro."NroPromocion", array_agg(ser."NroServicio") AS "Servicios"
              FROM "Promociones" pro
          JOIN "ServiciosEnPromocion" ser 
              ON ser."NroPromocion" = pro."NroPromocion"
          GROUP BY pro."NroPromocion"
      ) AS res
      WHERE array_length(res."Servicios", 1) = array_length($1::Integer[], 1) AND
        res."Servicios" @> $1::Integer[]
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

export const getContractByInvoiceNumber = async (invoiceNumber: number) => {
  const result = await query(
    `
    SELECT * FROM "Facturas"
    WHERE "NroFactura" = $1
  `,
    [invoiceNumber]
  );

  return result.rows;
};
