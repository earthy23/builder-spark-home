import bcrypt from "bcryptjs";
import crypto from "crypto";
import { logger } from "./logger";

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12");

export const passwordUtils = {
  // Hash password
  hash: async (password: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      logger.error("Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  },

  // Verify password
  verify: async (
    password: string,
    hashedPassword: string,
  ): Promise<boolean> => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      logger.error("Error verifying password:", error);
      throw new Error("Failed to verify password");
    }
  },

  // Generate random password
  generateRandom: (length: number = 12): string => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }

    return password;
  },

  // Validate password strength
  validateStrength: (
    password: string,
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (password.length > 128) {
      errors.push("Password must be less than 128 characters long");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    // Check for common patterns
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /letmein/i,
    ];

    if (commonPatterns.some((pattern) => pattern.test(password))) {
      errors.push("Password contains common patterns and is not secure");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Generate secure random token
  generateSecureToken: (length: number = 32): string => {
    return crypto.randomBytes(length).toString("hex");
  },

  // Generate verification code
  generateVerificationCode: (length: number = 6): string => {
    const digits = "0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, digits.length);
      code += digits[randomIndex];
    }

    return code;
  },
};

export default passwordUtils;
