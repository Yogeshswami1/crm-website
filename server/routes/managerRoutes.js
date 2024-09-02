import express from 'express';
import {
  getManagers,
  createManager,
  updateManager,
  deleteManager,
  getActiveManagers,
  getManagerById,
  getContactsByManager
} from '../controllers/managerController.js';

const router = express.Router();

router.get('/get', getManagers);
router.get('/getcontact/:managerId', getContactsByManager);
router.post('/create', createManager);
router.get("/getactive", getActiveManagers);
router.get('/:id', getManagerById);
router.patch('/:id', updateManager);
router.delete('/:id', deleteManager);

export default router;
