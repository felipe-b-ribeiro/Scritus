import express from 'express';
import { pullTags } from '../controllers/tagsController.js'

const router = express.Router();

router.get('/tags', pullTags)

export default router;