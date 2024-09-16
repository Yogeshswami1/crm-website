import Task from "../models/Task1.js";

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Create a task
export const createTask = async (req, res) => {
  const { enrollmentId, tasks } = req.body;
  try {
    const newTask = new Task({ enrollmentId, tasks });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { enrollmentId, tasks } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { enrollmentId, tasks }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Update task status
export const updateStatus = async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task status:', err);
    res.status(500).json({ error: 'Failed to update task status' });
  }
};
