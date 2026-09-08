'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Copy, 
  Check, 
  MessageCircle, 
  ShieldCheck, 
  Camera, 
  Share2,
  Printer,
  Sparkles,
  CheckCircle2,
  MapPin,
  Users,
  Calendar,
  UserCheck
} from 'lucide-react';

interface RegistrationSuccessCardProps {
  forumName: string;
  registrationRef: string;
  coordinatorName?: string;
  lgaName?: string;
  areaOfCoverage?: string;
  totalStrength?: number;
  registeredDate?: string;
  whatsappLink?: string;
  showBackToHome?: boolean;
}

export default function RegistrationSuccessCard({
  forumName,
  registrationRef,
  coordinatorName,
  lgaName,
  areaOfCoverage,
  totalStrength,
  registeredDate,
  whatsappLink = 'https://chat.whatsapp.com/JykufBzH7AS3wTLIk8XQ8f?s=cl&p=a&mlu=4',
  showBackToHome = false,
}: RegistrationSuccessCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(registrationRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const shareText = encodeURIComponent(
    `*CONGRATULATIONS!*\n*REGISTRATION SUCCESSFUL*\n\n${forumName} is now an officially registered member organization of the *APC Stakeholders Congress (Kwara State Chapter)*.\n\n*Official Reference ID:* ${registrationRef}\n\n_Together, we will mobilize, unite, and deliver victory for the APC and the Renewed Hope Agenda in 2027._\n\n_One Party. One Vision. One Nigeria._\n\nVerify online: https://apcstakeholderscongress.org.ng/status?ref=${registrationRef}`
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Official Accreditation Certificate Card */}
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center transition duration-200">
        {/* APC Official Tri-color Top Accent Bar */}
        <div className="h-2 w-full flex">
          <div className="h-full bg-brand-600 flex-[4]" />
          <div className="h-full bg-white flex-[1]" />
          <div className="h-full bg-sky-500 flex-[1]" />
          <div className="h-full bg-apcRed-500 flex-[1]" />
        </div>

        <div className="p-6 sm:p-10 space-y-7">
          {/* Official Emblem & Hierarchy Header */}
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Round Logo with Subtle Ring */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white shadow-md ring-4 ring-brand-500/20 flex items-center justify-center">
              <Image
                src="/images/official-logo.png"
                alt="APC Stakeholders Congress Official Logo"
                width={112}
                height={112}
                className="object-contain w-full h-full rounded-full"
                priority
              />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest">
                All Progressives Congress • Kwara State
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                APC Stakeholders Congress
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Directorate of Support Groups & Grassroots Mobilization
              </p>
            </div>
          </div>

          {/* Official Congratulations & Membership Certification Box */}
          <div className="bg-gradient-to-b from-brand-50/60 via-white to-brand-50/30 rounded-2xl border-2 border-brand-200/80 p-6 sm:p-7 space-y-3 shadow-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-700 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Accreditation Confirmed</span>
            </div>

            <div className="space-y-1 pt-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-900 tracking-tight uppercase">
                CONGRATULATIONS!
              </h1>
              <h2 className="text-xs sm:text-sm font-extrabold text-brand-700 uppercase tracking-widest">
                REGISTRATION SUCCESSFUL
              </h2>
            </div>

            <div className="pt-2 text-slate-700 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              <p className="text-slate-600 text-xs sm:text-sm font-medium">Congratulations!</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 my-1">
                {forumName}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-700">
                is now a proud member of the{' '}
                <strong className="text-brand-800 font-extrabold">APC Stakeholders Congress</strong>
              </p>
            </div>
          </div>

          {/* Accreditation Reference ID Card (Deep Forest Green Credential) */}
          <div className="relative bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white p-5 sm:p-6 rounded-2xl border border-brand-700 shadow-md text-center space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-brand-700/60 pb-2.5">
              <span className="text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[11px] sm:text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Accreditation Reference ID
              </span>
              <span className="text-brand-200 text-[11px] font-semibold flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-sky-400" />
                Screenshot for Records
              </span>
            </div>

            <div className="py-1">
              <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-black text-white tracking-widest block drop-shadow-sm select-all">
                {registrationRef}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-700 hover:bg-brand-600 active:scale-95 text-white text-xs font-bold transition border border-brand-500/50 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-emerald-300">Reference ID Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-brand-200" />
                    <span>Copy Reference ID</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Official Registered Particulars Grid */}
          {(coordinatorName || lgaName || totalStrength) && (
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700">
              {coordinatorName && (
                <div className="flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Authorized Coordinator</span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{coordinatorName}</span>
                  </div>
                </div>
              )}
              {lgaName && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Jurisdiction / LGA</span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {lgaName} {areaOfCoverage ? `(${areaOfCoverage})` : ''}
                    </span>
                  </div>
                </div>
              )}
              {typeof totalStrength === 'number' && totalStrength > 0 && (
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Declared Strength</span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {totalStrength.toLocaleString()} Grassroots Members
                    </span>
                  </div>
                </div>
              )}
              {registeredDate && (
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Date of Accreditation</span>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{registeredDate}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Official Mission Declaration & Directives */}
          <div className="space-y-3.5 px-2 text-center">
            <p className="italic text-slate-800 text-xs sm:text-sm font-medium leading-relaxed max-w-lg mx-auto">
              &ldquo;Together, we will mobilize, unite, and deliver victory for the APC and the Renewed Hope Agenda in 2027.&rdquo;
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Thank you for joining the movement to build a stronger party and a better Nigeria.
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-bold text-xs max-w-md mx-auto">
              📢 We will contact you with the next steps shortly.
            </div>
            <p className="text-xs font-black text-brand-800 tracking-widest uppercase pt-1">
              One Party • One Vision • One Nigeria
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 space-y-3">
            {/* WhatsApp Community CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white font-black rounded-2xl text-sm sm:text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              <span>Join Official WhatsApp Community</span>
            </a>

            {/* Auxiliary Tools: Share & Print */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Confirmation</span>
              </button>

              {showBackToHome && (
                <Link
                  href="/"
                  className="w-full sm:flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Home</span>
                </Link>
              )}
            </div>
          </div>

          {/* Official Footnote */}
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            <p>
              Official accreditation cataloged in the <strong>State Directorate Registry</strong>. Take a screenshot of this card or note your Reference ID for admittance into congress conventions and inauguration ceremonies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
