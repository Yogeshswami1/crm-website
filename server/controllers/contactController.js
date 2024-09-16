import mongoose from "mongoose";
import Contact from "../models/contactModel.js";
import Manager from "../models/managerModel.js";
import bcrypt from "bcrypt";

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts. Please try again." });
  }
};

export const getAll = async (req, res) => {
  const { managerId } = req.query;

  if (!managerId) {
    return res.status(400).json({ error: "Manager ID is required" });
  }

  try {
    const contacts = await Contact.find({ managerId }).populate('managerId', 'position');
    // console.log("Fetched contacts:", contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts. Please try again." });
  }
};

//get contact and manager position

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('managerId', 'position');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new contact
export const addContact = async (req, res) => {
  try {
    const { managerPosition, ...contactData } = req.body;

    // Find the manager by position
    const manager = await Manager.findOne({ position: managerPosition });
    if (!manager) {
      return res.status(404).json({ error: "Manager with the specified position not found." });
    }

    const newContact = new Contact({ ...contactData, managerId: manager._id });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Failed to add contact. Please try again." });
  }
};

// Get a single contact by ID
export const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact. Please try again." });
  }
};
export const getContactByEnrollmentId = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const contact = await Contact.findOne({ enrollmentId });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact. Please try again." });
  }
};

export const getServiceTypeByEnrollmentId = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const contact = await Contact.findOne({ enrollmentId });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json({ serviceType: contact.service });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch service type. Please try again." });
  }
};

// // Update a contact by ID
// export const updateContactById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { managerPosition, ...contactData } = req.body;

//     // Find the manager by position if the managerPosition is provided
//     let managerId = null;
//     if (managerPosition) {
//       const manager = await Manager.findOne({ position: managerPosition });
//       if (!manager) {
//         return res.status(404).json({ error: "Manager with the specified position not found." });
//       }
//       managerId = manager._id;
//     }

//     const updatedContact = await Contact.findByIdAndUpdate(
//       id,
//       { ...contactData, ...(managerId && { managerId }) },
//       { new: true }
//     );

//     if (!updatedContact) {
//       return res.status(404).json({ error: "Contact not found." });
//     }
//     res.status(200).json(updatedContact);
//   } catch (error) {
//     console.error("Error updating contact:", error);
//     res.status(500).json({ error: "Failed to update contact. Please try again." });
//   }
// };

//adding the remark
export const updateRemarkContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    // Ensure remarks are in the correct format
    if (remarks && typeof remarks === 'string') {
      req.body.remarks = [{ text: remarks, date: new Date() }];
    } else if (remarks && Array.isArray(remarks)) {
      req.body.remarks = remarks.map((remark) => ({
        text: remark.text,
        date: remark.date || new Date()
      }));
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};






// update remark by enrollmentId
export const updateRemarkContactByEnrollmentId = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { remarks } = req.body;

    // Ensure remarks are in the correct format
    if (remarks && typeof remarks === 'string') {
      req.body.remarks = [{ text: remarks, date: new Date() }];
    } else if (remarks && Array.isArray(remarks)) {
      req.body.remarks = remarks.map((remark) => ({
        text: remark.text,
        date: remark.date || new Date()
      }));
    }

    // Update the contact based on enrollmentId
    const updatedContact = await Contact.findOneAndUpdate(
      { enrollmentId: enrollmentId },
      req.body,
      { new: true }
    );

    // Handle case where contact is not found
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a contact by ID
// export const updateContactById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { managerPosition, ...contactData } = req.body;

//     // Find the manager by position if the managerPosition is provided
//     let managerId = null;
//     if (managerPosition) {
//       const manager = await Manager.findOne({ position: managerPosition });
//       if (!manager) {
//         return res.status(404).json({ error: "Manager with the specified position not found." });
//       }
//       managerId = manager._id;
//     }

//     // Get the current date as an ISO string
//     const currentDate = new Date().toISOString();

//     // List of string fields to update with the current date
//     const stringFields = [
//       'idCard', 'training', 'ebook', 'supportPortal', 'walletPortal',
//       'gallery', 'legality', 'category', 'state', 'gst', 'onboardingStatus',
//       'brandName', 'accountOpenIn', 'gtin', 'listingsIn', 'launchDateIn',
//       'addRegionIn', 'shipping', 'fbaIn', 'stateCom', 'documentStatus', 'storeName', 'accountOpenCom',
//       'videoKyc', 'deduct', 'listingsCom', 'launchDateCom', 'nia', 'addCredit', 'fbaCom', 'ovc', 'theme', 'stage1Completion', 'callDone'
//     ];

//     // Append the current date to the string fields if they are present in the request body
//     stringFields.forEach(field => {
//       if (contactData[field]) {
//         contactData[field] = `${contactData[field]} (updated on ${currentDate})`;
//       }
//     });

//     // Update contact data including managerId if provided
//     const updatedContact = await Contact.findByIdAndUpdate(
//       id,
//       { ...contactData, ...(managerId && { managerId }) },
//       { new: true }
//     );

//     if (!updatedContact) {
//       return res.status(404).json({ error: "Contact not found." });
//     }
//     res.status(200).json(updatedContact);
//   } catch (error) {
//     console.error("Error updating contact:", error);
//     res.status(500).json({ error: "Failed to update contact. Please try again." });
//   }
// };



// export const updateContactById = async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     console.error("Update failed: Contact ID is required.");
//     return res.status(400).json({ error: "Contact ID is required." });
//   }

//   try {
//     const { managerPosition, ...contactData } = req.body;

//     // Find the manager by position if the managerPosition is provided
//     let managerId = null;
//     if (managerPosition) {
//       const manager = await Manager.findOne({ position: managerPosition });
//       if (!manager) {
//         console.error(`Update failed: Manager with position ${managerPosition} not found.`);
//         return res.status(404).json({ error: "Manager with the specified position not found." });
//       }
//       managerId = manager._id;
//     }

//     // Get the current date as an ISO string
//     const currentDate = new Date().toISOString();

//     // List of string fields to update with the current date
//     const stringFields = [
//       'idCard', 'training', 'ebook', 'supportPortal', 'walletPortal',
//       'gallery', 'legality', 'category', 'state', 'gst', 'onboardingStatus',
//       'brandName', 'accountOpenIn', 'gtin', 'listingsIn', 'launchDateIn',
//       'addRegionIn', 'shipping', 'fbaIn', 'stateCom', 'documentStatus', 'storeName', 'accountOpenCom',
//       'videoKyc', 'deduct', 'listingsCom', 'launchDateCom', 'nia', 'addCredit', 'fbaCom', 'ovc', 'theme', 'stage1Completion', 'callDone',
//       'cvcIn', 'cvcCom', 'stage2Completion', 'stage3Completion'
//     ];

//     // Append the current date to the string fields if they are present in the request body
//     stringFields.forEach(field => {
//       if (contactData[field]) {
//         contactData[field] = `${contactData[field]} (updated on ${currentDate})`;
//       }
//     });

//     // Log the data to be updated
//     console.info(`Attempting to update contact with ID ${id}. Update data:`, contactData);

//     // Update contact data including managerId if provided
//     const updatedContact = await Contact.findByIdAndUpdate(
//       id,
//       { ...contactData, ...(managerId && { managerId }) },
//       { new: true }
//     );

//     if (!updatedContact) {
//       console.error(`Update failed: Contact with ID ${id} not found.`);
//       return res.status(404).json({ error: "Contact not found." });
//     }

//     // Log successful update
//     console.info(`Contact with ID ${id} updated successfully. Updated data:`, updatedContact);
//     res.status(200).json(updatedContact);

//   } catch (error) {
//     console.error(`Error updating contact with ID ${id}:`, error);
//     res.status(500).json({ error: "Failed to update contact. Please try again." });
//   }
// };

export const updateContactById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    console.error("Update failed: Contact ID is required.");
    return res.status(400).json({ error: "Contact ID is required." });
  }

  try {
    const { managerPosition, ...contactData } = req.body;

    // Find the manager by position if the managerPosition is provided
    let managerId = null;
    if (managerPosition) {
      const manager = await Manager.findOne({ position: managerPosition });
      if (!manager) {
        console.error(`Update failed: Manager with position ${managerPosition} not found.`);
        return res.status(404).json({ error: "Manager with the specified position not found." });
      }
      managerId = manager._id;
    }

    // Log the data to be updated
    console.info(`Attempting to update contact with ID ${id}. Update data:`, contactData);

    // Update contact data including managerId if provided
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { ...contactData, ...(managerId && { managerId }) },
      { new: true }
    );

    if (!updatedContact) {
      console.error(`Update failed: Contact with ID ${id} not found.`);
      return res.status(404).json({ error: "Contact not found." });
    }

    // Log successful update
    console.info(`Contact with ID ${id} updated successfully. Updated data:`, updatedContact);
    res.status(200).json(updatedContact);

  } catch (error) {
    console.error(`Error updating contact with ID ${id}:`, error);
    res.status(500).json({ error: "Failed to update contact. Please try again." });
  }
};







// for codes controller


export const updateContactByEnrollmentId = async (req, res) => {
  const { id } = req.params; // Assuming 'id' is the enrollmentId

  if (!id) {
    console.error("Update failed: Contact ID (enrollmentId) is required.");
    return res.status(400).json({ error: "Contact ID (enrollmentId) is required." });
  }

  try {
    const { managerPosition, ...contactData } = req.body;

    // Find the manager by position if the managerPosition is provided
    let managerId = null;
    if (managerPosition) {
      const manager = await Manager.findOne({ position: managerPosition });
      if (!manager) {
        console.error(`Update failed: Manager with position ${managerPosition} not found.`);
        return res.status(404).json({ error: "Manager with the specified position not found." });
      }
      managerId = manager._id;
    }

    // Get the current date as an ISO string
    const currentDate = new Date().toISOString();

    // List of string fields to update with the current date
    const stringFields = [
      'idCard', 'training', 'ebook', 'supportPortal', 'walletPortal',
      'gallery', 'legality', 'category', 'state', 'gst', 'onboardingStatus',
      'brandName', 'accountOpenIn', 'gtin', 'listingsIn', 'launchDateIn',
      'addRegionIn', 'shipping', 'fbaIn', 'stateCom', 'documentStatus', 'storeName', 'accountOpenCom',
      'videoKyc', 'deduct', 'listingsCom', 'launchDateCom', 'nia', 'addCredit', 'fbaCom', 'ovc', 'theme', 'stage1Completion', 'callDone',
      'cvcIn', 'cvcCom', 'stage2Completion', 'stage3Completion'
    ];

    // Append the current date to the string fields if they are present in the request body
    stringFields.forEach(field => {
      if (contactData[field]) {
        contactData[field] = `${contactData[field]} (updated on ${currentDate})`;
      }
    });

    // Log the data to be updated
    console.info(`Attempting to update contact with enrollmentId ${id}. Update data:`, contactData);

    // Update contact data including managerId if provided
    const updatedContact = await Contact.findOneAndUpdate(
      { enrollmentId: id }, // Query by enrollmentId
      { ...contactData, ...(managerId && { managerId }) },
      { new: true }
    );

    if (!updatedContact) {
      console.error(`Update failed: Contact with enrollmentId ${id} not found.`);
      return res.status(404).json({ error: "Contact not found." });
    }

    // Log successful update
    console.info(`Contact with enrollmentId ${id} updated successfully. Updated data:`, updatedContact);
    res.status(200).json(updatedContact);

  } catch (error) {
    console.error(`Error updating contact with enrollmentId ${id}:`, error);
    res.status(500).json({ error: "Failed to update contact. Please try again." });
  }
};




// Delete a contact by ID
export const deleteContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact. Please try again." });
  }
};

// Delete multiple contacts by IDs
export const deleteMultipleContacts = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid input: 'ids' must be a non-empty array." });
  }

  try {
    const objectIdArray = ids.map(id => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return new mongoose.Types.ObjectId(id);
      } else {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
    });

    const result = await Contact.deleteMany({ _id: { $in: objectIdArray } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No contacts found to delete." });
    }
    res.status(200).json({ message: "Selected contacts deleted successfully." });
  } catch (error) {
    console.error("Error deleting selected contacts:", error.message);
    res.status(500).json({ error: "Failed to delete selected contacts. Please try again." });
  }
};

// Assign manager to multiple contacts
export const assignManager = async (req, res) => {
  const { contactIds, managerId } = req.body;

  try {
    const validManagerId = new mongoose.Types.ObjectId(managerId);

    await Contact.updateMany(
      { _id: { $in: contactIds.map(id => new mongoose.Types.ObjectId(id)) } },
      { $set: { managerId: validManagerId } }
    );

    res.status(200).json({ message: "Manager assigned successfully" });
  } catch (error) {
    console.error("Error assigning manager:", error);
    res.status(500).json({ message: "Failed to assign manager", error });
  }
};

// Get manager assignments
// export const getManagerAssignments = async (req, res) => {
//   try {
//     const assignments = await Contact.aggregate([
//       {
//         $lookup: {
//           from: "managers",
//           localField: "managerId",
//           foreignField: "_id",
//           as: "manager"
//         }
//       },
//       {
//         $unwind: "$manager"
//       },
//       {
//         $group: {
//           _id: "$managerId",
//           managerName: { $first: "$manager.name" },
//           contacts: { $push: "$$ROOT" },
//           contactCount: { $sum: 1 }
//         }
//       }
//     ]);

//     res.status(200).json(assignments);
//   } catch (error) {
//     console.error("Error fetching manager assignments:", error);
//     res.status(500).json({ error: "Failed to fetch manager assignments. Please try again." });
//   }
// };

export const getManagerAssignments = async (req, res) => {
  try {
    const assignments = await Contact.aggregate([
      {
        $lookup: {
          from: "managers",
          localField: "managerId",
          foreignField: "_id",
          as: "manager"
        }
      },
      {
        $unwind: "$manager"
      },
      {
        $group: {
          _id: "$managerId",
          managerName: { $first: "$manager.name" },
          managerPosition: { $first: "$manager.position" }, // Add position here
          contacts: { $push: "$$ROOT" },
          contactCount: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching manager assignments:", error);
    res.status(500).json({ error: "Failed to fetch manager assignments. Please try again." });
  }
};


// Unassign manager
export const unassignManager = async (req, res) => {
  const { contactId } = req.body;
  try {
    await Contact.findByIdAndUpdate(contactId, { managerId: null });
    res.json({ message: "Manager unassigned successfully" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Check if enrollmentId already exists
export const checkEnrollmentId = async (req, res) => {
  try {
    const existingContact = await Contact.findOne({ enrollmentId: req.params.enrollmentId });
    res.json({ exists: !!existingContact });
  } catch (error) {
    console.error("Error checking enrollmentId:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Check if primaryContact already exists for a given service
export const checkPrimaryContact = async (req, res) => {
  try {
    const { primaryContact, service } = req.query;
    const existingContact = await Contact.findOne({ primaryContact, service });
    res.json({ exists: !!existingContact });
  } catch (error) {
    console.error("Error checking primaryContact per service:", error);
    res.status(500).json({ error: "Server error" });
  }
};



//update contact password
// export const updateContactPassword = async (req, res) => {
//   const { id } = req.params;
//   const contact = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).send('No contact with that id');
//   }

//   try {
//     // If the password is being updated, hash it
//     if (contact.password) {
//       const salt = await bcrypt.genSalt(10);
//       contact.password = await bcrypt.hash(contact.password, salt);
//     }

//     const updatedContact = await Contact.findByIdAndUpdate(id, contact, { new: true });
//     res.json(updatedContact);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const updateContactPassword = async (req, res) => {
  const { id } = req.params;
  const { password, ...otherFields } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No contact with that id');
  }

  try {
    let updateFields = { ...otherFields };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields = { ...updateFields, password: hashedPassword, passwordSet: true };
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, updateFields, { new: true });
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//tasks



export const getTasks = async (req, res) => {
  const { enrollmentId } = req.params;
  console.log(`Fetching tasks for Enrollment ID: ${enrollmentId}`);

  try {
    const contact = await Contact.findOne({ enrollmentId });

    if (!contact) {
      console.log('Contact not found for Enrollment ID:', enrollmentId);
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact.tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};


// export const addTask = async (req, res) => {
//   const { enrollmentId, tasks } = req.body; // Get enrollmentId and tasks from request body

//   console.log(req.body);

//   try {
//     // Validate if `tasks` is an array and not empty
//     if (!Array.isArray(tasks) || tasks.length === 0) {
//       return res.status(400).json({ message: 'Tasks should be a non-empty array' });
//     }

//     // Find the contact document by enrollment ID
//     const contact = await Contact.findOne({ enrollmentId });
//     console.log("Contact found for enrollmentId:", enrollmentId);

//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }

//     // Add the tasks to the contact
//     contact.tasks.push(...tasks);

//     // Save the updated contact document
//     await contact.save();

//     res.status(201).json(contact.tasks);
//   } catch (err) {
//     console.error('Error adding tasks:', err);
//     res.status(500).json({ error: 'Failed to add tasks' });
//   }
// };


// export const updateTask = async (req, res) => {
//   const { enrollmentId, taskId } = req.params;
//   const { newStatus, newComment } = req.body;

//   try {
//     console.log(`Enrollment ID: ${enrollmentId}`);
//     console.log(`Task ID: ${taskId}`);
//     console.log('Request Body: ', req.body);

//     const contact = await Contact.findOne({ enrollmentId });

//     if (!contact) {
//       console.log('Contact not found for Enrollment ID:', enrollmentId);
//       return res.status(404).json({ message: 'Contact not found' });
//     }

//     console.log('Found contact:', contact);

//     const task = contact.tasks.id(taskId);

//     if (!task) {
//       console.log('Task not found with Task ID:', taskId);
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     console.log('Found task:', task);

//     if (newStatus !== undefined) task.status = newStatus;
//     if (newComment !== undefined) task.comment = newComment;

//     await contact.save();

//     res.status(200).json(contact.tasks);
//   } catch (err) {
//     console.error('Error updating task:', err);
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// };


export const addTask = async (req, res) => {
  const { enrollmentId, tasks } = req.body; // Get enrollmentId and tasks from request body

  console.log(req.body);

  try {
    // Validate if `tasks` is an array and not empty
    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: 'Tasks should be a non-empty array' });
    }

    // Find the contact document by enrollment ID
    const contact = await Contact.findOne({ enrollmentId });
    console.log("Contact found for enrollmentId:", enrollmentId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Add the tasks to the contact
    contact.tasks.push(...tasks);

    // Save the updated contact document
    await contact.save();

    res.status(201).json(contact.tasks);
  } catch (err) {
    console.error('Error adding tasks:', err);
    res.status(500).json({ error: 'Failed to add tasks' });
  }
};

export const updateTask = async (req, res) => {
  const { enrollmentId, taskId } = req.params;
  const { newStatus, newComment, newStartDate, newEndDate } = req.body;

  try {
    console.log(`Enrollment ID: ${enrollmentId}`);
    console.log(`Task ID: ${taskId}`);
    console.log('Request Body: ', req.body);

    const contact = await Contact.findOne({ enrollmentId });

    if (!contact) {
      console.log('Contact not found for Enrollment ID:', enrollmentId);
      return res.status(404).json({ message: 'Contact not found' });
    }

    console.log('Found contact:', contact);

    const task = contact.tasks.id(taskId);

    if (!task) {
      console.log('Task not found with Task ID:', taskId);
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log('Found task:', task);

    if (newStatus !== undefined) task.status = newStatus;
    if (newComment !== undefined) task.comment = newComment;
    if (newStartDate !== undefined) task.startDate = newStartDate;
    if (newEndDate !== undefined) task.endDate = newEndDate;

    await contact.save();

    res.status(200).json(contact.tasks);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const { isValidObjectId } = mongoose;

export const deleteTask = async (req, res) => {
  const { enrollmentId, taskId } = req.params;
  console.log(enrollmentId, taskId);

  // Validate taskId format
  if (!isValidObjectId(taskId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Find the contact by enrollmentId
    const contact = await Contact.findOne({ enrollmentId });

    // Check if contact exists
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Find the index of the task within the contact's tasks array by taskId
    const taskIndex = contact.tasks.findIndex(task => task._id.toString() === taskId);

    // Check if task exists
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the tasks array
    contact.tasks.splice(taskIndex, 1);

    // Save the updated contact document
    await contact.save();

    // Return the updated tasks array as JSON response
    res.status(200).json(contact.tasks);
  } catch (error) {
    // Handle any errors
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};