import express from 'express';
import muscleGroupController from '../controller/muscleGroupController.js';
import workoutsController from '../controller/workoutsController.js';
import userController from '../controller/userController.js';
import secureRoute from '../middleware/secureRoute.js';
import activityController from '../controller/activityController.js';
import accountController from '../controller/accountController.js';

const Router = express.Router();

Router.route('/workouts')
  .get(workoutsController.getAllWorkouts)
  .post(secureRoute, workoutsController.createNewWorkout);

Router.route('/workouts/search').get(workoutsController.searchWorkouts);

Router.route('/workouts/:id')
  .get(workoutsController.getSingleWorkout)
  .put(secureRoute, workoutsController.updateSingleWorkout)
  .delete(secureRoute, workoutsController.deleteWorkout);

Router.route('/workout-directory').get(
  muscleGroupController.getAllMuscleGroups
);

Router.route('/workout-directory/workouts').get(
  muscleGroupController.getWorkoutsBySelectedMuscleGroup
);

Router.route('/workout-log')
  .get(activityController.getWorkoutLog)
  .put(activityController.updateWorkoutLog);

Router.route('/account/:id')
  .get(accountController.getUserAccount)
  .put(secureRoute, accountController.updateUserAccount)
  .delete(secureRoute, accountController.deleteUserAccount);

Router.route('/register').post(userController.registerUser);

Router.route('/login').post(userController.loginUser);

export default Router;
