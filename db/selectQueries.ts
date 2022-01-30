import { pool } from "./index";
import {
  CableServiceSchema,
  ClientSchema,
  ContractSchema,
  InternetServiceSchema,
  InvoiceSchema,
  InvoiceDetailSchema,
  ServiceSchema,
  PromotionSchema,
  UserSchema,
} from "../types/index";

import { PoolClient, Pool } from "pg";

export const getVisibleInternetServices = async (
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<InternetServiceSchema & ServiceSchema>(`
    SELECT * FROM "Internet" AS Int
    JOIN "Servicios" AS Ser ON Int."NroServicio" = Ser."NroServicio"
    WHERE Ser."Oculto" = False
  `);
  return result.rows;
};

export const getVisibleOptionalCableServices = async (
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<CableServiceSchema & ServiceSchema>(
    `
    SELECT * FROM "Cable" AS Cab
    JOIN "Servicios" AS Ser ON Cab."NroServicio" = Ser."NroServicio"
    WHERE Cab."Opcional" = TRUE AND Ser."Oculto" = False
    `
  );
  return result.rows;
};

export const getVisibleRequiredCableServices = async (
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<CableServiceSchema & ServiceSchema>(
    `
    SELECT * FROM "Cable" AS Cab
    JOIN "Servicios" AS Ser ON Cab."NroServicio" = Ser."NroServicio"
    WHERE Cab."Opcional" = FALSE AND Ser."Oculto" = False
    `
  );
  return result.rows;
};

export const getHiredServices = async (
  contractNumber: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ServiceSchema>(
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

export const getServices = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<ServiceSchema & { Tipo: string }>(
    `
    (SELECT Ser."NroServicio", Ser."Nombre", Ser."Precio", 'Internet' AS "Tipo", Ser."Oculto" 
    FROM "Internet" AS Int
    JOIN "Servicios" AS Ser ON Int."NroServicio" = Ser."NroServicio"
    UNION
    SELECT Ser."NroServicio", Ser."Nombre", Ser."Precio", 'TV' AS "Tipo", Ser."Oculto"
    FROM "Cable" AS Cab
    JOIN "Servicios" AS Ser ON Cab."NroServicio" = Ser."NroServicio")
    ORDER BY "NroServicio"
  `
  );

  return result.rows;
};

export const getServicesCount = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<{ count: string }>(
    `SELECT COUNT(*) FROM "Servicios"`
  );

  return result.rows;
};

export const getServiceById = async (
  serviceNumber: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ServiceSchema>(
    `
    SELECT * FROM "Servicios"
    WHERE "NroServicio" = $1::Integer
  `,
    [serviceNumber]
  );

  return result.rows;
};

export const getUserByEmailAndPassword = async (
  email: string,
  submittedPassword: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ClientSchema & UserSchema>(
    `    
      SELECT * FROM "Usuarios" usu
      LEFT JOIN "Clientes" cli
      ON cli."CorreoElectronico" = usu."CorreoElectronico"
      WHERE usu."CorreoElectronico" = $1 AND
        "Contrasena" = crypt($2, "Contrasena");
  `,
    [email, submittedPassword]
  );

  return result.rows;
};

export const getUserByEmail = async (
  email: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ClientSchema & UserSchema>(
    `
    SELECT * FROM "Usuarios" usu
    LEFT JOIN "Clientes" cli
    ON cli."CorreoElectronico" = usu."CorreoElectronico"
    WHERE usu."CorreoElectronico" = $1;
  `,
    [email]
  );

  return result.rows;
};

export const getCustomerInvoices = async (
  userDni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<InvoiceSchema>(
    `
    SELECT * FROM "Facturas"
    WHERE "DniCliente" = $1
    ORDER BY "NroFactura" DESC
  `,
    [userDni]
  );

  return result.rows;
};

export const getCustomerInvoicesCount = async (
  userDni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<{ count: string }>(
    `
    SELECT COUNT(*) FROM "Facturas"
    WHERE "DniCliente" = $1
  `,
    [userDni]
  );

  return result.rows;
};

export const getCustomerInvoiceById = async (
  invoiceNumber: number,
  dni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<InvoiceSchema>(
    `
    SELECT * FROM "Facturas"
    WHERE "NroFactura" = $1 AND "DniCliente" = $2
  `,
    [invoiceNumber, dni]
  );

  return result.rows;
};

export const getCustomerByDni = async (
  userDni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ClientSchema>(
    `
    SELECT * FROM "Clientes"
    WHERE "Dni" = $1
  `,
    [userDni]
  );

  return result.rows;
};

export const getCustomers = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<ClientSchema>(
    `
    SELECT * FROM "Clientes"
    ORDER BY "Dni"
  `
  );

  return result.rows;
};

export const getCustomersCount = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<{ count: string }>(
    `
    SELECT COUNT(*) FROM "Clientes"
  `
  );

  return result.rows;
};

export const getCurrentCustomerContract = async (
  userDni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ContractSchema>(
    `
    SELECT * FROM "Contratos"
    WHERE "DniCliente" = $1 AND "FechaFin" IS NULL;
  `,
    [userDni]
  );

  return result.rows;
};

export const getActivePromotions = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<PromotionSchema & { Servicios: number[] }>(`
    SELECT Pro."NroPromocion", Pro."PorcentajeDto", Pro."Duracion", 
        array_agg(Ser."NroServicio") AS "Servicios"
    FROM "Promociones" AS Pro
    JOIN "ServiciosEnPromocion" AS Ser 
        ON Pro."NroPromocion" = Ser."NroPromocion"
    WHERE Pro."Finalizado" = False
    GROUP BY Pro."NroPromocion"
  `);
  return result.rows;
};

export const getPromotionsWithServices = async (
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<PromotionSchema & { Servicios: string[] }>(`
    SELECT prom."NroPromocion", prom."PorcentajeDto", prom."Duracion", 
      prom."Finalizado", array_agg(serv."Nombre") AS "Servicios"
    FROM "Promociones" prom
    JOIN "ServiciosEnPromocion" serpro
      ON serpro."NroPromocion" = prom."NroPromocion"
    JOIN "Servicios" serv
      ON serv."NroServicio" = serpro."NroServicio"
    GROUP BY prom."NroPromocion"
    ORDER BY "NroPromocion";
  `);
  return result.rows;
};

export const getPromotionsCount = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<{ count: string }>(`
    SELECT COUNT(*) FROM "Promociones"
  `);

  return result.rows;
};

export const getValidPromotionFromContract = async (
  contractNumber: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ContractSchema & PromotionSchema>(
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

export const getPromotionById = async (
  promotionNumber: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<PromotionSchema>(
    `
      SELECT * FROM "Promociones"
      WHERE "NroPromocion" = $1
  `,
    [promotionNumber]
  );

  return result.rows;
};

export const getPromotionBySelectedServices = async (
  selectedServices: number[],
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<PromotionSchema & { Servicios: number[] }>(
    `
      SELECT * FROM (
          SELECT pro."NroPromocion", pro."PorcentajeDto", pro."Duracion", 
            pro."Finalizado", array_agg(ser."NroServicio") AS "Servicios"
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

export const getLastContractByDni = async (
  userDni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ContractSchema>(
    `
    SELECT * FROM "Contratos" 
    WHERE "DniCliente" = $1
    ORDER BY "NroContrato" DESC
    LIMIT 1
  `,
    [userDni]
  );

  return result.rows;
};

export const getContractById = async (
  contractNumber: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ContractSchema>(
    `
    SELECT * FROM "Contratos" 
    WHERE "NroContrato" = $1
  `,
    [contractNumber]
  );

  return result.rows;
};

export const getContractNumberByInvoiceNumber = async (
  invoiceNumber: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<{ NroContrato: number }>(
    `
    SELECT "NroContrato" FROM "Facturas"
    WHERE "NroFactura" = $1
  `,
    [invoiceNumber]
  );

  return result.rows;
};

export const getContracts = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<ContractSchema>(`
    SELECT * FROM "Contratos"
    ORDER BY "NroContrato" DESC
  `);

  return result.rows;
};

export const getContractsCount = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<{ count: string }>(
    `SELECT COUNT(*) FROM "Contratos"`
  );

  return result.rows;
};

export const getDetailsByInvoiceNumber = async (
  invoiceNumber: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<InvoiceDetailSchema>(
    `
    SELECT * FROM "Detalles"
    WHERE "NroFactura" = $1
  `,
    [invoiceNumber]
  );

  return result.rows;
};

export const getInvoices = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<InvoiceSchema>(`
    SELECT * FROM "Facturas"
    ORDER BY "PeriodoInicio" DESC, "NroFactura" DESC
  `);

  return result.rows;
};

export const getInvoicesCount = async (client: PoolClient | Pool = pool) => {
  const result = await client.query<{ count: string }>(
    `SELECT COUNT(*) FROM "Facturas"`
  );

  return result.rows;
};
