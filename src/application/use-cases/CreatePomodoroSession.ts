import { PomodoroSessionRepositoryPort } from "../ports/PomodoroSessionRepositoryPort";
import { PomodoroSessionStatus } from "../../domain/entities/PomodoroSession";

const VALID_STATUSES: PomodoroSessionStatus[] = [
  "completed",
  "cancelled",
  "interrupted",
];

export class CreatePomodoroSession {
  constructor(
    private readonly pomodoroRepository: PomodoroSessionRepositoryPort,
  ) {}

  async execute(
    userId: string,
    status: PomodoroSessionStatus,
    durationMinutes?: number,
    startTime?: string,
    endTime?: string | null,
  ) {
    if (!userId) throw new Error("El user_id es obligatorio");
    if (!status || !VALID_STATUSES.includes(status)) {
      throw new Error(
        `Status inválido. Debe ser uno de: ${VALID_STATUSES.join(", ")}`,
      );
    }

    const session = await this.pomodoroRepository.create({
      user_id: userId,
      status,
      duration_minutes: durationMinutes ?? null,
      start_time: startTime ?? new Date().toISOString(),
      end_time: endTime ?? null,
    });

    return session;
  }
}
