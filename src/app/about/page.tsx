import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Compass, 
  Award, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight
} from 'lucide-react';

export default function AboutPage() {
  const objectives = [
    'Establish a centralized, verified digital registry of all APC support groups in Kwara State.',
    'Harmonize grassroots campaign operations and voter mobilization strategies.',
    'Provide structured leadership training, voter education materials, and civic resources.',
    'Promote internal party unity, discipline, loyalty, and party supremacy.',
    'Facilitate seamless communication between grassroots stakeholder groups and State/National APC leadership.',
    'Drive proactive voter registration, sensitization, and polling unit level monitoring for Victory 2027.',
  ];

  const coreValues = [
    { title: 'Unity', desc: 'Bringing diverse support groups and stakeholder forums under one purposeful umbrella.' },
    { title: 'Loyalty', desc: 'Unwavering allegiance to the All Progressives Congress and its leadership structure.' },
    { title: 'Service', desc: 'Selfless civic commitment to community development and party progress.' },
    { title: 'Integrity', desc: 'Transparent, accountable, and disciplined grassroots political operations.' },
    { title: 'Grassroots First', desc: 'Empowering local polling units, wards, and communities where real victory lives.' },
    { title: 'Party Supremacy', desc: 'Strict alignment with the constitution, guidelines, and directives of the APC.' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            About the Organization
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            APC Stakeholders Congress
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Kwara State Chapter • Uniting APC Stakeholders for Victory 2027
          </p>
        </div>

        {/* Who We Are */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <ShieldCheck className="w-6 h-6 text-brand-600" />
            Who We Are
          </h2>
          <div className="prose text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              The <strong>APC Stakeholders Congress</strong> is the umbrella coordination and accreditation body for all affiliated forums, associations, professional bodies, and grassroots support groups working in alignment with the All Progressives Congress (APC) in Kwara State.
            </p>
            <p>
              Operating from the State Secretariat at <em>APC Kwara North House, Fate Road, Ilorin</em>, the Congress provides the digital infrastructure and operational framework required to unite, verify, and empower thousands of grassroots mobilizers across the 16 Local Government Areas and 193 Electoral Wards of Kwara State.
            </p>
          </div>
        </div>

        {/* Aim, Vision, Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="p-2.5 bg-brand-50 text-brand-700 rounded-xl w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Aim</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To consolidate, harmonize, and strengthen all APC support groups into a formidable, disciplined, and unified political force dedicated to party supremacy and electoral dominance in 2027.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="p-2.5 bg-sky-50 text-sky-700 rounded-xl w-fit">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To build Nigeria's most structured, transparent, and responsive political stakeholder network, driving sustainable grassroots development, civic engagement, and democratic governance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="p-2.5 bg-brand-50 text-brand-700 rounded-xl w-fit">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To digitally verify, accredit, and coordinate every grassroots forum; equip leaders with mobilization tools; and provide authentic intelligence that ensures comprehensive party success.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
            Our Strategic Objectives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium">{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Core Values</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Non-negotiable pillars of our stakeholder congress.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((cv) => (
              <div key={cv.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-brand-700">{cv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Secretariat & Contact */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">State Directorate Headquarters</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                The administrative secretariat is open to accredited forum coordinators and party stakeholders.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              Contact Directorate <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-400 mt-0.5" />
              <span>APC Kwara North House, Fate Road, Ilorin, Kwara State</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-sky-400 mt-0.5" />
              <span>08032010479, 07030592380, 08188234455</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-sky-400 mt-0.5" />
              <span>apcstakeholderscongress@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
