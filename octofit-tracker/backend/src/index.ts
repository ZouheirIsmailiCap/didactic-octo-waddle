import express from 'express'
import User from './models/user'
import Team from './models/team'
import Activity from './models/activity'
import Workout from './models/workout'
import Leaderboard from './models/leaderboard'
import { connectDatabase, getMongoUrl } from './database'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`
const mongoUrl = getMongoUrl()

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiBaseUrl,
    port,
  })
})

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find().populate('team', 'name')
  res.json({ endpoint: '/api/users/', count: users.length, data: users })
})

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email role')
  res.json({ endpoint: '/api/teams/', count: teams.length, data: teams })
})

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find()
    .populate('user', 'name email')
    .populate('team', 'name')
  res.json({ endpoint: '/api/activities/', count: activities.length, data: activities })
})

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'name')
    .populate('team', 'name')
  res.json({ endpoint: '/api/leaderboard/', count: leaderboard.length, data: leaderboard })
})

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find()
  res.json({ endpoint: '/api/workouts/', count: workouts.length, data: workouts })
})

async function startServer() {
  try {
    await connectDatabase()
    console.log('Connected to MongoDB at', mongoUrl)
  } catch (error) {
    console.warn('MongoDB connection unavailable, continuing without database:', error)
  }

  app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`)
    console.log(`Codespaces-aware API URL: ${apiBaseUrl}`)
  })
}

startServer().catch((error) => {
  console.error('Server failed to start:', error)
  process.exit(1)
})
