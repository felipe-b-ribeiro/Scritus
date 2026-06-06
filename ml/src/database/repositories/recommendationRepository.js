import { pool } from "../connection.js";
import queries from "../queries.js";

/**
 * Retorna os IDs de obras já recomendadas recentemente ao perfil
 */
async function getRecentRecommendations(profileId) {
  const result = await pool.query(
    `
    SELECT id_obra
    FROM recomendacoes_feed
    WHERE id_perfil = $1
    ORDER BY criado_em DESC
    LIMIT 50
    `,
    [profileId],
  );

  return result.rows.map((r) => r.id_obra);
}

/**
 * Salva recomendações no banco de dados
 */
async function saveRecommendations(
  profileId,
  recommendations,
  parameters = {},
) {
  try {
    await pool.query("BEGIN");
    await pool.query(
      `DELETE FROM recomendacoes_feed
   WHERE id_perfil = $1
   AND criado_em < NOW() - INTERVAL '7 days'`,
      [profileId],
    );

    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      console.warn(
        `[WARN] Nenhuma recomendação gerada para perfil ${profileId}`,
      );
      await pool.query("COMMIT");
      return;
    }

    for (const rec of recommendations) {
      if (!rec) continue;
      await pool.query(queries.INSERT_RECOMMENDATION, [
        profileId,
        rec.id_obra,
        rec.peso,
        parameters.version || "v1.0",
        JSON.stringify(parameters || {}),
      ]);
    }

    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}

export { getRecentRecommendations, saveRecommendations };
