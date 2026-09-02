import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { SITE_CONFIG, slugify } from '@/lib/seo';

export const revalidate = 3600; // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.canonicalDomain;
  const now = new Date();

  // 1. Static Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/verified-groups`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events-gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-involved`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 2. Dynamic Verified Forum Pages (Strictly approved & verified records only)
  let forumRoutes: MetadataRoute.Sitemap = [];
  try {
    const verifiedForums = await prisma.forum.findMany({
      where: { status: 'approved_verified' },
      select: {
        name: true,
        updatedAt: true,
        approvedAt: true,
        createdAt: true,
      },
      orderBy: { approvedAt: 'desc' },
      take: 2000,
    });

    // Keep track of slugs to avoid duplicate URLs in sitemap
    const seenSlugs = new Set<string>();

    forumRoutes = verifiedForums.map((f) => {
      const slug = slugify(f.name);
      if (seenSlugs.has(slug)) return null;
      seenSlugs.add(slug);

      return {
        url: `${baseUrl}/verified-groups/${slug}`,
        lastModified: f.updatedAt || f.approvedAt || f.createdAt || now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    }).filter(Boolean) as MetadataRoute.Sitemap;
  } catch (err) {
    console.warn('Sitemap generation: Could not fetch verified forums', err);
  }

  // 3. Dynamic News Posts (Strictly published articles only)
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const newsPosts = await prisma.newsPost.findMany({
      where: { status: 'published' },
      select: {
        slug: true,
        createdAt: true,
        publishedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });

    newsRoutes = newsPosts.map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: post.publishedAt || post.createdAt || now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.warn('Sitemap generation: Could not fetch news posts', err);
  }

  return [...staticRoutes, ...newsRoutes, ...forumRoutes];
}
