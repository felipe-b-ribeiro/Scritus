import fs from "node:fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    let folder = "uploads/";

    if (file.fieldname === "pdf") folder += "pdfs/";
    else if (file.fieldname === "capa") folder += "capas/";
    else if (file.fieldname === "foto_perfil") folder += "fotos_perfis/";

    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
