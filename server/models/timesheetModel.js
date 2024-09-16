import mongoose from 'mongoose';

const { Schema } = mongoose;

const TimesheetSchema = new Schema({
  enrollmentId: {
    type: String,
    required: true
  },
  tasks: [
    {
      taskDate: {
        type: String,
        required: true
      },
      dueDate: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      worked: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

const Timesheet = mongoose.model('Timesheet', TimesheetSchema);
export default Timesheet;
