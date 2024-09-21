import isAuthenticated from '../middleware/isAuthenticated.js';
import express from 'express'
const router=express.Router();
import { sendMessage,getMessage,giveOpenAiResponse } from '../controllers/messageController.js';

router.post('/send/:id',isAuthenticated, sendMessage)
router.get('/:id',isAuthenticated,getMessage);
router.post('/openai',giveOpenAiResponse);

export default router;