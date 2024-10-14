// controllers/changesController.js
// import Change from '../models/Change.js';
import Change from "../models/changesModel.js"

// Fetch all changes
// export const getChangesByEnrollmentId = async (req, res) => {
//   const { enrollmentId } = req.params;
//   try {
//     const changes = await Change.find({ enrollmentId });
//     res.json(changes);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching changes' });
//   }
// };



export const getChangesByEnrollmentId = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const changes = await Change.find({ enrollmentId });
    if (!changes) {
      return res.status(404).json({ message: "No changes found for this enrollment ID." });
    }
    res.json(changes);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  const { serialNumber, managerPosition, changeStatus, changeDescription ,enrollmentId} = req.body;

  const newChange = new Change({
    serialNumber,
    managerPosition,
    changeStatus,
    changeDescription,
    enrollmentId 
  });

  try {
    const savedChange = await newChange.save();
    res.status(201).json(savedChange);
  } catch (error) {
    console.error("Error saving change:", error.message); // Log the error message
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
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

// Update change status



export const getChangesByContactIds = async (req, res) => {
  try {
    const contactIds = req.query.contactIds; // Extract contactIds from query parameters

    // Assuming you have a Change model and can filter by contactIds
    const changes = await Change.find({ contactId: { $in: contactIds.split(',') } }); // Find changes with matching contactIds

    if (changes.length === 0) {
      return res.status(404).json({ message: 'No changes found for the given contactIds' });
    }

    res.status(200).json(changes);
  } catch (error) {
    console.error('Error fetching changes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateChangeStatus = async (req, res) => {
  try {
    const updatedChange = await Change.findByIdAndUpdate(
      req.params.id,
      { changeStatus: 'Done' },
      { new: true }
    );
    res.json(updatedChange);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update change status' });
  }
};
