import { Schema, model } from 'mongoose'

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  muscleGroups: [{ type: String, required: true }],
  createdAt: { type: Date, required: true, default: () => new Date() },
})

export default model('Workout', workoutSchema)
