import pg from 'pg';
import env from 'dotenv';
const { Pool } = pg;

env.config();

export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process?.env?.DB_PORT) || 5432,
});
