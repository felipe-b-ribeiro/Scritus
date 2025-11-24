import { conectarBanco } from '../connection.js';
import queries from '../queries.js';

/**
 * Busca TODAS as interações (útil para o recommendForAllProfiles)
 */
async function getAllInteractions() {
  const pool = await conectarBanco();
  const result = await pool.query(queries.GET_INTERACTIONS);
  return result.rows;
}

/**
 * Busca todas as interações de um perfil e retorna somente ID das obras
 */
async function getInteractionsByProfile(profileId) {
  const pool = await conectarBanco();
  const result = await pool.query(
    `SELECT id_obra FROM interacoes WHERE id_perfil = $1`,
    [profileId]
  );
  
  return result.rows.map(row => row.id_obra);
}

async function getAllProfiles() {
  const pool = await conectarBanco();
  const result = await pool.query(`
    SELECT DISTINCT id_perfil 
    FROM interacoes
  `);
  return result.rows;
}

export { getAllInteractions, getInteractionsByProfile, getAllProfiles };

