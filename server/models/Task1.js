import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
  enrollmentId: { type: String, required: true },
  tasks: { type: [String], required: true },
  // tasks: [taskSchema], // Tasks as an array of taskSchema

  status: { type: String, default: "Pending" }, // Add status field

});

export default model('Task1', taskSchema);
