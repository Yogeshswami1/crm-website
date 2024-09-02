import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const rmdSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
});

rmdSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Rmd = mongoose.model('Rmd', rmdSchema);
export default Rmd;
