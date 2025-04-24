import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { authenticateToken } from '../routes/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createOrder);

export default router;