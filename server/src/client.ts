import { createClient } from 'redis';
import 'dotenv/config';

export const redisClient = createClient({
  url: process.env.DATABASE_URL,
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.log('Could not connect to Redis: ' + err);
  }
};
