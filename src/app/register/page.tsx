import React from 'react';
import RegistrationWizard from '@/components/registration/RegistrationWizard';
import { ShieldCheck, Info } from 'lucide-react';

export const metadata = {
  title: 'Register Your Forum | APC Stakeholders Congress',
  description: 'Official digital accreditation and registration portal for APC forums, associations, and support groups in Kwara State.',
};

export default function RegisterPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Accreditation Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Forum & Support Group Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Complete the 2-section form to register and accredit your association under the APC Stakeholders Congress (Kwara State Chapter).
          </p>
        </div>

        {/* Notice Card */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3 max-w-4xl mx-auto shadow-sm">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Important Registration Notice:</span>
            <p className="leading-relaxed">
              Registration must be submitted by the authorized Forum Coordinator, Chairman, President, or Secretary. The current registration jurisdiction is strictly <strong>Kwara State</strong>. Ensure all contact phone numbers and declared membership counts are accurate.
            </p>
          </div>
        </div>

        {/* Wizard Form */}
        <RegistrationWizard />
      </div>
    </div>
  );
}
