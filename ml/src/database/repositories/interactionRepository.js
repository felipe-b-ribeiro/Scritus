import {conectarBanco} from '../connection.js';
import queries from '../queries.js';

/**
 * Busca todas as interações do banco
 * @returns {Promise<Array>}
 */
async function getAllInteractions() {
  const pool = await conectarBanco();
  const result = await pool.query(queries.GET_INTERACTIONS);
  return result.rows;
}

export {getAllInteractions};