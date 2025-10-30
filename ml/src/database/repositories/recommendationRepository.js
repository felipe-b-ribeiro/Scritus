import conectarBanco from '../connection.js';
import queries from '../queries.js';

/**
 * Salva recomendações no banco de dados
 * @param {number} profileId 
 * @param {Array} recommendations 
 * @param {Object} parameters 
 */
async function saveRecommendations(profileId, recommendations, parameters = {}) {
  const client = await conectarBanco();

  try {
    await client.query('BEGIN');

    await client.query(queries.DELETE_RECOMMENDATIONS, [profileId]);

    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      console.warn(`[WARN] Nenhuma recomendação gerada para perfil ${profileId}`);
      await client.query('COMMIT');
      return;
    }

    for (const rec of recommendations) {
      if (!rec) continue;
      await client.query(queries.INSERT_RECOMMENDATION, [
        profileId,
        rec.id_obra,
        rec.peso,
        parameters.version || 'v1.0',
        JSON.stringify(parameters || {}),
      ]);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}


export{saveRecommendations};