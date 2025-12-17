import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: number): string {
  const secret = process.env.JWT_SECRET_KEY || 'test-secret-key';
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  const secret = process.env.JWT_SECRET_KEY || 'test-secret-key';
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
}
