// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import Admin from '../models/adminModel.js';
// import Manager from '../models/managerModel.js';
// import Contact from '../models/contactModel.js';

// // Function to generate JWT token
// const generateToken = (user) => {
//   return jwt.sign({ id: user._id, role: user.role }, "Saumic", { expiresIn: '1d' });
// };

// // Admin login
// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, admin.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = generateToken(admin);
//     res.status(200).json({ token, admin });
//   } catch (error) {
//     console.error("Error during admin login:", error);
//     res.status(500).json({ error: "Server error. Please try again." });
//   }
// };

// // Manager login
// export const managerLogin = async (req, res) => {
//   const { position, password } = req.body;

//   if (!position || !password) {
//     return res.status(400).json({ message: 'Position and password are required' });
//   }

//   try {
//     const manager = await Manager.findOne({ position });

//     if (!manager || !manager.password) {
//       return res.status(400).json({ message: 'Invalid position or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, manager.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid position or password' });
//     }

//     const token = generateToken(manager);
//     res.status(200).json({ token, manager });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error. Please try again.' });
//   }
// };

// export const userLogin = async (req, res) => {
//     const { enrollmentId, password } = req.body;
  
//     if (!enrollmentId || !password) {
//       return res.status(400).json({ message: 'Enrollment ID and password are required' });
//     }
  
//     try {
//       console.log(`Attempting login with enrollment ID: ${enrollmentId}`);
  
//       // Fetch user from database
//       const user = await Contact.findOne({ enrollmentId }).exec();
  
//       if (!user) {
//         console.log(`No user found with enrollment ID: ${enrollmentId}`);
//         return res.status(401).json({ message: 'Invalid enrollment ID or password' });
//       }
  
//       console.log(`User found: ${user.enrollmentId}`);
//       console.log(`Stored hashed password: ${user.password}`,typeof user.password);
//       console.log(`Provided plaintext password: ${password}`, typeof password);
  
//       // Compare passwords
//       const passwordMatch = await bcrypt.compare(password, user.password);
  
//       if (!passwordMatch) {
//         console.log(`Password mismatch for user with enrollment ID: ${enrollmentId}`);
//         return res.status(401).json({ message: 'Invalid enrollment ID or password' });
//       }
  
//       // Generate token and send response
//       const token = generateToken(user);
//       res.status(200).json({ token, user });
//     } catch (error) {
//       console.error("Error during user login:", error);
//       res.status(500).json({ error: "Server error. Please try again." });
//     }
//   };
  

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js';
import Manager from '../models/managerModel.js';
import Contact from '../models/contactModel.js';
import Supervisor from '../models/supervisorModel.js';
import Accountant from '../models/accountantModel.js';
import Telesales from '../models/telesalesModel.js';
import Rmd from '../models/rmdModel.js';
import Social from '../models/socialModel.js';

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, "Saumic", { expiresIn: '1d' });
};

// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(admin);
    res.status(200).json({ token, admin });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Manager login
export const managerLogin = async (req, res) => {
  const { position, password } = req.body;

  if (!position || !password) {
    return res.status(400).json({ message: 'Position and password are required' });
  }

  try {
    const manager = await Manager.findOne({ position });

    if (!manager || !manager.password) {
      return res.status(400).json({ message: 'Invalid position or password' });
    }

    const passwordMatch = await bcrypt.compare(password, manager.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid position or password' });
    }

    const token = generateToken(manager);
    res.status(200).json({ token, manager });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// User login
export const userLogin = async (req, res) => {
  const { enrollmentId, password } = req.body;

  if (!enrollmentId || !password) {
    return res.status(400).json({ message: 'Enrollment ID and password are required' });
  }

  try {
    const user = await Contact.findOne({ enrollmentId });

    if (!user) {
      return res.status(401).json({ message: 'Invalid enrollment ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid enrollment ID or password' });
    }

    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Accountant login
export const accountantLogin = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID and password are required' });
  }

  try {
    const accountant = await Accountant.findOne({ id });

    if (!accountant) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, accountant.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const token = generateToken(accountant);
    res.status(200).json({ token, accountant });
  } catch (error) {
    console.error("Error during accountant login:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Supervisor login
export const supervisorLogin = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID and password are required' });
  }

  try {
    const supervisor = await Supervisor.findOne({ id });

    if (!supervisor) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, supervisor.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const token = generateToken(supervisor);
    res.status(200).json({ token, supervisor });
  } catch (error) {
    console.error("Error during supervisor login:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Telesales Login
export const telesalesLogin = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID and password are required' });
  }

  try {
    const telesales = await Telesales.findOne({ id });

    if (!telesales) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, telesales.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const token = generateToken(telesales);
    res.status(200).json({ token, telesales });
  } catch (error) {
    console.error("Error during telesales login:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

//RMD Login
export const rmdLogin = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID and password are required' });
  }

  try {
    const rmd = await Rmd.findOne({ id });

    if (!rmd) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, rmd.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const token = generateToken(rmd);
    res.status(200).json({ token, rmd });
  } catch (error) {
    console.error("Error during rmd login:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};


//Social Login
export const socialLogin = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID and password are required' });
  }

  try {
    const social = await Social.findOne({ id });

    if (!social) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const passwordMatch = await bcrypt.compare(password, social.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid ID or password' });
    }

    const token = generateToken(social);
    res.status(200).json({ token, social });
  } catch (error) {
    console.error("Error during Social Media Manager login:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};