import express from 'express';
import { createUser, getAllUsers, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post ('/cadastro', createUser);
router.get ('/listar', getAllUsers);
router.delete ('/deletar/:id', deleteUser);
router.patch ('/atualizar/:id', updateUser);

export default router;