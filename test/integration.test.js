const { PrismaClient } = require('@prisma/client');
const { generateRegistrationRef, generateVerificationToken } = require('../src/lib/refGenerator');
const { normalizeNigerianPhone } = require('../src/lib/phoneNormalizer');
const { fullRegistrationSchema } = require('../src/lib/validators');
const { generateCertificatePdf, generateLetterOfRecognitionPdf } = require('../src/lib/documentGenerator');
const * as XLSX from 'xlsx';

const prisma = new PrismaClient();

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
  assert(normalizeNigerianPhone('08032010479').isValid === true, 'Valid 11-digit local format (08032010479)');
  assert(normalizeNigerianPhone('+2347030592380').isValid === true, 'Valid international format (+2347030592380)');
  assert(normalizeNigerianPhone('2347030592380').isValid === true, 'Valid country code format (2347030592380)');
  assert(normalizeNigerianPhone('012345').isValid === false, 'Rejects invalid short phone numbers');
  assert(normalizeNigerianPhone('abcdefghijk').isValid === false, 'Rejects alphabetic phone numbers');

  // 2. Reference Number Generation Tests
  console.log('\n2. Testing Unique Reference & Token Generation');
  const ref1 = generateRegistrationRef('KW', 2026);
  const ref2 = generateRegistrationRef('KW', 2026);
  assert(ref1.startsWith('APCSC-KW-2026-'), `Reference format valid (${ref1})`);
  assert(ref1 !== ref2, 'Collision resistance: generated references are unique');
  const token = generateVerificationToken();
  assert(token.length === 48, 'Verification token has 48 hex characters');

  // 3. Zod Registration Schema Tests
  console.log('\n3. Testing Registration Zod Validation Schemas');
  const validPayload = {
    name: 'Kwara Progressive Youth Front',
    acronym: 'KPYF',
    motto: 'Progress & Unity',
    yearEstablished: 2021,
    areaOfCoverage: 'Kwara Central',
    lgaId: 1,
    officeAddress: 'No 15 Stadium Road, Ilorin',
    coordinatorName: 'Comrade Abdulrasheed Sanni',
    coordinatorPhone: '08032010479',
    coordinatorEmail: 'coordinator@kpyf.org',
    secretaryName: 'Fatima Aliyu',
    secretaryPhone: '07030592380',
    totalStrength: 450,
    keyActivities: ['Voter Mobilization', 'Sensitization / Awareness'],
    hasWhatsappGroup: true,
    whatsappGroupLink: 'https://chat.whatsapp.com/test1234',
    previousElectionActivity: 'Both 2019 and 2023',
    commitWork2027: true,
    agreeWithCongress: true,
    declarationConfirmed: true,
    consentDataProcessing: true,
    supportNeeded: ['Training', 'Branded Materials'],
    willingAttendMeetings: 'Yes',
  };

  const validationResult = fullRegistrationSchema.safeParse(validPayload);
  assert(validationResult.success === true, 'Valid full registration payload passes schema validation');

  // Future year test
  const futureYearPayload = { ...validPayload, yearEstablished: 2035 };
  assert(fullRegistrationSchema.safeParse(futureYearPayload).success === false, 'Rejects future establishment year');

  // Missing declaration consent test
  const noConsentPayload = { ...validPayload, declarationConfirmed: false };
  assert(fullRegistrationSchema.safeParse(noConsentPayload).success === false, 'Rejects registration without declaration confirmed');

  // 4. Document Generation Engine Tests
  console.log('\n4. Testing PDF Certificate & Letter Generation Engine');
  const testForumData = {
    id: 'test-uuid-1234',
    name: 'Kwara Progressive Youth Front',
    registrationRef: ref1,
    lgaName: 'Ilorin West',
    areaOfCoverage: 'Kwara Central',
    stateName: 'Kwara State',
    yearEstablished: 2021,
    approvedAt: new Date(),
    coordinatorName: 'Comrade Abdulrasheed Sanni',
  };

  const certBuffer = await generateCertificatePdf(testForumData, token);
  assert(Buffer.isBuffer(certBuffer) && certBuffer.length > 5000, `Certificate PDF generated (${certBuffer.length} bytes)`);

  const letterBuffer = await generateLetterOfRecognitionPdf(testForumData, token);
  assert(Buffer.isBuffer(letterBuffer) && letterBuffer.length > 5000, `Letter of Recognition PDF generated (${letterBuffer.length} bytes)`);

  // 5. Database & Geography Verification
  console.log('\n5. Verifying Database Reference Geography & Admin Roles');
  const kwara = await prisma.state.findFirst({
    where: { code: 'KW' },
    include: { lgas: true, senatorialDistricts: true },
  });
  assert(kwara !== null, 'Kwara State record exists');
  assert(kwara.lgas.length === 16, `All 16 Kwara LGAs seeded (found ${kwara?.lgas.length})`);
  assert(kwara.senatorialDistricts.length >= 3, `Senatorial districts seeded (found ${kwara?.senatorialDistricts.length})`);

  const adminRole = await prisma.role.findUnique({ where: { id: 'super_admin' } });
  assert(adminRole !== null, 'Super Admin role configured');

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
