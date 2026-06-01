// src/application/use-cases/UpdateUsername.ts
import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { generateAuthToken } from "../../shared/auth/jwt";

export class UpdateUsername {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(
    userId: string,
    newUsername: string,
  ): Promise<{ id: string; email: string; user: string; token: string }> {
    const cleanUsername = newUsername.trim();

    if (!cleanUsername) {
      throw new Error("El nombre de usuario no puede estar vacío");
    }

    if (cleanUsername.length < 3) {
      throw new Error("El nombre de usuario debe tener al menos 3 caracteres");
    }

    if (cleanUsername.length > 20) {
      throw new Error("El nombre de usuario no puede tener más de 20 caracteres");
    }

    const validUsername = /^[a-zA-Z0-9_]+$/.test(cleanUsername);

    if (!validUsername) {
      throw new Error(
        "El nombre de usuario solo puede contener letras, números y guion bajo",
      );
    }

    const currentUser = await this.userRepository.findById(userId);

    if (!currentUser) {
      throw new Error("Usuario no encontrado");
    }

    const existingUser = await this.userRepository.findByUsername(cleanUsername);

    if (existingUser && existingUser.id !== userId) {
      throw new Error("El nombre de usuario ya está en uso");
    }

    const updatedUser = await this.userRepository.updateUsername(
      userId,
      cleanUsername,
    );

    const token = generateAuthToken({
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      user: updatedUser.username,
      token,
    };
  }
}