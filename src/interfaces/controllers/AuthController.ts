// src/interfaces/controllers/AuthController.ts
import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { LoginUser } from "../../application/use-cases/LoginUser";
import { UpdateUsername } from "../../application/use-cases/UpdateUsername";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export class AuthController {
  constructor(
    private registerUseCase: RegisterUser,
    private loginUseCase: LoginUser,
    private updateUsernameUseCase: UpdateUsername,
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        throw new Error("Faltan datos para completar el registro");
      }

      const result = await this.registerUseCase.execute(
        email,
        username,
        password,
      );

      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Faltan datos para iniciar sesión");
      }

      const result = await this.loginUseCase.execute(email, password);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async checkAuth(req: AuthenticatedRequest, res: Response) {
    try {
      res.status(200).json({
        message: "Autenticado",
        user: req.user,
      });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async updateUsername(req: AuthenticatedRequest, res: Response) {
    try {
      const { username } = req.body;

      if (!req.user?.id) {
        res.status(401).json({ error: "Usuario no autenticado" });
        return;
      }

      if (!username) {
        res.status(400).json({ error: "El username es obligatorio" });
        return;
      }

      const result = await this.updateUsernameUseCase.execute(
        req.user.id,
        username,
      );

      res.status(200).json({
        message: "Nombre de usuario actualizado correctamente",
        ...result,
      });
    } catch (err: any) {
      const message = err.message || "Error al actualizar username";

      if (message.includes("ya está en uso")) {
        res.status(409).json({ error: message });
        return;
      }

      if (message.includes("no encontrado")) {
        res.status(404).json({ error: message });
        return;
      }

      res.status(400).json({ error: message });
    }
  }
}