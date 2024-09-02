import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  prefix: { type: String, required: true },
  platform: { type: String, required: true, enum: ['NONE', 'IN', 'COM'] },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

export default mongoose.model('Service', ServiceSchema);
