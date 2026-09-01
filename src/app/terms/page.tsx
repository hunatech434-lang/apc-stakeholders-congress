import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Official Policy</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Terms of Forum Registration & Accreditation</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: August 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By submitting a forum registration on the APC Stakeholders Congress Portal, the submitting Coordinator or Secretary warrants that they possess the legitimate authority to represent the organization and that all submitted particulars are accurate and truthful.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Party Supremacy & Core Ideals</h2>
          <p>
            All accredited forums agree to uphold party supremacy, internal discipline, loyalty to the All Progressives Congress leadership, and active grassroots participation towards Victory 2027.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Nature of Accreditation</h2>
          <p>
            Digital registration and accreditation under the APC Stakeholders Congress signifies formal recognition as an aligned support group. It does not replace statutory party primary elections or official party constitution organs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Revocation of Accreditation</h2>
          <p>
            The Directorate reserves the right to suspend or revoke any Letter of Recognition or forum accreditation in instances of anti-party activities, false declaration, or disciplinary infractions.
          </p>
        </section>
      </div>
    </div>
  );
}
