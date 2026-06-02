import { Request, Response } from "express";
import { CreatePomodoroSession } from "../../application/use-cases/CreatePomodoroSession";
import { GetPomodoroSessionsByUser } from "../../application/use-cases/GetPomodoroSessionsByUser";
import { UpdatePomodoroSession } from "../../application/use-cases/UpdatePomodoroSession";

export class PomodoroController {
  constructor(
    private readonly createUseCase: CreatePomodoroSession,
    private readonly getByUserUseCase: GetPomodoroSessionsByUser,
    private readonly updateUseCase: UpdatePomodoroSession,
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const { user_id, status, duration_minutes, start_time, end_time } =
        req.body;

      if (!user_id || !status) {
        throw new Error("Faltan datos obligatorios: user_id y status");
      }

      const newSession = await this.createUseCase.execute(
        String(user_id),
        String(status) as any,
        duration_minutes !== undefined ? Number(duration_minutes) : undefined,
        start_time ? String(start_time) : undefined,
        end_time !== undefined ? String(end_time) : null,
      );

      res.status(201).json(newSession);
    } catch (err: any) {
      console.error("PomodoroController error:", err);
      res.status(500).json({ error: err.message });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const sessions = await this.getByUserUseCase.execute(String(userId));
      res.status(200).json(sessions);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, duration_minutes, start_time, end_time } = req.body;

      const updatedSession = await this.updateUseCase.execute(String(id), {
        status: status ? (String(status) as any) : undefined,
        duration_minutes:
          duration_minutes !== undefined ? Number(duration_minutes) : undefined,
        start_time: start_time ? String(start_time) : undefined,
        end_time: end_time !== undefined ? String(end_time) : undefined,
      });

      res.status(200).json(updatedSession);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
