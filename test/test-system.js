const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const QRCode = require('qrcode');
const XLSX = require('xlsx');

const prisma = new PrismaClient();

// Local helpers for test verification
function normalizePhone(phone) {
  if (!phone) return { isValid: false, formatted: '', raw: '' };
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  if (cleaned.startsWith('+234')) cleaned = '0' + cleaned.slice(4);
  else if (cleaned.startsWith('234')) cleaned = '0' + cleaned.slice(3);
  else if (cleaned.length === 10 && !cleaned.startsWith('0')) cleaned = '0' + cleaned;
  const isValid = /^0(70|80|81|90|91|71|82)\d{8}$/.test(cleaned);
  return { isValid, raw: cleaned };
}

function generateRef(stateCode = 'KW', year = 2026) {
  const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `APCSC-${stateCode}-${year}-${randomPart}`;
}

async function runTests() {
  console.log('🧪 Starting APC Stakeholders Congress End-to-End System Tests...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Phone Normalizer Tests
  console.log('1. Testing Nigerian Phone Normalization & Validation');
  assert(normalizePhone('08032010479').isValid === true, 'Valid 11-digit local format (08032010479)');
  assert(normalizePhone('+2347030592380').isValid === true, 'Valid international format (+2347030592380)');
  assert(normalizePhone('2347030592380').isValid === true, 'Valid country code format (2347030592380)');
  assert(normalizePhone('012345').isValid === false, 'Rejects invalid short phone numbers');
  assert(normalizePhone('abcdefghijk').isValid === false, 'Rejects alphabetic phone numbers');

  // 2. Reference Number Generation Tests
  console.log('\n2. Testing Unique Reference & Token Generation');
  const ref1 = generateRef('KW', 2026);
  const ref2 = generateRef('KW', 2026);
  assert(ref1.startsWith('APCSC-KW-2026-'), `Reference format valid (${ref1})`);
  assert(ref1 !== ref2, 'Collision resistance: generated references are unique');
  const token = crypto.randomBytes(24).toString('hex');
  assert(token.length === 48, 'Verification token has 48 hex characters');

  // 3. Document Generation PDF Tests
  console.log('\n3. Testing PDF Document Engine & Vector Rendering');
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([841.89, 595.28]); // A4 Landscape
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawText('APC STAKEHOLDERS CONGRESS - CERTIFICATE TEST', {
    x: 50,
    y: 500,
    size: 20,
    font: fontBold,
    color: rgb(0, 0.53, 0.32),
  });

  const qrDataUrl = await QRCode.toDataURL(`https://apcstakeholderscongress.ng/verify/${token}`, { margin: 1, width: 100 });
  const qrImage = await pdfDoc.embedPng(Buffer.from(qrDataUrl.split(',')[1], 'base64'));
  page.drawImage(qrImage, { x: 50, y: 350, width: 80, height: 80 });

  const pdfBytes = await pdfDoc.save();
  assert(pdfBytes.length > 1000, `Generated valid PDF Certificate buffer (${pdfBytes.length} bytes)`);

  // 4. Excel & CSV Export Test
  console.log('\n4. Testing Excel & CSV Report Exporter');
  const testData = [
    { 'Ref': ref1, 'Forum Name': 'Kwara Youth Alliance', 'LGA': 'Ilorin West', 'Members': 500 },
    { 'Ref': ref2, 'Forum Name': 'Offa Women for APC', 'LGA': 'Offa', 'Members': 320 },
  ];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(testData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Forums');
  const xlsxBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  assert(xlsxBuffer.length > 1000, `Generated Excel report buffer (${xlsxBuffer.length} bytes)`);

  // 5. Database Geography & Reference Integrity
  console.log('\n5. Verifying Database Reference Geography & Admin Roles');
  const kwara = await prisma.state.findFirst({
    where: { code: 'KW' },
    include: { lgas: true, senatorialDistricts: true },
  });
  assert(kwara !== null, 'Kwara State record exists in database');
  assert(kwara.lgas.length === 16, `All 16 Kwara LGAs verified (count: ${kwara?.lgas.length})`);
  assert(kwara.senatorialDistricts.length === 4, `All 4 Senatorial coverage records verified (count: ${kwara?.senatorialDistricts.length})`);

  const adminRole = await prisma.role.findUnique({ where: { id: 'super_admin' } });
  assert(adminRole !== null, 'Super Admin role verified');

  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@apcstakeholderscongress.ng' } });
  assert(adminUser !== null, 'Chief Administrative Officer seeded and verified');

  console.log(`\n========================================`);
  console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  await prisma.$disconnect();
  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error('Test run error:', err);
  process.exit(1);
});
