import express from 'express';
import { createChange, getChangesByEnrollmentId, updateChange } from '../controllers/changesController.js';

const router = express.Router();

router.post('/changes', createChange);
router.get('/changes/:enrollmentId', getChangesByEnrollmentId);
router.put('/changes/:enrollmentId/:changeId', updateChange);

export default router;
