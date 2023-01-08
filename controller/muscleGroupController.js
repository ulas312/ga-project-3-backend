import Muscle from '../models/muscle.js';
import Workouts from '../models/workouts.js';

const getAllMuscleGroups = async (_req, res, next) => {
  try {
    const muscle = await Muscle.find();
    return res.status(200).json(muscle);
  } catch (e) {
    next(e);
  }
};

async function getWorkoutsBySelectedMuscleGroup(req, res, next) {
  try {
    const ids = req.query.muscleGroups.split(',');
    console.log({ ids });
    const groups = await Workouts.find({ _id: { $in: ids } });
    return res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
}

export default {
  getAllMuscleGroups,
  getWorkoutsBySelectedMuscleGroup,
};
