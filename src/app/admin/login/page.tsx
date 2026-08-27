'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { loginAdmin } from '@/app/actions/authActions';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);

    setLoading(false);

    if (res.success) {
      router.push(redirectUrl);
      router.refresh();
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Public Website
        </Link>

        <div className="w-16 h-16 bg-white rounded-2xl p-2 mx-auto shadow-lg flex items-center justify-center">
          <Image
            src="/images/APC-stakeholders-congress-Logo.png"
            alt="APC Logo"
            width={52}
            height={52}
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Directorate Administrative Portal
        </h1>
        <p className="text-xs text-slate-400">
          APC Stakeholders Congress • Kwara State Chapter
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900 py-8 px-6 sm:px-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Authorized Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@apcstakeholderscongress.ng"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white font-extrabold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
            <p className="flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Role-Based Access Protected & Audited
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
