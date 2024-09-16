import express from 'express';
import { createTimesheet, getTimesheetsByEnrollmentId, updateTimesheet, deleteTimesheet } from '../controllers/timesheetController.js';

const router = express.Router();

// Route to create a timesheet
router.post('/create', createTimesheet);

// Route to get timesheets by managerId
router.get('/:enrollmentId', getTimesheetsByEnrollmentId);

// Route to update a timesheet
router.put('/:id', updateTimesheet);

// Route to delete a timesheet
router.delete('/:id', deleteTimesheet);

export default router;
