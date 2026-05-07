import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LoginUseCase } from '../../application/LoginUseCase';
import { DummyUserRepository } from '../../infrastructure/DummyUserRepository';
import { authenticateToken } from '../middleware/authMiddleware';

const authRouter = Router();

// Inyección de dependencias manual
const userRepository = new DummyUserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const authController = new AuthController(loginUseCase);

authRouter.post('/login', authController.login.bind(authController));

authRouter.get('/checkAuth', authenticateToken, authController.checkAuth.bind(authController));

export { authRouter };
