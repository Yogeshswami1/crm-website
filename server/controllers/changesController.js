import Change from '../models/changesModel.js';

// Create a new change entry for a user
export const createChange = async (req, res) => {
  const { enrollmentId, managerPosition, description } = req.body;

  try {
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const newChange = new Change({
      enrollmentId,
      managerPosition,
      changes: [{ description, status: 'Pending' }]
    });

    await newChange.save();
    res.status(201).json(newChange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get changes for a specific user by enrollmentId
export const getChangesByEnrollmentId = async (req, res) => {
  const { enrollmentId } = req.query;

  try {
    const changes = await Change.findOne({ enrollmentId }); // Use findOne to get a single document
    if (!changes) {
      return res.status(404).json({ message: 'No changes found for this enrollment ID' });
    }

    res.status(200).json(changes.changes); // Return only the `changes` array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a change's status or description
export const updateChange = async (req, res) => {
  const { enrollmentId, changeId } = req.params;
  const { description, status } = req.body;

  try {
    const changeEntry = await Change.findOne({ enrollmentId });
    if (!changeEntry) {
      return res.status(404).json({ message: 'No changes found for this enrollment ID' });
    }

    const change = changeEntry.changes.id(changeId);
    if (!change) {
      return res.status(404).json({ message: 'No change found with this ID' });
    }

    if (description) change.description = description;
    if (status) change.status = status;

    await changeEntry.save();
    res.status(200).json(change);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};