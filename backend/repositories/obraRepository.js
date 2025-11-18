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

export const listarObrasPorAutorRepository = async (autorId) => {
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
    const resposta = await client.query(query, [autorId]);
    return resposta.rows;
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

export const puxarTodasObrasRepository = async () => {
  const client = await db.connect();
  try {
    const query = `
      SELECT 
        o.id_obra,
        pa.nome_autor,
        pa.pseudonimo,
        o.titulo,
        o.capa_url,
        o.pdf_url,
        o.status_obra,
        o.classificacao_indicativa
      FROM obras o JOIN perfil_autor pa ON o.id_autor = pa.id_autor;
    `;
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    console.error("Erro no listarTodasObrasRepository:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const puxarObraPorIdRepository = async (obraId) => {
  const client = await db.connect();
  try {
    const query = `
    SELECT
    o.*,
    u.id_usuario,
    pa.nome_autor,
    pa.pseudonimo,
    pa.foto_perfil_url,
    COALESCE(
        array_agg(t.nome_tag) FILTER (WHERE t.nome_tag IS NOT NULL),
        '{}'
    ) AS tags
    FROM obras o
    JOIN perfil_autor pa ON o.id_autor = pa.id_autor
    JOIN perfis p ON pa.id_perfil = p.id_perfil
    JOIN usuarios u ON p.id_usuario = u.id_usuario
    LEFT JOIN obra_tags ot ON o.id_obra = ot.id_obra
    LEFT JOIN tags t ON ot.id_tag = t.id_tag
    WHERE o.id_obra = $1
    GROUP BY 
    o.id_obra,
    u.id_usuario,
    pa.id_autor,
    pa.nome_autor,
    pa.pseudonimo,
    pa.foto_perfil_url;

    `;
    const resposta = await client.query(query, [obraId]);
    return resposta.rows[0];
  } catch (err) {
    console.error('[PUXAR OBRA POR ID REPOSITORY ERROR]: ', err);
    throw err;
  } finally {
    client.release();
  }
}

export const puxarObrasPorNomeTagRepository = async (nomeTag) => {
  const client = await db.connect();
  try {
    const query = `
      SELECT 
      o.*,
      pa.nome_autor,
      pa.pseudonimo,
      pa.foto_perfil_url,
      COALESCE(array_agg(t.nome_tag), '{}') AS tags
      FROM obras o
      JOIN perfil_autor pa ON o.id_autor = pa.id_autor
      JOIN obra_tags ot ON o.id_obra = ot.id_obra
      JOIN tags t ON ot.id_tag = t.id_tag
      WHERE t.nome_tag = $1
      GROUP BY 
      o.id_obra,
      pa.nome_autor,
      pa.pseudonimo,
      pa.foto_perfil_url;
    `;

    const resposta = await client.query(query, [nomeTag]);
    console.log(resposta.rows);
    return resposta.rows;
  } catch (err) {
    console.log('[PUXAR OBRAS POR TAG REPOSITORY ERROR]:', err);
    throw err;
  } finally {
    client.release();
  }
}