import db from '../config/db.js';

export const pullTagsRepository = async () => {
    const client = await db.connect();

    try {
        
        const query = `SELECT nome_tag from tags;`

        const tags = await client.query(query);

        return tags.rows;
    } catch (err) {
        console.error("[PULL TAGS REPOSITORY ERROR]: ", err);
        throw err;
    } finally {
        client.release();
    }
}