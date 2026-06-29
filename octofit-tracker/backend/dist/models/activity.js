"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true },
    description: { type: String },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    timestamp: { type: Date, required: true, default: () => new Date() },
});
exports.default = (0, mongoose_1.model)('Activity', activitySchema);
