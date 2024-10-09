// controllers/changesController.js
// import Change from '../models/Change.js';
import Change from "../models/changesModel.js"

// Fetch all changes
export const getChangesByEnrollmentId = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const changes = await Change.find({ enrollmentId });
    res.json(changes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching changes' });
  }
};
// Fetch all changes
export const getAllChanges = async (req, res) => {
  try {
    const changes = await Change.find();
    res.json(changes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching changes' });
  }
};

// Create a new change
export const createChange = async (req, res) => {
  const { serialNumber, managerPosition, changeStatus, changeDescription } = req.body;

  const newChange = new Change({
    serialNumber,
    managerPosition,
    changeStatus,
    changeDescription,
  });

  try {
    const savedChange = await newChange.save();
    res.status(201).json(savedChange);
  } catch (error) {
    res.status(500).json({ message: 'Error saving change' });
  }
};

// Update an existing change
export const updateChange = async (req, res) => {
  const { id } = req.params;
  const { changeStatus } = req.body;

  try {
    const updatedChange = await Change.findByIdAndUpdate(id, { changeStatus }, { new: true });
    res.json(updatedChange);
  } catch (error) {
    res.status(500).json({ message: 'Error updating change' });
  }
};
