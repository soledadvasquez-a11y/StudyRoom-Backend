// src/domain/entities/UserEntity.ts
export interface UserEntity {
  id: string;
  email: string;
  username: string;
  password: string; // hash guardado
}
