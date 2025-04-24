import { db } from '../db.js';
import jwt from 'jsonwebtoken'; 

const SECRET_KEY = process.env.JWT_SECRET;
// Регистрация
export const registerClient = async (req, res) => {
  const { name, address, phone, password } = req.body;

  if (!name || !address || !phone || !password) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    await db.execute(
      "INSERT INTO clients (fioclient, address, phone, password) VALUES (?, ?, ?, ?)",
      [name, address, phone, password]
    );

    res.status(201).json({ message: "Регистрация успешна" });
  } catch (err) {
    console.error("Ошибка при регистрации:", err);
    res.status(500).json({ message: "Ошибка сервера при регистрации" });
  }
};


// Вход
export const loginClient = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM clients WHERE phone = ?', [phone]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Клиент не найден' });
    }

    const client = rows[0];

    // Простейшая проверка пароля
    if (client.password !== password) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    // Генерация JWT
    const token = jwt.sign({ id: client.idClients }, process.env.JWT_SECRET, { 
      expiresIn: '10h',
    });

    res.json({ message: 'Вход успешен', token });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

