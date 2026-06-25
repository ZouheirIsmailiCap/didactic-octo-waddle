import { Schema, model, Types } from 'mongoose'

const leaderboardSchema = new Schema({
  entityType: { type: String, required: true, enum: ['user', 'team'] },
  user: { type: Types.ObjectId, ref: 'User' },
  team: { type: Types.ObjectId, ref: 'Team' },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true },
  recordedAt: { type: Date, required: true, default: () => new Date() },
})

export default model('Leaderboard', leaderboardSchema)
