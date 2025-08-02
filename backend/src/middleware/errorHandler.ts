import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { logger } from "@/lib/logger";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const createError = (
  message: string,
  statusCode: number = 500,
): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = 500;
  let message = "Internal server error";
  let details: any = undefined;

  // Log the error
  logger.error("Error caught by error handler:", {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    userId: req.user?.id,
  });

  // Handle different types of errors
  if ("statusCode" in error && error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma errors
    switch (error.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate entry found";
        if (error.meta?.target) {
          const field = Array.isArray(error.meta.target)
            ? error.meta.target[0]
            : error.meta.target;
          details = { field, message: `${field} already exists` };
        }
        break;
      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;
      case "P2003":
        statusCode = 400;
        message = "Foreign key constraint failed";
        break;
      case "P2014":
        statusCode = 400;
        message = "Invalid data provided";
        break;
      default:
        statusCode = 500;
        message = "Database error occurred";
        break;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data format";
  } else if (error instanceof SyntaxError && "body" in error) {
    statusCode = 400;
    message = "Invalid JSON in request body";
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = error.message;
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid data format";
  } else if (error.name === "MulterError") {
    statusCode = 400;
    message = "File upload error";
    details = error.message;
  }

  // Don't leak error details in production
  const isProduction = process.env.NODE_ENV === "production";

  const errorResponse: any = {
    error: message,
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method,
    statusCode,
  };

  if (details && !isProduction) {
    errorResponse.details = details;
  }

  if (!isProduction) {
    errorResponse.stack = error.stack;
  }

  // Add request ID if available
  if (req.headers["x-request-id"]) {
    errorResponse.requestId = req.headers["x-request-id"];
  }

  res.status(statusCode).json(errorResponse);
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    statusCode: 404,
  });
};

export default errorHandler;
