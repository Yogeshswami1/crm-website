import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

const router = express.Router();

router.get('/:managerId', getTodos);
router.post('/:managerId', createTodo);
router.put('/:managerId/:id', updateTodo);
router.delete('/:managerId/:id', deleteTodo);

export default router;
