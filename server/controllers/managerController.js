import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Manager from '../models/managerModel.js';
import Contact from '../models/contactModel.js';

export const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getContactsByManager = async (req, res) => {
  const { managerId } = req.params;
  try {
    const contacts = await Contact.find({ managerId }).populate('managerId', 'name position');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};


export const getManagerById = async (req, res) => {
  const { id } = req.params;

  try {
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createManager = async (req, res) => {
  const manager = req.body;

  const newManager = new Manager(manager);

  try {
    await newManager.save();
    res.status(201).json(newManager);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// export const updateManager = async (req, res) => {
//   const { id } = req.params;
//   const manager = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).send('No manager with that id');
//   }

//   try {
//     // If the password is being updated, hash it
//     if (manager.password) {
//       const salt = await bcrypt.genSalt(10);
//       manager.password = await bcrypt.hash(manager.password, salt);
//     }

//     const updatedManager = await Manager.findByIdAndUpdate(id, manager, { new: true });
//     res.json(updatedManager);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateManager = async (req, res) => {
  const { id } = req.params;
  const { password, ...otherFields } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No manager with that id');
  }

  try {
    let updateFields = { ...otherFields };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields = { ...updateFields, password: hashedPassword, passwordSet: true };
    }

    const updatedManager = await Manager.findByIdAndUpdate(id, updateFields, { new: true });
    res.json(updatedManager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No manager with that id');
  }

  try {
    const deletedManager = await Manager.findOneAndDelete({ _id: id });
    if (!deletedManager) {
      return res.status(404).send('No manager found with that id');
    }
    res.json({ message: 'Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActiveManagers = async (req, res) => {
  try {
    const activeManagers = await Manager.find({ status: 'active' });
    res.json(activeManagers);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
