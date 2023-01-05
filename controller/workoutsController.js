import Muscle from '../models/muscle.js';
import Workouts from '../models/workouts.js';

const getAllWorkouts = async (_req, res, next) => {
  try {
    const workouts = await Workouts.find();
    return res.status(200).json(workouts);
  } catch (e) {
    next(e);
  }
};

const createNewWorkout = async (req, res, next) => {
  try {
    const workout = await Workouts.create({
      ...req.body,
    });
    if (req.currentUser.isAdmin) {
      await Muscle.findOneAndUpdate(
        { _id: workout.muscle },
        { $push: { workouts: workout._id } }
      );

      return res.status(201).json(workout);
    }
  } catch (e) {
    next(e);
  }
};

const getSingleWorkout = async (req, res, next) => {
  try {
    const workout = await Workouts.findById(req.params.id).populate(
      'muscleGroup'
    );
    return workout
      ? res.status(200).json(workout)
      : res
          .status(404)
          .json({ message: `No workout with id ${req.params.id}` });
  } catch (e) {
    next(e);
  }
};

const updateSingleWorkout = async (req, res, next) => {
  try {
    if (req.currentUser.isAdmin) {
      const workout = await Workouts.findById(req.params.id);
      workout.set(req.body);
      const updatedWorkout = await workout.save();
      return res.status(200).json(updatedWorkout);
    }

    return res.status(301).json({ message: 'Unauthorized' });
  } catch (e) {
    next(e);
  }
};

const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workouts.findById(req.params.id);

    if (req.currentUser.isAdmin) {
      await Workouts.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Succesfully deleted workout' });
    }

    return res.status(301).json({ message: 'Unauthorized' });
  } catch (e) {
    next(e);
  }
};

async function searchWorkouts(req, res, next) {
  console.log(req.query);
  try {
    const { search } = req.query;
    const workouts = await Workouts.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
      ],
    });
    return res.status(200).json(workouts);
  } catch (e) {
    next(e);
  }
}

export default {
  getAllWorkouts,
  createNewWorkout,
  getSingleWorkout,
  updateSingleWorkout,
  deleteWorkout,
  searchWorkouts,
};
