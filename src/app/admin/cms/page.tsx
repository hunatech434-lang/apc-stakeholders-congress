import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminCmsManager from '@/components/admin/AdminCmsManager';
import { Newspaper } from 'lucide-react';

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminCmsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const news = await prisma.newsPost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const formattedNews = news.map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    excerpt: n.excerpt,
    body: n.body,
    category: n.category,
    status: n.status,
    createdAt: n.createdAt.toISOString(),
  }));

  const formattedAnnouncements = announcements.map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    targetAudience: a.targetAudience,
    status: a.status,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 mb-1">
          <Newspaper className="w-4 h-4" /> Content Management System
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Directorate Media & Announcements Center
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Publish, edit, and manage live press releases and official party notices on the APC portal.
        </p>
      </div>

      <AdminCmsManager
        initialNews={formattedNews}
        initialAnnouncements={formattedAnnouncements}
      />
    </div>
  );
}
