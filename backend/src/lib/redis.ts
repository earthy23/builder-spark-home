import { createClient } from "redis";
import { logger } from "./logger";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({
  url: redisUrl,
  retry_strategy: (options) => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      logger.error("Redis server refused connection");
      return new Error("Redis server refused connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      logger.error("Redis retry time exhausted");
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      logger.error("Redis max retry attempts reached");
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

redisClient.on("error", (err) => {
  logger.error("Redis client error:", err);
});

redisClient.on("connect", () => {
  logger.info("Redis client connected");
});

redisClient.on("reconnecting", () => {
  logger.info("Redis client reconnecting");
});

redisClient.on("ready", () => {
  logger.info("Redis client ready");
});

redisClient.on("end", () => {
  logger.info("Redis client connection ended");
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error("Failed to connect to Redis:", error);
  }
})();

// Helper functions for common Redis operations
export const redisHelpers = {
  // Set with expiration
  setex: async (key: string, seconds: number, value: string) => {
    return await redisClient.setEx(key, seconds, value);
  },

  // Get value
  get: async (key: string) => {
    return await redisClient.get(key);
  },

  // Delete key
  del: async (key: string) => {
    return await redisClient.del(key);
  },

  // Set hash field
  hset: async (key: string, field: string, value: string) => {
    return await redisClient.hSet(key, field, value);
  },

  // Get hash field
  hget: async (key: string, field: string) => {
    return await redisClient.hGet(key, field);
  },

  // Get all hash fields
  hgetall: async (key: string) => {
    return await redisClient.hGetAll(key);
  },

  // Add to set
  sadd: async (key: string, member: string) => {
    return await redisClient.sAdd(key, member);
  },

  // Remove from set
  srem: async (key: string, member: string) => {
    return await redisClient.sRem(key, member);
  },

  // Get set members
  smembers: async (key: string) => {
    return await redisClient.sMembers(key);
  },

  // Check if member exists in set
  sismember: async (key: string, member: string) => {
    return await redisClient.sIsMember(key, member);
  },

  // Increment counter
  incr: async (key: string) => {
    return await redisClient.incr(key);
  },

  // Decrement counter
  decr: async (key: string) => {
    return await redisClient.decr(key);
  },

  // Set expiration
  expire: async (key: string, seconds: number) => {
    return await redisClient.expire(key, seconds);
  },
};

export default redisClient;
