import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  Filter,
  Building2,
  FileCheck2
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VerifiedGroupsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; lga?: string; area?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || '';
  const lgaId = params.lga ? parseInt(params.lga, 10) : undefined;
  const area = params.area || '';

  const where: any = {
    status: 'approved_verified',
  };

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { registrationRef: { contains: q } },
    ];
  }
  if (lgaId) {
    where.lgaId = lgaId;
  }
  if (area) {
    where.areaOfCoverage = area;
  }

  let verifiedForums: any[] = [];
  let lgas: any[] = [];
  try {
    verifiedForums = await prisma.forum.findMany({
      where,
      orderBy: { approvedAt: 'desc' },
      include: { lga: true },
    });

    lgas = await prisma.lga.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  } catch (e) {}

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Public Registry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Accredited Stakeholder Groups
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            The authoritative public registry of verified APC forums, associations, and support groups across the 16 LGAs of Kwara State.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search verified groups by name or ref..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <select
                name="lga"
                defaultValue={lgaId || ''}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:ring-2 focus:ring-brand-500"
              >
                <option value="">All 16 Kwara LGAs</option>
                {lgas.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs transition shadow"
              >
                Search Directory
              </button>
            </div>
          </form>
        </div>

        {/* Verified Groups Grid */}
        {verifiedForums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedForums.map((f) => (
              <div
                key={f.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-500 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {f.registrationRef}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Accredited
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {f.name}
                    </h3>
                    {f.acronym && <span className="text-xs text-slate-500 font-semibold">({f.acronym})</span>}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                      <span>{f.lga?.name || 'Kwara'} LGA • {f.areaOfCoverage}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                      <span>Strength: {f.totalStrength.toLocaleString()} members</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        Accredited:{' '}
                        {f.approvedAt
                          ? new Date(f.approvedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
                          : 'Recent'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">Status: Active Grassroots Forum</span>
                  <Link
                    href={`/status?ref=${f.registrationRef}`}
                    className="font-bold text-brand-700 hover:underline"
                  >
                    View Status
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center max-w-xl mx-auto space-y-3">
            <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Verified Forums Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No registered forum matches the selected search filters, or submitted groups are currently in review.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-block px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-500 transition"
              >
                Register Your Forum Today
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
