import express from 'express';
import { createMessage, getChatHistory } from '../controllers/chatController.js';

const router = express.Router();

router.post('/send-message', createMessage);
router.get('/chat/history', getChatHistory);

export default router;
