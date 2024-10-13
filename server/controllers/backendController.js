import bcrypt from 'bcrypt';
// import Backend from '../models/backendModel.js';
import Backend from '../models/backendModel.js';


export const getBackend = async (req, res) => {
 try {
   const backend = await Backend.find();
   res.json(backend);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
};


export const createBackend = async (req, res) => {
 const newBackend = new Backend(req.body);
 try {
   await newBackend.save();
   res.status(201).json(newBackend);
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
};


export const updateBackend = async (req, res) => {
 const { id } = req.params;
 try {
   if (req.body.password) {
     const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password, salt);
   }
   const updatedBackend = await Backend.findOneAndUpdate({ id }, req.body, { new: true });
   res.json(updatedBackend);
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
};


export const deleteBackend = async (req, res) => {
 const { id } = req.params;
 try {
   await Backend.findOneAndDelete({ id });
   res.json({ message: 'Backend deleted successfully' });
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
};



