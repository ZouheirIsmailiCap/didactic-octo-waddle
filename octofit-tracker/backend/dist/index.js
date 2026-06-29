"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./models/user"));
const team_1 = __importDefault(require("./models/team"));
const activity_1 = __importDefault(require("./models/activity"));
const workout_1 = __importDefault(require("./models/workout"));
const leaderboard_1 = __importDefault(require("./models/leaderboard"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.githubpreview.dev`
    : `http://localhost:${port}`;
const mongoUrl = (0, database_1.getMongoUrl)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker backend is running.',
        apiBaseUrl,
        port,
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.default.find().populate('team', 'name');
    res.json({ endpoint: '/api/users/', count: users.length, data: users });
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_1.default.find().populate('members', 'name email role');
    res.json({ endpoint: '/api/teams/', count: teams.length, data: teams });
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_1.default.find()
        .populate('user', 'name email')
        .populate('team', 'name');
    res.json({ endpoint: '/api/activities/', count: activities.length, data: activities });
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboard_1.default.find()
        .populate('user', 'name')
        .populate('team', 'name');
    res.json({ endpoint: '/api/leaderboard/', count: leaderboard.length, data: leaderboard });
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_1.default.find();
    res.json({ endpoint: '/api/workouts/', count: workouts.length, data: workouts });
});
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
        console.log('Connected to MongoDB at', mongoUrl);
    }
    catch (error) {
        console.warn('MongoDB connection unavailable, continuing without database:', error);
    }
    app.listen(port, () => {
        console.log(`Backend running at http://localhost:${port}`);
        console.log(`Codespaces-aware API URL: ${apiBaseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Server failed to start:', error);
    process.exit(1);
});
