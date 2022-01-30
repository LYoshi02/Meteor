import { pool } from "./index";
import { getValidPromotionFromContract } from "./selectQueries";
import {
  ContractSchema,
  InvoiceSchema,
  PromotionFormValues,
  PromotionSchema,
  ServiceSchema,
  UserFormValues,
} from "../types";

import { PoolClient, Pool } from "pg";

export const insertNewUser = async (
  user: { email: string; password: string; role: number },
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
      INSERT INTO "Usuarios" ("CorreoElectronico", "Contrasena", "Rol")
      VALUES ($1, crypt($2, gen_salt('bf')), $3)
    `,
    [user.email, user.password, user.role]
  );

  return result;
};

export const insertNewCustomer = async (
  user: UserFormValues,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
      INSERT INTO "Clientes" ("Dni", "Nombre", "Apellido", "FechaNacimiento", "Direccion", 
        "Telefono", "CorreoElectronico")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [
      user.dni,
      user.firstName,
      user.lastName,
      user.birthDate,
      user.address,
      user.phone,
      user.email,
    ]
  );

  return result;
};

export const insertNewContract = async (
  dni: string,
  promotionNumber?: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ContractSchema>(
    `
        INSERT INTO "Contratos" ("DniCliente", "NroPromocion")
        VALUES ($1, $2)
        RETURNING *
      `,
    [dni, promotionNumber]
  );

  return result;
};

export const insertHiredServices = async (
  contractNumber: number,
  services: number[],
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
        INSERT INTO "ServiciosContratados" ("NroServicio", "NroContrato", "Cantidad")
        SELECT u.val, $1, 1
        FROM unnest(cast($2 as integer[])) AS u(val)
      `,
    [contractNumber, services]
  );
  return result;
};

export const insertInvoice = async (
  dni: string,
  contractNumber: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<InvoiceSchema>(
    `
    INSERT INTO "Facturas" ("Vencimiento", "PeriodoInicio", "PeriodoFin", "DniCliente", "NroContrato")
    SELECT 
        CASE
        WHEN EXTRACT(day from CURRENT_DATE) >= 28 THEN
          -- Obtiene el 10mo dia del mes siguiente
          (SELECT (
          date_trunc('month', CURRENT_DATE)
          + INTERVAL '1 month + 9 days'
          )::DATE)
        WHEN EXTRACT(day from CURRENT_DATE) = 1 THEN
          -- Obtiene el 10mo dia del mes actual
          (SELECT (CURRENT_DATE + INTERVAL '9 days')::DATE)
        ELSE
          -- Obtiene el ultimo dia del mes actual
        (SELECT (
          date_trunc('month', CURRENT_DATE)
          + INTERVAL '1 month - 1 day'
          )::DATE)
      END AS "Vencimiento",
      CURRENT_DATE AS "PeriodoInicio",
      CASE
        WHEN EXTRACT(day from CURRENT_DATE) >= 28 THEN
          -- Obtiene el ultimo dia del mes siguiente
          (SELECT (
          date_trunc('month', CURRENT_DATE)
          + INTERVAL '2 month - 1 day'
          )::DATE)
        ELSE
          -- Obtiene el ultimo dia del mes actual
          (SELECT (
          date_trunc('month', CURRENT_DATE)
          + INTERVAL '1 month -1 day'
          )::DATE)
      END AS "PeriodoFin",
      $1 AS "DniCliente",
      $2 AS "NroContrato"
      RETURNING *
      `,
    [dni, contractNumber]
  );

  return result;
};

export const insertInvoiceDetails = async (
  data: {
    invoice: InvoiceSchema;
    servicesIds: number[];
    promotionNumber?: number;
  },
  client: PoolClient | Pool = pool
) => {
  const { invoice, servicesIds, promotionNumber } = data;
  const invoiceNumber = invoice.NroFactura;

  await client.query(`ALTER SEQUENCE "Detalles_NroRenglon_seq" RESTART`);
  const resultServices = await client.query<{
    Cantidad: number;
    TotalParcial: number;
  }>(
    `
      INSERT INTO "Detalles" ("NroRenglon", "Descripcion", "Cantidad", "TotalParcial", "NroFactura", "NroServicio", "EsDescuento")
      SELECT nextval('"Detalles_NroRenglon_seq"') AS "NroRenglon", 
        ser."Nombre" AS "Descripcion",
        1 AS "Cantidad",
        CASE 
          WHEN extract(day from CURRENT_DATE) > 1 OR extract(day from CURRENT_DATE) < 28 THEN
            round((
              ser."Precio" *
              (
                extract(day from (
                  date_trunc('month', CURRENT_DATE)
                  + INTERVAL '1 month - 1 day'
                ))
                -
                extract(day from CURRENT_DATE)
              ) /
              extract(day from (
                date_trunc('month', CURRENT_DATE)
                + INTERVAL '1 month - 1 day'
              ))
            )::NUMERIC, 2)
          ELSE
            ser."Precio"
        END AS "TotalParcial",
        $1 AS "NroFactura",
        ser."NroServicio" AS "NroServicio",
        false AS "EsDescuento"
      FROM (
        SELECT * FROM "Servicios"
        WHERE "NroServicio" IN(
          SELECT unnest($2::int[])
        )
      ) AS ser
      RETURNING "Cantidad", "TotalParcial"
    `,
    [invoiceNumber, servicesIds]
  );

  if (promotionNumber) {
    const contractNumber = invoice.NroContrato;

    const promotionDetails = await getValidPromotionFromContract(
      contractNumber,
      client
    );

    if (!promotionDetails || promotionDetails.length === 0) return;

    const totalPrice = resultServices.rows.reduce(
      (prevValue, currValue) =>
        prevValue + currValue.TotalParcial * currValue.Cantidad,
      0
    );

    await client.query(
      `
        INSERT INTO "Detalles" ("NroRenglon", "Descripcion", "Cantidad", "TotalParcial", "NroFactura", "NroServicio", "EsDescuento")
        SELECT nextval('"Detalles_NroRenglon_seq"') AS "NroRenglon",
          'Descuento por Promoción' AS "Descripcion",
          1 AS "Cantidad",
          round((($3 * prom."PorcentajeDto"::FLOAT) / 100)::NUMERIC, 2) AS "TotalParcial",
          $1 AS "NroFactura",
          null AS "NroServicio",
          true AS "EsDescuento"
        FROM (
          SELECT * FROM "Promociones"
          WHERE "NroPromocion" = $2
        ) AS prom
      `,
      [invoiceNumber, promotionNumber, totalPrice]
    );
  }
};

export const insertNewService = async (
  service: { name: string; price: string; hidden: boolean },
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ServiceSchema>(
    `
    INSERT INTO "Servicios" ("Nombre", "Precio", "Oculto")
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [service.name, service.price, service.hidden]
  );

  return result;
};

export const insertCableService = async (
  serviceNumber: number,
  isOptional: boolean,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
    INSERT INTO "Cable" ("NroServicio", "CantTvs", "Opcional")
    VALUES ($1, 1, $2)
  `,
    [serviceNumber, isOptional]
  );

  return result;
};

export const insertInternetService = async (
  serviceNumber: number,
  speed: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
    INSERT INTO "Internet" ("NroServicio", "Velocidad")
    VALUES ($1, $2)
  `,
    [serviceNumber, speed]
  );

  return result;
};

export const insertPromotion = async (
  data: PromotionFormValues,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<PromotionSchema>(
    `
    INSERT INTO "Promociones" ("Duracion", "PorcentajeDto")
    VALUES ($1, $2)
    RETURNING *
  `,
    [data.duration, data.discount]
  );

  return result;
};

export const insertServicesInPromotion = async (
  services: number[],
  promotionNumber: number,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
    INSERT INTO "ServiciosEnPromocion" ("NroServicio", "NroPromocion")
    SELECT unnest($1::int[]) as "NroServicio", $2 as "NroPromocion"
  `,
    [services, promotionNumber]
  );

  return result;
};
