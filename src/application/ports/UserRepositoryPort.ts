// src/application/ports/UserRepositoryPort.ts
import { UserEntity } from "../../domain/entities/UserEntity";

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  create(user: Omit<UserEntity, "id">): Promise<UserEntity>;
  updateUsername(id: string, username: string): Promise<UserEntity>;
}