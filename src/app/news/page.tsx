import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Newspaper, Calendar, ArrowRight, Bell, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <Newspaper className="w-3.5 h-3.5" /> Media & Directorate Releases
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            News & Official Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Stay informed on party activities, grassroots mobilization directives, and stakeholder congress updates.
          </p>
        </div>

        {/* Announcements Section */}
        {announcements.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-600" />
              Latest Announcements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gold-600 uppercase tracking-wider">
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
          </div>
        )}

        {/* News Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-brand-600" />
            Press Releases & Field Reports
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
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

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{item.excerpt || item.body}</p>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">APC Kwara Directorate</span>
                  <span className="font-bold text-brand-700 hover:underline">Read Article →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
