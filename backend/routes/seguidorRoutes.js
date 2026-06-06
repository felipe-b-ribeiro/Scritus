import express from "express";
import {
  criarSeguidorController,
  deletarSeguidorController,
  verificarSeSegueController,
} from "../controllers/seguidorController.js";

const router = express.Router();

router.post("/seguidor", criarSeguidorController);
router.delete("/seguidor", deletarSeguidorController);
router.post("/seguidor/verificar", verificarSeSegueController);

export default router;
