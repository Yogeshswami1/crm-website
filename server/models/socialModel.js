import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const socialSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
});

socialSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Social = mongoose.model('Social', socialSchema);
export default Social;
