import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { LoginUser } from "../../application/use-cases/LoginUser";

export class AuthController {
  constructor(
    private registerUseCase: RegisterUser,
    private loginUseCase: LoginUser,
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

  async checkAuth(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Autenticado", user: (req as any).user });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }
}
