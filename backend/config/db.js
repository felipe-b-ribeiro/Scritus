import { Pool } from 'pg';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  host: process.env.BD_HOST,
  port: +process.env.BD_PORTA || 5432,
  database: process.env.BD_NOME,
  user: process.env.BD_USUARIO,
  password: process.env.BD_SENHA,
});

export default pool;