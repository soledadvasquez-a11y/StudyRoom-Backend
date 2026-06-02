// src/interfaces/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import {
  type AuthTokenPayload,
  verifyAuthToken,
} from "../../shared/auth/jwt";

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Acceso denegado: token no proporcionado" });
    return;
  }

  try {
    const payload = verifyAuthToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };

    next();
  } catch {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
}