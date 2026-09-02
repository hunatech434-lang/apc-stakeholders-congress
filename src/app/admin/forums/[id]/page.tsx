import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import VerificationControls from '@/components/admin/VerificationControls';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Calendar,
  Building,
  Clock,
  History,
  Download,
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ForumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;

  const forum = await prisma.forum.findUnique({
    where: { id },
    include: {
      lga: { include: { senatorialDistrict: true } },
      ward: true,
      contacts: true,
      documents: true,
      generatedDocs: true,
      auditLogs: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!forum) {
    notFound();
  }

  // Parse JSON arrays safely
  let keyActivities: string[] = [];
  try {
    keyActivities = JSON.parse(forum.keyActivities || '[]');
  } catch (e) {}

  let supportNeeded: string[] = [];
  try {
    supportNeeded = JSON.parse(forum.supportNeeded || '[]');
  } catch (e) {}

  return (
    <div className="space-y-8">
      {/* Back Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Link
            href="/admin/forums"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Registrations
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>{forum.name}</span>
            {forum.acronym && (
              <span className="text-sm font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {forum.acronym}
              </span>
            )}
          </h1>
          <div className="text-xs text-slate-400 font-mono mt-1">
            Reference: <strong className="text-gold-400">{forum.registrationRef}</strong> • Submitted:{' '}
            {forum.submittedAt ? new Date(forum.submittedAt).toLocaleString('en-GB') : 'N/A'}
          </div>
        </div>
      </div>

      {/* Verification Directorate Controls */}
      <VerificationControls
        forumId={forum.id}
        currentStatus={forum.status}
        currentNotes={forum.reviewerNotes}
        generatedDocs={forum.generatedDocs.map((d) => ({
          id: d.id,
          docType: d.docType,
          filePath: d.filePath,
          verificationToken: d.verificationToken,
        }))}
      />

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Core Organizational Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Leadership & Key Contacts */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-400" />
              Leadership & Key Contacts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-brand-400 uppercase">Coordinator / Chairman</span>
                <div className="text-sm font-bold text-white">{forum.coordinatorName}</div>
                <div className="text-slate-300">Phone: {forum.coordinatorPhone}</div>
                {forum.coordinatorEmail && <div className="text-slate-400">Email: {forum.coordinatorEmail}</div>}
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Forum Secretary</span>
                <div className="text-sm font-bold text-white">{forum.secretaryName}</div>
                <div className="text-slate-300">Phone: {forum.secretaryPhone}</div>
                {forum.forumEmail && <div className="text-slate-400">Forum Email: {forum.forumEmail}</div>}
              </div>
            </div>

            {forum.coordinatorPassportUrl && (
              <div className="pt-2 text-xs">
                <a
                  href={forum.coordinatorPassportUrl}
                  target="_blank"
                  className="text-brand-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" /> View Coordinator Passport Photograph
                </a>
              </div>
            )}
          </div>

          {/* Section 2: Structure, Activities & Capacity */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-gold-400" />
              Structure, Capacity & Communication
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Declared Strength</span>
                <div className="text-lg font-black text-gold-400">{forum.totalStrength.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Year Established</span>
                <div className="text-lg font-black text-white">{forum.yearEstablished}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px]">WhatsApp Group</span>
                <div className="text-sm font-bold text-emerald-400">{forum.hasWhatsappGroup ? 'Active' : 'None'}</div>
              </div>
            </div>

            {forum.hasWhatsappGroup && forum.whatsappGroupLink && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold">Forum WhatsApp Link: </span>
                <a href={forum.whatsappGroupLink} target="_blank" className="text-emerald-400 hover:underline">
                  {forum.whatsappGroupLink}
                </a>
              </div>
            )}

            <div className="space-y-2 text-xs">
              <span className="text-slate-400 font-bold">Key Activities & Mobilization Areas:</span>
              <div className="flex flex-wrap gap-2">
                {keyActivities.map((act) => (
                  <span
                    key={act}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-200 text-xs"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>

            {forum.otherActivity && (
              <div className="text-xs text-slate-300">
                <span className="font-bold text-slate-400">Other Activity:</span> {forum.otherActivity}
              </div>
            )}
          </div>

          {/* Section 3: Political Track Record & Commitments */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Political Track Record & 2027 Alignment
            </h2>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 font-bold block mb-0.5">Previous Election Participation:</span>
                <div className="text-white font-semibold">{forum.previousElectionActivity}</div>
              </div>

              {forum.rolePlayedLastElection && (
                <div>
                  <span className="text-slate-500 font-bold block mb-0.5">Role Played in Last Election:</span>
                  <p className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed">
                    {forum.rolePlayedLastElection}
                  </p>
                </div>
              )}

              {forum.leaderSponsorAlignment && (
                <div>
                  <span className="text-slate-500 font-bold block mb-0.5">Leader / Sponsor Alignment:</span>
                  <div className="text-white font-semibold">{forum.leaderSponsorAlignment}</div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold block">Victory 2027 Commitment</span>
                  <span className="text-emerald-400 font-bold">✓ Committed to APC Candidates</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold block">Party Supremacy & Alignment</span>
                  <span className="text-emerald-400 font-bold">✓ Full Alignment Confirmed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Geography, Uploads & Audit Trail */}
        <div className="lg:col-span-4 space-y-6">
          {/* Geography Card */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-400" />
              Jurisdiction & Base
            </h2>
            <div className="space-y-2">
              <div>
                <span className="text-slate-500">LGA of Operation:</span>
                <div className="font-bold text-white">{forum.lga?.name || 'Kwara'}</div>
              </div>
              <div>
                <span className="text-slate-500">Senatorial District:</span>
                <div className="font-bold text-white">{forum.lga?.senatorialDistrict?.name || forum.areaOfCoverage}</div>
              </div>
              <div>
                <span className="text-slate-500">Ward:</span>
                <div className="font-bold text-white">{forum.ward?.name || forum.wardName || 'Statewide / LGA-wide'}</div>
              </div>
              <div>
                <span className="text-slate-500">Office / Secretariat Address:</span>
                <div className="font-semibold text-slate-200 mt-0.5">{forum.officeAddress}</div>
              </div>
              {forum.meetingVenue && (
                <div>
                  <span className="text-slate-500">Meeting Venue:</span>
                  <div className="font-semibold text-slate-200 mt-0.5">{forum.meetingVenue}</div>
                </div>
              )}
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              Uploaded Documents
            </h2>
            <div className="space-y-2">
              {forum.resolutionLetterUrl ? (
                <a
                  href={forum.resolutionLetterUrl}
                  target="_blank"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 flex items-center justify-between transition"
                >
                  <span className="font-semibold text-slate-200">Resolution Letter</span>
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                </a>
              ) : (
                <p className="text-slate-500 text-[11px]">No resolution letter attached.</p>
              )}
            </div>
          </div>

          {/* Audit History Log */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-gold-400" />
              Audit Log Trail
            </h2>
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {forum.auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-bold text-white">{log.action}</span>
                    <span>{new Date(log.createdAt).toLocaleDateString('en-GB')}</span>
                  </div>
                  {log.actorEmail && <div className="text-[10px] text-slate-500">By: {log.actorEmail}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
