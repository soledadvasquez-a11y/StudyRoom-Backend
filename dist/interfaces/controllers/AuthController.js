"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = require("../middleware/authMiddleware");
class AuthController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }
            const result = await this.loginUseCase.execute(username, password);
            if (result.success && result.username) {
                // Generar el token JWT con el username como payload
                const token = jsonwebtoken_1.default.sign({ username: result.username }, authMiddleware_1.JWT_SECRET, { expiresIn: authMiddleware_1.JWT_EXPIRES_IN });
                res.status(200).json({
                    success: true,
                    message: result.message,
                    token,
                });
            }
            else {
                res.status(401).json(result);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async checkAuth(req, res) {
        res.status(200).json({
            status: 'success',
            message: 'Token válido y acceso permitido'
        });
    }
}
exports.AuthController = AuthController;
