import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/register',
          '/news',
          '/events-gallery',
          '/get-involved',
          '/contact',
          '/privacy',
          '/terms',
          '/disclaimer',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/status',
          '/verify/',
          '/_next/',
          '/storage/',
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.canonicalDomain}/sitemap.xml`,
    host: SITE_CONFIG.canonicalDomain,
  };
}
