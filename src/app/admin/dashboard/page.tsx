import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  Users, 
  FileCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const revalidate = 0; // Dynamic server page

export default async function AdminDashboardPage() {
  // 1. Fetch Aggregated Counts
  const total = await prisma.forum.count();
  const submitted = await prisma.forum.count({ where: { status: 'submitted' } });
  const underReview = await prisma.forum.count({ where: { status: 'under_review' } });
  const moreInfo = await prisma.forum.count({ where: { status: 'more_info_required' } });
  const approved = await prisma.forum.count({ where: { status: 'approved_verified' } });
  const rejected = await prisma.forum.count({ where: { status: 'rejected' } });

  const memberStrengthAgg = await prisma.forum.aggregate({
    _sum: { totalStrength: true },
  });
  const totalDeclaredMembers = memberStrengthAgg._sum.totalStrength || 0;

  // 2. Fetch LGA Breakdown
  const lgas = await prisma.lga.findMany({
    where: { isActive: true },
    include: {
      _count: { select: { forums: true } },
      senatorialDistrict: true,
    },
    orderBy: { name: 'asc' },
  });

  // 3. Fetch Recent Submissions
  const recentForums = await prisma.forum.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { lga: true },
  });

  const statusBadge = (status: string) => {
    switch (status) {
      case 'approved_verified':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Verified</span>;
      case 'under_review':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Under Review</span>;
      case 'more_info_required':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Query / Info Required</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30">Submitted</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Directorate Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Operational Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/forums"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition shadow"
          >
            Review Inbound Submissions ({submitted})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Total Logged</span>
            <FileCheck className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white">{total}</div>
          <div className="text-[10px] text-slate-500">All submissions</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{submitted}</div>
          <div className="text-[10px] text-slate-500">Awaiting officer</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Under Review</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-400">{underReview}</div>
          <div className="text-[10px] text-slate-500">Being vetted</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Info Required</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-500">{moreInfo}</div>
          <div className="text-[10px] text-slate-500">Queries issued</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Verified</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{approved}</div>
          <div className="text-[10px] text-slate-500">Docs generated</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Declared Force</span>
            <Users className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-2xl font-black text-gold-400">{totalDeclaredMembers.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">Declared strength</div>
        </div>
      </div>

      {/* Main Content Grid: Recent Submissions & LGA Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Submissions Table */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Submissions & Registrations
            </h2>
            <Link
              href="/admin/forums"
              className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentForums.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-slate-500 border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Reference / Name</th>
                    <th className="py-2.5 px-3">LGA & Area</th>
                    <th className="py-2.5 px-3">Coordinator</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentForums.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-900/50 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{f.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{f.registrationRef}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div>{f.lga?.name || 'Kwara'}</div>
                        <div className="text-[10px] text-slate-500">{f.areaOfCoverage}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div>{f.coordinatorName}</div>
                        <div className="text-[10px] text-slate-500">{f.coordinatorPhone}</div>
                      </td>
                      <td className="py-3 px-3">{statusBadge(f.status)}</td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/forums/${f.id}`}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-brand-600 text-white text-[11px] font-semibold transition"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">
              No registration submissions received yet.
            </div>
          )}
        </div>

        {/* Right: LGA Coverage Distribution */}
        <div className="lg:col-span-4 bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Kwara LGAs Coverage</span>
            <span className="text-[11px] text-slate-400 font-normal">16 LGAs</span>
          </h2>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {lgas.map((lga) => (
              <div
                key={lga.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
              >
                <div>
                  <div className="font-bold text-white">{lga.name}</div>
                  <div className="text-[10px] text-slate-500">{lga.senatorialDistrict?.name || 'Kwara'}</div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-slate-800 text-white font-bold text-xs">
                  {lga._count.forums} {lga._count.forums === 1 ? 'forum' : 'forums'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
