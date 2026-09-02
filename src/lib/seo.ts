import type { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'APC Stakeholders Congress',
  shortName: 'APC Congress',
  chapterName: 'Kwara State Chapter',
  canonicalDomain: 'https://apcstakeholderscongress.org.ng',
  officialTagline: 'Uniting APC Stakeholders for Victory 2027',
  defaultTitle: 'APC Stakeholders Congress | Kwara State',
  titleTemplate: '%s | APC Stakeholders Congress',
  defaultDescription:
    'APC Stakeholders Congress is the official platform for APC forums, associations and support groups in Kwara State to register, connect, obtain official accreditation and coordinate grassroots engagement for Victory 2027.',
  parentOrganization: 'All Progressives Congress (APC)',
  secretariatAddress: {
    streetAddress: 'APC Kwara North House, Fate Road',
    addressLocality: 'Ilorin',
    addressRegion: 'Kwara State',
    postalCode: '240001',
    addressCountry: 'NG',
  },
  contact: {
    email: 'apcstakeholderscongress@gmail.com',
    phones: ['+2347030592380', '+2348032010479', '+2347031693124'],
    displayPhones: '07030592380, 08032010479, 07031693124',
    officeHours: 'Mo-Fr 09:00-17:00',
  },
  social: {
    whatsappCommunity: 'https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f',
  },
  images: {
    ogDefault: '/images/official-logo.png',
    nationalLogo: '/images/apc-national-logo.png',
    heroDefault: '/images/hero/1.png',
  },
  keywords: [
    'APC Stakeholders Congress',
    'APC Stakeholders Congress Kwara',
    'APC Stakeholders Congress Nigeria',
    'APC forums in Kwara',
    'APC support groups in Kwara',
    'APC associations in Kwara',
    'register APC forum',
    'register APC association',
    'APC forum registration',
    'APC support group registration',
    'verified APC groups',
    'APC groups in Kwara',
    'APC grassroots groups',
    'APC stakeholders Kwara',
    'APC stakeholders registration',
    'APC forum verification',
    'APC forums Ilorin',
    'APC groups in Ilorin',
    'APC Kwara North',
    'APC Kwara Central',
    'APC Kwara South',
    'Victory 2027 Kwara',
  ],
};

/**
 * Clean slug generator for forums, news, and geographical entities.
 * Strips accents, punctuation, handles Nigerian titles/names cleanly.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export interface MetadataOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

/**
 * Standardized metadata builder enforcing absolute canonical URLs,
 * Open Graph, Twitter Large Cards, and indexing directives.
 */
export function buildMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description = SITE_CONFIG.defaultDescription,
    canonicalPath = '',
    image = SITE_CONFIG.images.ogDefault,
    type = 'website',
    noIndex = false,
    publishedTime,
    modifiedTime,
    authors = ['APC Stakeholders Congress Directorate'],
    keywords = SITE_CONFIG.keywords,
  } = options;

  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = `${SITE_CONFIG.canonicalDomain}${cleanPath === '/' ? '' : cleanPath}`;
  const imageUrl = image.startsWith('http')
    ? image
    : `${SITE_CONFIG.canonicalDomain}${image.startsWith('/') ? image : `/${image}`}`;

  const resolvedTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.defaultTitle;

  return {
    title: title ? title : { absolute: resolvedTitle },
    description,
    keywords,
    authors: authors.map((name) => ({ name })),
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.canonicalDomain),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: title || SITE_CONFIG.defaultTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: 'en_NG',
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || SITE_CONFIG.defaultTitle,
      description,
      images: [imageUrl],
      creator: '@apcstakeholders',
    },
  };
}

/**
 * Generates Schema.org JSON-LD for the primary Organization.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'PoliticalParty',
    '@id': `${SITE_CONFIG.canonicalDomain}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: [
      'APC Stakeholders Congress Kwara',
      'APC Stakeholders Congress Kwara State Chapter',
      'APCSC Kwara',
    ],
    url: SITE_CONFIG.canonicalDomain,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.canonicalDomain}${SITE_CONFIG.images.ogDefault}`,
      width: 512,
      height: 512,
    },
    image: `${SITE_CONFIG.canonicalDomain}${SITE_CONFIG.images.ogDefault}`,
    description: SITE_CONFIG.defaultDescription,
    slogan: SITE_CONFIG.officialTagline,
    parentOrganization: {
      '@type': 'PoliticalParty',
      name: SITE_CONFIG.parentOrganization,
      url: 'https://officialapcng.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.secretariatAddress.streetAddress,
      addressLocality: SITE_CONFIG.secretariatAddress.addressLocality,
      addressRegion: SITE_CONFIG.secretariatAddress.addressRegion,
      postalCode: SITE_CONFIG.secretariatAddress.postalCode,
      addressCountry: SITE_CONFIG.secretariatAddress.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.contact.phones[0],
        contactType: 'Secretariat General Enquiry',
        areaServed: 'NG',
        availableLanguage: ['en', 'yo', 'ha'],
      },
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.contact.phones[1],
        contactType: 'Forum Verification & Accreditation',
        areaServed: 'NG',
        availableLanguage: ['en', 'yo'],
      },
    ],
    email: SITE_CONFIG.contact.email,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Kwara State, Nigeria',
    },
    sameAs: [
      SITE_CONFIG.social.whatsappCommunity,
    ],
  };
}

/**
 * Generates Schema.org JSON-LD for the WebSite with SearchAction.
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.canonicalDomain}/#website`,
    url: SITE_CONFIG.canonicalDomain,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SITE_CONFIG.canonicalDomain}/#organization`,
    },
    inLanguage: 'en-NG',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.canonicalDomain}/verified-groups?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Generates Schema.org JSON-LD for BreadcrumbList.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http')
        ? item.path
        : `${SITE_CONFIG.canonicalDomain}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}

/**
 * Generates Schema.org JSON-LD for a News Article.
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  imageUrl,
  authorName = 'APC Stakeholders Congress Directorate',
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
  authorName?: string;
}) {
  const articleUrl = `${SITE_CONFIG.canonicalDomain}/news/${slug}`;
  const fullImage = imageUrl
    ? (imageUrl.startsWith('http') ? imageUrl : `${SITE_CONFIG.canonicalDomain}${imageUrl}`)
    : `${SITE_CONFIG.canonicalDomain}${SITE_CONFIG.images.ogDefault}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: title,
    description,
    image: [fullImage],
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_CONFIG.canonicalDomain,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.canonicalDomain}${SITE_CONFIG.images.ogDefault}`,
      },
    },
    inLanguage: 'en-NG',
  };
}

/**
 * Generates Schema.org JSON-LD for a public Event.
 */
export function generateEventSchema({
  title,
  description,
  startDate,
  endDate,
  venue,
  locationName = 'Ilorin, Kwara State',
  imageUrl,
  url,
}: {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  venue: string;
  locationName?: string;
  imageUrl?: string;
  url?: string;
}) {
  const eventUrl = url
    ? (url.startsWith('http') ? url : `${SITE_CONFIG.canonicalDomain}${url}`)
    : `${SITE_CONFIG.canonicalDomain}/events-gallery`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description,
    startDate,
    ...(endDate && { endDate }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: venue,
        addressLocality: locationName,
        addressRegion: 'Kwara State',
        addressCountry: 'NG',
      },
    },
    image: imageUrl
      ? [imageUrl.startsWith('http') ? imageUrl : `${SITE_CONFIG.canonicalDomain}${imageUrl}`]
      : [`${SITE_CONFIG.canonicalDomain}${SITE_CONFIG.images.ogDefault}`],
    organizer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalDomain,
    },
    url: eventUrl,
  };
}

/**
 * Generates Schema.org JSON-LD for a Verified Forum public profile.
 * STRICT ZERO-TRUST PRIVACY: Only safe public attributes are included.
 */
export function generateVerifiedGroupSchema({
  name,
  acronym,
  motto,
  slug,
  lgaName,
  senatorialDistrict,
  areaOfCoverage,
  yearEstablished,
  totalStrength,
  approvedAt,
}: {
  name: string;
  acronym?: string | null;
  motto?: string | null;
  slug: string;
  lgaName: string;
  senatorialDistrict?: string | null;
  areaOfCoverage: string;
  yearEstablished?: number | null;
  totalStrength?: number | null;
  approvedAt?: Date | string | null;
}) {
  const profileUrl = `${SITE_CONFIG.canonicalDomain}/verified-groups/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': profileUrl,
    name,
    ...(acronym && { alternateName: acronym }),
    ...(motto && { slogan: motto }),
    url: profileUrl,
    description: `Officially accredited APC support group and grassroots forum operating in ${lgaName} LGA (${areaOfCoverage}), Kwara State. Accredited under the APC Stakeholders Congress.`,
    ...(yearEstablished && { foundingDate: yearEstablished.toString() }),
    ...(totalStrength && {
      member: {
        '@type': 'QuantitativeValue',
        value: totalStrength,
        unitText: 'Registered Grassroots Members',
      },
    }),
    parentOrganization: {
      '@id': `${SITE_CONFIG.canonicalDomain}/#organization`,
      name: SITE_CONFIG.name,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${lgaName} Local Government Area, Kwara State`,
      ...(senatorialDistrict && { containedInPlace: { '@type': 'AdministrativeArea', name: senatorialDistrict } }),
    },
    knowsAbout: [
      'All Progressives Congress',
      'Grassroots Mobilization',
      'Voter Education',
      'Kwara State Community Organizing',
    ],
  };
}
