import crypto from 'crypto';

/**
 * Generates a unique, collision-resistant Registration Reference Number.
 * Format: APCSC-KW-2026-XXXXXX
 */
export function generateRegistrationRef(stateCode = 'KW', year = 2026): string {
  const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars
  return `APCSC-${stateCode}-${year}-${randomPart}`;
}

/**
 * Generates a secure, non-predictable token for QR document verification.
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(24).toString('hex');
}

/**
 * Generates a SHA-256 integrity hash of a PDF buffer.
 */
export function generateDocumentHash(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}
