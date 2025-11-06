import express from 'express';
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);

router.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

export default router;