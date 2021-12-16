import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

export async function query<T = any>(text: string, params?: any[]) {
  return await pool.query<T>(text, params);
}
