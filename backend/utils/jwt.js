import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET =
  process.env.JWT_SECRET ||
  "5861ed87085d2b7df654d1d90d93b841b4fcb73fdf5fffbe42222224ea626414ec6325eb2fda0861079f638b0d78aa860cc98b3bb6708104edafc9a23e510288";

export const gerarToken = (payload) =>
  jwt.sign(payload, SECRET, { expiresIn: "24h" });

export const verificarToken = (token) => jwt.verify(token, SECRET);
