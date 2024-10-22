import Batch from '../models/batchModel.js';


// Get all batches
export const getBatches = async (req, res) => {
 try {
   const batches = await Batch.find();
   res.status(200).json(batches);
 } catch (error) {
   res.status(500).json({ message: 'Server Error' });
 }
};


// Add a new batch
export const createBatch = async (req, res) => {
 try {
   const newBatch = new Batch(req.body);
   await newBatch.save();
   res.status(201).json(newBatch);
 } catch (error) {
   res.status(400).json({ message: 'Error creating batch' });
 }
};


// Update batch
export const updateBatch = async (req, res) => {
 try {
   const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.status(200).json(updatedBatch);
 } catch (error) {
   res.status(400).json({ message: 'Error updating batch' });
 }
};


// Delete batch
export const deleteBatch = async (req, res) => {
 try {
   await Batch.findByIdAndDelete(req.params.id);
   res.status(204).json();
 } catch (error) {
   res.status(400).json({ message: 'Error deleting batch' });
 }
};





