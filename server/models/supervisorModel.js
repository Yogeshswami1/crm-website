import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const supervisorSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
});

supervisorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);
export default Supervisor;
