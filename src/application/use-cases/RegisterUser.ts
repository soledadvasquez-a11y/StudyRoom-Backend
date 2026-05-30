import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class RegisterUser {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(
    email: string,
    username: string,
    plainPassword: string,
  ): Promise<{ id: string; email: string; user: string }> {
    // validar que no exista el email
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error("Email already registered");

    // hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    // no devolver el password
    return { id: newUser.id, email: newUser.email, user: newUser.username };
  }
}
