import { Router } from 'express';
import { PingController } from '../controllers/PingController';

const pingRouter = Router();
const pingController = new PingController();

pingRouter.get('/ping', pingController.ping.bind(pingController));

export { pingRouter };
