import bcrypt from 'bcrypt';
import BackendUser from '../models/backendModel.js';

export const getBackendUsers = async (req, res) => {
  try {
    const backendUsers = await BackendUser.find();
    res.json(backendUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBackendUser = async (req, res) => {
  const newBackendUser = new BackendUser(req.body);
  try {
    await newBackendUser.save();
    res.status(201).json(newBackendUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBackendUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedBackendUser = await BackendUser.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(updatedBackendUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBackendUser = async (req, res) => {
  const { id } = req.params;
  try {
    await BackendUser.findOneAndDelete({ id });
    res.json({ message: 'Backend User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
