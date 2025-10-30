import db from "../config/db.js";

export const criarUsuarioRepository = async (usuario) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const { tipo, dados } = usuario;

    const tipoMaiusculo = tipo[0].toUpperCase() + tipo.substr(1);

    const queryUser =
      "INSERT INTO usuarios (email, senha_hash, tipo_usuario) VALUES ($1, $2, $3) RETURNING id_usuario";
    const valoresUser = [dados.email, dados.senha, tipoMaiusculo];

    const respostaUser = await client.query(queryUser, valoresUser);

    const idUsuario = respostaUser.rows[0].id_usuario;

    const queryPerfil =
      "INSERT INTO perfis (id_usuario) VALUES ($1) RETURNING id_perfil";

    const respostaPerfil = await client.query(queryPerfil, [idUsuario]);

    const idPerfil = respostaPerfil.rows[0].id_perfil;

    switch (tipoMaiusculo) {
      default:
        throw new Error(`Tipo de usuário inválido: ${tipo}`);
      case "Leitor":
        const valoresPerfilLeitor = [
          idPerfil,
          dados.nomeUsuario,
          dados.dataNascimento,
        ];
        await client.query(
          "INSERT INTO perfil_leitor (id_perfil, apelido, data_nascimento) VALUES ($1, $2, $3)",
          valoresPerfilLeitor
        );
        break;
      case "Autor":
        const pseudonimo = dados.pseudonimo || null;
        const valoresPerfilAutor = [
          idPerfil,
          pseudonimo,
          dados.nomeCompleto,
          dados.dataNascimento,
        ];
        await client.query(
          "INSERT INTO perfil_autor (id_perfil, pseudonimo, nome_autor, data_nascimento) VALUES ($1, $2, $3, $4)",
          valoresPerfilAutor
        );
        break;
      case "Editora":
        const siteOficial = dados.siteOficial || null;
        const valoresPerfilEditora = [
          idPerfil,
          dados.nomeFantasia,
          dados.cnpj,
          siteOficial,
        ];
        await client.query(
          "INSERT INTO perfil_editora (id_perfil, nome_fantasia, cnpj, site_oficial) VALUES ($1, $2, $3, $4)",
          valoresPerfilEditora
        );
        break;
    }

    await client.query("COMMIT");

    return {
      idUsuario,
      idPerfil,
      tipoMaiusculo,
      dados: usuario.dados,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[USER REPOSITORY ERROR]:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const encontrarUsuarioPorInfoRepository = async (info) => {
  const client = await db.connect();

  try {
    const campo = Object.keys(info)[0];
    const valor = Object.values(info)[0];

    let tabela, campoBanco;

    switch (campo) {
      case "email":
        tabela = "usuarios";
        campoBanco = "email";
        break;

      case "cnpj":
        tabela = "perfil_editora";
        campoBanco = "cnpj";
        break;

      case "nomeUsuario":
        tabela = "perfil_leitor";
        campoBanco = "apelido";
        break;

      default:
        throw new Error(`Campo '${campo}' não é válido para verificação.`);
    }

    const query = `SELECT 1 FROM ${tabela} WHERE ${campoBanco} = $1 LIMIT 1`;
    const resposta = await client.query(query, [valor]);

    return !(resposta.rows.length > 0); // true se já existe, false se está livre
  } catch (err) {
    console.error("[USER REPOSITORY ERROR]:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const pullDataUserRepository = async (info) => {
  const client = await db.connect();

  try {
    
    const email = info.email;
    const tipoUsuario = info.tipoUsuario;

    let tabela, campos, sigla;

    switch(tipoUsuario) {
      case "Leitor":
        tabela = "perfil_leitor pl";
        sigla = "pl";
        campos = "pl.apelido, pl.data_nascimento, pl.foto_perfil_url, pl.bio";
      case "Editora":
        tabela = "perfil_editora"
        sigla = "pe";
        campos = "pe.nome_fantasia, pe.site_oficial, pe.foto_perfil_url, pe.bio";
      case "Autor":
        tabela = "perfil_autor";
        sigla = "pa";
        campos = "pa.nome_autor, pa.pseudonimo, pa.data_nascimento, pa.foto_perfil_url, pa.bio";
    }
    
    const query = "SELECT " + campos + " from usuarios u JOIN perfis p ON u.id_usuario = p.id_usuario JOIN " + tabela + " " + sigla + " ON p.id_perfil = " + sigla + ".id_perfil WHERE email = $1";
    const resposta = client.query(query, [email]);

    return resposta;

  } catch (err) {
    console.error("[PULL USER DATA REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
}