import { query } from "./index";

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

export const insertNewContract = async (dni: string, promotionNumber: any) => {
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
  services: number[],
  invoiceNumber: number
) => {};
