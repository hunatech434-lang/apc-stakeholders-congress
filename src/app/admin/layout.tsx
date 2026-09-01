import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileCheck2, 
  BarChart3, 
  FileSpreadsheet, 
  Newspaper, 
  ShieldCheck, 
  LogOut, 
  User, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { logoutAdmin } from '@/app/actions/authActions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If on login page, render children directly without sidebar
  // (though middleware protects routes, layout renders for all /admin)
  if (!session) {
    return <>{children}</>;
  }

  const roleLabels: Record<string, string> = {
    super_admin: 'Super Admin (All Access)',
    state_admin: 'State Admin',
    verification_officer: 'Verification Officer',
    content_editor: 'Media & Operations',
    reporting_viewer: 'DG / Reporting Viewer',
  };

  const allNavItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['super_admin', 'state_admin', 'reporting_viewer', 'content_editor', 'verification_officer'] },
    { name: 'Forums & Registrations', href: '/admin/forums', icon: FileCheck2, roles: ['super_admin', 'state_admin', 'reporting_viewer', 'content_editor', 'verification_officer'] },
    { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3, roles: ['super_admin', 'state_admin', 'reporting_viewer', 'content_editor'] },
    { name: 'News & Events (CMS)', href: '/admin/cms', icon: Newspaper, roles: ['super_admin', 'state_admin', 'content_editor'] },
    { name: 'Admin Access Control', href: '/admin/users', icon: ShieldCheck, roles: ['super_admin'] },
  ];

  const navItems = allNavItems.filter((item) => item.roles.includes(session.roleId));

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row text-slate-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/images/APC-stakeholders-congress-Logo.png"
                alt="APC Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-300 block">APC Directorate</span>
              <span className="text-sm font-extrabold text-white tracking-tight block">Kwara Portal</span>
            </div>
          </div>

          {/* User badge */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-600/30 border border-brand-500/50 flex items-center justify-center text-brand-400 font-bold text-xs">
              {session.fullName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{session.fullName}</div>
              <div className="text-[10px] font-semibold text-gold-400 truncate">
                {roleLabels[session.roleId] || session.roleId}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition group"
              >
                <item.icon className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 rounded-lg hover:bg-red-950/40 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-900 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
