// src/server.ts
import "dotenv/config";
import express from "express";
import cors from "cors";

import { authRouter } from "./interfaces/routes/auth.routes";
import { pingRouter } from "./interfaces/routes/ping.routes";
import { musicRouter } from "./interfaces/routes/music.routes";
import { pomodoroRouter } from "./interfaces/routes/pomodoro.routes";
import { taskRouter } from "./interfaces/routes/task.routes";

import { SupabaseUserRepository } from "./infrastructure/repositories/SupabaseUserRepository";
import { RegisterUser } from "./application/use-cases/RegisterUser";
import { LoginUser } from "./application/use-cases/LoginUser";
import { UpdateUsername } from "./application/use-cases/UpdateUsername";
import { AuthController } from "./interfaces/controllers/AuthController";
import { preferencesRouter } from "./interfaces/routes/preferences.routes";
const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];
const userRepo = new SupabaseUserRepository();
const registerUseCase = new RegisterUser(userRepo);
const loginUseCase = new LoginUser(userRepo);
const updateUsernameUseCase = new UpdateUsername(userRepo);
const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  updateUsernameUseCase,
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin, como Postman, navegador directo o health checks
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      //Permite automáticamente cualquier entorno de prueba de Vercel
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Backend funcionando 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/ping", pingRouter);
app.use("/api/music", musicRouter);
app.use("/api/pomodoro", pomodoroRouter);
app.use("/api/tasks", taskRouter);

// Agregamos el router de preferencias
app.use("/api/preferences", preferencesRouter);

const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
app.post("/api/register", (req, res) => authController.register(req, res));
app.post("/api/login", (req, res) => authController.login(req, res));
