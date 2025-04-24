import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Загрузка переменных из .env
dotenv.config();

// Настройки для __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', menuRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
