import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }
});

export default mongoose.model('Task', TaskSchema);
