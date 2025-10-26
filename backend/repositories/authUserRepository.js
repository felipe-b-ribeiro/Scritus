import db from "../config/db.js";
import argon2 from "argon2";

const FAKE_HASH = "$argon2id$v=19$m=65536,t=3,p=4$MTIzNDU2Nzg5MGFiY2RlZg$hOq6Q8l0QJ6h0Wb0H3z5Lg";

export const authUserRepository = async (email, senha) => {
  const client = await db.connect();

  try {
    const query = "SELECT senha_hash, tipo_usuario from usuarios where email = $1";
    const resposta = await client.query(query, [email]);

    const senhaHash = resposta.rows[0]?.senha_hash || FAKE_HASH;

    const verificado = await argon2.verify(senhaHash, senha);
    
    if (!verificado) return false;

    const tipoUsuario =  resposta.rows[0].tipo_usuario;

    let tabela, sigla, campoBanco;

    switch (tipoUsuario) {
      case 'Leitor':
        tabela = 'perfil_leitor';
        sigla = 'pl';
        campoBanco = 'pl.apelido';
        break;
      case 'Autor':
        tabela = 'perfil_autor';
        sigla = 'pa';
        campoBanco = 'pa.nome_autor';
        break;
      case 'Editora':
        tabela = 'perfil_editora';
        sigla = 'pe';
        campoBanco = 'pe.nome_fantasia';
    }

    const queryPayload = "SELECT " + campoBanco + " from usuarios u join perfis p on u.id_usuario = p.id_usuario join " + tabela + " " + sigla + " on p.id_perfil = " + sigla + ".id_perfil where email=$1";

    const respostaNome = await client.query(queryPayload, [email]);
    const nome = respostaNome.rows[0][Object.keys(respostaNome.rows[0])[0]];
    
    const payload = {
      "tipoUsuario": tipoUsuario,
      "email": email,
      "nome": nome
    }

    return payload;
  } 
  catch (err) {
    console.error("[AUTH USER REPOSITORY ERROR]: ", err);
    throw err;
  } 
  finally {
    client.release();
  }
};
