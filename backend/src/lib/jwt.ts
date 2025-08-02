import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { logger } from './logger';

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT secrets must be defined in environment variables');
}

export const jwtUtils = {
  // Generate access token
  generateAccessToken: (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
    try {
      return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'uec-launcher',
        audience: 'uec-launcher-users'
      });
    } catch (error) {
      logger.error('Error generating access token:', error);
      throw new Error('Failed to generate access token');
    }
  },

  // Generate refresh token
  generateRefreshToken: (payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string => {
    try {
      return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
        issuer: 'uec-launcher',
        audience: 'uec-launcher-refresh'
      });
    } catch (error) {
      logger.error('Error generating refresh token:', error);
      throw new Error('Failed to generate refresh token');
    }
  },

  // Verify access token
  verifyAccessToken: (token: string): JwtPayload => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: 'uec-launcher',
        audience: 'uec-launcher-users'
      }) as JwtPayload;
      
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      } else {
        logger.error('Error verifying access token:', error);
        throw new Error('Token verification failed');
      }
    }
  },

  // Verify refresh token
  verifyRefreshToken: (token: string): RefreshTokenPayload => {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
        issuer: 'uec-launcher',
        audience: 'uec-launcher-refresh'
      }) as RefreshTokenPayload;
      
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      } else {
        logger.error('Error verifying refresh token:', error);
        throw new Error('Refresh token verification failed');
      }
    }
  },

  // Decode token without verification (for debugging)
  decodeToken: (token: string): any => {
    try {
      return jwt.decode(token);
    } catch (error) {
      logger.error('Error decoding token:', error);
      return null;
    }
  },

  // Get token expiration time
  getTokenExpiration: (token: string): Date | null => {
    try {
      const decoded = jwt.decode(token) as any;
      if (decoded && decoded.exp) {
        return new Date(decoded.exp * 1000);
      }
      return null;
    } catch (error) {
      logger.error('Error getting token expiration:', error);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwt.decode(token) as any;
      if (decoded && decoded.exp) {
        return Date.now() >= decoded.exp * 1000;
      }
      return true;
    } catch (error) {
      logger.error('Error checking token expiration:', error);
      return true;
    }
  }
};

export default jwtUtils;
