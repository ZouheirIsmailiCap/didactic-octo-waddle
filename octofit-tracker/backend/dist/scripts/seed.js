"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const workout_1 = __importDefault(require("../models/workout"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const database_1 = require("../database");
// Seed the octofit_db database with test data
const mongoUrl = (0, database_1.getMongoUrl)();
const users = [
    { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'athlete' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'coach' },
    { name: 'Mia Johnson', email: 'mia.johnson@example.com', role: 'athlete' },
    { name: 'Leo Smith', email: 'leo.smith@example.com', role: 'athlete' },
];
const teams = [
    { name: 'Velocity Vipers', description: 'High-energy team focused on speed workouts.' },
    { name: 'Endurance Elite', description: 'Long-distance training and recovery focused team.' },
];
const workouts = [
    {
        name: 'Morning HIIT Blast',
        description: 'An intense 30-minute circuit to kickstart your day.',
        difficulty: 'hard',
        durationMinutes: 30,
        muscleGroups: ['legs', 'core', 'cardio'],
    },
    {
        name: 'Recovery Flow',
        description: 'A gentle recovery session with mobility and stretching.',
        difficulty: 'easy',
        durationMinutes: 25,
        muscleGroups: ['full body', 'flexibility'],
    },
    {
        name: 'Strength Builder',
        description: 'Full-body strength session with weighted movements.',
        difficulty: 'medium',
        durationMinutes: 45,
        muscleGroups: ['upper body', 'lower body', 'core'],
    },
];
const activities = [
    {
        type: 'run',
        description: 'Park tempo run',
        durationMinutes: 35,
        caloriesBurned: 420,
    },
    {
        type: 'cycle',
        description: 'Hill interval ride',
        durationMinutes: 50,
        caloriesBurned: 580,
    },
    {
        type: 'yoga',
        description: 'Sunrise mobility and breath session',
        durationMinutes: 28,
        caloriesBurned: 150,
    },
];
const leaderboardEntries = [
    { entityType: 'user', rank: 1, score: 980, category: 'monthly' },
    { entityType: 'user', rank: 2, score: 920, category: 'monthly' },
    { entityType: 'team', rank: 1, score: 3850, category: 'monthly' },
    { entityType: 'team', rank: 2, score: 3470, category: 'monthly' },
];
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    console.log('Connected to MongoDB at', mongoUrl);
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
    ]);
    const createdUsers = await user_1.default.create(users);
    const createdTeams = await team_1.default.create(teams);
    const teamOne = createdTeams[0];
    const teamTwo = createdTeams[1];
    teamOne.members = [createdUsers[0]._id, createdUsers[2]._id];
    teamTwo.members = [createdUsers[1]._id, createdUsers[3]._id];
    await teamOne.save();
    await teamTwo.save();
    const createdActivities = await activity_1.default.create([
        { ...activities[0], user: createdUsers[0]._id, team: createdTeams[0]._id },
        { ...activities[1], user: createdUsers[1]._id, team: createdTeams[1]._id },
        { ...activities[2], user: createdUsers[2]._id, team: createdTeams[0]._id },
    ]);
    const createdWorkouts = await workout_1.default.create(workouts);
    const leaderboardData = [
        { ...leaderboardEntries[0], user: createdUsers[0]._id },
        { ...leaderboardEntries[1], user: createdUsers[2]._id },
        { ...leaderboardEntries[2], team: createdTeams[0]._id },
        { ...leaderboardEntries[3], team: createdTeams[1]._id },
    ];
    await leaderboard_1.default.create(leaderboardData);
    console.log('Inserted:');
    console.log(`  users: ${createdUsers.length}`);
    console.log(`  teams: ${createdTeams.length}`);
    console.log(`  activities: ${createdActivities.length}`);
    console.log(`  workouts: ${createdWorkouts.length}`);
    console.log('  leaderboard entries: 4');
    await mongoose_1.default.disconnect();
    console.log('Disconnecting from MongoDB');
}
seed().catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
});
