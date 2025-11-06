import pool from './connection.js';
import { logger } from '../utils/logger.js';
import { saveRecommendations } from './database/saveRecommendations.js';


export async function saveRecommendations(
  idPerfil,
  recommendations,
  algoritmoVersao = 'v1.0',
  parametros = {}
) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Remove recomendações antigas do mesmo perfil
    await client.query(
      `DELETE FROM recomendacoes_feed WHERE id_perfil = $1`,
      [idPerfil]
    );

    // Insere novas recomendações
    const insertQuery = `
      INSERT INTO recomendacoes_feed
        (id_perfil, id_obra, peso, algoritmo_versao, parametros)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const rec of recommendations) {
      await client.query(insertQuery, [
        idPerfil,
        rec.id_obra,
        rec.peso,
        algoritmoVersao,
        JSON.stringify(parametros)
      ]);
    }

    await client.query('COMMIT');
    logger.info(`${recommendations.length} recomendações salvas para o perfil ${idPerfil}`);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Erro ao salvar recomendações:', error);
    throw error;
  } finally {
    client.release();
  }
  const recommendations = await recommendForProfile(profileId, numRecommendations);

await saveRecommendations(profileId, recommendations, 'v1.0', {
  metodo: 'colaborativo',
  numRecs: numRecommendations
});
const allRecs = await recommendForAllProfiles();

for (const { id_perfil, recommendations } of allRecs) {
  await saveRecommendations(id_perfil, recommendations, 'v1.0');
}

}
