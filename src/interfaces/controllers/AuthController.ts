import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginUseCase } from '../../application/LoginUseCase';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../middleware/authMiddleware';

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
      }

      const result = await this.loginUseCase.execute(username, password);

      if (result.success && result.username) {
        // Generar el token JWT con el username como payload
        const token = jwt.sign(
          { username: result.username },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
          success: true,
          message: result.message,
          token,
        });
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

