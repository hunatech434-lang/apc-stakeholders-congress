import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Sparkles
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import HeroCarousel from '@/components/home/HeroCarousel';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Fetch real statistics & recent verified groups
  let verifiedCount = 0;
  let totalDeclaredMembers = 0;
  let verifiedGroups: any[] = [];
  let announcements: any[] = [];

  try {
    const verified = await prisma.forum.findMany({
      where: { status: 'approved_verified' },
      take: 6,
      orderBy: { approvedAt: 'desc' },
      include: { lga: true },
    });
    verifiedGroups = verified;
    verifiedCount = await prisma.forum.count({
      where: { status: 'approved_verified' },
    });

    const memberSum = await prisma.forum.aggregate({
      _sum: { totalStrength: true },
    });
    totalDeclaredMembers = memberSum._sum.totalStrength || 0;

    announcements = await prisma.announcement.findMany({
      where: { status: 'published' },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {}

  const coreValues = [
    { title: 'Unity', desc: 'Bringing diverse support groups and stakeholder forums under one purposeful umbrella.' },
    { title: 'Loyalty', desc: 'Unwavering allegiance to the All Progressives Congress and its leadership structure.' },
    { title: 'Service', desc: 'Selfless civic commitment to community development and party progress.' },
    { title: 'Integrity', desc: 'Transparent, accountable, and disciplined grassroots political operations.' },
    { title: 'Grassroots First', desc: 'Empowering local polling units, wards, and communities where real victory lives.' },
    { title: 'Party Supremacy', desc: 'Strict alignment with the constitution, guidelines, and directives of the APC.' },
  ];

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
      {/* 1. HERO SECTION WITH IMAGE CAROUSEL */}
      <HeroCarousel />

      {/* 2. REAL-TIME STATS & GRASSROOTS IMPACT BANNER */}
      <section className="bg-brand-900 text-white py-6 sm:py-8 border-y border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-sky-400">16 / 16</div>
              <div className="text-xs sm:text-sm text-brand-200 mt-0.5 font-medium">Kwara LGAs Covered</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-white">
                {verifiedCount > 0 ? verifiedCount : '100%'}
              </div>
              <div className="text-xs sm:text-sm text-brand-200 mt-0.5 font-medium">
                {verifiedCount > 0 ? 'Accredited Forums' : 'Digital Verification'}
              </div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-sky-400">
                {totalDeclaredMembers > 0 ? totalDeclaredMembers.toLocaleString() : '193'}
              </div>
              <div className="text-xs sm:text-sm text-brand-200 mt-0.5 font-medium">
                {totalDeclaredMembers > 0 ? 'Declared Member Force' : 'Electoral Wards'}
              </div>
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

      {/* 3. WHO WE ARE & PURPOSE */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-800 text-xs font-bold uppercase tracking-wider rounded border border-brand-200">
                <span className="w-1.5 h-1.5 rounded-full bg-apcRed-500"></span>
                Institutional Mandate
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                One Platform, One Purpose, One Indomitable Party
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The <strong>APC Stakeholders Congress</strong> operates as the premier organizing, harmonizing, and coordinating body for all All Progressives Congress support groups, professional bodies, youth and women associations across Kwara State.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our objective is to transition from uncoordinated political interest groups to a structured, synchronized grassroots machinery that commands presence in every polling unit, ward, and Local Government Area in preparation for the 2027 general elections.
              </p>
              
              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 group"
                >
                  <span>Learn more about our Vision, Mission & Structure</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-apcRed-500" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                Why Register Your Forum?
              </h3>
              
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-100 text-brand-700 rounded-lg flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Official Letter & Certificate of Recognition</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Receive digitally signed accreditation documents verified by the State Directorate.</p>
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
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Access voter education manuals, campaign training sessions, and strategic mobilization tools.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/register"
                  className="w-full py-3 bg-brand-700 hover:bg-brand-600 hover:ring-2 hover:ring-apcRed-500/30 text-white font-bold rounded-xl text-center block text-xs sm:text-sm transition shadow-sm"
                >
                  Start Forum Registration Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className="py-14 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Guiding Ideals</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Our Core Values</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
              The fundamental institutional tenets underpinning every forum, coordinator, and grassroots stakeholder.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={val.title}
                className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-brand-500/50 transition relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-sky-400">0{idx + 1}</span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{val.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GEOGRAPHIC COVERAGE (16 LGAs OF KWARA) */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Jurisdiction & Scope</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
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
                    <span
                      key={lga}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {lga}
                    </span>
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

      {/* 6. VERIFIED GROUPS PREVIEW */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Official Directory</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Verified Stakeholder Groups</h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                Forums that have successfully completed state verification and digital accreditation.
              </p>
            </div>
            <Link
              href="/verified-groups"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-4 h-4 text-apcRed-500" />
            </Link>
          </div>

          {verifiedGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {verifiedGroups.map((g) => (
                <div
                  key={g.id}
                  className="p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-brand-500 shadow-sm transition space-y-3 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400">{g.registrationRef}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{g.name}</h3>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{g.lga?.name || 'Kwara'} • {g.areaOfCoverage}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Strength: {g.totalStrength.toLocaleString()} members</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-dashed border-slate-300 text-center max-w-xl mx-auto space-y-3">
              <ShieldCheck className="w-10 h-10 text-brand-600 mx-auto" />
              <h3 className="text-sm sm:text-base font-bold text-slate-800">No Verified Forums Listed Yet</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The public directory populates automatically as submitted registrations undergo formal verification and state directorate sign-off.
              </p>
              <div className="pt-1">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-700 text-white text-xs font-bold rounded-xl hover:bg-brand-600 transition"
                >
                  Be the first to register your forum
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. LATEST ANNOUNCEMENTS & NEWS */}
      {announcements.length > 0 && (
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Official Notices</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Announcements & Updates</h2>
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
          </div>
        </section>
      )}

      {/* 8. CALL TO ACTION STRIP */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-brand-900 via-slate-950 to-brand-950 text-white border-t-2 border-apcRed-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accredit Your APC Support Group?
          </h2>
          <p className="text-brand-100 text-xs sm:text-base max-w-2xl mx-auto">
            Take 5 minutes to complete the official digital registration. Capture your leadership, operating areas, and mobilization capacity for official recognition.
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
              Check Existing Status
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
