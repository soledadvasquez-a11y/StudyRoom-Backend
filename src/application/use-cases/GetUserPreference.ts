// Archivo: src/application/use-cases/GetUserPreference.ts

import { UserPreferenceRepositoryPort } from "../ports/UserPreferenceRepositoryPort";
import { UserPreferenceEntity } from "../../domain/entities/UserPreferenceEntity";

export class GetUserPreference {
  constructor(private repository: UserPreferenceRepositoryPort) {}

  async execute(userId: string): Promise<UserPreferenceEntity | null> {
    return await this.repository.findByUserId(userId);
  }
}