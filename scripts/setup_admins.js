const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Setting up 3 designated Admin accounts...');

  // 1. Create / Ensure Roles exist
  const roles = [
    {
      id: 'super_admin',
      name: 'Super Administrator',
      description: 'Full system access, admin management, forum verification, CMS and data export.',
    },
    {
      id: 'reporting_viewer',
      name: 'DG / Reporting Viewer',
      description: 'Read-only access to view submitted registrations and export reports to Excel/CSV.',
    },
    {
      id: 'content_editor',
      name: 'Media & Operations Editor',
      description: 'Access to view and export registrations, publish News, Announcements, and Gallery.',
    },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { id: r.id },
      update: { name: r.name, description: r.description },
      create: r,
    });
  }

  // 2. Delete old admin if exists
  try {
    await prisma.user.deleteMany({
      where: {
        email: 'admin@apcstakeholderscongress.ng',
      },
    });
    console.log('Deleted old generic admin account.');
  } catch (e) {
    console.log('No old admin account to delete or already removed.');
  }

  // Common password default or individual
  const defaultPassword = 'ApcCongress2027!';
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  // 3. Create the 3 specific Admins
  const admins = [
    {
      email: '33kahuna@apcstakeholderscongress.ng',
      fullName: '33kahuna (State Administrator)',
      roleId: 'super_admin',
      phoneNumber: '07030592380',
    },
    {
      email: 'dghakeem@apcstakeholderscongress.ng',
      fullName: 'Dr. Hakeem Babalola Akande (Director General)',
      roleId: 'reporting_viewer',
      phoneNumber: '08032010479',
    },
    {
      email: 'apcscarewa@apcstakeholderscongress.ng',
      fullName: 'APCSC Arewa (Media & Operations)',
      roleId: 'content_editor',
      phoneNumber: '07031693124',
    },
  ];

  for (const adm of admins) {
    const existing = await prisma.user.findUnique({
      where: { email: adm.email },
    });

    if (existing) {
      await prisma.user.update({
        where: { email: adm.email },
        data: {
          fullName: adm.fullName,
          roleId: adm.roleId,
          passwordHash: passwordHash,
          isActive: true,
        },
      });
      console.log(`Updated admin: ${adm.email} (${adm.roleId})`);
    } else {
      await prisma.user.create({
        data: {
          email: adm.email,
          fullName: adm.fullName,
          roleId: adm.roleId,
          passwordHash: passwordHash,
          phoneNumber: adm.phoneNumber,
          isActive: true,
        },
      });
      console.log(`Created admin: ${adm.email} (${adm.roleId})`);
    }
  }

  console.log('All 3 admins configured successfully!');
}

main()
  .catch((e) => {
    console.error('Setup error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
