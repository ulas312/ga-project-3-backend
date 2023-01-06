import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const muscleSchema = new mongoose.Schema({
  name: { type: String, required: true },
<<<<<<< HEAD
  // image: { type: String, required: true },
  workout: [{ type: mongoose.Types.ObjectId, ref: 'Workouts' }],
=======
  workout: [{ type: mongoose.Schema.ObjectId, ref: 'Workouts' }],
>>>>>>> development
});

muscleSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Muscle', muscleSchema);
