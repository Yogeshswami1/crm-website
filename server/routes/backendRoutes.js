import express from 'express';
import { getBackendUsers, createBackendUser, updateBackendUser, deleteBackendUser } from '../controllers/backendController.js';

const router = express.Router();

router.get('/', getBackendUsers);
router.post('/', createBackendUser);
router.put('/:id', updateBackendUser);
router.delete('/:id', deleteBackendUser);

export default router;
