import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/"; // default

    // Define a pasta conforme o campo ou o tipo de arquivo
    if (file.fieldname === "pdf") folder += "pdfs/";
    else if (file.fieldname === "capa") folder += "capas/";
    else if (file.fieldname === "foto_perfil") folder += "fotos_perfis/";

    // Cria a pasta se não existir
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
