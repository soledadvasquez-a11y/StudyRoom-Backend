import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class LoginUser {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(
    email: string,
    plainPassword: string,
  ): Promise<{ id: string; email: string; user: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(plainPassword, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return { id: user.id, email: user.email, user: user.username };
  }
}
