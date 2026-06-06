import express from "express";
import { upload } from "../config/multer.js";
import {
  createUser,
  deleteUser,
  findUserbyInfo,
  pullDataUser,
  puxarPerfilController,
  updateUser,
} from "../controllers/userController.js";
import { autenticarToken } from "../middleware/autenticarJWT.js";

const router = express.Router();

router.post("/usuarios", createUser);
router.post("/usuarios/verificar-disponibilidade", findUserbyInfo);
router.post("/usuarios/puxardados", pullDataUser);
router.patch("/usuarios", upload.single("foto_perfil"), updateUser);
router.delete("/usuarios", autenticarToken, deleteUser);
router.get("/usuarios/perfil/:id_perfil", puxarPerfilController);

export default router;
