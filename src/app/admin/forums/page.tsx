import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Search, Filter, Download, ChevronRight, Eye } from 'lucide-react';

export const revalidate = 0;

export default async function AdminForumsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; lga?: string; area?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || '';
  const status = params.status || '';
  const lgaId = params.lga ? parseInt(params.lga, 10) : undefined;
  const area = params.area || '';

  // Build filter where query
  const where: any = {};
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { registrationRef: { contains: q } },
      { coordinatorName: { contains: q } },
      { coordinatorPhone: { contains: q } },
    ];
  }
  if (status) {
    where.status = status;
  }
  if (lgaId) {
    where.lgaId = lgaId;
  }
  if (area) {
    where.areaOfCoverage = area;
  }

  const forums = await prisma.forum.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { lga: true },
  });

  const lgas = await prisma.lga.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });

  const statusBadge = (s: string) => {
    switch (s) {
      case 'approved_verified':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Verified</span>;
      case 'under_review':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Under Review</span>;
      case 'more_info_required':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Query Sent</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">Rejected</span>;
      case 'suspended_revoked':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">Suspended</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30">Submitted</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Registry Records
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Forum Registrations ({forums.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Data
          </Link>
        </div>
      </div>

      {/* Filter Form Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Query */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search by forum name, ref code, or coordinator..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              name="status"
              defaultValue={status}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-brand-500"
            >
              <option value="">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="more_info_required">More Info Required</option>
              <option value="approved_verified">Approved / Verified</option>
              <option value="rejected">Rejected</option>
              <option value="suspended_revoked">Suspended / Revoked</option>
            </select>
          </div>

          {/* LGA Filter */}
          <div>
            <select
              name="lga"
              defaultValue={lgaId || ''}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-brand-500"
            >
              <option value="">All 16 LGAs</option>
              {lgas.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Filter Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs transition"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      {/* Forums Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        {forums.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Forum Name</th>
                  <th className="py-3 px-4">LGA & Area</th>
                  <th className="py-3 px-4">Coordinator</th>
                  <th className="py-3 px-4">Members</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {forums.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-gold-400">
                      {f.registrationRef}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{f.name}</div>
                      {f.acronym && <div className="text-[10px] text-slate-500">({f.acronym})</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">{f.lga?.name || 'Kwara'}</div>
                      <div className="text-[10px] text-slate-500">{f.areaOfCoverage}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium">{f.coordinatorName}</div>
                      <div className="text-[10px] text-slate-500">{f.coordinatorPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {f.totalStrength.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">{statusBadge(f.status)}</td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-500">
                      {f.submittedAt ? new Date(f.submittedAt).toLocaleDateString('en-GB') : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/forums/${f.id}`}
                        className="px-3 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600 text-brand-300 hover:text-white text-xs font-bold transition inline-flex items-center gap-1 border border-brand-500/30"
                      >
                        <Eye className="w-3.5 h-3.5" /> Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-slate-500 space-y-2">
            <p className="font-semibold text-sm text-slate-400">No matching registration records found.</p>
            <p>Try clearing your search query or changing active status/LGA filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
