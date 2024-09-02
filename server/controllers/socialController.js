import bcrypt from 'bcrypt';
import Social from '../models/socialModel.js';

export const getSocial = async (req, res) => {
  try {
    const social = await Social.find();
    res.json(social);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSocial = async (req, res) => {
  const newSocial = new Social(req.body);
  try {
    await newSocial.save();
    res.status(201).json(newSocial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSocial = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedSocial = await Social.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(updatedSocial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSocial = async (req, res) => {
  const { id } = req.params;
  try {
    await Social.findOneAndDelete({ id });
    res.json({ message: 'Social Media Manager deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
