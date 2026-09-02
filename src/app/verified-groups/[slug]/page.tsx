import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Calendar, 
  Building, 
  Target, 
  ArrowLeft,
  Share2,
  FileCheck2,
  Award
} from 'lucide-react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { 
  buildMetadata, 
  slugify, 
  generateVerifiedGroupSchema, 
  SITE_CONFIG 
} from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

/**
 * Finds a verified forum by matching slug against forum names.
 */
async function getVerifiedForumBySlug(slug: string) {
  const verifiedForums = await prisma.forum.findMany({
    where: { status: 'approved_verified' },
    include: {
      lga: true,
      senatorialDistrict: true,
      state: true,
    },
  });

  const forum = verifiedForums.find((f) => slugify(f.name) === slug);
  return forum || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const forum = await getVerifiedForumBySlug(slug);

  if (!forum) {
    return buildMetadata({
      title: 'Forum Profile Not Found',
      description: 'The requested verified forum profile could not be found.',
      canonicalPath: `/verified-groups/${slug}`,
      noIndex: true,
    });
  }

  const lgaName = forum.lga?.name || 'Kwara State';
  const pageTitle = `${forum.name} | Verified APC Forum in ${lgaName}, Kwara`;
  const pageDesc = `Official accreditation profile for ${forum.name}. Officially verified APC grassroots support group operating in ${lgaName} LGA (${forum.areaOfCoverage}), Kwara State.`;

  return buildMetadata({
    title: pageTitle,
    description: pageDesc,
    canonicalPath: `/verified-groups/${slug}`,
    keywords: [
      forum.name,
      forum.acronym || '',
      `APC forum ${lgaName}`,
      `APC support group ${lgaName}`,
      'verified APC groups Kwara',
      'APC stakeholders Kwara',
    ].filter(Boolean),
  });
}

export default async function VerifiedGroupProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const forum = await getVerifiedForumBySlug(slug);

  if (!forum) {
    notFound();
  }

  const lgaName = forum.lga?.name || 'Kwara State';
  const districtName = forum.senatorialDistrict?.name || 'Kwara State';

  let keyActivities: string[] = [];
  try {
    if (forum.keyActivities) {
      keyActivities = JSON.parse(forum.keyActivities);
    }
  } catch (e) {}

  const groupSchema = generateVerifiedGroupSchema({
    name: forum.name,
    acronym: forum.acronym,
    motto: forum.motto,
    slug,
    lgaName,
    senatorialDistrict: districtName,
    areaOfCoverage: forum.areaOfCoverage,
    yearEstablished: forum.yearEstablished,
    totalStrength: forum.totalStrength,
    approvedAt: forum.approvedAt,
  });

  const breadcrumbItems = [
    { name: 'Verified Groups', path: '/verified-groups' },
    { name: forum.name, path: `/verified-groups/${slug}` },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      {/* Schema.org Structured Data */}
      <JsonLd data={groupSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumbs items={breadcrumbItems} />
          <Link
            href="/verified-groups"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
          </Link>
        </div>

        {/* Main Profile Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Officially Accredited APC Forum
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {forum.name}
              </h1>
              {forum.acronym && (
                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Acronym: {forum.acronym}
                </p>
              )}
            </div>

            <div className="flex-shrink-0 text-left sm:text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Official Reference
              </span>
              <span className="text-xs font-mono font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-lg border border-brand-200 inline-block mt-0.5">
                {forum.registrationRef}
              </span>
            </div>
          </div>

          {/* Motto / Slogan */}
          {forum.motto && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Forum Motto & Philosophy
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-800 italic">
                "{forum.motto}"
              </p>
            </div>
          )}

          {/* Public Jurisdictional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h2 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                Jurisdiction & Geography
              </h2>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">State:</span>
                  <strong className="text-slate-900">Kwara State</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Senatorial District:</span>
                  <strong className="text-slate-900">{districtName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Local Government Area:</span>
                  <strong className="text-slate-900">{lgaName} LGA</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Area of Coverage:</span>
                  <strong className="text-slate-900">{forum.areaOfCoverage}</strong>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h2 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Users className="w-4 h-4 text-sky-600" />
                Organizational Capacity
              </h2>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Declared Grassroots Force:</span>
                  <strong className="text-brand-800">{forum.totalStrength.toLocaleString()} Members</strong>
                </div>
                {forum.yearEstablished > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Year Established:</span>
                    <strong className="text-slate-900">{forum.yearEstablished}</strong>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Accreditation Status:</span>
                  <strong className="text-emerald-700">Accredited & Verified</strong>
                </div>
                {forum.approvedAt && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recognition Date:</span>
                    <strong className="text-slate-900">
                      {new Date(forum.approvedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Mobilization Activities */}
          {keyActivities.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-gold-600" />
                Key Focus & Grassroots Activities
              </h2>
              <div className="flex flex-wrap gap-2">
                {keyActivities.map((activity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 text-brand-900 border border-brand-200"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Privacy & Zero-Trust Notice */}
          <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
            <span className="font-bold text-slate-800 block">Official Public Registry Notice:</span>
            <p>
              This verified profile confirms legitimate accreditation with the APC Stakeholders Congress (Kwara State Chapter). In accordance with party data privacy protocols and Nigerian Data Protection regulations, personal leadership telephone numbers, private residential contacts, and internal administrative records are strictly withheld from public disclosure.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Link
            href="/verified-groups"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition text-xs sm:text-sm text-center flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Other Verified Forums
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition text-xs sm:text-sm text-center shadow flex items-center justify-center gap-1.5"
          >
            Register Your Own APC Forum
          </Link>
        </div>
      </div>
    </div>
  );
}
