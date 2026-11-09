import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response) => {
  response.json(await User.find().populate('team').lean());
});

apiRouter.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});

apiRouter.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ date: -1 }).lean());
});

apiRouter.get('/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ period: -1, rank: 1 })
      .lean(),
  );
});

apiRouter.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ name: 1 }).lean());
});

export default apiRouter;
