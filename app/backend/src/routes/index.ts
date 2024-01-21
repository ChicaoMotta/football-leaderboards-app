import { Router } from 'express';
import TeamRoute from './team.routes';
import LoginRoute from './login.routes';
import MatchRoute from './matches.routes';
import LeaderboardRoute from './leaderboard.routes';

const router = Router();

router.use('/teams', TeamRoute);
router.use('/login', LoginRoute);
router.use('/matches', MatchRoute);
router.use('/leaderboard', LeaderboardRoute);

export default router;
