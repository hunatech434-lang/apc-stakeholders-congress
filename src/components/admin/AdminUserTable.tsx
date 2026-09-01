'use client';

import React, { useState, useTransition } from 'react';
import { ShieldCheck, UserCheck, UserX, AlertTriangle, RefreshCw } from 'lucide-react';
import { toggleAdminUserStatus } from '@/app/actions/authActions';

interface AdminUserItem {
  id: string;
  email: string;
  fullName: string;
  roleId: string;
  roleName: string;
  phoneNumber?: string | null;
  isActive: boolean;
  lastLoginAt?: string | null;
}

export function AdminUserTable({ initialUsers }: { initialUsers: AdminUserItem[] }) {
  const [users, setUsers] = useState<AdminUserItem[]>(initialUsers);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleToggle = (userId: string, currentStatus: boolean, email: string) => {
    if (email.startsWith('33kahuna')) {
      alert('The primary Super Administrator account cannot be disabled.');
      return;
    }

    const actionText = currentStatus ? 'DISABLE' : 'ENABLE';
    if (!confirm(`Are you sure you want to ${actionText} access for ${email}?`)) {
      return;
    }

    startTransition(async () => {
      setMessage(null);
      const res = await toggleAdminUserStatus(userId, !currentStatus);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isActive: !currentStatus } : u))
        );
        setMessage({
          text: `Successfully ${!currentStatus ? 'enabled' : 'disabled'} access for ${email}`,
          type: 'success',
        });
      } else {
        setMessage({ text: res.error || 'Operation failed', type: 'error' });
      }
    });
  };

  const getRoleBadge = (roleId: string) => {
    switch (roleId) {
      case 'super_admin':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800">
            Super Administrator (All Access)
          </span>
        );
      case 'reporting_viewer':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-sky-950 text-sky-300 border border-sky-800">
            Director General (View & Export)
          </span>
        );
      case 'content_editor':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800">
            Media & Operations (CMS & Registry)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-800 text-slate-300">
            {roleId}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-800'
              : 'bg-red-950/80 text-red-200 border border-red-800'
          }`}
        >
          {message.type === 'success' ? <UserCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Administrator</th>
                <th className="py-3.5 px-4">Role & Permissions</th>
                <th className="py-3.5 px-4">Contact Phone</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Access Control Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u) => {
                const isSuper = u.email.startsWith('33kahuna') || u.roleId === 'super_admin';
                return (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">{u.fullName}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{u.email}</div>
                    </td>
                    <td className="py-4 px-4">
                      {getRoleBadge(u.roleId)}
                      <div className="text-[11px] text-slate-400 mt-1">
                        {u.roleId === 'super_admin' && 'Full privileges, admin controls, verification, reports & CMS.'}
                        {u.roleId === 'reporting_viewer' && 'View all registrations and download full Excel & CSV registry.'}
                        {u.roleId === 'content_editor' && 'Manage News, Announcements, Gallery and view/export registry.'}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {u.phoneNumber || '—'}
                    </td>
                    <td className="py-4 px-4">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Deactivated
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {isSuper ? (
                        <span className="text-[11px] font-semibold text-slate-500 italic">
                          Primary Admin (Protected)
                        </span>
                      ) : (
                        <button
                          onClick={() => handleToggle(u.id, u.isActive, u.email)}
                          disabled={isPending}
                          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition inline-flex items-center gap-1.5 shadow-sm disabled:opacity-50 ${
                            u.isActive
                              ? 'bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30'
                              : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {isPending ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : u.isActive ? (
                            <>
                              <UserX className="w-3.5 h-3.5" /> Disable Access
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3.5 h-3.5" /> Enable Access
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
