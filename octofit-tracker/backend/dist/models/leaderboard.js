"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    entityType: { type: String, required: true, enum: ['user', 'team'] },
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    team: { type: mongoose_1.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    category: { type: String, required: true },
    recordedAt: { type: Date, required: true, default: () => new Date() },
});
exports.default = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
