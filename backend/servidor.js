const express = require('express');
const app = express();
require('dotenv').config();

const livrosRouter = require('./rotas/livros');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/livros', livrosRouter);

const PORTA = process.env.PORTA || 4000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
