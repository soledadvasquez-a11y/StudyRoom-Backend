import { PomodoroSession } from "../../domain/entities/PomodoroSession";

export interface PomodoroSessionRepositoryPort {
  create(
    session: Omit<PomodoroSession, "id" | "created_at" | "updated_at">,
  ): Promise<PomodoroSession>;
  findByUserId(userId: string): Promise<PomodoroSession[]>;
  update(
    id: string,
    updates: Partial<
      Omit<PomodoroSession, "id" | "user_id" | "created_at" | "updated_at">
    >,
  ): Promise<PomodoroSession>;
}
