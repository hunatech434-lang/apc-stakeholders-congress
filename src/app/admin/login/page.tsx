import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  let target = params?.redirect || '/admin/dashboard';

  // Prevent redirect loops
  if (!target || target.includes('/admin/login') || target === '/admin') {
    target = '/admin/dashboard';
  }

  // Only redirect if session is definitely valid
  if (session && session.userId) {
    redirect(target);
  }

  return <AdminLoginForm />;
}
