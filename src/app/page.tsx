import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  Users, 
  Award, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Landmark,
  Building,
  Sparkles,
  Target,
  Layers,
  Vote
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import HeroCarousel from '@/components/home/HeroCarousel';
import { buildMetadata, slugify } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = buildMetadata({
  title: 'APC Stakeholders Congress | Kwara State',
  description:
    'APC Stakeholders Congress is a platform for APC forums, associations and support groups in Kwara State to register, connect and coordinate grassroots engagement.',
  canonicalPath: '/',
  keywords: [
    'APC Stakeholders Congress',
    'APC Stakeholders Congress Kwara',
    'APC forums in Kwara',
    'APC support groups in Kwara',
    'APC associations in Kwara',
    'register APC forum',
    'register APC association',
    'APC forum registration',
    'APC support group registration',
    'verified APC groups',
    'APC groups in Kwara',
    'APC grassroots groups',
    'APC stakeholders Kwara',
    'APC stakeholders registration',
    'APC forum verification',
    'APC forums Ilorin',
    'APC groups in Ilorin',
    'APC Kwara North',
    'APC Kwara Central',
    'APC Kwara South',
    'Victory 2027',
  ],
});

export default async function HomePage() {
  let announcements: any[] = [];

  try {
    announcements = await prisma.announcement.findMany({
      where: { status: 'published' },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {}

  const lgasByDistrict = [
    {
      district: 'Kwara Central',
      lgas: ['Asa', 'Ilorin East', 'Ilorin South', 'Ilorin West'],
      color: 'border-brand-500 bg-brand-50/40',
    },
    {
      district: 'Kwara North',
      lgas: ['Baruten', 'Edu', 'Kaiama', 'Moro', 'Pategi'],
      color: 'border-sky-500 bg-sky-50/40',
    },
    {
      district: 'Kwara South',
      lgas: ['Ekiti', 'Ifelodun', 'Irepodun', 'Isin', 'Offa', 'Oke Ero', 'Oyun'],
      color: 'border-apcRed-500 bg-red-50/30',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION WITH IMAGE CAROUSEL (Contains single primary H1) */}
      <HeroCarousel />

      {/* 2. INSTITUTIONAL COVERAGE & GRASSROOTS IMPACT BANNER */}
      <section aria-label="Key Portal Statistics" className="bg-brand-900 text-white py-6 sm:py-8 border-y border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-sky-400">16 / 16</div>
              <div className="text-xs sm:text-sm text-brand-200 mt-0.5 font-medium">Kwara LGAs Covered</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-white">193</div>
              <div className="text-xs sm:text-sm text-brand-200 mt-0.5 font-medium">Electoral Wards</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-sky-400">100%</div>
              <div className="text-xs sm:text-sm text-brand-200 mt-0.5 font-medium">Digital Registry & Accreditation</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-1.5">
                <span>2027</span>
                <span className="w-2 h-2 rounded-full bg-apcRed-500"></span>
              </div>
              <div className="text-xs sm:text-sm text-brand-200 mt-0.5 font-medium">Strategic Victory Mandate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE & PURPOSE (EXACT APPROVED FRAMING) */}
      <section aria-labelledby="about-section-heading" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-apcRed-500"></span>
                Official Mandate
              </div>
              
              <h2 id="about-section-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                About APC Stakeholders Congress, Kwara State
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  The <strong className="text-slate-900 font-bold">APC Stakeholders Congress</strong> serves as the premier platform for organizing, harmonizing, and coordinating the various support groups, professional associations, youth and women organizations, and other stakeholders within the <strong className="text-brand-800 font-bold">All Progressives Congress (APC) across Kwara State</strong>.
                </p>

                <p>
                  Our mission is to transform the existing network of political interest groups into a <strong className="text-slate-900 font-bold">unified, structured, and effective grassroots political machinery</strong>. By fostering collaboration, communication, and strategic coordination among stakeholders, we seek to build a stronger and more cohesive APC presence across the state.
                </p>

                <p>
                  Our structure is designed to establish active and functional engagement at <strong className="text-slate-900 font-bold">every Local Government Area, ward, and polling unit</strong>, ensuring that every stakeholder and grassroots supporter has a meaningful role to play in advancing the party's objectives.
                </p>

                <p>
                  As we work towards the <strong className="text-brand-800 font-bold">2027 General Elections</strong>, the APC Stakeholders Congress remains committed to strengthening grassroots mobilization, promoting unity among party stakeholders, coordinating support groups, and building a sustainable political network capable of delivering electoral success for the APC in Kwara State.
                </p>
              </div>

              <div className="pt-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs sm:text-sm font-extrabold text-brand-800 tracking-wide text-center">
                  One Party. One Structure. One Strong Grassroots Movement.
                </p>
              </div>

              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 group"
                >
                  <span>Learn more about our Vision & Leadership Structure</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-apcRed-500" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                Why Register Your Forum?
              </h3>
              
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-100 text-brand-700 rounded-lg flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Official Letter of Recognition</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Receive an official letterhead document verified by the State Directorate.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-100 text-sky-700 rounded-lg flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Direct Alignment with Party Leadership</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Ensure your members and grassroots efforts are counted and integrated into party strategy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-50 text-apcRed-600 rounded-lg flex-shrink-0 mt-0.5 border border-red-100">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Capacity Building & Strategic Coordination</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Access voter education manuals, campaign workshops, and strategic mobilization tools.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/register"
                  className="w-full py-3 bg-brand-700 hover:bg-brand-600 hover:ring-2 hover:ring-apcRed-500/30 text-white font-bold rounded-xl text-center block text-xs sm:text-sm transition shadow-sm"
                >
                  Register Your Forum Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 5. GEOGRAPHIC COVERAGE (16 LGAs OF KWARA) */}
      <section aria-labelledby="jurisdiction-heading" className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Jurisdiction & Scope</span>
            <h2 id="jurisdiction-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Grassroots Reach Across Kwara State
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
              Active accreditation and mobilization structures deployed throughout all 3 Senatorial Districts and 16 Local Government Areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {lgasByDistrict.map((dist) => (
              <div
                key={dist.district}
                className={`p-5 sm:p-6 rounded-3xl border-2 ${dist.color} bg-white shadow-sm space-y-3.5`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{dist.district}</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {dist.lgas.length} LGAs
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {dist.lgas.map((lga) => (
                    <Link
                      key={lga}
                      href={`/verified-groups?lga=${encodeURIComponent(lga)}`}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 hover:bg-brand-50 hover:text-brand-800 text-slate-800 border border-slate-200 transition"
                    >
                      {lga}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            * Statewide Coalitions & Apex Associations may select <strong>"Kwara State at Large"</strong> or multiple LGAs during registration.
          </div>
        </div>
      </section>

      {/* 6. LATEST ANNOUNCEMENTS & NEWS */}
      {announcements.length > 0 && (
        <section aria-labelledby="notices-heading" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Official Notices</span>
              <h2 id="notices-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Announcements & Updates</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2.5"
                >
                  <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    {ann.targetAudience === 'all' ? 'Public Notice' : 'Registered Forums'}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{ann.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{ann.body}</p>
                  <div className="pt-2 text-[11px] text-slate-400">
                    {new Date(ann.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 hover:underline"
              >
                <span>Read Full Directorate Press Releases & News</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. CALL TO ACTION STRIP */}
      <section aria-labelledby="cta-heading" className="py-14 sm:py-20 bg-gradient-to-br from-brand-900 via-slate-950 to-brand-950 text-white border-t-2 border-apcRed-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          <h2 id="cta-heading" className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accredit Your APC Support Group?
          </h2>
          <p className="text-brand-100 text-xs sm:text-base max-w-2xl mx-auto">
            Take 3 minutes to complete the official digital registration. Obtain official recognition and mobilize with the party for victory in 2027.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg transition text-xs sm:text-sm"
            >
              Begin Forum Registration
            </Link>
            <Link
              href="/status"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition text-xs sm:text-sm"
            >
              Check Existing Registration Status
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
