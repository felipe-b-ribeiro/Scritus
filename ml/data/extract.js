// ml/data/extract.js
import conectarBanco from '../../backend/config/db.js'; // ajuste o caminho


export const getInteracoes = async () => {
  const pool = await conectarBanco();
  try {
    const res = await pool.query(`
      SELECT id_perfil, id_obra, tipo, conteudo
      FROM interacoes
    `);
    return res.rows;
  } catch (err) {
    console.error('Erro ao extrair interações:', err);
    throw err;
  } finally {
    pool.release(); // garante que a conexão seja liberada
  }
};
export const getObras = async () => {
  const pool = await conectarBanco();
  try {
    const res = await pool.query(`
      SELECT id_obra, titulo, id_autor, classificacao_indicativa
      FROM obras
      WHERE status_obra = 'Público'
    `);
    return res.rows;
  } catch (err) {
    console.error('Erro ao extrair obras:', err);
    throw err;
  } finally {
    pool.release();
  }
};
export const getObraTags = async () => {
  const pool = await conectarBanco();
  try {
    const res = await pool.query(`
      SELECT ot.id_obra, ot.id_tag, t.nome_tag
      FROM obra_tags ot
      JOIN tags t ON ot.id_tag = t.id_tag
    `);
    return res.rows;
  } catch (err) {
    console.error('Erro ao extrair tags das obras:', err);
    throw err;
  } finally {
    pool.release();
  }
};
export const getPerfisLeitores = async () => {
  const pool = await conectarBanco();
  try {
    const res = await pool.query(`
      SELECT p.id_perfil, pl.apelido, pl.data_nascimento
      FROM perfis p
      JOIN perfil_leitor pl ON pl.id_perfil = p.id_perfil
    `);
    return res.rows;
  } catch (err) {
    console.error('Erro ao extrair perfis de leitores:', err);
    throw err;
  } finally {
    pool.release();
  }
};
