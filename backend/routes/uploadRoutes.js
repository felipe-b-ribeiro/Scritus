import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);

router.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

export default router;
