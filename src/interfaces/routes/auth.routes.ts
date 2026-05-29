//src/interfaces/routes/auth.routes.ts
import { Router } from "express";
import { authController } from "../../config/dependencies";
import { authenticateToken } from "../middleware/authMiddleware";

const authRouter = Router();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.get(
  "/checkAuth",
  authenticateToken,
  authController.checkAuth.bind(authController),
);

export { authRouter };
