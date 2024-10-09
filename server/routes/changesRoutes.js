// routes/changeRoutes.js
import express from 'express';
import { createChange, getChangesByEnrollmentId, updateChange ,getAllChanges} from '../controllers/changesController.js';

const router = express.Router();

// POST a new change
router.post('/', createChange);
router.get('/', getAllChanges); // <-- New route for fetching all changes

// GET changes by enrollment ID
router.get('/:enrollmentId', getChangesByEnrollmentId);

// PUT to update an existing change
router.put('/:id', updateChange);

export default router;
