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
app.get('/', (req, res) => {
    res.send({
        message: 'OctoFit Tracker backend is running.',
        apiBaseUrl,
        port,
    });
});
app.get('/api/users', async (req, res) => {
    const users = await user_1.default.find().populate('team', 'name');
    res.json({ endpoint: '/api/users', count: users.length, data: users });
});
app.get('/api/teams', async (req, res) => {
    const teams = await team_1.default.find().populate('members', 'name email role');
    res.json({ endpoint: '/api/teams', count: teams.length, data: teams });
});
app.get('/api/activities', async (req, res) => {
    const activities = await activity_1.default.find()
        .populate('user', 'name email')
        .populate('team', 'name');
    res.json({ endpoint: '/api/activities', count: activities.length, data: activities });
});
app.get('/api/leaderboard', async (req, res) => {
    const leaderboard = await leaderboard_1.default.find()
        .populate('user', 'name')
        .populate('team', 'name');
    res.json({ endpoint: '/api/leaderboard', count: leaderboard.length, data: leaderboard });
});
app.get('/api/workouts', async (req, res) => {
    const workouts = await workout_1.default.find();
    res.json({ endpoint: '/api/workouts', count: workouts.length, data: workouts });
});
(0, database_1.connectDatabase)()
    .then(() => {
    console.log('Connected to MongoDB at', mongoUrl);
    app.listen(port, () => {
        console.log(`Backend running at http://localhost:${port}`);
        console.log(`Codespaces-aware API URL: ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
