import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;


export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Нет токена' });

  jwt.verify(token, SECRET_KEY, (err, client) => {
    if (err) return res.status(403).json({ error: 'Неверный токен' });

    req.client = client;
    next();
  });
};
