import { PomodoroSessionRepositoryPort } from "../ports/PomodoroSessionRepositoryPort";
import { PomodoroSessionStatus } from "../../domain/entities/PomodoroSession";

const VALID_STATUSES: PomodoroSessionStatus[] = [
  "completed",
  "cancelled",
  "interrupted",
];

export class UpdatePomodoroSession {
  constructor(
    private readonly pomodoroRepository: PomodoroSessionRepositoryPort,
  ) {}

  async execute(
    id: string,
    updates: Partial<{
      status: PomodoroSessionStatus;
      duration_minutes: number | null;
      start_time: string;
      end_time: string | null;
    }>,
  ) {
    if (!id) throw new Error("El id de la sesión es obligatorio");
    if (updates.status && !VALID_STATUSES.includes(updates.status)) {
      throw new Error(
        `Status inválido. Debe ser uno de: ${VALID_STATUSES.join(", ")}`,
      );
    }

    return this.pomodoroRepository.update(id, {
      status: updates.status,
      duration_minutes:
        updates.duration_minutes !== undefined
          ? updates.duration_minutes
          : undefined,
      start_time: updates.start_time,
      end_time: updates.end_time !== undefined ? updates.end_time : undefined,
    });
  }
}
