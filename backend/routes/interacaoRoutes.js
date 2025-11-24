import express from 'express';
import { criarInteracaoController, deletarInteracaoController, listarInteracoesPorIdController } from '../controllers/interacaoController.js'

const router = express.Router();

router.post('/interacao', criarInteracaoController );
router.delete('/interacao', deletarInteracaoController );
router.post('/interacao-por-id', listarInteracoesPorIdController )

export default router;