import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  profilePicture: { type: String, required: false },
  // yourWorkouts: [{ type: mongoose.Types.ObjectId, ref: 'Workouts' }],
});

accountSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Account', accountSchema);
