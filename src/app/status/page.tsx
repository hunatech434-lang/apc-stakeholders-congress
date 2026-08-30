import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  FileDown, 
  MessageCircle,
  ExternalLink,
  MapPin,
  Users,
  ArrowRight
} from 'lucide-react';

export const revalidate = 0;

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
      // Find forum by reference number
      const found = await prisma.forum.findUnique({
        where: { registrationRef: ref },
        include: {
          lga: true,
          generatedDocs: {
            where: { isRevoked: false },
          },
        },
      });

      if (!found) {
        searchError = `No registration found with reference number "${ref}". Please check and try again.`;
      } else {
        // If phone provided, verify last 4 digits for extra security
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
      searchError = 'A lookup error occurred. Please try again.';
    }
  }

  const statusBadge = (s: string) => {
    switch (s) {
      case 'approved_verified':
        return (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Approved & Verified (Accredited)</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Congratulations! Your forum has been verified by the Kwara State Directorate. Your official documents are available for download below.
            </p>
          </div>
        );
      case 'under_review':
        return (
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-blue-800">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Under Formal Review</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              Your registration is currently undergoing background vetting and capacity assessment by the Verification Directorate.
            </p>
          </div>
        );
      case 'more_info_required':
        return (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Action Required: More Information Requested</span>
            </div>
            {forum.queryMessage && (
              <div className="p-3 rounded-xl bg-white border border-amber-300 text-xs text-amber-950 font-medium leading-relaxed">
                <strong>Directorate Query:</strong> {forum.queryMessage}
              </div>
            )}
            <p className="text-xs text-amber-800">
              Please contact the State Secretariat at 07030592380 or email apcstakeholderscongress@gmail.com with your reference number to resolve this query.
            </p>
          </div>
        );
      case 'rejected':
        return (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-red-800">
              <XCircle className="w-5 h-5 text-red-600" />
              <span>Registration Rejected</span>
            </div>
            {forum.rejectionReason && (
              <p className="text-xs text-red-800 font-medium">Reason: {forum.rejectionReason}</p>
            )}
          </div>
        );
      case 'suspended_revoked':
        return (
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-purple-800">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              <span>Accreditation Suspended / Revoked</span>
            </div>
            <p className="text-xs text-purple-800">
              This forum's recognition has been suspended pending administrative review.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
              <Clock className="w-5 h-5 text-slate-600" />
              <span>Submitted / Pending Review</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your submission has been logged and placed into the verification queue.
            </p>
          </div>
        );
    }
  };

  const certDoc = forum?.generatedDocs?.find((d: any) => d.docType === 'certificate_of_registration');
  const letterDoc = forum?.generatedDocs?.find((d: any) => d.docType === 'letter_of_recognition');

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <Search className="w-3.5 h-3.5" /> Registration Status & Documents
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Check Forum Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Enter your unique Registration Reference Number to check verification progress or re-download approved official documents.
          </p>
        </div>

        {/* Search Lookup Box */}
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
                placeholder="e.g. APCSC-KW-2026-A1B2C3"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-brand-500 uppercase"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Coordinator Phone Number (Optional Verification)
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
                  className="w-full py-3 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white font-bold rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Check Status
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Error Alert */}
        {searchError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <div>
              <span className="font-bold">Lookup Error:</span> {searchError}
            </div>
          </div>
        )}

        {/* Forum Record Found Result */}
        {forum && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 animate-in zoom-in-95 duration-200">
            {/* Status Banner */}
            {statusBadge(forum.status)}

            {/* Forum Details */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{forum.name}</h3>
                  <p className="text-slate-500 font-mono mt-0.5">{forum.registrationRef}</p>
                </div>
                <span className="text-slate-500 text-[11px]">
                  Submitted: {new Date(forum.createdAt).toLocaleDateString('en-GB')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>
                    <strong>Jurisdiction:</strong> {forum.lga?.name || 'Kwara'} LGA ({forum.areaOfCoverage})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>
                    <strong>Declared Strength:</strong> {forum.totalStrength.toLocaleString()} members
                  </span>
                </div>
              </div>
            </div>

            {/* Official Document Downloads (If Approved) */}
            {forum.status === 'approved_verified' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  Official Accreditation Document
                </h4>

                <div className="grid grid-cols-1 gap-4">
                  {letterDoc ? (
                    <a
                      href={`/api/documents/${letterDoc.id}/download`}
                      className="p-4 rounded-2xl bg-brand-50 border border-brand-200 hover:border-brand-500 hover:shadow-md transition flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-bold text-brand-950 text-xs sm:text-sm">
                          Official Letter of Recognition / Acceptance
                        </div>
                        <div className="text-[11px] text-brand-700 mt-0.5">
                          Official Letterhead Signed PDF
                        </div>
                      </div>
                      <div className="p-2.5 bg-brand-600 group-hover:bg-brand-500 text-white rounded-xl transition">
                        <FileDown className="w-5 h-5" />
                      </div>
                    </a>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      Official Letter of Recognition is being prepared by the Directorate.
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  <strong>Physical Certificate Presentation:</strong> Official Certificates of Registration will be presented physically at the upcoming State Stakeholders Convention / Secretariat.
                </div>
              </div>
            )}

            {/* WhatsApp Community Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-emerald-900">
                <span className="font-bold block">APC Stakeholders WhatsApp Community</span>
                <span>Stay connected with state directors and grassroots coordinators.</span>
              </div>
              <a
                href="https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 flex-shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" /> Join WhatsApp Group
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
