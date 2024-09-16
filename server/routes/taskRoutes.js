import express from 'express';
const router = express.Router();
// import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/managerdashController.js';
import { getAllTasks , createTask , updateTask , deleteTask , updateStatus } from '../controllers/taskController.js';

// Routes
router.get('/get', getAllTasks);
router.post('/create', createTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.patch("/status/:id", updateStatus);


export default router;
