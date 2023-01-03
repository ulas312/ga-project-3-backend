import Workouts from '../models/workouts.js';

const getAllMuscleGroups = async (_req, res, next) => {
  try {
    const workouts = await Workouts.find();
    return res.status(200).json(workouts);
  } catch (e) {
    next(e);
  }
};

const getWorkoutsByMuscleGroup = async (req, res, next) => {
  try {
    const workout = await Workouts.findById(req.params.id)
      .populate('name')
      .populate('image');
    return workout
      ? res.status(200).json(workout)
      : res
          .status(404)
          .json({ message: `No workout group with id ${req.params.id}` });
  } catch (e) {
    next(e);
  }
};

const getWorkoutLog = async (req, res, next) => {
  try {
    const logWorkout = await Activity.find();
    return res.status(200).json(logWorkout);
  } catch (e) {
    next(e);
  }
};

export default {
  getAllMuscleGroups,
  getWorkoutsByMuscleGroup,
  getWorkoutLog,
};
