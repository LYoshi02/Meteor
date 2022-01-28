import { PoolClient } from "pg";

import { pool } from "../db";

export class Transaction {
  static async getClientInstance() {
    return await pool.connect();
  }

  static async start(client: PoolClient) {
    await client.query("BEGIN");
  }

  static async saveChanges(client: PoolClient) {
    await client.query("COMMIT");
  }

  static async removeChanges(client: PoolClient) {
    await client.query("ROLLBACK");
  }

  static releaseClient(client: PoolClient) {
    client.release();
  }
}
