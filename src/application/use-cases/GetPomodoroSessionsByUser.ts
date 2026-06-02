import { PomodoroSessionRepositoryPort } from "../ports/PomodoroSessionRepositoryPort";

export class GetPomodoroSessionsByUser {
  constructor(
    private readonly pomodoroRepository: PomodoroSessionRepositoryPort,
  ) {}

  async execute(userId: string) {
    if (!userId) throw new Error("El user_id es obligatorio");
    return this.pomodoroRepository.findByUserId(userId);
  }
}
