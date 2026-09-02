import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Building2, 
  Calendar, 
  MapPin, 
  FileText,
  ArrowRight
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  return buildMetadata({
    title: 'Document Verification',
    description: 'Official document authenticity and verification portal.',
    canonicalPath: `/verify/${token}`,
    noIndex: true,
  });
}

export default async function VerifyDocumentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const doc = await prisma.generatedDocument.findUnique({
    where: { verificationToken: token },
    include: {
      forum: {
        include: { lga: true, state: true },
      },
    },
  });

  if (!doc) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">Document Not Found</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The verification token provided does not match any official accredited document issued by the APC Stakeholders Congress.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
            >
              Return to Official Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { forum } = doc;
  const isRevoked = doc.isRevoked || forum.status === 'suspended_revoked';

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-brand-900 text-white p-6 text-center space-y-2 border-b-4 border-sky-400">
          <div className="w-12 h-12 bg-white rounded-xl p-1 mx-auto shadow flex items-center justify-center">
            <Image
              src="/images/official-logo.png"
              alt="Official Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300 block">
            Official Document Verification Portal
          </span>
          <h1 className="text-lg font-extrabold text-white">
            APC Stakeholders Congress (Kwara State)
          </h1>
        </div>

        {/* Verification Status Banner */}
        <div className="p-6 sm:p-8 space-y-6">
          {!isRevoked ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authentic & Duly Accredited
              </div>
              <p className="text-xs text-emerald-900 font-medium">
                This Official Letter of Recognition is genuine and officially recorded.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-800 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-red-600" /> Document Revoked / Suspended
              </div>
              <p className="text-xs text-red-900 font-medium">
                This document has been suspended or revoked by the State Directorate.
              </p>
            </div>
          )}

          {/* Forum Public Record Summary */}
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Accredited Forum Name</span>
                <div className="text-base font-extrabold text-slate-900 leading-snug">{forum.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Registration Ref</span>
                  <div className="font-mono font-bold text-brand-800 text-xs">{forum.registrationRef}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Document Type</span>
                  <div className="font-bold text-slate-800 text-xs">
                    Letter of Recognition
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Jurisdiction</span>
                  <div className="font-semibold text-slate-800">
                    {forum.lga?.name || 'Kwara'} LGA ({forum.areaOfCoverage})
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Date of Issuance</span>
                  <div className="font-semibold text-slate-800">
                    {new Date(doc.issuedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 text-center leading-relaxed">
              * This public record confirms accreditation without exposing private coordinator identity numbers or sensitive contact data.
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:underline"
            >
              <span>Visit Official APC Stakeholders Congress Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
