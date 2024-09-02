import express from 'express';
import {
  getServices,
  createService,
  createTask,
  getTasks,
  deleteService,
  deleteTask
} from '../controllers/servicesController.js';

const router = express.Router();

router.get('/get', getServices);
router.post('/create', createService);
router.post('/createtask', createTask);
router.get('/gettask', getTasks);
router.delete('/delete/:id', deleteService);
router.delete('/deletetask/:id', deleteTask);

export default router;
