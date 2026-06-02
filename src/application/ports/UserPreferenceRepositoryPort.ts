// Archivo:  src/application/ports/UserPreferenceRepositoryPort.ts
import { UserPreferenceEntity } from "../../domain/entities/UserPreferenceEntity";

export interface UserPreferenceRepositoryPort {
  findByUserId(userId: string): Promise<UserPreferenceEntity | null>;
  // Omitimos id y fechas porque la base de datos se encarga de eso en la creación
  upsert(preference: Omit<UserPreferenceEntity, "id" | "created_at" | "updated_at">): Promise<UserPreferenceEntity>;
}   