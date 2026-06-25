import express from 'express'
import mongoose from 'mongoose'
import User from './models/user.ts'
import Team from './models/team.ts'
import Activity from './models/activity.ts'
import Workout from './models/workout.ts'
import Leaderboard from './models/leaderboard.ts'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`
const mongoUrl = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit_db'

app.use(express.json())

app.get('/', (req, res) => {
  res.send({
    message: 'OctoFit Tracker backend is running.',
    apiBaseUrl,
    port,
  })
})

app.get('/api/users', async (req, res) => {
  const users = await User.find().populate('team', 'name')
  res.json({ endpoint: '/api/users', count: users.length, data: users })
})

app.get('/api/teams', async (req, res) => {
  const teams = await Team.find().populate('members', 'name email role')
  res.json({ endpoint: '/api/teams', count: teams.length, data: teams })
})

app.get('/api/activities', async (req, res) => {
  const activities = await Activity.find()
    .populate('user', 'name email')
    .populate('team', 'name')
  res.json({ endpoint: '/api/activities', count: activities.length, data: activities })
})

app.get('/api/leaderboard', async (req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'name')
    .populate('team', 'name')
  res.json({ endpoint: '/api/leaderboard', count: leaderboard.length, data: leaderboard })
})

app.get('/api/workouts', async (req, res) => {
  const workouts = await Workout.find()
  res.json({ endpoint: '/api/workouts', count: workouts.length, data: workouts })
})

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUrl)
    app.listen(port, () => {
      console.log(`Backend running at http://localhost:${port}`)
      console.log(`Codespaces-aware API URL: ${apiBaseUrl}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
