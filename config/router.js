import express from 'express';
import workoutsController from '../controller/workoutsController';

const Router = express.Router();

Router.route('/workouts').get(workoutsController.getAllMuscleGroups);

// Router.route('/workouts/search').get(workoutsController.searchWorkouts)

Router.route('/workouts/:id').get(workoutsController.getWorkoutsByMuscleGroup);

Router.route('/log-workout').get(workoutsController.getWorkoutLog);

Router.route('/account').get(userController.getUserAccount);

Router.route('/register').post(userController.registerUser);

Router.route('/login').post(userController.loginUser);

export default Router;

// Workout Directory ('/workouts)

// Excercise per muscle group ('/workouts/:id')

// User profile ('/user')

// Login/Register ('/login') / ('/register)

// Log Workout ('/log-workout')
