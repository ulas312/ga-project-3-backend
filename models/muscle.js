import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const muscleSchema = new mongoose.Schema({
  muscleGroup: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true, max: 500 },
  reps: { type: Number, required: true },
  rest: { type: Number, required: false },
  difficulty: { type: String, required: true },
  totalTime: { type: Number, required: true },
  caloriesBurned: { type: String, required: false },
});

muscleSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Muscle', muscleSchema);
