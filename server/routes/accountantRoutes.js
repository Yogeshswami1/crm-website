import express from 'express';
import { getAccountants, createAccountant, updateAccountant, deleteAccountant } from '../controllers/accountantController.js';

const router = express.Router();

router.get('/', getAccountants);
router.post('/', createAccountant);
router.put('/:id', updateAccountant);
router.delete('/:id', deleteAccountant);

export default router;
