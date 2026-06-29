"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'athlete' },
    team: { type: mongoose_1.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, required: true, default: () => new Date() },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
