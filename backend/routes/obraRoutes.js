import express from 'express';
import { criarObraController, listarObrasPorAutorController, deletarObraController, puxarPdfObraPorIdController } from '../controllers/obraController.js'
import { upload } from "../config/multer.js";
import { autenticarToken } from '../middleware/autenticarJWT.js';

const router = express.Router();

router.post(
  '/obra',
  upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  criarObraController
);
router.get(
  '/obra/:id',
  listarObrasPorAutorController
)
router.get('/obra/pdf/:id', autenticarToken, puxarPdfObraPorIdController)
router.delete('/obra/:id', autenticarToken, deletarObraController )

export default router;