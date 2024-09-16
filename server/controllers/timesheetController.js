import Timesheet from '../models/timesheetModel.js';

// Create a new timesheet
export const createTimesheet = async (req, res) => {
  try {
    // Validate tasks and check if dates are valid
    const { enrollmentId, tasks } = req.body;

    const validatedTasks = tasks.map(task => {
      const { taskDate, dueDate, status, worked } = task;

      // Check if taskDate and dueDate are valid ISO date strings
      const isTaskDateValid = !isNaN(new Date(taskDate).getTime());
      const isDueDateValid = !isNaN(new Date(dueDate).getTime());

      if (!isTaskDateValid || !isDueDateValid) {
        throw new Error('Invalid date format for task or due date.');
      }

      // If valid, keep the task as is
      return {
        taskDate: new Date(taskDate), // Convert to Date object if necessary
        dueDate: new Date(dueDate),
        status,
        worked
      };
    });

    // Create a new timesheet with validated tasks
    const timesheet = new Timesheet({ enrollmentId, tasks: validatedTasks });

    // Save to the database
    await timesheet.save();

    res.status(201).json({ message: 'Timesheet created successfully', timesheet });
  } catch (error) {
    console.error('Error creating timesheet:', error.message);
    res.status(500).json({ message: 'Error creating timesheet', error: error.message });
  }
};


// Get all timesheets for a manager
export const getTimesheetsByEnrollmentId = async (req, res) => {
  const { enrollmentId } = req.params;

  if (!enrollmentId) {
    return res.status(400).json({ message: 'Enrollment ID is required' });
  }

  try {
    console.log(`Searching for timesheets with enrollmentId: ${enrollmentId}`);

    const timesheets = await Timesheet.find({ enrollmentId });

    if (timesheets.length === 0) {
      return res.status(404).json({ message: 'No timesheets found for this enrollment ID' });
    }

    res.status(200).json(timesheets);
  } catch (error) {
    console.error('Error fetching timesheets:', error);
    res.status(500).json({ message: 'Error fetching timesheets', error });
  }
};
// Update a timesheet
export const updateTimesheet = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTimesheet = await Timesheet.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Timesheet updated successfully', updatedTimesheet });
  } catch (error) {
    res.status(500).json({ message: 'Error updating timesheet', error });
  }
};

// Delete a timesheet
export const deleteTimesheet = async (req, res) => {
  const { id } = req.params;
  try {
    await Timesheet.findByIdAndDelete(id);
    res.status(200).json({ message: 'Timesheet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting timesheet', error });
  }
};
