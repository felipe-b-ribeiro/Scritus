import argon2 from "argon2";
import db from "../config/db.js";

const FAKE_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$MTIzNDU2Nzg5MGFiY2RlZg$hOq6Q8l0QJ6h0Wb0H3z5Lg";

export const authUserRepository = async (email, senha) => {
  const client = await db.connect();

  try {
    const query =
      "SELECT senha_hash, tipo_usuario from usuarios where email = $1";
    const resposta = await client.query(query, [email]);

    const senhaHash = resposta.rows[0]?.senha_hash || FAKE_HASH;

    const verificado = await argon2.verify(senhaHash, senha);

    if (!verificado) return false;

    const tipoUsuario = resposta.rows[0].tipo_usuario;

    let tabela, sigla, campoBanco;

    switch (tipoUsuario) {
      case "Leitor":
        tabela = "perfil_leitor";
        sigla = "pl";
        campoBanco = "pl.apelido";
        break;
      case "Autor":
        tabela = "perfil_autor";
        sigla = "pa";
        campoBanco = "pa.nome_autor";
        break;
      case "Editora":
        tabela = "perfil_editora";
        sigla = "pe";
        campoBanco = "pe.nome_fantasia";
    }

    const queryPayload = `
    SELECT ${campoBanco}, u.id_usuario, p.id_perfil
    FROM usuarios u
    JOIN perfis p ON u.id_usuario = p.id_usuario
    JOIN ${tabela} ${sigla} ON p.id_perfil = ${sigla}.id_perfil
    WHERE email = $1`;

    const { rows } = await client.query(queryPayload, [email]);
    const nome = rows[0][Object.keys(rows[0])[0]];

    const payload = {
      tipoUsuario: tipoUsuario,
      email: email,
      nome: nome,
      id_usuario: rows[0].id_usuario,
      id_perfil: rows[0].id_perfil,
    };

    return payload;
  } catch (err) {
    console.error("[AUTH USER REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};
