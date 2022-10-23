import crypto from 'crypto';

export function generateSessionId() {
    return crypto.randomBytes(16).toString('base64');
}