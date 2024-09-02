import bcrypt from 'bcrypt';
import Accountant from '../models/accountantModel.js';

export const getAccountants = async (req, res) => {
  try {
    const accountants = await Accountant.find();
    res.json(accountants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAccountant = async (req, res) => {
  const newAccountant = new Accountant(req.body);
  try {
    await newAccountant.save();
    res.status(201).json(newAccountant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAccountant = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedAccountant = await Accountant.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(updatedAccountant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAccountant = async (req, res) => {
  const { id } = req.params;
  try {
    await Accountant.findOneAndDelete({ id });
    res.json({ message: 'Accountant deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
