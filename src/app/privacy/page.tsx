import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Official Policy</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Data Privacy & Protection Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: August 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Purpose and Scope</h2>
          <p>
            The APC Stakeholders Congress Portal (Kwara State Chapter) operates under strict data minimization and lawful processing principles. We collect, store, and process organizational and contact information solely for the administration, accreditation, verification, and legitimate party coordination of affiliated forums and support groups.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Data We Collect</h2>
          <p>
            We collect forum names, leadership contact numbers (Coordinator and Secretary), physical secretariat addresses, declared membership estimates, and supporting resolution documents. We do <strong>not</strong> collect National Identification Numbers (NIN), bank verification numbers, or private financial details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Protection of Contact Information</h2>
          <p>
            Personal telephone numbers and email addresses submitted during registration are strictly restricted to authorized Directorate verification officers and system administrators. They are never published in the public Verified Groups Directory.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Document Security</h2>
          <p>
            Generated official Letters of Recognition and accreditation documents are secured via private non-predictable URLs, encrypted session checks, and tamper-evident QR code verification tokens.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contacting the Directorate</h2>
          <p>
            For data correction, privacy questions, or registration amendments, contact the Directorate at <em>apcstakeholderscongress@gmail.com</em> or visit our Secretariat at APC Kwara North House, Fate Road, Ilorin, Kwara State.
          </p>
        </section>
      </div>
    </div>
  );
}
