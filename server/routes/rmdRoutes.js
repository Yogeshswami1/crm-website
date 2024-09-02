import express from 'express';
import { getRmd, createRmd, updateRmd, deleteRmd } from '../controllers/rmdController.js';

const router = express.Router();

router.get('/', getRmd);
router.post('/', createRmd);
router.put('/:id', updateRmd);
router.delete('/:id', deleteRmd);

export default router;