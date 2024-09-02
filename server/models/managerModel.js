import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  service: {
    type: String,
  },
  passwordSet: { type: Boolean, default: false },
  status: {
    type: String,
    required: true,
    default: 'inactive',
  },
  documents: {
    pancard: {
      type: String,
      
    },
    adhaarCard: {
      type: String,
    
    },
  },
  password: {
    type: String,
  },
});

// Hash the password before saving the manager
managerSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;
