const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Seeding APC Stakeholders Congress reference data...');

  // 1. Country & Geopolitical Zones
  const country = await prisma.country.upsert({
    where: { id: 'NGA' },
    update: {},
    create: {
      id: 'NGA',
      name: 'Nigeria',
      isActive: true,
    },
  });

  const northCentral = await prisma.geopoliticalZone.upsert({
    where: { code: 'NC' },
    update: {},
    create: {
      name: 'North Central',
      code: 'NC',
      countryId: country.id,
    },
  });

  // 2. Kwara State
  const kwaraState = await prisma.state.upsert({
    where: { code: 'KW' },
    update: { isActive: true },
    create: {
      name: 'Kwara',
      code: 'KW',
      zoneId: northCentral.id,
      isActive: true,
    },
  });

  // 3. Senatorial Districts
  const districtsData = [
    { name: 'Kwara Central', code: 'KW-C' },
    { name: 'Kwara North', code: 'KW-N' },
    { name: 'Kwara South', code: 'KW-S' },
    { name: 'Kwara State at Large', code: 'KW-ALL' },
  ];

  const districtMap = {};
  for (const d of districtsData) {
    const existing = await prisma.senatorialDistrict.findFirst({
      where: { stateId: kwaraState.id, name: d.name },
    });
    if (existing) {
      districtMap[d.name] = existing;
    } else {
      districtMap[d.name] = await prisma.senatorialDistrict.create({
        data: {
          name: d.name,
          code: d.code,
          stateId: kwaraState.id,
        },
      });
    }
  }

  // 4. Kwara 16 LGAs categorized by Senatorial District
  const lgasData = [
    // Kwara North
    { name: 'Baruten', code: 'KW-BAR', district: 'Kwara North' },
    { name: 'Edu', code: 'KW-EDU', district: 'Kwara North' },
    { name: 'Kaiama', code: 'KW-KAI', district: 'Kwara North' },
    { name: 'Moro', code: 'KW-MOR', district: 'Kwara North' },
    { name: 'Pategi', code: 'KW-PAT', district: 'Kwara North' },

    // Kwara Central
    { name: 'Asa', code: 'KW-ASA', district: 'Kwara Central' },
    { name: 'Ilorin East', code: 'KW-ILE', district: 'Kwara Central' },
    { name: 'Ilorin South', code: 'KW-ILS', district: 'Kwara Central' },
    { name: 'Ilorin West', code: 'KW-ILW', district: 'Kwara Central' },

    // Kwara South
    { name: 'Ekiti', code: 'KW-EKT', district: 'Kwara South' },
    { name: 'Ifelodun', code: 'KW-IFE', district: 'Kwara South' },
    { name: 'Irepodun', code: 'KW-IRE', district: 'Kwara South' },
    { name: 'Isin', code: 'KW-ISN', district: 'Kwara South' },
    { name: 'Offa', code: 'KW-OFF', district: 'Kwara South' },
    { name: 'Oke Ero', code: 'KW-OKE', district: 'Kwara South' },
    { name: 'Oyun', code: 'KW-OYU', district: 'Kwara South' },
  ];

  const lgaMap = {};
  for (const lga of lgasData) {
    const district = districtMap[lga.district];
    const existing = await prisma.lga.findFirst({
      where: { stateId: kwaraState.id, name: lga.name },
    });
    if (existing) {
      lgaMap[lga.name] = existing;
    } else {
      lgaMap[lga.name] = await prisma.lga.create({
        data: {
          name: lga.name,
          code: lga.code,
          stateId: kwaraState.id,
          senatorialDistrictId: district ? district.id : null,
          isActive: true,
        },
      });
    }
  }

  // 5. Authoritative Wards for Key LGAs
  const wardsData = [
    // Ilorin West
    { lga: 'Ilorin West', name: 'Ajikobi' },
    { lga: 'Ilorin West', name: 'Alanamu' },
    { lga: 'Ilorin West', name: 'Badari' },
    { lga: 'Ilorin West', name: 'Baboko' },
    { lga: 'Ilorin West', name: 'Magaji Ngeri' },
    { lga: 'Ilorin West', name: 'Oko-Erin' },
    { lga: 'Ilorin West', name: 'Oloje' },
    { lga: 'Ilorin West', name: 'Ubandawaki' },
    { lga: 'Ilorin West', name: 'Wara/Oshin/Egbejila' },
    { lga: 'Ilorin West', name: 'Adewole' },

    // Ilorin East
    { lga: 'Ilorin East', name: 'Balogun Gambari' },
    { lga: 'Ilorin East', name: 'Ibagun' },
    { lga: 'Ilorin East', name: 'Magaji Are' },
    { lga: 'Ilorin East', name: 'Zango' },
    { lga: 'Ilorin East', name: 'Marafa/Pepele' },
    { lga: 'Ilorin East', name: 'Maya/Elesinmeta' },
    { lga: 'Ilorin East', name: 'Oke-Oyi/Oshin' },

    // Ilorin South
    { lga: 'Ilorin South', name: 'Akanbi I' },
    { lga: 'Ilorin South', name: 'Akanbi II' },
    { lga: 'Ilorin South', name: 'Balogun Fulani I' },
    { lga: 'Ilorin South', name: 'Balogun Fulani II' },
    { lga: 'Ilorin South', name: 'Okaka I' },
    { lga: 'Ilorin South', name: 'Okaka II' },

    // Offa
    { lga: 'Offa', name: 'Balogun' },
    { lga: 'Offa', name: 'Essa A' },
    { lga: 'Offa', name: 'Essa B' },
    { lga: 'Offa', name: 'Ojomu Central I' },
    { lga: 'Offa', name: 'Ojomu Central II' },
    { lga: 'Offa', name: 'Shawo Central' },

    // Edu
    { lga: 'Edu', name: 'Lafiagi I' },
    { lga: 'Edu', name: 'Lafiagi II' },
    { lga: 'Edu', name: 'Tsaragi I' },
    { lga: 'Edu', name: 'Tsonga I' },
  ];

  for (const w of wardsData) {
    const lga = lgaMap[w.lga];
    if (lga) {
      const existing = await prisma.ward.findFirst({
        where: { lgaId: lga.id, name: w.name },
      });
      if (!existing) {
        await prisma.ward.create({
          data: {
            lgaId: lga.id,
            name: w.name,
            isActive: true,
          },
        });
      }
    }
  }

  // 6. Administrative Roles
  const roles = [
    { id: 'super_admin', name: 'Super Admin', description: 'Full system control and user administration' },
    { id: 'state_admin', name: 'State Admin', description: 'Kwara registration management and operational reporting' },
    { id: 'verification_officer', name: 'Verification Officer', description: 'Registration review, verification, and audit signoff' },
    { id: 'content_editor', name: 'Content Editor', description: 'Manages announcements, news, events, and media gallery' },
    { id: 'reporting_viewer', name: 'Reporting Viewer', description: 'Read-only access to operational dashboards and exports' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { id: r.id },
      update: { name: r.name, description: r.description },
      create: r,
    });
  }

  // 7. Default Administrator Users
  const defaultPassword = await bcrypt.hash('ApcCongress2027!', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@apcstakeholderscongress.ng' },
    update: {},
    create: {
      email: 'admin@apcstakeholderscongress.ng',
      passwordHash: defaultPassword,
      fullName: 'Chief Administrative Officer',
      phoneNumber: '07030592380',
      roleId: 'super_admin',
      stateId: kwaraState.id,
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'verifier@apcstakeholderscongress.ng' },
    update: {},
    create: {
      email: 'verifier@apcstakeholderscongress.ng',
      passwordHash: defaultPassword,
      fullName: 'Lead Verification Officer',
      phoneNumber: '08032010479',
      roleId: 'verification_officer',
      stateId: kwaraState.id,
      isActive: true,
    },
  });

  // 8. Seed Sample Announcements
  const announcements = [
    {
      title: 'Official Launch of Kwara State Stakeholders Registry',
      body: 'All APC-aligned forums, support groups, and grassroots associations across the 16 LGAs of Kwara State are invited to complete their formal registration for party harmonization and 2027 victory preparation.',
      targetAudience: 'all',
      status: 'published',
    },
    {
      title: 'Registration Verification Protocol & Document Issuance',
      body: 'Verified groups will automatically receive official digitally signed Certificates of Registration and Letters of Recognition upon completion of verification by the State Directorate.',
      targetAudience: 'registered_forums',
      status: 'published',
    },
  ];

  for (const ann of announcements) {
    const existing = await prisma.announcement.findFirst({ where: { title: ann.title } });
    if (!existing) {
      await prisma.announcement.create({ data: ann });
    }
  }

  // 9. Seed Sample News
  const newsItems = [
    {
      title: 'APC Stakeholders Congress Accelerates Grassroots Mobilization in Kwara State',
      slug: 'apc-stakeholders-congress-accelerates-grassroots-mobilization',
      excerpt: 'Stakeholders and party leaders convene at the State Secretariat on Fate Road, Ilorin, reaffirming unity and party supremacy.',
      body: 'The APC Stakeholders Congress Kwara State Chapter has commenced the formal integration and digital registration of all affiliated associations and support groups. The initiative aims to harmonize grassroots structures ahead of 2027.',
      category: 'Mobilization',
      status: 'published',
      authorId: adminUser.id,
    },
  ];

  for (const news of newsItems) {
    const existing = await prisma.newsPost.findFirst({ where: { slug: news.slug } });
    if (!existing) {
      await prisma.newsPost.create({ data: news });
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
