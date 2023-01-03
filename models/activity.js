import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const activitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: TimeRanges, required: true },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  image: { type: String, required: false },
  workout: { type: mongoose.Schema.objectId, ref: 'Workouts' },
});

activitySchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Activity', activitySchema);
