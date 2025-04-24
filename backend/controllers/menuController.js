import { db } from '../db.js';

export const getMenuItems = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT idpositions, name, price FROM positions');
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении меню:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

