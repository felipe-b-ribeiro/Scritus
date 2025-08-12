const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');
const { uploadCapa, uploadPDF } = require('../middlewares/uploadMiddleware');

router.post(
  '/livros',
  uploadCapa.fields([{ name: 'capa', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),
  livrosController.criarLivro
);

router.get('/livros', livrosController.listarLivros);

module.exports = router;
