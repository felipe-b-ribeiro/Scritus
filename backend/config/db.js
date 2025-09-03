import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  host: process.env.BD_HOST,
  port: +process.env.BD_PORTA || 5432,
  database: process.env.BD_NOME,
  user: process.env.BD_USUARIO,
  password: process.env.BD_SENHA,
});

const connectToDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    return client;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

export default connectToDatabase;