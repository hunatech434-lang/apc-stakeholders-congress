'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Lock
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t-2 border-brand-500">
      {/* Tri-color Accent Strip */}
      <div className="h-1 w-full flex">
        <div className="h-full bg-brand-600 flex-1"></div>
        <div className="h-full bg-white w-12"></div>
        <div className="h-full bg-sky-500 w-16"></div>
        <div className="h-full bg-apcRed-500 w-16"></div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: Organization & Identity */}
          <div className="space-y-4">
            {/* Primary Official Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-xl p-1 flex-shrink-0 flex items-center justify-center shadow-sm">
                <Image
                  src="/images/official-logo.png"
                  alt="APC Stakeholders Congress Logo"
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm tracking-tight leading-tight">
                  APC Stakeholders Congress
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">Kwara State Chapter</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              The centralized digital registry, verification, and accreditation platform for APC-aligned forums, associations, and support groups uniting for victory in 2027.
            </p>

            {/* Secondary APC National Affiliation Badge */}
            <div className="pt-2 flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800/80">
              <div className="w-6 h-6 relative flex-shrink-0">
                <Image
                  src="/images/apc-national-logo.png"
                  alt="APC Party Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">
                <span className="text-slate-200 font-semibold block">All Progressives Congress</span>
                Party Affiliated Platform
              </div>
            </div>
          </div>

          {/* Col 2: Registry & Portal */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
              Registry & Portal
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/register" className="hover:text-white transition flex items-center gap-1.5 text-brand-400 font-medium">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Register Forum
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Check Registration Status
                </Link>
              </li>
              <li>
                <Link href="/verified-groups" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Directory of Verified Groups
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> About the Congress
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Media & Gallery */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Media & Gallery
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/news" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> News & Press Releases
                </Link>
              </li>
              <li>
                <Link href="/events-gallery" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Events & Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Contact Secretariat
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Data Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" /> Terms of Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Secretariat Contact */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-apcRed-500 pl-2">
              State Secretariat
            </h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>APC Kwara North House, Fate Road, Ilorin, Kwara State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>08032010479, 07030592380, 08188234455</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:apcstakeholderscongress@gmail.com" className="hover:underline text-slate-300">
                  apcstakeholderscongress@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition py-1 px-2.5 rounded bg-slate-900 border border-slate-800"
                >
                  <Lock className="w-3 h-3 text-apcRed-500" />
                  Staff / Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} APC Stakeholders Congress (Kwara State Chapter). All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy" className="hover:underline">Privacy Notice</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
