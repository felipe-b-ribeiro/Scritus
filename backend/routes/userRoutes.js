import express from 'express';
import { createUser, findUserbyInfo, pullDataUser, updateUser, deleteUser, puxarPerfilController } from '../controllers/userController.js';
import { upload } from "../config/multer.js";
import { autenticarToken } from '../middleware/autenticarJWT.js';

const router = express.Router();

router.post('/usuarios', createUser);
router.post('/usuarios/verificar-disponibilidade', findUserbyInfo);
router.get('/usuarios/perfil/:id_perfil', puxarPerfilController)
router.post('/usuarios/puxardados', pullDataUser);
router.patch('/usuarios', upload.single('foto_perfil'),  updateUser);
router.delete('/usuarios', autenticarToken, deleteUser);

export default router;