import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Users, FileText, HeartHandshake, ShieldCheck, ChevronRight, Phone } from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Get Involved | Grassroots Mobilization for Victory 2027',
  description:
    'Join active APC stakeholders, grassroots canvassers, youth coordinators, and women groups driving party victory in Kwara State for 2027.',
  canonicalPath: '/get-involved',
  keywords: [
    'APC grassroots mobilization Kwara',
    'join APC support group',
    'APC volunteer Kwara',
    'Victory 2027 APC participation',
  ],
});

export default function GetInvolvedPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Get Involved', path: '/get-involved' }]} />

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <span className="w-1.5 h-1.5 rounded-full bg-apcRed-500"></span>
            Stakeholder Participation
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get Involved in Victory 2027
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Join thousands of active party members, youth advocates, women leaders, and professionals driving real grassroots impact across Kwara State.
          </p>
        </div>

        {/* Pillars of Engagement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-brand-50 text-brand-700 rounded-2xl w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Register Your Forum</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you lead a support group, association, or youth/women movement, register online to gain official accreditation, official certification, and state recognition.
              </p>
            </div>
            <Link
              href="/register"
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-center text-xs transition shadow-sm"
            >
              Start Forum Registration
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-sky-50 text-sky-700 rounded-2xl w-fit">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Grassroots Mobilization</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Participate in polling unit canvassing, voter education drives, and community sensitization initiatives in your local LGA and ward.
              </p>
            </div>
            <Link
              href="/contact"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-center text-xs transition"
            >
              Contact Directorate Secretariat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
