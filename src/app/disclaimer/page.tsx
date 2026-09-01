import React from 'react';

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Official Disclaimer</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Official Legal Disclaimer</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: August 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Official Platform</h2>
          <p>
            This portal is the official digital registry and communication tool of the APC Stakeholders Congress (Kwara State Chapter). Any unauthorized duplication, fraudulent issuance of accreditation documents or letters of recognition, or impersonation of the Congress Directorate is strictly prohibited and subject to prosecution under applicable Nigerian laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Voluntary Grassroots Association</h2>
          <p>
            Participation in the Congress is voluntary for APC-aligned groups committed to party growth, voter mobilization, and democratic engagement in Kwara State.
          </p>
        </section>
      </div>
    </div>
  );
}
