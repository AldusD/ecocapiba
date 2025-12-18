import crypto from 'crypto';

export function generateInvitationCode(length: number = 8): string {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, length)
    .toUpperCase();
}

