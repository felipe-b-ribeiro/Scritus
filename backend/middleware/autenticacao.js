const jwt = require('jsonwebtoken');
require('dotenv').config();

function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ erro: 'Token ausente' });

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.SEGREDO_JWT);
    req.usuario = payload; // { id, email, ... }
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

module.exports = autenticar;