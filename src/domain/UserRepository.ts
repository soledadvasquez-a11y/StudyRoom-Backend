export interface UserRepository {
  validateCredentials(username: string, password: string): Promise<boolean>;
}
