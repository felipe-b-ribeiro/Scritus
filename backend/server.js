import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import tagsRoutes from './routes/tagsRoutes.js';
import obraRoutes from './routes/obraRoutes.js';
import interacaoRoutes from './routes/interacaoRoutes.js';
import seguidorRoutes from './routes/seguidorRoutes.js';

const app = express();

const destinosAutorizados = ['http://localhost:5173']

// middleware
app.use(cors({
  origin: destinosAutorizados,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

app.use('/api/v1/', userRoutes);
app.use('/api/v1/', loginRoutes);
app.use('/', uploadRoutes);
app.use('/api/v1/', tagsRoutes);
app.use('/api/v1/', obraRoutes);
app.use('/api/v1', interacaoRoutes);
app.use('/api/v1/', seguidorRoutes);

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));