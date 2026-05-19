import { UserRepository } from '../domain/UserRepository';

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string; username?: string }> {
    const isValid = await this.userRepository.validateCredentials(username, password);

    if (isValid) {
      return { success: true, message: 'Login successful', username };
    }

    return { success: false, message: 'Invalid credentials' };
  }
}
