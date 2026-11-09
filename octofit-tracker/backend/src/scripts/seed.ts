import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  await connectDatabase();
  try {
    const teamSeeds = [
      { name: 'Trail Blazers', description: 'Outdoor enthusiasts building endurance together.' },
      { name: 'Pace Makers', description: 'A team focused on consistent, healthy movement.' },
    ];
    const teams = await Promise.all(
      teamSeeds.map(({ name, description }) =>
        Team.findOneAndUpdate(
          { name },
          { $set: { description }, $setOnInsert: { members: [] } },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );
    const [trailBlazers, paceMakers] = teams;

    const userSeeds = [
      { username: 'maya.chen', email: 'maya.chen@example.com', name: 'Maya Chen', team: trailBlazers._id },
      { username: 'leo.martin', email: 'leo.martin@example.com', name: 'Leo Martin', team: trailBlazers._id },
      { username: 'ava.johnson', email: 'ava.johnson@example.com', name: 'Ava Johnson', team: paceMakers._id },
    ];
    const users = await Promise.all(
      userSeeds.map(({ username, email, name, team }) =>
        User.findOneAndUpdate(
          { username },
          { $set: { email, name, team } },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );
    await Promise.all([
      Team.updateOne({ _id: trailBlazers._id }, { $set: { members: users.slice(0, 2).map((user) => user._id) } }),
      Team.updateOne({ _id: paceMakers._id }, { $set: { members: [users[2]._id] } }),
    ]);

    const activitySeeds = [
      { user: users[0], type: 'Running', durationMinutes: 32, calories: 280, date: new Date('2026-11-07T08:00:00Z') },
      { user: users[1], type: 'Cycling', durationMinutes: 45, calories: 390, date: new Date('2026-11-07T09:30:00Z') },
      { user: users[2], type: 'Yoga', durationMinutes: 40, calories: 160, date: new Date('2026-11-08T07:15:00Z') },
    ];
    await Promise.all(
      activitySeeds.map(({ user, type, durationMinutes, calories, date }) =>
        Activity.findOneAndUpdate(
          { user: user._id, type, date },
          { $set: { durationMinutes, calories } },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );

    const leaderboardSeeds = [
      { user: users[0], team: trailBlazers, points: 820, rank: 1 },
      { user: users[1], team: trailBlazers, points: 690, rank: 2 },
      { user: users[2], team: paceMakers, points: 610, rank: 3 },
    ];
    await Promise.all(
      leaderboardSeeds.map(({ user, team, points, rank }) =>
        Leaderboard.findOneAndUpdate(
          { user: user._id, period: '2026-11' },
          { $set: { team: team._id, points, rank } },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );

    const workoutSeeds = [
      {
        name: 'Starter Interval Run',
        category: 'Cardio',
        difficulty: 'Beginner',
        durationMinutes: 25,
        description: 'Alternate easy jogging and brisk walking to build endurance.',
      },
      {
        name: 'Full Body Strength',
        category: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        description: 'A balanced circuit of bodyweight squats, presses, and core work.',
      },
      {
        name: 'Recovery Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        description: 'Gentle stretches and controlled breathing for active recovery.',
      },
    ];
    await Promise.all(
      workoutSeeds.map(({ name, ...workout }) =>
        Workout.findOneAndUpdate(
          { name },
          { $set: workout },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );
    console.log('Database seeding complete');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
