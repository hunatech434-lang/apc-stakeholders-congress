import React from 'react';
import type { Metadata } from 'next';
import { getSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Directorate Administrative Portal',
  description: 'Authorized administrative access for APC Stakeholders Congress officers.',
  canonicalPath: '/admin',
  noIndex: true,
});

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If unauthenticated, render children directly without sidebar (e.g. login page)
  if (!session) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100 antialiased">
      <AdminSidebar session={session} />
      <main className="flex-1 bg-slate-900 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen w-full">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
