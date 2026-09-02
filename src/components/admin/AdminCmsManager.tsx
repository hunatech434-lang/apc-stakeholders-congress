'use client';

import React, { useState } from 'react';
import { 
  Newspaper, 
  Bell, 
  Plus, 
  Trash2, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText,
  Tag,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { 
  createAnnouncement, 
  deleteAnnouncement, 
  createNewsPost, 
  deleteNewsPost 
} from '@/app/actions/cmsActions';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  category: string;
  status: string;
  createdAt: string;
}

interface AnnouncementItem {
  id: string;
  title: string;
  body: string;
  targetAudience: string;
  status: string;
  createdAt: string;
}

interface AdminCmsManagerProps {
  initialNews: NewsItem[];
  initialAnnouncements: AnnouncementItem[];
}

export default function AdminCmsManager({
  initialNews,
  initialAnnouncements,
}: AdminCmsManagerProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'announcements'>('news');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleNewsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await createNewsPost(formData);

    setLoading(false);
    if (res.success) {
      setMessage({ type: 'success', text: 'Press Release successfully published to live website!' });
      form.reset();
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to publish news post.' });
    }
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await createAnnouncement(formData);

    setLoading(false);
    if (res.success) {
      setMessage({ type: 'success', text: 'Directorate Announcement successfully published!' });
      form.reset();
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to publish announcement.' });
    }
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the press release "${title}"?`)) return;
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('id', id);
    const res = await deleteNewsPost(formData);

    setLoading(false);
    if (res.success) {
      setMessage({ type: 'success', text: 'Press release deleted successfully.' });
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to delete.' });
    }
  };

  const handleDeleteAnnouncement = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete announcement "${title}"?`)) return;
    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('id', id);
    const res = await deleteAnnouncement(formData);

    setLoading(false);
    if (res.success) {
      setMessage({ type: 'success', text: 'Announcement deleted successfully.' });
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to delete.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* CMS Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => { setActiveTab('news'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'news'
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/30'
              : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Press Releases & Media ({initialNews.length})</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('announcements'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'announcements'
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/30'
              : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Directorate Announcements ({initialAnnouncements.length})</span>
        </button>
      </div>

      {/* Global Alerts */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 border ${
            message.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-200'
              : 'bg-red-950/80 border-red-800/80 text-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* TAB 1: PRESS RELEASES & NEWS */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create News Form */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-brand-400" />
              Publish Press Release
            </h2>

            <form onSubmit={handleNewsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Article / Press Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. APC Stakeholders Congress Convenes Statewide Summit"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category / Tag</label>
                <select
                  name="category"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Press Release">Press Release</option>
                  <option value="Mobilization">Mobilization</option>
                  <option value="Directorate Statement">Directorate Statement</option>
                  <option value="Party Harmony">Party Harmony</option>
                  <option value="Victory 2027">Victory 2027</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Brief Excerpt / Summary</label>
                <input
                  type="text"
                  name="excerpt"
                  placeholder="Short introductory summary for previews..."
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Article Content *</label>
                <textarea
                  name="body"
                  rows={6}
                  required
                  placeholder="Full text of the official press release..."
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 font-sans"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{loading ? 'Publishing...' : 'Publish Press Release to Live Site'}</span>
              </button>
            </form>
          </div>

          {/* Published News List */}
          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Published Press Releases ({initialNews.length})</span>
            </h2>

            {initialNews.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {initialNews.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-brand-400 bg-brand-950/60 px-2 py-0.5 rounded border border-brand-800">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                      <p className="text-slate-400 text-[11px] line-clamp-3 leading-relaxed">
                        {item.excerpt || item.body}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <Link
                        href={`/news/${item.slug}`}
                        target="_blank"
                        className="text-[11px] font-bold text-sky-400 hover:underline flex items-center gap-1"
                      >
                        <span>View on Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteNews(item.id, item.title)}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs rounded-xl border border-dashed border-slate-800">
                No press releases currently published.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DIRECTORATE ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Announcement Form */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-gold-400" />
              Publish Announcement
            </h2>

            <form onSubmit={handleAnnouncementSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Announcement Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Schedule for Stakeholder Consultations in Offa"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500"
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
                <label className="block text-slate-300 font-bold mb-1">Notice Message / Body *</label>
                <textarea
                  name="body"
                  rows={5}
                  required
                  placeholder="Detailed text of the official notice..."
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                <span>{loading ? 'Publishing...' : 'Publish Announcement Instantly'}</span>
              </button>
            </form>
          </div>

          {/* Published Announcements List */}
          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Live Announcements ({initialAnnouncements.length})</span>
            </h2>

            {initialAnnouncements.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {initialAnnouncements.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-gold-400 bg-gold-950/60 px-2 py-0.5 rounded border border-gold-800/80">
                        {ann.targetAudience === 'all' ? 'Public' : 'Registered Groups'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(ann.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{ann.title}</h3>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{ann.body}</p>

                    <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteAnnouncement(ann.id, ann.title)}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Notice</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs rounded-xl border border-dashed border-slate-800">
                No announcements currently published.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
