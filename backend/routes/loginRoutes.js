import express from 'express';
import { authUser } from '../controllers/loginController.js'

const router = express.Router();

router.post('/login', authUser)

export default router;