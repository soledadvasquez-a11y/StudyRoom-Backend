import { UserRepository } from '../domain/UserRepository';

export class DummyUserRepository implements UserRepository {
  async validateCredentials(username: string, password: string): Promise<boolean> {
    // Implementación dummy con credenciales hardcodeadas
    return username === 'admin' && password === '123456';
  }
}
