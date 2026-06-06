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

    let nome = "";

    switch (tipoMaiusculo) {
      case "Leitor": {
        nome = dados.nomeUsuario;
        const valoresPerfilLeitor = [
          idPerfil,
          nome,
          dados.dataNascimento,
        ];
        await client.query(
          "INSERT INTO perfil_leitor (id_perfil, apelido, data_nascimento) VALUES ($1, $2, $3)",
          valoresPerfilLeitor,
        );
        break;
      }
      case "Autor": {
        const pseudonimo = dados.pseudonimo || null;
        nome = dados.nomeCompleto;
        const valoresPerfilAutor = [
          idPerfil,
          pseudonimo,
          nome,
          dados.dataNascimento,
        ];
        await client.query(
          "INSERT INTO perfil_autor (id_perfil, pseudonimo, nome_autor, data_nascimento) VALUES ($1, $2, $3, $4)",
          valoresPerfilAutor,
        );
        break;
      }
      case "Editora": {
        const siteOficial = dados.siteOficial || null;
        nome = dados.nomeFantasia;
        const valoresPerfilEditora = [
          idPerfil,
          nome,
          dados.cnpj,
          siteOficial,
        ];
        await client.query(
          "INSERT INTO perfil_editora (id_perfil, nome_fantasia, cnpj, site_oficial) VALUES ($1, $2, $3, $4)",
          valoresPerfilEditora,
        );
        break;
      }
      default:
        throw new Error(`Tipo de usuário inválido: ${tipo}`);
    }

    await client.query("COMMIT");

    const payload = {
      tipoUsuario: tipoMaiusculo,
      email: dados.email,
      nome,
      id_usuario: idUsuario,
      id_perfil: idPerfil,
    };
    return payload;
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

    switch (tipoUsuario) {
      case "Leitor":
        tabela = "perfil_leitor";
        sigla = "pl";
        campos =
          "u.id_usuario, u.tipo_usuario, pl.apelido, pl.data_nascimento, pl.foto_perfil_url, pl.bio";
        break;
      case "Editora":
        tabela = "perfil_editora";
        sigla = "pe";
        campos =
          "u.id_usuario, u.tipo_usuario, pe.nome_fantasia, pe.site_oficial, pe.foto_perfil_url, pe.bio";
        break;
      case "Autor":
        tabela = "perfil_autor";
        sigla = "pa";
        campos =
          "u.id_usuario, pa.id_autor, u.tipo_usuario, pa.nome_autor, pa.pseudonimo, pa.data_nascimento, pa.foto_perfil_url, pa.bio";
        break;
    }

    const query =
      "SELECT " +
      campos +
      " from usuarios u JOIN perfis p ON u.id_usuario = p.id_usuario JOIN " +
      tabela +
      " " +
      sigla +
      " ON p.id_perfil = " +
      sigla +
      ".id_perfil WHERE email = $1";
    const resposta = await client.query(query, [email]);

    return resposta.rows[0];
  } catch (err) {
    console.error("[PULL USER DATA REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};

export const updateUserRepository = async (info) => {
  const client = await db.connect();

  try {
    const tipoUsuario = info.tipo_usuario;
    const email = info.email;

    const tabelas = {
      Leitor: "perfil_leitor",
      Autor: "perfil_autor",
      Editora: "perfil_editora",
    };

    const tabela = tabelas[tipoUsuario];

    const siglas = {
      Leitor: "pl",
      Autor: "pa",
      Editora: "pe",
    };

    const sigla = siglas[tipoUsuario];

    const campos = {
      Leitor:
        "apelido = $1, data_nascimento = $2, bio = $3, foto_perfil_url = $4",
      Autor:
        "nome_autor = $1, data_nascimento = $2, bio = $3, pseudonimo = $4, foto_perfil_url = $5",
      Editora:
        "nome_fantasia = $1, bio = $2, site_oficial = $3, foto_perfil_url = $4",
    };

    const valores = {
      Leitor: [
        info.nome_usuario,
        info.data_nascimento,
        info.bio,
        info.foto_perfil,
      ],
      Autor: [
        info.nome_autor,
        info.data_nascimento,
        info.bio,
        info.pseudonimo,
        info.foto_perfil,
      ],
      Editora: [
        info.nome_fantasia,
        info.bio,
        info.site_oficial,
        info.foto_perfil,
      ],
    };

    let campo, valor;

    if (info.foto_perfil === null) {
      // Remove apenas o trecho da foto no campo atual (string SQL)
      campo = campos[tipoUsuario].replace(
        /,\s*foto_perfil_url\s*=\s*\$\d+/,
        "",
      );

      // Remove o último valor da array de valores
      valor = valores[tipoUsuario].slice(0, -1);
    } else {
      campo = campos[tipoUsuario];
      valor = valores[tipoUsuario];
    }

    const query = `UPDATE ${tabela} AS ${sigla} SET ${campo} FROM  perfis p JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE ${sigla}.id_perfil = p.id_perfil AND u.email = '${email}'`;
    const { rows } = await client.query(query, valor);

    return rows[0];
  } catch (err) {
    console.error("[UPDATE USER REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};

export const deleteUserRepository = async (email) => {
  const client = await db.connect();

  try {
    const query = `DELETE FROM usuarios WHERE email = $1`;

    const resposta = client.query(query, [email]);

    return resposta;
  } catch (err) {
    console.error("[DELETE USER REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};

export const puxarPerfilRepository = async (idPerfil) => {
  const client = await db.connect();
  try {
    // Primeiro descobre o tipo de usuário
    const query = `
      SELECT u.tipo_usuario
      FROM perfis p
      JOIN usuarios u ON p.id_usuario = u.id_usuario
      WHERE p.id_perfil = $1
    `;
    const resposta = await client.query(query, [idPerfil]);
    const tipoUsuario = resposta.rows[0]?.tipo_usuario;

    let tabela, sigla, campos;

    switch (tipoUsuario) {
      case "Autor":
        tabela = "perfil_autor";
        sigla = "pa";
        campos = "pa.nome_autor AS nome_usuario, pa.id_autor, pa.pseudonimo";
        break;

      case "Leitor":
        tabela = "perfil_leitor";
        sigla = "pl";
        campos = "pl.apelido AS nome_usuario";
        break;

      case "Editora":
        tabela = "perfil_editora";
        sigla = "pe";
        campos = "pe.nome_fantasia AS nome_usuario, pe.cnpj, pe.site_oficial";
        break;
    }

    // Constrói lista de campos sem aliases para o GROUP BY
    const camposLista = campos
      .split(",")
      .map((c) => c.trim().replace(/ as .*/i, "")); // remove "AS algo"

    const groupBy = [
      `${sigla}.bio`,
      `${sigla}.criado_em`,
      `${sigla}.foto_perfil_url`,
      ...camposLista,
    ].join(", ");

    // Query final
    const query2 = `
      SELECT 
        ${sigla}.bio,
        ${sigla}.criado_em,
        ${sigla}.foto_perfil_url,
        COUNT(s.id_seguidor) AS seguidores,
        ${campos}
      FROM ${tabela} ${sigla}
      JOIN perfis p ON ${sigla}.id_perfil = p.id_perfil
      LEFT JOIN seguidores s ON s.id_seguido = p.id_perfil
      WHERE p.id_perfil = $1
      GROUP BY ${groupBy};
    `;

    const resposta2 = await client.query(query2, [idPerfil]);

    // Junta infos do primeiro SELECT com o segundo
    return Object.assign(resposta2.rows[0], resposta.rows[0]);
  } catch (err) {
    console.error("[PUXAR PERFIL REPOSITORY ERROR]: ", err);
    throw err;
  } finally {
    client.release();
  }
};
