'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileCheck2, 
  BarChart3, 
  Newspaper, 
  ShieldCheck, 
  LogOut, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { logoutAdmin } from '@/app/actions/authActions';

interface AdminSidebarProps {
  session: {
    userId: string;
    email: string;
    fullName: string;
    roleId: string;
  };
}

const roleLabels: Record<string, string> = {
  super_admin: 'Super Admin (All Access)',
  state_admin: 'State Admin',
  verification_officer: 'Verification Officer',
  content_editor: 'Media & Operations',
  reporting_viewer: 'DG / Reporting Viewer',
};

export function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const allNavItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['super_admin', 'state_admin', 'reporting_viewer', 'content_editor', 'verification_officer'] },
    { name: 'Forums & Registrations', href: '/admin/forums', icon: FileCheck2, roles: ['super_admin', 'state_admin', 'reporting_viewer', 'content_editor', 'verification_officer'] },
    { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3, roles: ['super_admin', 'state_admin', 'reporting_viewer', 'content_editor'] },
    { name: 'News & Events (CMS)', href: '/admin/cms', icon: Newspaper, roles: ['super_admin', 'state_admin', 'content_editor'] },
    { name: 'Admin Access Control', href: '/admin/users', icon: ShieldCheck, roles: ['super_admin'] },
  ];

  const navItems = allNavItems.filter((item) => item.roles.includes(session.roleId));

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Brand header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          {/* Mobile close button */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User badge */}
        <div className="p-4 mx-3 my-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-600/30 border border-brand-500/50 flex items-center justify-center text-brand-400 font-bold text-xs flex-shrink-0">
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
        <nav className="px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition group ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <item.icon className={`w-4 h-4 transition ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
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
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/APC-stakeholders-congress-Logo.png"
            alt="APC Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="text-sm font-extrabold text-white">APC Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-sm">
          <div className="w-72 bg-slate-950 h-full border-r border-slate-800 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-950 border-r border-slate-800 flex-col flex-shrink-0 min-h-screen sticky top-0 h-screen">
        {sidebarContent}
      </aside>
    </>
  );
}
