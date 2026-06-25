import { Schema, model, Types } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'athlete' },
  team: { type: Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, required: true, default: () => new Date() },
})

export default model('User', userSchema)
