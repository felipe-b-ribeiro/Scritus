import jwt from "jsonwebtoken";

export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token ausente." });

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.user = usuario;
    next();
  } catch (err) {
    res.status(403).json({ erro: "Token inválido ou expirado." });
  }
};
