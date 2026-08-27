/**
 * Validates and normalizes Nigerian phone numbers.
 * Supports inputs like 08012345678, +2348012345678, 2348012345678, 8012345678.
 */
export function normalizeNigerianPhone(phone: string): { isValid: boolean; formatted: string; raw: string } {
  if (!phone) return { isValid: false, formatted: '', raw: '' };

  // Remove spaces, dashes, parentheses
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');

  if (cleaned.startsWith('+234')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('234')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.length === 10 && !cleaned.startsWith('0')) {
    cleaned = '0' + cleaned;
  }

  // A standard Nigerian phone number starts with 0 and has 11 digits
  // Prefixes: 070, 080, 081, 090, 091, etc.
  const isValid = /^0(70|80|81|90|91|71|82)\d{8}$/.test(cleaned);

  return {
    isValid,
    formatted: isValid ? `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}` : cleaned,
    raw: cleaned,
  };
}
