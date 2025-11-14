import express from 'express';
import { criarObraController, listarObrasPorAutorController, deletarObraController, puxarTodasObrasController, puxarObraPorIdController} from '../controllers/obraController.js'
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
  '/obra/autor/:autorId',
  listarObrasPorAutorController
)
router.delete('/obra/:obraId', autenticarToken, deletarObraController);
router.get('/obra', puxarTodasObrasController);
router.get('/obra/:obraId', puxarObraPorIdController);

export default router;