const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.BD_HOST,
  port: +process.env.BD_PORTA || 5432,
  database: process.env.BD_NOME,
  user: process.env.BD_USUARIO,
  password: process.env.BD_SENHA,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};