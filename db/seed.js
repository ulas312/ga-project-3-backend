import { connectDb, disconnectDb } from './helpers.js';
import Activity from '../models/activity.js';
import Muscle from '../models/muscle.js';
import User from '../models/user.js';
import Workouts from '../models/workouts.js';

const ADMIN_USER = {
  username: 'admin',
  password: 'Password1!',
  email: 'admin@admin.com',
  isAdmin: true,
};

const NON_ADMIN_USER = {
  username: 'nonadmin',
  password: 'Password1!',
  email: 'notanadmin@email.com',
};

const muscleGroups = [{}, {}, {}];

const workouts = [{}, {}, {}];

const Activity = [{}, {}, {}];

async function seedDb() {
  console.log('🏋🏽‍♀️🤸🏼‍♀️Connecting to mongodb');
  await connectDb();
  console.log('🏋🏽‍♀️🤸🏼‍♀️Successful connection to mongodb');

  console.log('🏋🏽‍♀️🤸🏼‍♀️Deleting workouts');
  await Workouts.deleteMany({});
  console.log('🏋🏽‍♀️🤸🏼‍♀️Successfully deleted workouts');
  console.log('🏋🏽‍♀️🤸🏼‍♀️Deleting users');
  await User.deleteMany({});
  console.log('🏋🏽‍♀️🤸🏼‍♀️Deleted users');
  console.log('🏋🏽‍♀️🤸🏼‍♀️Deleting muscle areas');
  await Muscle.deleteMany({});
  console.log('🏋🏽‍♀️🤸🏼‍♀️Deleted muscle areas');

  const [user, adminUser] = await User.create([NON_ADMIN_USER, ADMIN_USER]);
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created admin user with id', user._id);

  const newMuscleGroup = await Muscle.create({
    name: 'Chest, Shoulders & Triceps',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle areas', newMuscleArea._id);

  const updatedMuscleGroup = muscleGroups.map((area) => ({
    ...area,
  }));

  const muscleGroupsFromDb = await muscleGroups.create(updatedMuscleGroups);

  await Muscle.findOneAndUpdate(
    { _id: muscleGroups._id },
    { $push: { areas: muscleGroupsFromDb.map((b) => b._id) } }
  );

  await disconnectDb();
  console.log('🏋🏽‍♀️🤸🏼‍♀️Disconnected from mongodb');
}

seedDb();
