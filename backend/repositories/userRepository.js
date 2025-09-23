import db from '../config/db.js'

export const criarUsuarioRepository = async (usuario) => {

    const client = await db();

    try {

    await client.query("BEGIN");

    const { tipo, dados } = usuario;
    
    const tipoMaiusculo = tipo[0].toUpperCase() + tipo.substr(1);

    const queryUser = "INSERT INTO usuarios (email, senha_hash, tipo_usuario) VALUES ($1, $2, $3) RETURNING id_usuario"
    const valoresUser = [dados.email, dados.senha, tipoMaiusculo];

    const respostaUser = await client.query(queryUser, valoresUser);

    const idUsuario = respostaUser.rows[0].id_usuario;
    
    const queryPerfil = "INSERT INTO perfis (id_usuario) VALUES ($1) RETURNING id_perfil";
    
    const respostaPerfil = await client.query(queryPerfil, [idUsuario])
    
    const idPerfil = respostaPerfil.rows[0].id_perfil

    switch (tipoMaiusculo) {
        default:
            throw new Error(`Tipo de usuário inválido: ${tipo}`);
        case 'Leitor':
                const valoresPerfilLeitor = [idPerfil, dados.nomeUsuario, dados.dataNascimento];
                await client.query("INSERT INTO perfil_leitor (id_perfil, apelido, data_nascimento) VALUES ($1, $2, $3)", valoresPerfilLeitor );
                break;
        case 'Autor':
                const pseudonimo = dados.pseudonimo || null;
                const valoresPerfilAutor = [idPerfil, pseudonimo, dados.nomeCompleto, dados.dataNascimento];
                await client.query("INSERT INTO perfil_autor (id_perfil, pseudonimo, nome_autor, data_nascimento) VALUES ($1, $2, $3, $4)", valoresPerfilAutor);
                break;
        case 'Editora':
                const siteOficial = dados.siteOficial || null;
                const valoresPerfilEditora = [idPerfil, dados.nomeFantasia, dados.cnpj, siteOficial ];
                await client.query("INSERT INTO perfil_editora (id_perfil, nome_fantasia, cnpj, site_oficial) VALUES ($1, $2, $3, $4)", valoresPerfilEditora);
                break;
    }

    await client.query("COMMIT");

    return {
        idUsuario,
        idPerfil,
        tipoMaiusculo,
        dados: usuario.dados
    }

    }
    catch (err) {
        await client.query("ROLLBACK");
        console.error('[REPOSITORY ERROR]:', err);
        throw err;
    }
    finally {
        client.release();
    }
}

