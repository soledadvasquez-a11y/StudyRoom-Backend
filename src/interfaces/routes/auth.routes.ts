import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LoginUseCase } from '../../application/LoginUseCase';
import { DummyUserRepository } from '../../infrastructure/DummyUserRepository';

const authRouter = Router();

// Inyección de dependencias manual
const userRepository = new DummyUserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const authController = new AuthController(loginUseCase);

authRouter.post('/login', authController.login.bind(authController));

export { authRouter };
