"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
class LoginUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(username, password) {
        const isValid = await this.userRepository.validateCredentials(username, password);
        if (isValid) {
            return { success: true, message: 'Login successful', username };
        }
        return { success: false, message: 'Invalid credentials' };
    }
}
exports.LoginUseCase = LoginUseCase;
