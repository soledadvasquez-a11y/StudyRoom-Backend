"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = process.env.JWT_SECRET || 'studyroom-secret-key';
exports.JWT_EXPIRES_IN = '8h';
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Acceso denegado: token no proporcionado' });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, exports.JWT_SECRET);
        req.user = { username: payload.username };
        next();
    }
    catch {
        res.status(403).json({ error: 'Token inválido o expirado' });
    }
}
