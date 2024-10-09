import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const backendUserSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
});

// Hash the password before saving the backend user
backendUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const BackendUser = mongoose.model('BackendUser', backendUserSchema);
export default BackendUser;
