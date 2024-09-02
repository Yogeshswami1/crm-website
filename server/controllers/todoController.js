import Todo from '../models/todoModel.js';
import Manager from '../models/managerModel.js';

// Get all todos for a specific manager by manager ObjectId
export const getTodos = async (req, res) => {
  const { managerId } = req.params;
  try {
    const manager = await Manager.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const todos = await Todo.find({ managerId: manager._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch todos' });
  }
};

// Create a new todo for a specific manager by manager ObjectId
export const createTodo = async (req, res) => {
  const { managerId } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const manager = await Manager.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const todo = new Todo({
      managerId: manager._id,
      title,
      description,
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to create todo' });
  }
};

// Update a specific todo by todo ID and manager ObjectId
export const updateTodo = async (req, res) => {
  const { managerId, id } = req.params;

  try {
    const manager = await Manager.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, managerId: manager._id },
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to update todo' });
  }
};

// Delete a specific todo by todo ID and manager ObjectId
export const deleteTodo = async (req, res) => {
  const { managerId, id } = req.params;

  try {
    const manager = await Manager.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, managerId: manager._id });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to delete todo' });
  }
};
