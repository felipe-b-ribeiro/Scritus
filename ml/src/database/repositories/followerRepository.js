import conectarBanco from '../connection.js';
import queries from '../queries.js';

/**
 * Busca relações de seguidores e organiza em Map
 * @returns {Promise<Map>} Map de perfil -> lista de autores seguidos
 */
async function getFollowersMap() {
  const pool = await conectarBanco();
  const result = await pool.query(queries.GET_FOLLOWERS);
  
  const followersMap = new Map();
  result.rows.forEach(row => {
    if (!followersMap.has(row.id_perfil)) {
      followersMap.set(row.id_perfil, []);
    }
    followersMap.get(row.id_perfil).push(row.id_autor);
  });
  
  return followersMap;
}

export {getFollowersMap};
