import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  Newspaper, 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { 
  buildMetadata, 
  generateArticleSchema, 
  SITE_CONFIG 
} from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getNewsPost(slug: string) {
  try {
    const post = await prisma.newsPost.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (!post || post.status !== 'published') return null;
    return post;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    return buildMetadata({
      title: 'Article Not Found',
      description: 'The requested press release could not be found.',
      canonicalPath: `/news/${slug}`,
      noIndex: true,
    });
  }

  const pageTitle = `${post.title} | APC Stakeholders Congress`;
  const pageDesc = post.excerpt || post.body.slice(0, 160);

  return buildMetadata({
    title: pageTitle,
    description: pageDesc,
    canonicalPath: `/news/${slug}`,
    type: 'article',
    image: post.featuredImageUrl || SITE_CONFIG.images.ogDefault,
    publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    modifiedTime: post.createdAt.toISOString(),
    authors: [post.author?.fullName || 'APC Stakeholders Congress Directorate'],
    keywords: [
      post.title,
      post.category,
      'APC Stakeholders Congress',
      'APC Kwara News',
      'Victory 2027',
    ],
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    notFound();
  }

  // Fetch 2 recent related posts
  let relatedPosts: any[] = [];
  try {
    relatedPosts = await prisma.newsPost.findMany({
      where: {
        status: 'published',
        NOT: { id: post.id },
      },
      take: 2,
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {}

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || post.body.slice(0, 160),
    slug: post.slug,
    publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    updatedAt: post.createdAt.toISOString(),
    imageUrl: post.featuredImageUrl || undefined,
    authorName: post.author?.fullName || 'APC Stakeholders Congress Directorate',
  });

  const breadcrumbItems = [
    { name: 'News & Announcements', path: '/news' },
    { name: post.title, path: `/news/${slug}` },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      {/* Schema.org Article Structured Data */}
      <JsonLd data={articleSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumbs items={breadcrumbItems} />
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Press Releases
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          {/* Article Header */}
          <header className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                {post.category}
              </span>
              <span className="text-slate-400">•</span>
              <time
                dateTime={post.createdAt.toISOString()}
                className="text-slate-500 flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author?.fullName || 'APC Directorate'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed italic">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image if available */}
          {post.featuredImageUrl && (
            <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-200">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            {post.body.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer & Organizational Authority Callout */}
          <footer className="pt-6 border-t border-slate-100 space-y-6">
            <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <span className="font-bold text-brand-950 block">Official Party Release</span>
                <p className="text-brand-800">
                  Issued by the Directorate of Media & Publicity, APC Stakeholders Congress (Kwara State Chapter).
                </p>
              </div>
              <Link
                href="/register"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition flex-shrink-0 shadow"
              >
                Register Your Forum
              </Link>
            </div>
          </footer>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-slate-900">More Press Releases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2"
                >
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    <Link href={`/news/${rel.slug}`} className="hover:text-brand-700 transition">
                      {rel.title}
                    </Link>
                  </h3>
                  <Link
                    href={`/news/${rel.slug}`}
                    className="text-xs font-bold text-brand-700 hover:underline inline-flex items-center gap-1 pt-1"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
