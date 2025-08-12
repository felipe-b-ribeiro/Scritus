const multer = require('multer');
const path = require('path');

// Configuração para salvar capas
const storageCapas = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/capas'));
  },
  filename: (req, file, cb) => {
    const nomeArquivo = Date.now() + '-' + file.originalname;
    cb(null, nomeArquivo);
  }
});

// Configuração para salvar PDFs
const storagePDFs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/pdfs'));
  },
  filename: (req, file, cb) => {
    const nomeArquivo = Date.now() + '-' + file.originalname;
    cb(null, nomeArquivo);
  }
});

const uploadCapa = multer({ storage: storageCapas });
const uploadPDF = multer({ storage: storagePDFs });

module.exports = { uploadCapa, uploadPDF };
