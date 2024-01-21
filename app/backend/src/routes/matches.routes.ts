import { Response, Router, Request } from 'express';
import validateMatchParams from '../middlewares/validateMatchParams';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/match.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllTeams(req, res));
router.post(
  '/',
  validateToken,
  validateMatchParams,
  (req: Request, res: Response) => matchesController.addMatch(req, res),
);
router.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchesController.endMatch(req, res),
);
router.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matchesController.changeScore(req, res),
);

export default router;
