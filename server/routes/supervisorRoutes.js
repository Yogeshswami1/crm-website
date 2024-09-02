import express from 'express';
import { getSupervisors, createSupervisor, updateSupervisor, deleteSupervisor } from '../controllers/supervisorController.js';

const router = express.Router();

router.get('/', getSupervisors);
router.post('/', createSupervisor);
router.put('/:id', updateSupervisor);
router.delete('/:id', deleteSupervisor);

export default router;