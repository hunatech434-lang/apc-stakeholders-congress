import React from 'react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ShieldCheck, UserCog, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AdminUserTable } from '@/components/admin/AdminUserTable';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getSession();

  // Only super_admin (33kahuna) can access this page
  if (!session || session.roleId !== 'super_admin') {
    redirect('/admin/dashboard');
  }

  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: 'asc' },
  });

  const formattedUsers = users.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    roleId: u.roleId,
    roleName: u.role.name,
    phoneNumber: u.phoneNumber,
    isActive: u.isActive,
    lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
  }));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-brand-400 font-bold mb-1 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Super Administrator Control Panel
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Administrative Access & Privileges
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage authorized logins, role boundaries, and toggle administrator account access.
          </p>
        </div>

        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Role Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/60">
          <div className="text-emerald-400 font-extrabold text-xs uppercase mb-1">Super Admin (33kahuna)</div>
          <div className="text-white font-bold text-sm">Full Directorate Control</div>
          <div className="text-slate-400 text-[11px] mt-1">
            Unrestricted access to all modules, forum registry, verifications, CMS, data exports, and admin status toggling.
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-900/60">
          <div className="text-sky-400 font-extrabold text-xs uppercase mb-1">Director General (dghakeem)</div>
          <div className="text-white font-bold text-sm">Registry & Reporting Access</div>
          <div className="text-slate-400 text-[11px] mt-1">
            Authorized to view submitted registrations, inspect leadership credentials, and download complete Excel/CSV registry.
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-900/60">
          <div className="text-purple-400 font-extrabold text-xs uppercase mb-1">Media & Ops (apcscarewa)</div>
          <div className="text-white font-bold text-sm">CMS, Press & Registry Access</div>
          <div className="text-slate-400 text-[11px] mt-1">
            Authorized to publish News, Press Releases, Announcements, Events & Photo Gallery, plus view/export submitted forms.
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <AdminUserTable initialUsers={formattedUsers} />
    </div>
  );
}
