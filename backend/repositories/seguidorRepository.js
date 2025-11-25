import db from '../config/db.js';

export const criarSeguidorRepository = async (idPerfilSeguidor, idPerfilSeguido) => {
    const client = await db.connect();
    try {
        const query = `
            INSERT INTO seguidores (id_seguidor, id_seguido)
            VALUES ($1, $2);
        `;
        const seguidor = await client.query(query, [idPerfilSeguidor, idPerfilSeguido]);
        return seguidor;
    } catch (err) {
        console.error('[CRIAR SEGUIDOR REPOSITORY ERROR]: ', err);
        throw err;
    } finally {
        client.release();
    }
}

export const deletarSeguidorRepository = async (idPerfilSeguidor, idPerfilSeguido) => {
    const client = await db.connect();
    try {
        const query = `
            DELETE FROM seguidores WHERE id_seguidor = $1 AND id_seguido = $2
        `;
        const seguidor = await client.query(query, [idPerfilSeguidor, idPerfilSeguido]);
        return seguidor;
    } catch (err) {
        console.error('[DELETAR SEGUIDOR REPOSITORY ERROR]: ', err);
        throw err;
    } finally {
        client.release();
    }
}

export const verificarSeSegueRepository = async (id_seguidor, id_seguido) => {
    const client = await db.connect();
    try {
        const query = `
            SELECT 1 FROM seguidores WHERE id_seguidor = $1 AND id_seguido = $2 LIMIT 1
        `;
        const { rowCount } = await client.query(query, [id_seguidor, id_seguido]);
        return rowCount > 0;
    } catch (err) {
        console.error('[VER SE SEGUE REPOSITORY ERROR]: ', err);
        throw err;
    } finally {
        client.release();
    }
}