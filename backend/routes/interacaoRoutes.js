import express from 'express';
import { criarInteracaoController, deletarInteracaoController } from '../controllers/interacaoController.js'

const router = express.Router();

router.post('/interacao', criarInteracaoController);
router.delete('/interacao', deletarInteracaoController);

export default router;