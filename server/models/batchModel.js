import mongoose from 'mongoose';


const batchSchema = new mongoose.Schema({
 batchName: {
   type: String,
   required: true,
 },
});


export default mongoose.model('Batch', batchSchema);





