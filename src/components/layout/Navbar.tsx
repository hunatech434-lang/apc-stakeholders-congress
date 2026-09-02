'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronRight, 
  FileText, 
  Search, 
  ShieldCheck,
  Calendar,
  Lock
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'News', href: '/news' },
    { name: 'Events', href: '/events-gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Do not render public navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top subtle tri-color strip */}
      <div className="h-1 w-full flex">
        <div className="h-full bg-brand-600 flex-1"></div>
        <div className="h-full bg-white w-8"></div>
        <div className="h-full bg-sky-500 w-16"></div>
        <div className="h-full bg-apcRed-500 w-16"></div>
      </div>

      {/* Top utility strip */}
      <div className="bg-slate-950 text-white text-xs py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-400"></span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-normal tracking-wide truncate">
              APC Stakeholders Congress • Kwara State Chapter • Victory 2027
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-xs">
            <Link href="/status" className="hover:text-white transition flex items-center gap-1">
              <Search className="w-3 h-3 text-sky-400" /> Check Status
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Main Brand: Official Website Logo & Clean Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 bg-white rounded-xl p-0.5 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/official-logo.png"
                alt="APC Stakeholders Congress Official Logo"
                width={50}
                height={50}
                priority
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <span className="block text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-brand-700 transition">
                APC Stakeholders Congress
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-slate-500 leading-tight">
                Kwara State Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with APC National Logo Affiliation Badge right before Home */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
            {/* APC National Party Logo displayed right before Home */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 mr-1 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-bold text-slate-700">
              <div className="w-4 h-4 relative flex-shrink-0">
                <Image
                  src="/images/apc-national-logo.png"
                  alt="APC National Party Flag Logo"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">APC</span>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm transition ${
                  isActive(link.href)
                    ? 'text-brand-800 font-semibold bg-brand-50/80 border-b-2 border-brand-600'
                    : 'text-slate-600 font-medium hover:text-brand-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/status"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-slate-50 rounded-lg transition border border-slate-200"
            >
              Check Status
            </Link>
            
            <Link
              href="/register"
              className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 hover:ring-2 hover:ring-apcRed-500/30 active:bg-brand-800 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Register
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-brand-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 mb-2">
            <Image
              src="/images/apc-national-logo.png"
              alt="APC National Logo"
              width={18}
              height={18}
              className="object-contain"
            />
            <span className="text-xs font-bold text-slate-700">All Progressives Congress (APC) Platform</span>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                  isActive(link.href)
                    ? 'text-brand-800 font-semibold bg-brand-50/80'
                    : 'text-slate-700 font-medium hover:text-brand-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg shadow transition flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Register
            </Link>
            <Link
              href="/status"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition"
            >
              Check Status
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
