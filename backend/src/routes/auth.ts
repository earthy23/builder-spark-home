import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { prisma } from '@/lib/prisma';
import { jwtUtils } from '@/lib/jwt';
import { passwordUtils } from '@/lib/password';
import { logger } from '@/lib/logger';
import { redisHelpers } from '@/lib/redis';
import { authMiddleware } from '@/middleware/auth';
import { asyncHandler, createError } from '@/middleware/errorHandler';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    error: 'Too many authentication attempts',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 reset attempts per hour
  message: {
    error: 'Too many password reset attempts',
    message: 'Please try again later'
  }
});

// Validation rules
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('displayName')
    .isLength({ min: 1, max: 50 })
    .trim()
    .withMessage('Display name must be 1-50 characters'),
  body('password')
    .custom((value) => {
      const validation = passwordUtils.validateStrength(value);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      return true;
    })
];

const loginValidation = [
  body('usernameOrEmail')
    .notEmpty()
    .withMessage('Username or email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Register endpoint
router.post('/register', authLimiter, registerValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
    return;
  }

  const { username, email, displayName, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() }
      ]
    }
  });

  if (existingUser) {
    res.status(409).json({
      error: 'User already exists',
      message: existingUser.username === username.toLowerCase() 
        ? 'Username is already taken' 
        : 'Email is already registered'
    });
    return;
  }

  // Hash password
  const hashedPassword = await passwordUtils.hash(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      displayName,
      password: hashedPassword,
      role: UserRole.MEMBER
    },
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
      role: true,
      joinedAt: true
    }
  });

  // Generate tokens
  const accessToken = jwtUtils.generateAccessToken({
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  });

  const refreshTokenId = passwordUtils.generateSecureToken();
  const refreshToken = jwtUtils.generateRefreshToken({
    userId: user.id,
    tokenId: refreshTokenId
  });

  // Store refresh token in database
  await prisma.refreshToken.create({
    data: {
      id: refreshTokenId,
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  });

  logger.info('User registered successfully:', { userId: user.id, username: user.username });

  res.status(201).json({
    message: 'Registration successful',
    user,
    tokens: {
      accessToken,
      refreshToken
    }
  });
}));

// Login endpoint
router.post('/login', authLimiter, loginValidation, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
    return;
  }

  const { usernameOrEmail, password } = req.body;

  // Find user by username or email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: usernameOrEmail.toLowerCase() },
        { email: usernameOrEmail.toLowerCase() }
      ]
    }
  });

  if (!user) {
    res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid credentials'
    });
    return;
  }

  // Check if user is banned
  if (user.isBanned) {
    const isBanExpired = user.banExpiresAt && user.banExpiresAt < new Date();
    
    if (!isBanExpired) {
      res.status(403).json({
        error: 'Account banned',
        message: user.banReason || 'Your account has been banned',
        banExpiresAt: user.banExpiresAt
      });
      return;
    }
  }

  // Verify password
  const isPasswordValid = await passwordUtils.verify(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid credentials'
    });
    return;
  }

  // Update last seen and unban if expired
  const updateData: any = { lastSeen: new Date() };
  if (user.isBanned && user.banExpiresAt && user.banExpiresAt < new Date()) {
    updateData.isBanned = false;
    updateData.banReason = null;
    updateData.banExpiresAt = null;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData
  });

  // Generate tokens
  const accessToken = jwtUtils.generateAccessToken({
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  });

  const refreshTokenId = passwordUtils.generateSecureToken();
  const refreshToken = jwtUtils.generateRefreshToken({
    userId: user.id,
    tokenId: refreshTokenId
  });

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      id: refreshTokenId,
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  // Store user session in Redis
  await redisHelpers.setex(`user:${user.id}:session`, 24 * 60 * 60, JSON.stringify({
    userId: user.id,
    username: user.username,
    loginTime: new Date().toISOString()
  }));

  logger.info('User logged in successfully:', { userId: user.id, username: user.username });

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      avatar: user.avatar,
      joinedAt: user.joinedAt
    },
    tokens: {
      accessToken,
      refreshToken
    }
  });
}));

// Refresh token endpoint
router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({
      error: 'Refresh token required',
      message: 'No refresh token provided'
    });
    return;
  }

  try {
    const decoded = jwtUtils.verifyRefreshToken(refreshToken);
    
    // Check if refresh token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { id: decoded.tokenId },
      include: { user: true }
    });

    if (!storedToken || storedToken.token !== refreshToken) {
      res.status(401).json({
        error: 'Invalid refresh token',
        message: 'Refresh token not found or invalid'
      });
      return;
    }

    if (storedToken.expiresAt < new Date()) {
      // Clean up expired token
      await prisma.refreshToken.delete({
        where: { id: decoded.tokenId }
      });

      res.status(401).json({
        error: 'Refresh token expired',
        message: 'Please log in again'
      });
      return;
    }

    // Generate new access token
    const accessToken = jwtUtils.generateAccessToken({
      userId: storedToken.user.id,
      username: storedToken.user.username,
      email: storedToken.user.email,
      role: storedToken.user.role
    });

    res.json({
      message: 'Token refreshed successfully',
      accessToken
    });
  } catch (error) {
    res.status(401).json({
      error: 'Invalid refresh token',
      message: 'Token verification failed'
    });
  }
}));

// Logout endpoint
router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    try {
      const decoded = jwtUtils.verifyRefreshToken(refreshToken);
      await prisma.refreshToken.delete({
        where: { id: decoded.tokenId }
      });
    } catch (error) {
      // Ignore invalid refresh tokens
      logger.debug('Invalid refresh token on logout:', error);
    }
  }

  // Remove session from Redis
  await redisHelpers.del(`user:${req.user!.id}:session`);

  logger.info('User logged out:', { userId: req.user!.id });

  res.json({
    message: 'Logout successful'
  });
}));

// Logout all devices
router.post('/logout-all', authMiddleware, asyncHandler(async (req, res) => {
  // Delete all refresh tokens for the user
  await prisma.refreshToken.deleteMany({
    where: { userId: req.user!.id }
  });

  // Remove session from Redis
  await redisHelpers.del(`user:${req.user!.id}:session`);

  logger.info('User logged out from all devices:', { userId: req.user!.id });

  res.json({
    message: 'Logged out from all devices'
  });
}));

// Get current user
router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
      avatar: true,
      role: true,
      status: true,
      bio: true,
      joinedAt: true,
      lastSeen: true,
      isVerified: true,
      totalPlayTime: true,
      gamesPlayed: true,
      messagesCount: true
    }
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    user
  });
}));

// Verify email endpoint (placeholder)
router.post('/verify-email', asyncHandler(async (req, res) => {
  // This would typically involve sending an email with a verification link
  res.json({
    message: 'Email verification not implemented yet'
  });
}));

// Password reset request (placeholder)
router.post('/reset-password', resetLimiter, asyncHandler(async (req, res) => {
  // This would typically involve sending a password reset email
  res.json({
    message: 'Password reset not implemented yet'
  });
}));

export default router;
