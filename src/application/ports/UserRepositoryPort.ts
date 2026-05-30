import { UserEntity } from "../../domain/entities/UserEntity";

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: Omit<UserEntity, "id">): Promise<UserEntity>;
}
