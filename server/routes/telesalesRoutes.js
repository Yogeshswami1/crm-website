import express from 'express';
import { getTelesales, createTelesales, updateTelesales, deleteTelesales } from '../controllers/telesalesController.js';

const router = express.Router();

router.get('/', getTelesales);
router.post('/', createTelesales);
router.put('/:id', updateTelesales);
router.delete('/:id', deleteTelesales);

export default router;