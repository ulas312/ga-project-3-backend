import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const workoutsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  reps: { type: Number, required: true },
  sets: { type: Number, required: true },
  rest: { type: Number, required: false },
  difficulty: { type: String, required: true },
  totalTime: { type: Number, required: true },
  caloriesBurned: { type: Number, required: false },
  equipmentRequired: { type: String, required: true },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  muscleGroup: { type: mongoose.Schema.ObjectId, ref: 'Muscle' },
});

workoutsSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Workouts', workoutsSchema);
