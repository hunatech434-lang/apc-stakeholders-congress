import React from 'react';
import { getSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If unauthenticated, render children directly without sidebar (e.g. login page)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row text-slate-100">
      <AdminSidebar session={session} />
      <main className="flex-1 bg-slate-900 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
