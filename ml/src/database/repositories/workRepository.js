import {conectarBanco} from '../connection.js';
import queries from '../queries.js';

/**
 * Busca todas as obras públicas
 * @returns {Promise<Array>}
 */
async function getAllWorks() {
  const pool = await conectarBanco();
  const result = await pool.query(queries.GET_WORKS);
  return result.rows;
}

export {getAllWorks};