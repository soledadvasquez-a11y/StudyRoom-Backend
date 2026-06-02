// Archivo: src/application/use-cases/GetUserPreference.ts
import { UserPreferenceRepositoryPort } from "../ports/UserPreferenceRepositoryPort";
import { UserPreferenceEntity } from "../../domain/entities/UserPreferenceEntity";

export class SaveUserPreference {
  constructor(private repository: UserPreferenceRepositoryPort) {}

  async execute(
    userId: string,
    character: string,
    room: string,
    nickname: string = ""
  ): Promise<UserPreferenceEntity> {
    return await this.repository.upsert({
      user_id: userId,
      selected_character: character,
      selected_room: room,
      nickname: nickname
    });
  }
}