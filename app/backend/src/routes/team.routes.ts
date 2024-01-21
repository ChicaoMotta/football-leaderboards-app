import { Request, Response, Router } from 'express';
import TeamController from '../controllers/team.controller';
import ValidateParams from '../middlewares/validateIDParams';

const teamController = new TeamController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.getTeams(req, res),
);

router.get(
  '/:id',
  ValidateParams,
  (req: Request, res: Response) => teamController.getTeamByID(req, res),
);

export default router;
