import db from '../config/db.js';

export const criarInteracaoRepository = async (obj) => {
    const client = await db.connect();

    try {
        const { id_perfil, id_obra, tipo_interacao, conteudoParam } = obj;
        let conteudo;
        switch (tipo_interacao) {
            case 'curtida':
            case 'salvo':
            case 'clique':
                conteudo = null;
                break;

            case 'comentario':
                conteudo = conteudoParam;
                break;

            default:
                conteudo = null;
        }
        const query = `
        INSERT INTO interacoes (id_perfil, id_obra, tipo, conteudo)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
        const interacao = await client.query(query, [
            id_perfil,
            id_obra,
            tipo_interacao,
            conteudo
        ]);

        return interacao.rows;
    } catch (err) {
        console.error("[CRIAR INTERACAO REPOSITORY ERROR]: ", err);
        throw err;
    } finally {
        client.release();
    }
}

export const deletarInteracaoRepository = async (obj) => {
    const client = await db.connect();
    try {
        const { id_perfil, id_obra, tipo_interacao} = obj;
        const query = `
        DELETE FROM interacoes
        WHERE id_perfil = $1
        AND id_obra = $2
        AND tipo = $3
        `;
        await client.query(query, [id_perfil, id_obra, tipo_interacao])
        return true;
    } catch (err) {
        console.error('[DELETAR INTERACAO REPOSITORY ERROR]: ', err);
        return false;
    } finally {
        client.release();
    }
}

export const listarInteracoesPorIdRepository = async (obj) => {
    const client = await db.connect();
    try {
        const { id_perfil, id_obra } = obj;
        const query = `
        SELECT tipo 
        FROM interacoes 
        WHERE id_perfil = $1 
        AND id_obra = $2
        `;
        const interacoes = await client.query(query, [id_perfil, id_obra]);
        return interacoes.rows;
    } catch (err) {
        console.error('[LISTAR INTERACOES POR ID REPOSITORY ERROR]: ', err);
        throw err;
    } finally {
        client.release();
    }
}