// src/interfaces/routes/index.ts
import { Router } from "express";
import { authRouter } from "./auth.routes";
import { pingRouter } from "./ping.routes";
import { musicRouter } from "./music.routes";
import { authController } from "../../config/dependencies";

const apiRouter = Router();

// Mount sub-routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/ping", pingRouter);
apiRouter.use("/music", musicRouter);

// Keep the legacy/root endpoints active (without /auth prefix)
apiRouter.post("/register", authController.register.bind(authController));
apiRouter.post("/login", authController.login.bind(authController));

export { apiRouter };
