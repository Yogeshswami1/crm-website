import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const accountantSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
});

accountantSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Accountant = mongoose.model('Accountant', accountantSchema);
export default Accountant;
