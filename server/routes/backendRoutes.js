import express from 'express';
import { getBackend, createBackend, updateBackend, deleteBackend } from '../controllers/backendController.js';


const router = express.Router();


router.get('/', getBackend);
router.post('/', createBackend);
router.put('/:id', updateBackend);
router.delete('/:id', deleteBackend);


export default router;

