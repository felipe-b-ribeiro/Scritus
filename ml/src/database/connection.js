import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Cria um pool de conexões
const pool = new Pool({
  host: process.env.BD_HOST,
  port: +process.env.BD_PORTA || 5432,
  database: process.env.BD_NOME,
  user: process.env.BD_USUARIO,
  password: process.env.BD_SENHA,
});

// Função para retornar o pool
const conectarBanco = async () => {
  try {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    return pool;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};

// Fecha todas as conexões do pool
const closePool = async () => {
  try {
    await pool.end();
    console.log("Conexões com o banco de dados encerradas.");
  } catch (error) {
    console.error("Erro ao encerrar conexões com o banco:", error);
  }
};

export { closePool, conectarBanco, pool };
