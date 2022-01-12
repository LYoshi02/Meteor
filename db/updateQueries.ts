import { Pool, PoolClient } from "pg";
import { pool } from ".";
import { UserConfigFormValues } from "../types";

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

export const updateCustomer = async (
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
