import Muscle from '../models/muscle.js';

const getAllMuscleGroups = async (_req, res, next) => {
  try {
    const muscle = await Muscle.find();
    return res.status(200).json(muscle);
  } catch (e) {
    next(e);
  }
};

const getWorkoutsByMuscleGroup = async (req, res, next) => {
  try {
    const muscleGroup = await Muscle.findById(req.params.id).populate(
      'workout'
    );
    return res.status(200).json(muscleGroup);
  } catch (e) {
    next(e);
  }
};

export default {
  getAllMuscleGroups,
  getWorkoutsByMuscleGroup,
};
