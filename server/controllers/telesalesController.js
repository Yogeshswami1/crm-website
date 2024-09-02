import bcrypt from 'bcrypt';
import Telesales from '../models/telesalesModel.js';

export const getTelesales = async (req, res) => {
  try {
    const telesales = await Telesales.find();
    res.json(telesales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTelesales = async (req, res) => {
  const newTelesales = new Telesales(req.body);
  try {
    await newTelesales.save();
    res.status(201).json(newTelesales);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTelesales = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedTelesales = await Telesales.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(updatedTelesales);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTelesales = async (req, res) => {
  const { id } = req.params;
  try {
    await Telesales.findOneAndDelete({ id });
    res.json({ message: 'Telesales deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
