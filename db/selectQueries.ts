import { query } from "./index";
import {
  CableServiceSchema,
  ClientSchema,
  ContractSchema,
  InternetServiceSchema,
  InvoiceSchema,
  InvoiceDetailSchema,
  ServiceSchema,
  PromotionSchema,
} from "../types/index";

export const getAllInternetServices = async () => {
  const result = await query<InternetServiceSchema & ServiceSchema>(`
    SELECT * FROM "Internet" AS Int
    JOIN "Servicios" AS Ser ON Int."NroServicio" = Ser."NroServicio"
  `);
  return result.rows;
};

export const getOptionalOrRequiredCableServices = async (
  optionalServices: boolean
) => {
  const result = await query<CableServiceSchema & ServiceSchema>(
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
  const result = await query<PromotionSchema & { Servicios: number[] }>(`
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
  const result = await query<ContractSchema & PromotionSchema>(
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

export const getPromotionById = async (promotionNumber: number) => {
  const result = await query<PromotionSchema>(
    `
      SELECT * FROM "Promociones"
      WHERE "NroPromocion" = $1
  `,
    [promotionNumber]
  );

  return result.rows;
};

export const getPromotionBySelectedServices = async (
  selectedServices: number[]
) => {
  const result = await query<{ NroPromocion: number }>(
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
  const result = await query<{ Dni: string; Nombre: string; Apellido: string }>(
    `
      SELECT "Dni", "Nombre", "Apellido" FROM "Clientes"
      WHERE "CorreoElectronico" = $1 AND
        "Contrasena" = crypt($2, "Contrasena")
  `,
    [email, submittedPassword]
  );

  return result.rows;
};

export const getCurrentContractByDni = async (userDni: string) => {
  const result = await query<ContractSchema>(
    `
    SELECT * FROM "Contratos" 
    WHERE "DniCliente" = $1 AND "FechaFin" IS NULL
  `,
    [userDni]
  );

  return result.rows;
};

export const getContractNumberByInvoiceNumber = async (
  invoiceNumber: number
) => {
  const result = await query<{ NroContrato: number }>(
    `
    SELECT "NroContrato" FROM "Facturas"
    WHERE "NroFactura" = $1
  `,
    [invoiceNumber]
  );

  return result.rows;
};

export const getUserInvoices = async (userDni: string) => {
  const result = await query<InvoiceSchema>(
    `
    SELECT * FROM "Facturas"
    WHERE "DniCliente" = $1
  `,
    [userDni]
  );

  return result.rows;
};

export const getUserInvoiceById = async (
  invoiceNumber: number,
  dni: string
) => {
  const result = await query<InvoiceSchema>(
    `
    SELECT * FROM "Facturas"
    WHERE "NroFactura" = $1 AND "DniCliente" = $2
  `,
    [invoiceNumber, dni]
  );

  return result.rows;
};

export const getUserByDni = async (userDni: string) => {
  const result = await query<ClientSchema>(
    `
    SELECT * FROM "Clientes"
    WHERE "Dni" = $1
  `,
    [userDni]
  );

  return result.rows;
};

export const getUserByDniOrEmail = async (
  userDni: string,
  userEmail: string
) => {
  const result = await query<ClientSchema>(
    `
    SELECT * FROM "Clientes"
    WHERE "Dni" = $1 OR "CorreoElectronico" = $2
  `,
    [userDni, userEmail]
  );

  return result.rows;
};

export const getDetailsByInvoiceNumber = async (invoiceNumber: number) => {
  const result = await query<InvoiceDetailSchema>(
    `
    SELECT * FROM "Detalles"
    WHERE "NroFactura" = $1
  `,
    [invoiceNumber]
  );

  return result.rows;
};

export const getHiredServices = async (contractNumber: number) => {
  const result = await query<ServiceSchema>(
    `
    SELECT ser."NroServicio", ser."Nombre", ser."Precio" 
    FROM "ServiciosContratados" cont
    JOIN "Servicios" ser 
      ON cont."NroServicio" = ser."NroServicio" 
    WHERE "NroContrato" = $1
  `,
    [contractNumber]
  );

  return result.rows;
};
