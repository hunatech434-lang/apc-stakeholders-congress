import React from 'react';
import { prisma } from '@/lib/prisma';
import { Newspaper, Bell, Plus, Calendar, CheckCircle2, FileText } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const revalidate = 0;

async function createAnnouncement(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const targetAudience = (formData.get('targetAudience') as string) || 'all';

  if (!title || !body) return;

  await prisma.announcement.create({
    data: {
      title,
      body,
      targetAudience,
      status: 'published',
    },
  });

  revalidatePath('/admin/cms');
  revalidatePath('/');
}

export default async function AdminCmsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const news = await prisma.newsPost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
          Content Management System
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          News & Announcements Directorate
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Create New Announcement Form */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-400" />
            Publish New Announcement
          </h2>

          <form action={createAnnouncement} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Announcement Title *</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Schedule for Stakeholder Consultations in Offa"
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Target Audience</label>
              <select
                name="targetAudience"
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">Public / All Visitors</option>
                <option value="registered_forums">Registered & Verified Forums Only</option>
                <option value="executives">Directorate Executives</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Notice Body / Message *</label>
              <textarea
                name="body"
                rows={4}
                required
                placeholder="Detailed text of the official notice..."
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-brand-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs transition shadow"
            >
              Publish Announcement Instantly
            </button>
          </form>
        </div>

        {/* Right: Published Announcements List */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Live Announcements ({announcements.length})</span>
          </h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-gold-400 tracking-wider">
                    {ann.targetAudience === 'all' ? 'Public' : 'Registered Groups'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(ann.createdAt).toLocaleDateString('en-GB')}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{ann.title}</h3>
                <p className="text-slate-300 leading-relaxed text-[11px]">{ann.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
