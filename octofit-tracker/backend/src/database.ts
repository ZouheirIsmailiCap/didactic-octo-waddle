import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit_db'

export async function connectDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection
  }

  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  })

  return mongoose.connection
}

export function getMongoUrl() {
  return mongoUrl
}
