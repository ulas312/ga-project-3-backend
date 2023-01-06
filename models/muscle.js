import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const muscleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workout: [{ type: mongoose.Types.ObjectId, ref: 'Workouts' }],
  image: { type: String, required: true },
});

muscleSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Muscle', muscleSchema);
