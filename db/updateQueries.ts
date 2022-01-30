import { Pool, PoolClient } from "pg";
import { pool } from ".";
import {
  ContractSchema,
  InvoiceSchema,
  PromotionSchema,
  UserConfigFormValues,
  UserFormValues,
  ClientSchema,
  ServiceSchema,
} from "../types";

export const updateUser = async (
  user: {
    currentEmail: string;
    newEmail: string;
    password: string;
  },
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
        UPDATE "Usuarios"
        SET "CorreoElectronico" = $1,
            "Contrasena" = CASE 
                WHEN length($2::VARCHAR) > 0 THEN
                    crypt($2, gen_salt('bf'))
                ELSE
                    "Contrasena"
                END
        WHERE "CorreoElectronico" = $3
    `,
    [user.newEmail, user.password, user.currentEmail]
  );

  return result;
};

export const updateCustomerPartially = async (
  user: UserConfigFormValues,
  dni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
        UPDATE "Clientes"
        SET "Nombre" = $2, "Apellido" = $3, "Direccion" = $4, "Telefono" = $5, "CorreoElectronico" = $6
        WHERE "Dni" = $1
    `,
    [dni, user.firstName, user.lastName, user.address, user.phone, user.email]
  );

  return result;
};

export const updateCustomer = async (
  user: UserFormValues,
  currentDni: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ClientSchema>(
    `
        UPDATE "Clientes"
        SET "Nombre" = $2, "Apellido" = $3, "Direccion" = $4, "Telefono" = $5, "CorreoElectronico" = $6, "FechaNacimiento" = $7, "Dni" = $8 
        WHERE "Dni" = $1
        RETURNING *
    `,
    [
      currentDni,
      user.firstName,
      user.lastName,
      user.address,
      user.phone,
      user.email,
      user.birthDate,
      user.dni,
    ]
  );

  return result;
};

export const updateInvoiceStatus = async (
  invoiceNumber: string,
  isPaid: boolean,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<InvoiceSchema>(
    `
        UPDATE "Facturas"
        SET "FechaFacturacion" = CASE
          WHEN $2 IS TRUE THEN
            CURRENT_DATE
          ELSE
            NULL
          END
        WHERE "NroFactura" = $1::Integer
        RETURNING *
    `,
    [invoiceNumber, isPaid]
  );

  return result;
};

export const updateContractStatus = async (
  contractNumber: string,
  isFinished: boolean,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ContractSchema>(
    `
        UPDATE "Contratos"
        SET "FechaFin" = CASE
          WHEN $2 IS TRUE THEN
            CURRENT_DATE
          ELSE
            NULL
          END
        WHERE "NroContrato" = $1::Integer
        RETURNING *
    `,
    [contractNumber, isFinished]
  );

  return result;
};

export const updatePromotionStatus = async (
  promotionNumber: string,
  isFinished: boolean,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<PromotionSchema>(
    `
        UPDATE "Promociones"
        SET "Finalizado" = $2
        WHERE "NroPromocion" = $1::Integer
        RETURNING *
    `,
    [promotionNumber, isFinished]
  );

  return result;
};

export const updateService = async (
  serviceNumber: string,
  service: { name: string; price: string; hidden: boolean },
  client: PoolClient | Pool = pool
) => {
  const result = await client.query<ServiceSchema>(
    `
        UPDATE "Servicios"
        SET "Nombre" = $2, "Precio" = $3, "Oculto" = $4
        WHERE "NroServicio" = $1::Integer
        RETURNING *
    `,
    [serviceNumber, service.name, service.price, service.hidden]
  );

  return result;
};
