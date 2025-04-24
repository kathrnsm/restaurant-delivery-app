import express from 'express';
import { registerClient, loginClient } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerClient);
router.post('/login', loginClient);

export default router;
