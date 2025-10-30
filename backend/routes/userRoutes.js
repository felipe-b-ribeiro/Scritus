import express from 'express';
import { createUser, findUserbyInfo, pullDataUser } from '../controllers/userController.js';

const router = express.Router();

router.post ('/usuarios', createUser);
router.post ('/usuarios/verificar-disponibilidade', findUserbyInfo);
router.post ('/usuarios/puxardados', pullDataUser);

export default router;