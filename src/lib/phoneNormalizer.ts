/**
 * Validates and normalizes Nigerian phone numbers.
 * Supports inputs like 08012345678, +2348012345678, 2348012345678, 8012345678.
 */
export function normalizeNigerianPhone(phone: string): { isValid: boolean; formatted: string; raw: string } {
  if (!phone) return { isValid: false, formatted: '', raw: '' };

  // Remove spaces, dashes, parentheses
  let cleaned = phone.trim().replace(/[\s\-\(\)\.]/g, '');

  if (cleaned.startsWith('+234')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('234')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.length === 10 && !cleaned.startsWith('0')) {
    cleaned = '0' + cleaned;
  }

  // A standard Nigerian mobile/landline number starts with 0 and has 11 digits
  const isValid = /^0\d{10}$/.test(cleaned);

  return {
    isValid,
    formatted: isValid ? `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}` : cleaned,
    raw: cleaned,
  };
}
