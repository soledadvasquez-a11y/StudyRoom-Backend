// src/application/use-cases/RegisterUser.ts
import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { generateAuthToken } from "../../shared/auth/jwt";

export class RegisterUser {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(
    email: string,
    username: string,
    plainPassword: string,
  ): Promise<{ id: string; email: string; user: string; token: string }> {
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = generateAuthToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    return {
      id: newUser.id,
      email: newUser.email,
      user: newUser.username,
      token,
    };
  }
}