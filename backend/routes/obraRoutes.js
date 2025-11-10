import express from 'express';
import { criarObraController, listarObrasPorAutorController } from '../controllers/obraController.js'
import { upload } from "../config/multer.js";

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
  '/obra/:id_autor',
  listarObrasPorAutorController
)

export default router;