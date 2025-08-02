import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import { jwtUtils, JwtPayload } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "Access denied",
        message: "No token provided",
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const decoded = jwtUtils.verifyAccessToken(token);

      // Verify user still exists and is not banned
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          isBanned: true,
          banExpiresAt: true,
        },
      });

      if (!user) {
        res.status(401).json({
          error: "Access denied",
          message: "User not found",
        });
        return;
      }

      if (user.isBanned) {
        const isBanExpired =
          user.banExpiresAt && user.banExpiresAt < new Date();

        if (!isBanExpired) {
          res.status(403).json({
            error: "Account banned",
            message: "Your account has been banned",
            banExpiresAt: user.banExpiresAt,
          });
          return;
        } else {
          // Unban user if ban has expired
          await prisma.user.update({
            where: { id: user.id },
            data: {
              isBanned: false,
              banReason: null,
              banExpiresAt: null,
            },
          });
        }
      }

      // Add user to request object
      req.user = {
        ...decoded,
        id: decoded.userId,
      };

      next();
    } catch (tokenError) {
      logger.warn("Invalid token attempt:", {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        error:
          tokenError instanceof Error ? tokenError.message : "Unknown error",
      });

      res.status(401).json({
        error: "Access denied",
        message: "Invalid or expired token",
      });
      return;
    }
  } catch (error) {
    logger.error("Auth middleware error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Authentication failed",
    });
  }
};

// Role-based access control middleware
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: "Access denied",
        message: "Authentication required",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: "Access denied",
        message: "Insufficient permissions",
      });
      return;
    }

    next();
  };
};

// Admin access middleware
export const requireAdmin = requireRole(["ADMIN"]);

// Moderator or Admin access middleware
export const requireModerator = requireRole(["MOD", "ADMIN"]);

// VIP or higher access middleware
export const requireVIP = requireRole(["VIP", "VIP_PLUS", "MOD", "ADMIN"]);

// Optional auth middleware (doesn't fail if no token)
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next();
      return;
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwtUtils.verifyAccessToken(token);

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          isBanned: true,
        },
      });

      if (user && !user.isBanned) {
        req.user = {
          ...decoded,
          id: decoded.userId,
        };
      }
    } catch (tokenError) {
      // Silently ignore token errors in optional auth
      logger.debug("Optional auth token error:", tokenError);
    }

    next();
  } catch (error) {
    logger.error("Optional auth middleware error:", error);
    next();
  }
};

export default authMiddleware;
