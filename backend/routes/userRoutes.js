import express from 'express';
import { createUser, findUserbyInfo } from '../controllers/userController.js';

const router = express.Router();

router.post ('/usuarios', createUser);
router.post ('/usuarios/verificar-disponibilidade', findUserbyInfo);

export default router;