import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`
const mongoUrl = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit_tracker'

app.use(express.json())

app.get('/', (req, res) => {
  res.send({
    message: 'OctoFit Tracker backend is running.',
    apiBaseUrl,
    port,
  })
})

app.get('/api/users', (req, res) => {
  res.json({
    endpoint: '/api/users',
    message: 'User listing placeholder for OctoFit Tracker.',
    data: [],
  })
})

app.get('/api/teams', (req, res) => {
  res.json({
    endpoint: '/api/teams',
    message: 'Team listing placeholder for OctoFit Tracker.',
    data: [],
  })
})

app.get('/api/activities', (req, res) => {
  res.json({
    endpoint: '/api/activities',
    message: 'Activity listing placeholder for OctoFit Tracker.',
    data: [],
  })
})

app.get('/api/leaderboard', (req, res) => {
  res.json({
    endpoint: '/api/leaderboard',
    message: 'Leaderboard placeholder for OctoFit Tracker.',
    data: [],
  })
})

app.get('/api/workouts', (req, res) => {
  res.json({
    endpoint: '/api/workouts',
    message: 'Workout listing placeholder for OctoFit Tracker.',
    data: [],
  })
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
