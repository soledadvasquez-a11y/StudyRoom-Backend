import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'studyroom-secret-key';
export const JWT_EXPIRES_IN = '8h';

export interface AuthenticatedRequest extends Request {
  user?: { username: string };
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado: token no proporcionado' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { username: string };
    req.user = { username: payload.username };
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}
