import Service from '../models/servicesModel.js';
import Task from '../models/taskModel.js';

// Get all services with populated tasks
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate('tasks');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new service with optional tasks
export const createService = async (req, res) => {
  const { serviceName, prefix, platform, tasks } = req.body;
  try {
    const service = new Service({
      serviceName,
      prefix,
      platform
    });

    if (tasks && tasks.length > 0) {
      const taskDocs = await Task.insertMany(tasks.map(task => ({ task, serviceId: service._id })));
      service.tasks = taskDocs.map(taskDoc => taskDoc._id);
    }

    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new task associated with a service
export const createTask = async (req, res) => {
  const { serviceId, task } = req.body;

  // Validate the request body
  if (!task || !serviceId) {
    return res.status(400).json({ message: "Task and Service ID are required" });
  }

  try {
    const newTask = new Task({
      task,
      serviceId,
    });
    const savedTask = await newTask.save();

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    service.tasks.push(savedTask._id);
    await service.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a service and its associated tasks
    export const deleteService = async (req, res) => {
        const { id } = req.params;
        try {
          const service = await Service.findById(id);
          if (!service) {
            return res.status(404).json({ message: "Service not found" });
          }
      
          await Task.deleteMany({ serviceId: id });
          await Service.findByIdAndDelete(id);
      
          res.json({ message: "Service deleted successfully" });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

// Delete a task and update the associated service
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.remove();

    const service = await Service.findById(task.serviceId);
    service.tasks.pull(task._id);
    await service.save();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
