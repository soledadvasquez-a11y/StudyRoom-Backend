// src/shared/auth/jwt.ts
import jwt, { type SignOptions } from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "studyroom-secret-key";
export const JWT_EXPIRES_IN = "8h";

export interface AuthTokenPayload {
  id: string;
  email: string;
  username: string;
}

export function generateAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}
