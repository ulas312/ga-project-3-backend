import Muscle from '../models/muscle.js';
import mongoose from 'mongoose';

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
    const workouts = await Muscle.findById(req.params.id).populate('workouts');
    return workouts
      ? res.status(200).json(workouts)
      : res
          .status(404)
          .json({ message: `No workout group with id ${req.params.id}` });
  } catch (e) {
    next(e);
  }
};

export default {
  getAllMuscleGroups,
  getWorkoutsByMuscleGroup,
};
