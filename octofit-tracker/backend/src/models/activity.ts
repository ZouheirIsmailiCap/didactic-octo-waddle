import { Schema, model, Types } from 'mongoose'

const activitySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  team: { type: Types.ObjectId, ref: 'Team' },
  type: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  timestamp: { type: Date, required: true, default: () => new Date() },
})

export default model('Activity', activitySchema)
