import { connectDb, disconnectDb } from './helpers.js';
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

const chestShouldersTriceps = [
  {
    name: 'Incline Bench Press',
    image:
      'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/08/Incline-bench-press-vs-flat-bench-press-force-line.png?resize=780%2C506&ssl=1',
    description:
      'The incline bench press is a variation of the bench press and an exercise used to build the muscles of the chest. The shoulders and triceps will be indirectly involved as well. Utilizing an incline will allow you to better target the upper portion of the chest, a lagging part for a lot of lifters.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Hard',
    totalTime: 10,
    caloriesBurned: 180,
    muscleGroup: 'Chest, Shoulders and Triceps',
    equipmentRequired: 'Barbell and Weight Bench',
  },

  {
    name: 'Bent Over Rows',
    image:
      'https://static.vecteezy.com/system/resources/previews/008/259/297/original/man-doing-dumbbell-bent-over-rows-exercise-flat-illustration-isolated-on-white-background-free-vector.jpg',
    description:
      'Bending your knees slightly, and your core tight, bend over at the waist keeping your lower back tight. Bending over until your upper body is at a 45-degree bend or lower, pull the bar up towards your lower chest. Keep your elbows as close to your sides as possible',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Intermediate',
    totalTime: 10,
    caloriesBurned: 200,
    muscleGroup: 'Upper back (latissimus dorsi, rhomboids, and trapezius)',
    equipmentRequired: 'Barbell or Dumbbell',
  },

  {
    name: 'Skullcrusher',
    image:
      'https://www.fitfatherproject.com/wp-content/uploads/2019/08/Skull-Crusher-exercise-long-image.jpg',
    description:
      'A skull crusher, also known as a lying triceps extension, is an isolation exercise focused on your triceps muscles. Skull crushers are performed by lying on your back on a flat bench and lifting dumbbells from behind your head to full extension above you.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Intermediate',
    totalTime: 15,
    caloriesBurned: 300,
    muscleGroup: 'Triceps',
    equipmentRequired: 'Barbell or Dumbbell',
  },
];

const backAndBiceps = [
  {
    name: 'Deadlift',
    image:
      'https://cdn.shopify.com/s/files/1/1497/9682/files/2_illustration.jpg?v=1629114354',
    description:
      'The deadlift is a movement in which your hips hinge backward to lower down and pick up a weighted barbell or kettlebell from the floor. Your back is flat throughout the movement. Some benefits of performing deadlifts include strengthening and gaining more definition in your upper and lower back, glutes, and hamstrings.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Intermediate',
    totalTime: 15,
    caloriesBurned: 220,
    muscleGroup: 'Glutes, Hamstrings and Trapezius',
    equipmentRequired: 'Barbell',
  },

  {
    name: 'Barbell Curl',
    image:
      'http://cdn.shopify.com/s/files/1/1497/9682/articles/2_73c5a35b-aa8c-45ff-8ef1-8d074ed9c16d.jpg?v=1648742110',
    description:
      'A barbell curl is a variation of the biceps curl that uses a weighted barbell. Perform barbell curls by grabbing a barbell with a shoulder-width supinated grip (palms facing towards your body). Hinge your elbows, and lift the barbell toward your chest.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Beginner',
    totalTime: 8,
    caloriesBurned: 250,
    muscleGroup: 'Biceps',
    equipmentRequired: 'Barbell',
  },

  {
    name: 'Dumbbell Shrugs',
    image:
      'https://cdn.shopify.com/s/files/1/1497/9682/files/1._How_to_Perform_Dumbbell_Shrugs.jpg?v=1671800417',
    description:
      'Dumbbell shrugs, also known as dumbbell shoulder shrugs, are an isolation exercise targeting your upper trapezius muscles. Perform dumbbell shrugs by grabbing a pair of dumbbells and holding them by your sides with a neutral grip. Keep your arms straight as you lift your shoulders toward your ears.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Beginner',
    totalTime: 8,
    caloriesBurned: 180,
    muscleGroup: 'Upper Trapezius',
    equipmentRequired: 'Barbell',
  },
];

const legsAndAbs = [
  {
    name: 'Squats',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Squats.svg/1200px-Squats.svg.png',
    description:
      'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Intermediate',
    totalTime: 10,
    caloriesBurned: 280,
    muscleGroup:
      'Gluteus Maximus, Minimus and Medius, Hamstrings, Calves, Guadriceps',
    equipmentRequired:
      'Squats can be completed without the use of equiptment, but challenge yourself with a barbell if you are feeling confident',
  },

  {
    name: 'Leg Press',
    image:
      'https://weighttraining.guide/wp-content/uploads/2016/05/Sled-45-degree-Leg-Press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    description:
      'Leg presses are done in a seated position. Your legs repeatedly press against weights, which can be adjusted according to your fitness level. This targets your quads, glutes, hamstrings, hips, and calves. The seated position of leg presses helps keep your upper body and torso still.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Beginner',
    totalTime: 15,
    caloriesBurned: 120,
    muscleGroup: 'Quads, Hamstrings, Glutes and Calves',
    equipmentRequired: 'Horizontal Leg Press',
  },

  {
    name: 'Bicycle Crunch',
    image:
      'https://weighttraining.guide/wp-content/uploads/2016/11/bicycle-crunch-resized-1.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    description:
      'Raise your knees to a 90-degree angle and alternate extending your legs as if pedaling a bike. Twist your body to touch your elbow to the opposite knee with each pedal motion. With proper form, bicycle crunches can increase core strength while adding a cardio element to your ab exercise routine.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Beginner',
    totalTime: 10,
    caloriesBurned: 200,
    muscleGroup: 'Abs',
    equipmentRequired: 'None',
  },
];

const fullBody = [
  {
    name: 'Running',
    image:
      'https://www.mensjournal.com/wp-content/uploads/mf/1280-treadmill.jpg?w=1200&h=960&crop=1&quality=86&strip=all',
    description:
      'Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot. Running is a type of gait characterized by an aerial phase in which all feet are above the ground (though there are exceptions).',
    reps: 0,
    sets: 0,
    rest: 90,
    difficulty: 'Beginner',
    totalTime: 30,
    caloriesBurned: 250,
    muscleGroup: 'Full body',
    equipmentRequired: 'Treadmill',
  },

  {
    name: 'Cable Row',
    image:
      'https://static.strengthlevel.com/images/illustrations/seated-cable-row-1000x1000.jpg',
    description:
      'A seated cable row is a compound exercise that utilizes a weighted horizontal cable row machine to work muscle groups in your back and arms. Cable machines include a bench for comfortable seating and foot plates to brace yourself against as you pull the weighted cable.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Beginner',
    totalTime: 10,
    caloriesBurned: 300,
    muscleGroup: 'Full body',
    equipmentRequired: 'Cable Machine',
  },
];

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
  console.log('🏋🏽‍♀️🤸🏼‍♀️Deleting muscle groups');
  await Muscle.deleteMany({});
  console.log('🏋🏽‍♀️🤸🏼‍♀️Deleted muscle groups');

  const [user, adminUser] = await User.create([NON_ADMIN_USER, ADMIN_USER]);
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created admin user with id', user._id);

  const chestShouldersTricepsGroup = await Muscle.create({
    name: 'Chest, Shoulders & Triceps',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group chestShouldersTriceps');

  const updatedChestShouldersTriceps = chestShouldersTriceps.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: chestShouldersTricepsGroup._id,
  }));

  const chestShouldersTricepsFromDb = await Workouts.create(
    updatedChestShouldersTriceps
  );

  await Muscle.findOneAndUpdate(
    { _id: chestShouldersTricepsGroup._id },
    { $push: { groups: chestShouldersTricepsFromDb.map((b) => b._id) } }
  );

  const backAndBicepsGroup = await Muscle.create({
    name: 'Back & Biceps',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group', backAndBiceps);

  const updatedBackAndBiceps = backAndBiceps.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: backAndBicepsGroup._id,
  }));

  const backAndBicepsFromDb = await Workouts.create(updatedBackAndBiceps);

  await Muscle.findOneAndUpdate(
    { _id: backAndBicepsGroup._id },
    { $push: { groups: backAndBicepsFromDb.map((b) => b._id) } }
  );

  const legsAndAbsGroup = await Muscle.create({
    name: 'Legs & Abs',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group', legsAndAbs);

  const updatedLegsAndAbs = legsAndAbs.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: legsAndAbsGroup._id,
  }));

  const legsAndAbsFromDb = await Workouts.create(updatedLegsAndAbs);

  await Muscle.findOneAndUpdate(
    { _id: legsAndAbsGroup._id },
    { $push: { groups: legsAndAbsFromDb.map((b) => b._id) } }
  );

  const fullBodyGroup = await Muscle.create({
    name: 'Full Body',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group', fullBody);

  const updatedFullBody = fullBody.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: fullBodyGroup._id,
  }));

  const fullBodyFromDb = await Workouts.create(updatedFullBody);

  await Muscle.findOneAndUpdate(
    { _id: fullBodyGroup._id },
    { $push: { groups: fullBodyFromDb.map((b) => b._id) } }
  );

  await disconnectDb();
  console.log('🏋🏽‍♀️🤸🏼‍♀️Disconnected from mongodb');
}

seedDb();
