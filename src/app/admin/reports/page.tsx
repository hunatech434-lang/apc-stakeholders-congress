import React from 'react';
import { prisma } from '@/lib/prisma';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Users, 
  ShieldCheck, 
  Building2, 
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminReportsPage() {
  // Aggregate Stats
  const totalForums = await prisma.forum.count();
  const verifiedForums = await prisma.forum.count({ where: { status: 'approved_verified' } });
  const pendingForums = await prisma.forum.count({ where: { status: 'submitted' } });
  
  const memberSum = await prisma.forum.aggregate({
    _sum: { totalStrength: true },
  });
  const totalDeclaredForce = memberSum._sum.totalStrength || 0;

  // LGA breakdown
  const lgas = await prisma.lga.findMany({
    where: { isActive: true },
    include: {
      _count: { select: { forums: true } },
      senatorialDistrict: true,
    },
    orderBy: { name: 'asc' },
  });

  // Senatorial District Distribution
  const districtCounts = await prisma.senatorialDistrict.findMany({
    include: {
      _count: { select: { forums: true } },
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
            Directorate Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Reports & Export Center
          </h1>
        </div>

        {/* Quick Export Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/api/reports/export?format=xlsx"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow"
          >
            <FileSpreadsheet className="w-4 h-4" /> Download Excel (.xlsx)
          </a>
          <a
            href="/api/reports/export?format=csv"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-2 border border-slate-700"
          >
            <Download className="w-4 h-4" /> Download CSV
          </a>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Forums Logged</span>
          <div className="text-3xl font-black text-white">{totalForums}</div>
          <p className="text-[10px] text-slate-500">Across 16 Kwara LGAs</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Declared Strength</span>
          <div className="text-3xl font-black text-gold-400">{totalDeclaredForce.toLocaleString()}</div>
          <p className="text-[10px] text-slate-500">Grassroots members</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Verified & Accredited</span>
          <div className="text-3xl font-black text-emerald-400">{verifiedForums}</div>
          <p className="text-[10px] text-slate-500">Official certificates issued</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Pending Review</span>
          <div className="text-3xl font-black text-amber-400">{pendingForums}</div>
          <p className="text-[10px] text-slate-500">In verification queue</p>
        </div>
      </div>

      {/* Spatial Distribution Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-white">
              Local Government Area Mobilization Breakdown
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Accredited and registered forums mapped across Kwara State.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {lgas.map((lga) => (
            <div
              key={lga.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-white text-xs">{lga.name}</div>
                <div className="text-[10px] text-slate-500">{lga.senatorialDistrict?.name || 'Kwara'}</div>
              </div>
              <div className="text-base font-extrabold text-brand-400">
                {lga._count.forums}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
