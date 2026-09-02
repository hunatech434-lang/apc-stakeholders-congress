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
  const targetRedirect = params.redirect || '/admin/dashboard';

  // If already logged in, redirect directly to dashboard
  if (session) {
    redirect(targetRedirect);
  }

  return <AdminLoginForm />;
}
