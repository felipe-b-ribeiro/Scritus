import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import loginRoutes from './routes/loginRoutes.js'

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

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));