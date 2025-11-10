import db from "../config/db.js";

export const criarObraRepository = async (obra) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const {
      id_autor,
      titulo,
      sinopse,
      trecho_de_amostra,
      status_obra,
      classificacao_indicativa,
      capa_url,
      pdf_url,
      tags,
    } = obra;

    const queryObra = `
      INSERT INTO obras (
        id_autor, titulo, sinopse, trecho_de_amostra,
        status_obra, classificacao_indicativa,
        capa_url, pdf_url
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id_obra;
    `;

    const result = await client.query(queryObra, [
      id_autor,
      titulo,
      sinopse,
      trecho_de_amostra,
      status_obra,
      classificacao_indicativa,
      capa_url,
      pdf_url,
    ]);

    const idObra = result.rows[0].id_obra;

    // Relaciona as tags (caso haja)
    if (tags && tags.length > 0) {
      const queryTag = `
        INSERT INTO obra_tags (id_obra, id_tag)
        SELECT $1, t.id_tag FROM tags t WHERE t.nome_tag = ANY($2);
      `;
      await client.query(queryTag, [idObra, tags]);
    }

    await client.query("COMMIT");

    return { id_obra: idObra, titulo, capa_url, pdf_url };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[CRIAR OBRA RESPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};

export const listarObrasPorAutorRepository = async (idAutor) => {
  const client = await db.connect();

  try {
    const query = `
      SELECT 
        id_obra,
        titulo,
        capa_url,
        pdf_url,
        status_obra,
        classificacao_indicativa
      FROM obras
      WHERE id_autor = $1
      ORDER BY id_obra DESC
    `;
    const result = await client.query(query, [idAutor]);
    return result.rows;
  } catch (err) {
    console.error("Erro no listarObrasPorAutorRepository:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const deletarObraRepository = async (obraId) => {
    const client = await db.connect();

    try {
        const query = "DELETE FROM obras WHERE id_obra = $1";
        await client.query(query, [obraId]);
        return true;
    } catch (err) {
        console.error("Erro no repository ao deletar obra:", err);
        throw err;
    } finally {
        client.release();
    }
};

export const puxarPdfPorIdRepository = async (id_obra) => {
  const client = await db.connect();
  try {
    const query = "SELECT pdf_url, capa_url FROM obras WHERE id_obra = $1";
    const { rows } = await client.query(query, [id_obra]);
    return rows[0]; 
  } finally {
    client.release();
  }
};
