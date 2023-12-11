import jwt from 'jsonwebtoken';
// Env variables
import { JWT_EXPIRY, JWT_SECRET } from './config.js';

// Create JWT token contianing user ID and email
export const createAccessToken = (id, email) => {
  return jwt.sign({ id, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};
