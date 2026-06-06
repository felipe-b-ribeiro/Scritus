import db from "../config/db.js";

export const puxarIdObraRecomendacoesRepository = async (
  idPerfil,
  _numRecommendations,
) => {
  const client = await db.connect();
  try {
    const query = `
        SELECT id_obra
        FROM recomendacoes_feed 
        WHERE id_perfil = $1
        ORDER BY peso DESC
        LIMIT 10;
        `;
    const ids = await client.query(query, [idPerfil]);
    return ids.rows;
  } catch (err) {
    console.error("[PUXAR ID OBRAS RECOMENDADAS REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};

export const deletarRecomendacoesPorIdRepository = async (idPerfil) => {
  const client = await db.connect();
  try {
    const query = `
            DELETE FROM recomendacoes_feed WHERE id_perfil = $1
        `;
    const resposta = await client.query(query, [idPerfil]);
    return resposta.rowCount > 0;
  } catch (err) {
    console.error("[DELETAR RECOMENDACOES REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};
