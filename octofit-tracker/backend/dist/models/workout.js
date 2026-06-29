"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    muscleGroups: [{ type: String, required: true }],
    createdAt: { type: Date, required: true, default: () => new Date() },
});
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
