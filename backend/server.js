import express from 'express';
import cors from 'cors';
import conexao from './config/db.js';

const app = express();

// middleware
app.use(cors())

app.use(express.json());

// criar usuário
app.post('/usuarios', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const client = await conexao();
        const result = await client.query('INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING *', [email, senha]);
        const novoUsuario = result.rows[0];
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// listar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const client = await conexao();
        const result = await client.query('SELECT * FROM usuarios order by id');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// listar usuário por id
app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await conexao();
        const result = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        const usuario = result.rows[0];

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// editar usuário
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

    try {
        const client = await conexao();
        const result = await client.query('UPDATE usuarios SET email = $1, senha = $2 WHERE id = $3 RETURNING *', [email, senha, id]);
        const usuarioAtualizado = result.rows[0];

        if (!usuarioAtualizado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await conexao();
        const result = await client.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        const usuarioDeletado = result.rows[0];

        if (!usuarioDeletado) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuarioDeletado);
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));