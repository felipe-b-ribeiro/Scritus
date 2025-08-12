const db = require('../config/conexaoBanco');

async function criarLivro({ titulo, descricao, url_capa, url_arquivo, autor_id }) {
  const sql = `
    INSERT INTO livros (titulo, descricao, url_capa, url_arquivo, autor_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const valores = [titulo, descricao, url_capa, url_arquivo, autor_id ];
  const { rows } = await db.query(sql, valores);
  return rows[0];
}
module.exports = { criarLivro };
