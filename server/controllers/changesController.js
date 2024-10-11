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
  const { enrollmentId } = req.params; // Extracting enrollment ID from request parameters
  try {
    const changes = await Change.find({ enrollmentId }); // Fetch changes based on enrollment ID

    // Check if changes are found
    if (!changes || changes.length === 0) {
      return res.status(404).json({ message: 'No changes found for the provided enrollment ID.' });
    }

    res.status(200).json(changes); // Return found changes with a 200 status
  } catch (error) {
    console.error('Error fetching changes:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to fetch changes. Please try again later.' }); // More descriptive error message
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

export const updateChangeStatus = async (req, res) => {
  const { id } = req.params; // Get change ID from URL
  const { status } = req.body; // New status in request body

  // Validate that status is provided
  if (!status) {
    return res.status(400).json({ message: 'Change status is required' });
  }

  try {
    // Find change by ID and update status
    const updatedChange = await Change.findByIdAndUpdate(
      id,
      { changeStatus: status }, 
      { new: true } // This option ensures the updated document is returned
    );

    if (updatedChange) {
      res.json(updatedChange); // Return the updated change
    } else {
      res.status(404).json({ message: 'Change not found' });
    }
  } catch (error) {
    console.error('Error updating change status for ID:', id, error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating change status' });
  }
};
