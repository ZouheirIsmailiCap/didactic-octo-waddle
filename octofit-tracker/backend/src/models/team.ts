import { Schema, model, Types } from 'mongoose'

const teamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, required: true, default: () => new Date() },
})

export default model('Team', teamSchema)
