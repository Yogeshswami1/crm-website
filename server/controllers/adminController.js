// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Admin from '../models/adminModel.js';

// const signUp = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }
//     const newAdmin = new Admin({ name, email, password });
//     await newAdmin.save();
//     res.status(201).json({ message: 'Admin created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload = {
//       adminId: admin._id,
//     };

//     const token = jwt.sign(payload, 'Saumic', { expiresIn: '1h' });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export { signUp, login };


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import nodemailer from 'nodemailer';  // Import Nodemailer
import crypto from 'crypto'; // To generate OTP
import dotenv from 'dotenv';
dotenv.config();

// Nodemailer transporter configuration (you can use any SMTP service or Gmail for testing)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a random OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    // Update admin's OTP and expiration
    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    // Send the OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: admin.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });

    res.json({ message: 'OTP sent to email', adminId: admin._id });
  } catch (error) {
    console.error('Error during login:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};
// OTP verification endpoint
const verifyOtp = async (req, res) => {
  const { adminId, otp } = req.body; // Change email to adminId
  try {
    const admin = await Admin.findById(adminId); // Find admin by ID
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if OTP is correct and not expired
    if (admin.otp !== otp || admin.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // OTP is valid, generate JWT token for successful login
    const payload = {
      adminId: admin._id,
    };

    const token = jwt.sign(payload, 'Saumic', { expiresIn: '1h' });

    // Clear the OTP fields after successful login
    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export { signUp, login, verifyOtp };
