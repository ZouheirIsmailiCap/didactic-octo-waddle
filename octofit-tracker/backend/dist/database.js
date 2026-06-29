"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.getMongoUrl = getMongoUrl;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUrl = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit_db';
async function connectDatabase() {
    if (mongoose_1.default.connection.readyState >= 1) {
        return mongoose_1.default.connection;
    }
    await mongoose_1.default.connect(mongoUrl, {
        serverSelectionTimeoutMS: 5000,
    });
    return mongoose_1.default.connection;
}
function getMongoUrl() {
    return mongoUrl;
}
