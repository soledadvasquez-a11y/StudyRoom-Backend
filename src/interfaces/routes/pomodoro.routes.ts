import { Router } from "express";
import { SupabasePomodoroRepository } from "../../infrastructure/repositories/SupabasePomodoroRepository";
import { CreatePomodoroSession } from "../../application/use-cases/CreatePomodoroSession";
import { GetPomodoroSessionsByUser } from "../../application/use-cases/GetPomodoroSessionsByUser";
import { UpdatePomodoroSession } from "../../application/use-cases/UpdatePomodoroSession";
import { PomodoroController } from "../controllers/PomodoroController";

const pomodoroRouter = Router();

const pomodoroRepository = new SupabasePomodoroRepository();
const createPomodoroSession = new CreatePomodoroSession(pomodoroRepository);
const getPomodoroSessionsByUser = new GetPomodoroSessionsByUser(
  pomodoroRepository,
);
const updatePomodoroSession = new UpdatePomodoroSession(pomodoroRepository);
const pomodoroController = new PomodoroController(
  createPomodoroSession,
  getPomodoroSessionsByUser,
  updatePomodoroSession,
);

pomodoroRouter.post("/", pomodoroController.create);
pomodoroRouter.get("/user/:userId", pomodoroController.getByUser);
pomodoroRouter.patch("/:id", pomodoroController.update);

export { pomodoroRouter };
