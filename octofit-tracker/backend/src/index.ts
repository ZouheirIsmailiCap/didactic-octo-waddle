import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 8000
const mongoUrl = 'mongodb://127.0.0.1:27017/octofit_tracker'

app.use(express.json())

app.get('/', (req, res) => {
  res.send('OctoFit Tracker backend is running on port 8000.')
})

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUrl)
    app.listen(port, () => {
      console.log(`Backend running at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
