import { Pool, PoolClient } from "pg";
import { pool } from ".";

export const deleteServiceById = async (
  serviceNumber: string,
  client: PoolClient | Pool = pool
) => {
  const result = await client.query(
    `
        DELETE FROM "Servicios"
        WHERE "NroServicio" = $1::Integer
    `,
    [serviceNumber]
  );

  return result;
};
