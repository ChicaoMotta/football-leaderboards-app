import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboards.controller';

const leaderboardController = new LeaderboardController();
const route = Router();

route.get('/home', (req: Request, res: Response) => leaderboardController.getHomeTeam(req, res));
route.get('/away', (req: Request, res: Response) => leaderboardController.getAwayTeam(req, res));
route.get('/', async (req: Request, res: Response) => leaderboardController.getAllMatchScores(req, res));

export default route;
