import db from "../config/db.js";

export const pullTagsRepository = async () => {
  const client = await db.connect();

  try {
    const query = `SELECT nome_tag from tags;`;

    const tags = await client.query(query);

    return tags.rows;
  } catch (err) {
    console.error("[PULL TAGS REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};

export const buscarTagPorNomeRepository = async (nomeTag) => {
  const client = await db.connect();
  try {
    const query = `
        SELECT 1
        FROM tags
        WHERE nome_tag = $1
        LIMIT 1
        `;
    const { rows } = await client.query(query, [nomeTag]);
    return rows.length > 0;
  } catch (err) {
    console.error("[BUSCAR TAG POR NOME REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};
