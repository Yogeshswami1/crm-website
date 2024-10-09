// models/Change.js
import mongoose from 'mongoose';

const changeSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  managerPosition: { type: String, required: true },
  changeStatus: { type: String, default: 'Pending' },
  changeDescription: { type: String, required: true },
});

const Change = mongoose.model('Change', changeSchema);
export default Change;
