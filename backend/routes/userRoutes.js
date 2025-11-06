import express from 'express';
import { createUser, findUserbyInfo, pullDataUser, updateUser } from '../controllers/userController.js';
import { upload } from "../config/multer.js";

const router = express.Router();

router.post ('/usuarios', createUser);
router.post ('/usuarios/verificar-disponibilidade', findUserbyInfo);
router.post ('/usuarios/puxardados', pullDataUser);
router.patch ('/usuarios', upload.single('foto_perfil'),  updateUser)

export default router;