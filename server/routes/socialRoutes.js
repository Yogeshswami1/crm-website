import express from 'express';
import { getSocial, createSocial, updateSocial, deleteSocial } from '../controllers/socialController.js';

const router = express.Router();

router.get('/', getSocial);
router.post('/', createSocial);
router.put('/:id', updateSocial);
router.delete('/:id', deleteSocial);

export default router;