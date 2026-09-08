import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "portfolio-admin-secret";

export type AuthJwtPayload = {
  sub: string;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthJwtPayload;
    }
  }
}

export function signToken(payload: AuthJwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthJwtPayload;
}

export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);
    request.user = payload;
    next();
  } catch {
    response.status(401).json({ error: "Invalid or expired token" });
  }
}
