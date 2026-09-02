import React from 'react';
import Link from 'next/link';
import { 
  FileSearch, 
  Home, 
  FileText, 
  ShieldCheck, 
  Newspaper, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Page Not Found',
  description: 'The requested page could not be found on the APC Stakeholders Congress Portal.',
  canonicalPath: '/404',
  noIndex: true,
});

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Portal Home',
      desc: 'Return to the main homepage and official announcements.',
      href: '/',
      icon: Home,
      color: 'text-brand-600 bg-brand-50 border-brand-200',
    },
    {
      title: 'Register Your Forum',
      desc: 'Accredit your APC support group or grassroots association.',
      href: '/register',
      icon: FileText,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      title: 'Check Accreditation Status',
      desc: 'Verify the registration status of your submitted support group.',
      href: '/status',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'News & Media Releases',
      desc: 'Read the latest press releases and grassroots directives.',
      href: '/news',
      icon: Newspaper,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Contact Secretariat',
      desc: 'Reach the State Directorate at Fate Road, Ilorin.',
      href: '/contact',
      icon: Mail,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <FileSearch className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Looking for something on the APC Portal?
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            The link you followed may be broken, outdated, or the page may have moved. Use the direct links below to find what you are looking for:
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition flex items-start gap-3 group"
              >
                <div className={`p-2.5 rounded-xl border flex-shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-700 transition flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
