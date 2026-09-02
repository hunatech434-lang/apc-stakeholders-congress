import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { 
  ShieldCheck, 
  Search, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Building,
  Filter
} from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { buildMetadata, slugify } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = buildMetadata({
  title: 'Verified APC Groups & Forums Directory | Kwara State',
  description:
    'Search and explore the official directory of accredited APC forums, associations, and support groups across the 16 Local Government Areas of Kwara State.',
  canonicalPath: '/verified-groups',
  keywords: [
    'verified APC groups',
    'APC forums in Kwara',
    'APC support groups in Kwara',
    'APC associations in Kwara',
    'APC groups by LGA',
    'APC Kwara Central forums',
    'APC Kwara North forums',
    'APC Kwara South forums',
    'verified APC forums Ilorin',
  ],
});

export default async function VerifiedGroupsDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; lga?: string }>;
}) {
  const params = await searchParams;
  const searchTerm = params.search?.trim() || '';
  const selectedLga = params.lga?.trim() || '';

  let forums: any[] = [];
  let lgas: any[] = [];
  let totalVerified = 0;

  try {
    lgas = await prisma.lga.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });

    totalVerified = await prisma.forum.count({
      where: { status: 'approved_verified' },
    });

    const whereCondition: any = {
      status: 'approved_verified',
    };

    if (searchTerm) {
      whereCondition.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { acronym: { contains: searchTerm, mode: 'insensitive' } },
        { motto: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    if (selectedLga) {
      whereCondition.lga = {
        name: { equals: selectedLga, mode: 'insensitive' },
      };
    }

    forums = await prisma.forum.findMany({
      where: whereCondition,
      include: {
        lga: true,
        senatorialDistrict: true,
      },
      orderBy: { approvedAt: 'desc' },
      take: 100,
    });
  } catch (err) {
    console.error('Failed to load verified groups directory:', err);
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Verified Groups', path: '/verified-groups' }]} />

        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
            Official Public Registry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified APC Forums & Associations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Browse the official public directory of accredited APC support groups, youth movements, women alliances, and professional associations across Kwara State.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <form method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
            <div className="md:col-span-6 space-y-1">
              <label htmlFor="search-input" className="block text-xs font-bold text-slate-700">
                Search Forum Name or Acronym
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="search-input"
                  type="text"
                  name="search"
                  defaultValue={searchTerm}
                  placeholder="e.g. Kwara Youth Movement, Progressive Women..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>

            <div className="md:col-span-4 space-y-1">
              <label htmlFor="lga-select" className="block text-xs font-bold text-slate-700">
                Filter by Local Government Area (LGA)
              </label>
              <div className="relative">
                <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <select
                  id="lga-select"
                  name="lga"
                  defaultValue={selectedLga}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                >
                  <option value="">All 16 Kwara LGAs</option>
                  {lgas.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name} LGA
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" /> Filter
              </button>
              {(searchTerm || selectedLga) && (
                <Link
                  href="/verified-groups"
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center"
                  title="Reset Filter"
                >
                  Reset
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Directory Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <div>
            Showing <strong className="text-slate-900">{forums.length}</strong>{' '}
            {forums.length === 1 ? 'verified group' : 'verified groups'}{' '}
            {selectedLga && <span>in <strong>{selectedLga} LGA</strong></span>}
            {searchTerm && <span>matching "<strong>{searchTerm}</strong>"</span>}
          </div>
          <div>
            Total Accredited: <strong className="text-brand-800 font-bold">{totalVerified}</strong>
          </div>
        </div>

        {/* Groups Grid */}
        {forums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forums.map((group) => {
              const groupSlug = slugify(group.name);
              let activities: string[] = [];
              try {
                if (group.keyActivities) {
                  activities = JSON.parse(group.keyActivities);
                }
              } catch (e) {}

              return (
                <div
                  key={group.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                        {group.lga?.name || 'Kwara'} LGA
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accredited
                      </span>
                    </div>

                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {group.name}
                      </h2>
                      {group.acronym && (
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">
                          ({group.acronym})
                        </span>
                      )}
                      {group.motto && (
                        <p className="text-xs text-slate-500 italic mt-1 line-clamp-2">
                          "{group.motto}"
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                        <span>Coverage: {group.areaOfCoverage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                        <span>Declared Strength: {group.totalStrength.toLocaleString()} members</span>
                      </div>
                      {group.yearEstablished > 0 && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                          <span>Established: {group.yearEstablished}</span>
                        </div>
                      )}
                    </div>

                    {/* Key Activities Pills */}
                    {activities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activities.slice(0, 3).map((act, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {act}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref: {group.registrationRef.slice(0, 16)}...
                    </span>
                    <Link
                      href={`/verified-groups/${groupSlug}`}
                      className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1 group"
                    >
                      <span>Public Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Verified Groups Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No accredited APC forums matched your search criteria. Try selecting another Local Government Area or clearing the filter.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition shadow"
              >
                Register Your Forum Today
              </Link>
            </div>
          </div>
        )}

        {/* CTA Callout */}
        <div className="bg-brand-900 text-white p-8 rounded-3xl space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold">Is your APC Forum not listed here?</h2>
          <p className="text-xs sm:text-sm text-brand-100 max-w-xl mx-auto leading-relaxed">
            Complete the official digital accreditation form to have your organization vetted, recognized, and added to the official Kwara State directory.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-block px-7 py-3 bg-white text-brand-900 hover:bg-brand-50 font-extrabold text-xs sm:text-sm rounded-xl transition shadow"
            >
              Start Forum Registration Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
