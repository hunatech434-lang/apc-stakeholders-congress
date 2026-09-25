import React from 'react';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { 
  Search, 
  AlertCircle, 
  XCircle, 
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import RegistrationSuccessCard from '@/components/common/RegistrationSuccessCard';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = buildMetadata({
  title: 'Check Forum Registration Status | Progressive APC Stakeholders Congress',
  description: 'Lookup forum registration status and view or download your official membership confirmation and letter of recognition.',
  canonicalPath: '/status',
  noIndex: true,
});

export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; phone?: string }>;
}) {
  const params = await searchParams;
  const ref = params.ref?.trim() || '';
  const phone = params.phone?.trim() || '';

  let forum: any = null;
  let searchAttempted = false;
  let searchError = '';

  if (ref) {
    searchAttempted = true;
    try {
      const found = await prisma.forum.findUnique({
        where: { registrationRef: ref },
        include: {
          lga: true,
        },
      });

      if (!found) {
        searchError = `No registration found with reference number "${ref}". Please verify your reference number and try again.`;
      } else {
        if (phone) {
          const cleanInput = phone.replace(/\D/g, '');
          const cleanSaved = found.coordinatorPhone.replace(/\D/g, '');
          if (!cleanSaved.endsWith(cleanInput.slice(-4))) {
            searchError = 'Phone number does not match the registered coordinator record for this forum.';
          } else {
            forum = found;
          }
        } else {
          forum = found;
        }
      }
    } catch (e) {
      searchError = 'A lookup error occurred while searching records. Please try again.';
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Check Status', path: '/status' }]} />

        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <Search className="w-3.5 h-3.5" /> Registration Status & Verification
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Check Forum Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Enter your unique Registration Reference Number to view your official membership confirmation, download your accredited Letter of Recognition, and connect with the State Directorate.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <form method="GET" className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registration Reference Number *
              </label>
              <input
                type="text"
                name="ref"
                required
                defaultValue={ref}
                placeholder="e.g. APCSC-KW-2026-XXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-brand-500 uppercase"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Coordinator Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={phone}
                  placeholder="e.g. 08031234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white font-bold rounded-xl text-sm transition shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" /> Check Registration Status
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Error Notification */}
        {searchError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <div>
              <span className="font-bold">Lookup Error:</span> {searchError}
            </div>
          </div>
        )}

        {/* Results Container */}
        {forum && (
          <div className="space-y-6">
            {/* Special Administrative Alerts (If rejected or queried) */}
            {forum.status === 'more_info_required' && (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>Action Required: More Information Requested by Directorate</span>
                </div>
                {forum.queryMessage && (
                  <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs font-medium leading-relaxed">
                    <strong>Directorate Query:</strong> {forum.queryMessage}
                  </div>
                )}
                <p className="text-xs text-amber-800">
                  Please contact the State Secretariat at 07030592380 / 08032010479 / 07031693124 or email apcstakeholderscongress@gmail.com with your reference number ({forum.registrationRef}) to resolve this query.
                </p>
              </div>
            )}

            {forum.status === 'rejected' && (
              <div className="p-5 rounded-2xl bg-red-50 border border-red-300 text-red-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-red-800">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span>Registration Status: Application Rejected</span>
                </div>
                {forum.rejectionReason && (
                  <p className="text-xs text-red-800 font-medium">Reason: {forum.rejectionReason}</p>
                )}
                <p className="text-xs text-red-700">
                  For appeals or clarifications, please contact the Directorate Secretariat.
                </p>
              </div>
            )}

            {/* Official Screenshot-Ready Registration Confirmation Card */}
            <RegistrationSuccessCard
              forumName={forum.name}
              registrationRef={forum.registrationRef}
              coordinatorName={forum.coordinatorName}
              lgaName={forum.lga?.name || 'Kwara State'}
              areaOfCoverage={forum.areaOfCoverage}
              totalStrength={forum.totalStrength}
              registeredDate={new Date(forum.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              showBackToHome={true}
            />
          </div>
        )}

        {/* Help & Secretariat Contact Box */}
        <div className="bg-slate-100/80 p-5 rounded-2xl border border-slate-200 text-center space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
            <HelpCircle className="w-4 h-4 text-brand-600" /> Need Assistance With Your Registration?
          </div>
          <p>
            Contact the State Secretariat at <strong>07030592380</strong> / <strong>08032010479</strong> / <strong>07031693124</strong> or email <strong>apcstakeholderscongress@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
