import 'dotenv';

export const infoBanco = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'seu_banco',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'senha',
  max: parseInt(process.env.DB_MAX_CONNECTIONS) || 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};