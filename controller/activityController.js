import Activity from '../models/activity.js';

const getWorkoutLog = async (_req, res, next) => {
  try {
    const logWorkout = await Activity.find();
    return res.status(200).json(logWorkout);
  } catch (e) {
    next(e);
  }
};

export default {
  getWorkoutLog,
};
