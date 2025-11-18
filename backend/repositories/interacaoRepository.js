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
        const query = `
        DELETE FROM interacoes
        WHERE id_perfil = $1
        AND id_obra = $2
        AND tipo = $3
        `;
        const resposta = await client.query(query, [nomeTag])
        return rows.length > 0;
    } catch (err) {
        console.error('[DELETAR INTERACAO REPOSITORY ERROR]: ', err);
        throw err;
    } finally {
        client.release();
    }
}