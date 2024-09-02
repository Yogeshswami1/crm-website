import mongoose from 'mongoose';

const changeSchema = new mongoose.Schema({
  enrollmentId: {
    type: String,
    required: true,
  },
  managerPosition: {
    type: String,
    required: true,
  },
  changes: [
    {
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
      },
    },
  ],
}, {
  timestamps: true,
});

const Change = mongoose.model('Change', changeSchema);

export default Change;
