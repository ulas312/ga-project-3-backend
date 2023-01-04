import express from 'express';
import muscleGroupController from '../controller/muscleGroupController.js';
import workoutsController from '../controller/workoutsController.js';
import userController from '../controller/userController.js';
import secureRoute from '../middleware/secureRoute.js';

const Router = express.Router();

Router.route('/workouts')
  .get(workoutsController.getAllWorkouts)
  .post(secureRoute, workoutsController.createNewWorkout);

// Router.route('/workouts/search').get(workoutsController.searchWorkouts)

Router.route('/workouts/:id')
  .get(workoutsController.getSingleWorkout)
  .put(secureRoute, workoutsController.updateSingleWorkout)
  .delete(secureRoute, workoutsController.deleteWorkout);

Router.route('/muscle-group').get(muscleGroupController.getAllMuscleGroups);

Router.route('/muscle-group/:id/workouts').get(
  muscleGroupController.getWorkoutsByMuscleGroup
);
  
// Router.route('/log-workout').get(workoutsController.getWorkoutLog);

// Router.route('/account').get(userController.getUserAccount);

Router.route('/register').post(userController.registerUser);

Router.route('/login').post(userController.loginUser);

export default Router;
