import mongoose from 'mongoose'
import User from '../models/user.ts'
import Team from '../models/team.ts'
import Activity from '../models/activity.ts'
import Workout from '../models/workout.ts'
import Leaderboard from '../models/leaderboard.ts'

// Seed the octofit_db database with test data
const mongoUrl = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit_db'

const users = [
  { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'athlete' },
  { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'coach' },
  { name: 'Mia Johnson', email: 'mia.johnson@example.com', role: 'athlete' },
  { name: 'Leo Smith', email: 'leo.smith@example.com', role: 'athlete' },
]

const teams = [
  { name: 'Velocity Vipers', description: 'High-energy team focused on speed workouts.' },
  { name: 'Endurance Elite', description: 'Long-distance training and recovery focused team.' },
]

const workouts = [
  {
    name: 'Morning HIIT Blast',
    description: 'An intense 30-minute circuit to kickstart your day.',
    difficulty: 'hard',
    durationMinutes: 30,
    muscleGroups: ['legs', 'core', 'cardio'],
  },
  {
    name: 'Recovery Flow',
    description: 'A gentle recovery session with mobility and stretching.',
    difficulty: 'easy',
    durationMinutes: 25,
    muscleGroups: ['full body', 'flexibility'],
  },
  {
    name: 'Strength Builder',
    description: 'Full-body strength session with weighted movements.',
    difficulty: 'medium',
    durationMinutes: 45,
    muscleGroups: ['upper body', 'lower body', 'core'],
  },
]

const activities = [
  {
    type: 'run',
    description: 'Park tempo run',
    durationMinutes: 35,
    caloriesBurned: 420,
  },
  {
    type: 'cycle',
    description: 'Hill interval ride',
    durationMinutes: 50,
    caloriesBurned: 580,
  },
  {
    type: 'yoga',
    description: 'Sunrise mobility and breath session',
    durationMinutes: 28,
    caloriesBurned: 150,
  },
]

const leaderboardEntries = [
  { entityType: 'user', rank: 1, score: 980, category: 'monthly' },
  { entityType: 'user', rank: 2, score: 920, category: 'monthly' },
  { entityType: 'team', rank: 1, score: 3850, category: 'monthly' },
  { entityType: 'team', rank: 2, score: 3470, category: 'monthly' },
]

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(mongoUrl)
  console.log('Connected to MongoDB at', mongoUrl)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ])

  const createdUsers = await User.create(users)
  const createdTeams = await Team.create(teams)

  createdTeams[0].members = [createdUsers[0]._id, createdUsers[2]._id]
  createdTeams[1].members = [createdUsers[1]._id, createdUsers[3]._id]
  await createdTeams[0].save()
  await createdTeams[1].save()

  const createdActivities = await Activity.create([
    { ...activities[0], user: createdUsers[0]._id, team: createdTeams[0]._id },
    { ...activities[1], user: createdUsers[1]._id, team: createdTeams[1]._id },
    { ...activities[2], user: createdUsers[2]._id, team: createdTeams[0]._id },
  ])

  const createdWorkouts = await Workout.create(workouts)

  const leaderboardData = [
    { ...leaderboardEntries[0], user: createdUsers[0]._id },
    { ...leaderboardEntries[1], user: createdUsers[2]._id },
    { ...leaderboardEntries[2], team: createdTeams[0]._id },
    { ...leaderboardEntries[3], team: createdTeams[1]._id },
  ]

  await Leaderboard.create(leaderboardData)

  console.log('Inserted:')
  console.log(`  users: ${createdUsers.length}`)
  console.log(`  teams: ${createdTeams.length}`)
  console.log(`  activities: ${createdActivities.length}`)
  console.log(`  workouts: ${createdWorkouts.length}`)
  console.log('  leaderboard entries: 4')

  await mongoose.disconnect()
  console.log('Disconnecting from MongoDB')
}

seed().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})
