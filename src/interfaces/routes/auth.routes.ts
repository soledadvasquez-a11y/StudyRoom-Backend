// src/interfaces/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { SupabaseUserRepository } from "../../infrastructure/repositories/SupabaseUserRepository";
import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { LoginUser } from "../../application/use-cases/LoginUser";
import { UpdateUsername } from "../../application/use-cases/UpdateUsername";
import { authenticateToken } from "../middleware/authMiddleware";

const authRouter = Router();

// Inyección de dependencias
const userRepository = new SupabaseUserRepository();

const registerUseCase = new RegisterUser(userRepository);
const loginUseCase = new LoginUser(userRepository);
const updateUsernameUseCase = new UpdateUsername(userRepository);

const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  updateUsernameUseCase,
);

authRouter.post("/register", authController.register.bind(authController));

authRouter.post("/login", authController.login.bind(authController));

authRouter.get(
  "/checkAuth",
  authenticateToken,
  authController.checkAuth.bind(authController),
);

authRouter.patch(
  "/username",
  authenticateToken,
  authController.updateUsername.bind(authController),
);

export { authRouter };