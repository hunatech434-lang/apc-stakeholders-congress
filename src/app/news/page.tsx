import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Newspaper, Calendar, ArrowRight, Bell, Tag } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = buildMetadata({
  title: 'News & Official Announcements | APC Stakeholders Congress',
  description:
    'Stay updated with official press releases, directives, grassroots mobilization updates, and announcements from the APC Stakeholders Congress Kwara State Directorate.',
  canonicalPath: '/news',
  keywords: [
    'APC Stakeholders Congress news',
    'APC Kwara press releases',
    'APC Kwara announcements',
    'grassroots mobilization Kwara',
    'APC party updates Kwara',
    'Victory 2027 Kwara news',
  ],
});

export default async function NewsPage() {
  let news: any[] = [];
  let announcements: any[] = [];
  try {
    news = await prisma.newsPost.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
    });

    announcements = await prisma.announcement.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {}

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'News & Announcements', path: '/news' }]} />

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <Newspaper className="w-3.5 h-3.5" /> Media & Directorate Releases
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            News & Official Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Stay informed on party activities, grassroots mobilization directives, and stakeholder congress updates across Kwara State.
          </p>
        </div>

        {/* Announcements Section */}
        {announcements.length > 0 && (
          <section aria-labelledby="announcements-heading" className="space-y-4">
            <h2 id="announcements-heading" className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-600" />
              Latest Directorate Announcements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200 uppercase tracking-wider text-[10px]">
                      {ann.targetAudience === 'all' ? 'Public Notice' : 'Registered Forums'}
                    </span>
                    <span className="text-slate-400">
                      {new Date(ann.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{ann.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ann.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* News Section */}
        <section aria-labelledby="press-releases-heading" className="space-y-4">
          <h2 id="press-releases-heading" className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-brand-600" />
            Press Releases & Field Reports
          </h2>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        {item.category}
                      </span>
                      <span>{new Date(item.createdAt).toLocaleDateString('en-GB')}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      <Link href={`/news/${item.slug}`} className="hover:text-brand-700 transition">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                      {item.excerpt || item.body}
                    </p>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">APC Directorate</span>
                    <Link
                      href={`/news/${item.slug}`}
                      className="font-bold text-brand-700 hover:text-brand-800 hover:underline flex items-center gap-1 group"
                    >
                      <span>Read Full Press Release</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
              No press releases published yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
