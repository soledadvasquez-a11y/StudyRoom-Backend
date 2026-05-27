"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
//src/interfaces/routes/auth.routes.ts
const AuthController_1 = require("../controllers/AuthController");
const LoginUseCase_1 = require("../../application/LoginUseCase");
const DummyUserRepository_1 = require("../../infrastructure/DummyUserRepository");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
// Inyección de dependencias manual
const userRepository = new DummyUserRepository_1.DummyUserRepository();
const loginUseCase = new LoginUseCase_1.LoginUseCase(userRepository);
const authController = new AuthController_1.AuthController(loginUseCase);
authRouter.post('/login', authController.login.bind(authController));
authRouter.get('/checkAuth', authMiddleware_1.authenticateToken, authController.checkAuth.bind(authController));
