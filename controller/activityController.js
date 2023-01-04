import Activity from '../models/activity.js';

const getWorkoutLog = async (_req, res, next) => {
  try {
    const logWorkout = await Activity.find();
    return res.status(200).json(logWorkout);
  } catch (e) {
    next(e);
  }
};

const updateWorkoutLog = async (req, res, next) => {
  try {
    const workoutLog = await Activity.findById(req.params.id);
    workoutLog.set(req.body);
    const updateWorkoutLog = await workoutLog.save();
    return res.status(301).json(updateWorkoutLog);
  } catch (e) {
    next(e);
  }
};

export default {
  getWorkoutLog,
  updateWorkoutLog,
};
