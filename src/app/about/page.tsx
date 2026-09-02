import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Target, 
  Layers, 
  Vote, 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight,
  UserCheck,
  Award,
  Users
} from 'lucide-react';

export default function AboutPage() {
  const principalOfficers = [
    { num: 1, title: 'Director General - DG', highlight: true },
    { num: 2, title: 'Deputy DG (Operations)', highlight: true },
    { num: 3, title: 'Secretary General', highlight: true },
    { num: 4, title: 'Director of Finance' },
    { num: 5, title: 'Director of Contact & Mobilization' },
    { num: 6, title: 'Director of Media & Publicity' },
    { num: 7, title: 'Director of Programme & Strategy' },
    { num: 8, title: 'Director of Women Affairs' },
    { num: 9, title: 'Director of Youth Affairs' },
    { num: 10, title: 'Director of Welfare' },
    { num: 11, title: 'Auditor' },
    { num: 12, title: 'Ex-Officio 1' },
    { num: 13, title: 'Ex-Officio 2' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-50 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-apcRed-500 animate-pulse"></span>
            Official Institutional Profile
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            About APC Stakeholders Congress, Kwara State
          </h1>
          <p className="text-sm sm:text-base font-semibold text-brand-700 uppercase tracking-wide">
            One Party • One Structure • One Strong Grassroots Movement
          </p>
        </div>

        {/* Official Narrative / Profile Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 bg-white rounded-2xl p-1 border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/official-logo.png"
                alt="APC Stakeholders Congress Logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                APC Stakeholders Congress
              </h2>
              <span className="text-xs font-medium text-slate-500">Kwara State Chapter</span>
            </div>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-700 font-normal">
            <p className="text-slate-800 font-medium leading-relaxed">
              The <strong className="text-slate-950 font-bold">APC Stakeholders Congress</strong> serves as the premier platform for organizing, harmonizing, and coordinating the various support groups, professional associations, youth and women organizations, and other stakeholders within the <strong className="text-brand-800 font-bold">All Progressives Congress (APC) across Kwara State</strong>.
            </p>

            <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-100/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-brand-600" /> Our Mission
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Our mission is to transform the existing network of political interest groups into a <strong className="text-slate-900 font-bold">unified, structured, and effective grassroots political machinery</strong>. By fostering collaboration, communication, and strategic coordination among stakeholders, we seek to build a stronger and more cohesive APC presence across the state.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-100/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-600" /> Grassroots Structure
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Our structure is designed to establish active and functional engagement at <strong className="text-slate-900 font-bold">every Local Government Area, ward, and polling unit</strong>, ensuring that every stakeholder and grassroots supporter has a meaningful role to play in advancing the party's objectives.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Vote className="w-4 h-4 text-sky-400" /> 2027 General Elections Mandate
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                As we work towards the <strong className="text-white font-bold">2027 General Elections</strong>, the APC Stakeholders Congress remains committed to strengthening grassroots mobilization, promoting unity among party stakeholders, coordinating support groups, and building a sustainable political network capable of delivering electoral success for the APC in Kwara State.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <div className="text-sm sm:text-base font-extrabold text-brand-800 tracking-wide">
              One Party. One Structure. One Strong Grassroots Movement.
            </div>
          </div>
        </div>

        {/* SEC STRUCTURE & PRINCIPAL OFFICERS CARD */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              Organizational Hierarchy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              SEC STRUCTURE
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              State Executive Council — Principal Officers Directorate
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {principalOfficers.map((officer) => (
              <div
                key={officer.num}
                className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition ${
                  officer.highlight
                    ? 'bg-brand-50/60 border-brand-200/90 shadow-sm'
                    : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/80'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-extrabold flex items-center justify-center flex-shrink-0 ${
                    officer.highlight
                      ? 'bg-brand-700 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {officer.num}
                </div>
                <div className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                  {officer.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secretariat & Contact */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-6 shadow-md border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">State Directorate Headquarters</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                The administrative secretariat is open to accredited forum coordinators and party stakeholders.
              </p>
            </div>
            <Link
              href="/register"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow"
            >
              Register Your Forum <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
              <span>APC Kwara North House, Fate Road, Ilorin, Kwara State</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <span>07030592380, 08032010479, 07031693124</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
              <span>apcstakeholderscongress@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
