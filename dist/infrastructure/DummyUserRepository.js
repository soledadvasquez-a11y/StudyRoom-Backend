"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyUserRepository = void 0;
class DummyUserRepository {
    async validateCredentials(username, password) {
        // Implementación dummy con credenciales hardcodeadas
        return username === 'admin' && password === '123456';
    }
}
exports.DummyUserRepository = DummyUserRepository;
