//src/interfaces/routes/music.routes.ts
import { Router } from "express";
import { musicController } from "../../config/dependencies";

export const musicRouter = Router();

musicRouter.get("/mood/:mood", musicController.getByMood);