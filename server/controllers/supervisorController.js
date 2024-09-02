import bcrypt from 'bcrypt';
import Supervisor from '../models/supervisorModel.js';

export const getSupervisors = async (req, res) => {
  try {
    const supervisors = await Supervisor.find();
    res.json(supervisors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSupervisor = async (req, res) => {
  const newSupervisor = new Supervisor(req.body);
  try {
    await newSupervisor.save();
    res.status(201).json(newSupervisor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSupervisor = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedSupervisor = await Supervisor.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(updatedSupervisor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSupervisor = async (req, res) => {
  const { id } = req.params;
  try {
    await Supervisor.findOneAndDelete({ id });
    res.json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
