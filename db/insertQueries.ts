import { query } from "./index";
import {
  getContractByInvoiceNumber,
  getValidPromotionFromContract,
} from "./selectQueries";

interface User {
  dni: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  email: string;
  phone: string;
}

export const insertNewUser = async (user: User, password: string) => {
  const result = await query(
    `
          INSERT INTO "Clientes" ("Dni", "Nombre", "Apellido", "FechaNacimiento", "Direccion", 
            "Telefono", "CorreoElectronico", "Contrasena")
          VALUES ($1, $2, $3, $4, $5, $6, $7, crypt($8, gen_salt('bf')))
      `,
    [
      user.dni,
      user.firstName,
      user.lastName,
      user.birthDate,
      user.address,
      user.phone,
      user.email,
      password,
    ]
  );
  return result;
};

export const insertNewContract = async (
  dni: string,
  promotionNumber?: number
) => {
  const result = await query(
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
  contractNumber: any,
  services: any
) => {
  const result = await query(
    `
        INSERT INTO "ServiciosContratados" ("NroServicio", "NroContrato", "Cantidad")
        SELECT u.val, $1, 1
        FROM unnest(cast($2 as integer[])) AS u(val)
      `,
    [contractNumber, services]
  );
  return result;
};

export const insertInvoice = async (dni: string, contractNumber: number) => {
  const result = await query(
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
  invoiceNumber: number,
  servicesIds: number[],
  promotionNumber?: number
) => {
  await query(`ALTER SEQUENCE "Detalles_NroRenglon_seq" RESTART`);
  const resultServices = await query(
    `
      INSERT INTO "Detalles" ("NroRenglon", "Descripcion", "Cantidad", "TotalParcial", "NroFactura", "NroServicio", "EsDescuento")
      SELECT nextval('"Detalles_NroRenglon_seq"') AS "NroRenglon", 
        ser."Nombre" AS "Descripcion",
        1 AS "Cantidad",
        ser."Precio" AS "TotalParcial",
        $1 AS "NroFactura",
        ser."NroServicio" AS "NroServicio",
        false AS "EsDescuento"
      FROM (
        SELECT * FROM "Servicios"
        WHERE "NroServicio" IN(
          SELECT unnest($2::int[])
        )
      ) AS ser
      RETURNING "Cantidad", "TotalParcial";
    `,
    [invoiceNumber, servicesIds]
  );

  if (promotionNumber) {
    const contractData = await getContractByInvoiceNumber(invoiceNumber);
    const contractNumber = contractData[0].NroContrato;

    const promotionDetails = await getValidPromotionFromContract(
      contractNumber
    );

    if (!promotionDetails || promotionDetails.length === 0) return;

    const totalPrice = resultServices.rows.reduce(
      (prevValue, currValue) =>
        prevValue + currValue.TotalParcial * currValue.Cantidad,
      0
    );

    await query(
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
        RETURNING "Cantidad", "TotalParcial";
      `,
      [invoiceNumber, promotionNumber, totalPrice]
    );
  }
};
