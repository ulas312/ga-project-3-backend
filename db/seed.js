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

const abs = [
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
  {
    name: 'Plank',
    image:
      'https://weighttraining.guide/wp-content/uploads/2021/06/Weighted-front-plank.png',
    description:
      'The plank is a bodyweight exercise which involves holding the trunk part of your body in a straight line off the ground. The static exercise engages multiple muscle groups at the same time which makes it extremely effective at strengthening your core, whilst also working the shoulders, arms and glutes.',
    reps: 0,
    sets: 3,
    rest: 30,
    difficulty: 'Intermediate',
    totalTime: 5,
    caloriesBurned: 180,
    muscleGroup: 'Abs',
    equipmentRequired: 'None',
  },

  {
    name: 'Sandbag sit up',
    image:
      'https://www.inspireusafoundation.org/wp-content/uploads/2022/05/sit-up-1024x344.png',
    description:
      'Hold a sandbag with both hands and extend your arms above you. Tense your core as you lift your torso up so your upper body forms a V shape with your thighs. Lower under control back to the start position.',
    reps: 12,
    sets: 4,
    rest: 30,
    difficulty: 'Intermediate',
    totalTime: 15,
    caloriesBurned: 240,
    muscleGroup: 'Abs',
    equipmentRequired: 'Sandbag',
  },
];

const chest = [
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
    name: 'Pushup',
    image: 'https://fitnessvolt.com/wp-content/uploads/2019/04/push-up.jpg',
    description:
      'Pushups are an exercise in which a person, keeping a prone position, with the hands palms down under the shoulders, the balls of the feet on the ground, and the back straight, pushes the body up and lets it down by an alternate straightening and bending of the arms.',
    reps: 12,
    sets: 3,
    rest: 30,
    difficulty: 'Intermediate',
    totalTime: 10,
    caloriesBurned: 250,
    muscleGroup: 'Chest',
    equipmentRequired: 'None',
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

const back = [
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
    muscleGroup: 'Glutes, Hamstrings, Back and Trapezius',
    equipmentRequired: 'Barbell',
  },

  {
    name: 'Back Extension',
    image:
      'https://cdn.shopify.com/s/files/1/1633/7705/files/hyperextensions_480x480.jpg?v=1628477529',
    description:
      'Back extension is a type of stabilization exercise used in back rehabilitation programs that involves bending the spine backwards.',
    reps: 12,
    sets: 3,
    rest: 30,
    difficulty: 'Beginner',
    totalTime: 15,
    caloriesBurned: 250,
    muscleGroup: 'Back',
    equipmentRequired: 'Back extension machine',
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
];

const legs = [
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
    name: 'Leg Curl',
    image:
      'https://weighttraining.guide/wp-content/uploads/2017/01/dumbbell-leg-curl-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    description:
      'The hamstring curl, also called a leg curl, is an exercise that strengthens the hamstrings. It involves bending your knees and moving your heels toward your butt while the rest of your body stays still. Typically, the exercise is done on a leg curl machine.',
    reps: 12,
    sets: 3,
    rest: 30,
    difficulty: 'Beginner',
    totalTime: 10,
    caloriesBurned: 200,
    muscleGroup: 'Legs',
    equipmentRequired: 'Leg curl machine',
  },
];

const shoulders = [
  {
    name: 'Reverse Fly',
    image:
      'https://weighttraining.guide/wp-content/uploads/2016/12/seated-bent-over-lateral-raise-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    description:
      'Lean forward, letting your arms hang down next to your calves with your elbows slightly bent. Slowly raise the weights until your elbows are level with your shoulders. Then slowly lower the weights to the starting position. You will feel tension in your shoulders and the muscles across your upper back.',
    reps: 15,
    sets: 3,
    rest: 60,
    difficulty: 'Intermediate',
    totalTime: 30,
    caloriesBurned: 250,
    muscleGroup: 'Shoulders',
    equipmentRequired: 'Dumbbells',
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
  {
    name: 'Lateral Raise',
    image:
      'https://weighttraining.guide/wp-content/uploads/2016/11/cable-one-arm-lateral-raise-resized.png',
    description:
      'A lateral raise is a strength training shoulder exercise characterized by lifting a pair of dumbbells away from your body in an external rotation. Lateral raises work the trapezius muscle in your upper back as well as the deltoid muscle group in your shoulders—particularly the anterior and lateral deltoids.',
    reps: 10,
    sets: 3,
    rest: 30,
    difficulty: 'Hard',
    totalTime: 10,
    caloriesBurned: 300,
    muscleGroup: 'Shoulders',
    equipmentRequired: 'Dumbbells',
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

  const absGroup = await Muscle.create({
    name: 'Abs',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group Abs');

  const updatedAbs = abs.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: abs._id,
  }));

  const absFromDb = await Workouts.create(updatedAbs);

  await Muscle.findOneAndUpdate(
    { _id: absGroup._id },
    { $push: { groups: absFromDb.map((b) => b._id) } }
  );

  const chestGroup = await Muscle.create({
    name: 'Chest',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group', chest);

  const updatedChest = chest.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: chestGroup._id,
  }));

  const chestFromDb = await Workouts.create(updatedChest);

  await Muscle.findOneAndUpdate(
    { _id: chestGroup._id },
    { $push: { groups: chestFromDb.map((b) => b._id) } }
  );

  const legsGroup = await Muscle.create({
    name: 'Legs',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group', legs);

  const updatedLegs = legs.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: legsGroup._id,
  }));

  const legsFromDb = await Workouts.create(updatedLegs);

  await Muscle.findOneAndUpdate(
    { _id: legsGroup._id },
    { $push: { groups: legsFromDb.map((b) => b._id) } }
  );

  const backGroup = await Muscle.create({
    name: 'Back',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group', back);

  const updatedBack = back.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: backGroup._id,
  }));

  const backFromDb = await Workouts.create(updatedBack);

  await Muscle.findOneAndUpdate(
    { _id: backGroup._id },
    { $push: { groups: backFromDb.map((b) => b._id) } }
  );

  const shouldersGroup = await Muscle.create({
    name: 'Shoulders',
  });
  console.log('🏋🏽‍♀️🤸🏼‍♀️Created muscle group', shoulders);

  const updatedShoulders = shoulders.map((workout) => ({
    ...workout,
    addedBy: adminUser._id,
    muscleGroup: shouldersGroup._id,
  }));

  const shouldersFromDb = await Workouts.create(updatedShoulders);

  await Muscle.findOneAndUpdate(
    { _id: shouldersGroup._id },
    { $push: { groups: shouldersFromDb.map((b) => b._id) } }
  );

  await disconnectDb();
  console.log('🏋🏽‍♀️🤸🏼‍♀️Disconnected from mongodb');
}

seedDb();
