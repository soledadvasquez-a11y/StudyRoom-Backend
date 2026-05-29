import { Router } from "express";
import { pingController } from "../../config/dependencies";

const pingRouter = Router();

pingRouter.get("/ping", pingController.ping.bind(pingController));

export { pingRouter };
