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
  Sparkles
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

  const shareText = encodeURIComponent(
    `*CONGRATULATIONS!*\n*REGISTRATION SUCCESSFUL*\n\n${forumName} is now an officially registered member organization of the *APC Stakeholders Congress (Kwara State Chapter)*.\n\n*Official Reference ID:* ${registrationRef}\n\n_Together, we will mobilize, unite, and deliver victory for the APC and the Renewed Hope Agenda in 2027._\n\n_One Party. One Vision. One Nigeria._\n\nVerify on: https://apcstakeholderscongress.org.ng/status?ref=${registrationRef}`
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Official Confirmation Card */}
      <div className="relative bg-white rounded-3xl border-2 border-emerald-500/40 shadow-2xl overflow-hidden p-6 sm:p-10 text-center space-y-6 animate-in zoom-in-95 duration-300">
        {/* Top Decorative Background Banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-600 via-amber-400 to-sky-600" />
        
        {/* Official Watermark / Emblem Header */}
        <div className="flex flex-col items-center justify-center pt-2 space-y-3">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center">
            <Image
              src="/images/official-logo.png"
              alt="APC Stakeholders Congress Logo"
              width={88}
              height={88}
              className="object-contain"
              priority
            />
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800">
              APC Stakeholders Congress
            </span>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500">
              Kwara State Chapter • Directorate of Support Groups & Forums
            </p>
          </div>
        </div>

        {/* Primary Congratulations Headline */}
        <div className="space-y-2 border-y border-emerald-100 py-5 bg-emerald-50/50 rounded-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Official Confirmation
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">
            CONGRATULATIONS!
          </h1>
          <h2 className="text-sm sm:text-base font-black text-emerald-700 uppercase tracking-wide">
            REGISTRATION SUCCESSFUL
          </h2>
          <div className="pt-2 px-2 max-w-lg mx-auto">
            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
              Congratulations! <br />
              <strong className="text-base sm:text-lg text-emerald-900 font-black underline decoration-amber-400 decoration-2">
                {forumName}
              </strong>{' '}
              is now a proud member of the{' '}
              <strong className="text-emerald-800 font-extrabold">APC Stakeholders Congress</strong>.
            </p>
          </div>
        </div>

        {/* Reference ID Highlight Box (Designed for Screenshots) */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-lg text-center space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-4 h-4" /> Official Reference ID
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Camera className="w-3.5 h-3.5 text-emerald-400" /> Screenshot for Records
            </span>
          </div>

          <div className="py-1">
            <span className="text-xl sm:text-2xl lg:text-3xl font-mono font-black text-emerald-400 tracking-wider select-all block">
              {registrationRef}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700 active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Reference ID</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Group Details Summary (If Provided) */}
        {(coordinatorName || lgaName || totalStrength) && (
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            {coordinatorName && (
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Coordinator</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{coordinatorName}</span>
              </div>
            )}
            {lgaName && (
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Jurisdiction / LGA</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                  {lgaName} {areaOfCoverage ? `(${areaOfCoverage})` : ''}
                </span>
              </div>
            )}
            {typeof totalStrength === 'number' && totalStrength > 0 && (
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Declared Strength</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                  {totalStrength.toLocaleString()} Active Members
                </span>
              </div>
            )}
            {registeredDate && (
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Registration Date</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{registeredDate}</span>
              </div>
            )}
          </div>
        )}

        {/* Official Pledge & Directive */}
        <div className="space-y-3 px-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium text-center">
          <p className="italic text-slate-800">
            &ldquo;Together, we will mobilize, unite, and deliver victory for the APC and the Renewed Hope Agenda in 2027.&rdquo;
          </p>
          <p className="text-slate-600 text-xs">
            Thank you for joining the movement to build a stronger party and a better Nigeria.
          </p>
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-950 font-bold text-xs">
            📢 We will contact you with the next steps shortly.
          </div>
          <p className="text-xs font-black text-emerald-800 tracking-wider uppercase pt-1">
            One Party. One Vision. One Nigeria.
          </p>
        </div>

        {/* Action Buttons: WhatsApp Community CTA & Sharing */}
        <div className="pt-2 space-y-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black rounded-2xl text-sm sm:text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            <span>Join Official WhatsApp Community</span>
          </a>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Confirmation</span>
            </a>

            {showBackToHome && (
              <Link
                href="/"
                className="w-full sm:flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Return to Homepage</span>
              </Link>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
          <p>
            Official registration confirmed by the <strong>State Directorate</strong>. Keep your Reference ID safe for accreditation and event admittance.
          </p>
        </div>
      </div>
    </div>
  );
}
