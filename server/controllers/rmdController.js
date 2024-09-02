import bcrypt from 'bcrypt';
import Rmd from '../models/rmdModel.js';

export const getRmd = async (req, res) => {
  try {
    const rmd = await Rmd.find();
    res.json(rmd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRmd = async (req, res) => {
  const newRmd = new Rmd(req.body);
  try {
    await newRmd.save();
    res.status(201).json(newRmd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRmd = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedRmd = await Rmd.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(updatedRmd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRmd = async (req, res) => {
  const { id } = req.params;
  try {
    await Rmd.findOneAndDelete({ id });
    res.json({ message: 'RMD deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
