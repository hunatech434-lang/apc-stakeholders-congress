'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Search, ShieldCheck, Award, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_IMAGES = [
  '/images/hero/1.png',
  '/images/hero/2.png',
  '/images/hero/3.png',
  '/images/hero/10.png',
  '/images/hero/11.png',
  '/images/hero/12.png',
  '/images/hero/13.png',
  '/images/hero/14.png',
  '/images/hero/15.png',
  '/images/hero/18.png',
  '/images/hero/19.png',
  '/images/hero/21.png',
  '/images/hero/23.png',
];

export default function HeroCarousel() {
  const [images, setImages] = useState<string[]>(HERO_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Randomize initial starting image on mount
  useEffect(() => {
    const shuffled = [...HERO_IMAGES].sort(() => 0.5 - Math.random());
    setImages(shuffled);
    setCurrentIndex(0);
  }, []);

  // Auto cycle carousel every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center bg-slate-950 text-white overflow-hidden">
      {/* Background Image Carousel with Cross-fade */}
      <div className="absolute inset-0 z-0">
        {images.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={src}
              alt={`APC Stakeholders Congress Kwara grassroots mobilization rally - photo ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Calibrated Low-Opacity Gradient Overlays so the vibrant photos are clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30"></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Subtle Tag with APC Red pip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur border border-white/15 text-slate-200 text-xs sm:text-sm font-medium tracking-wide shadow-md">
            <span className="w-2 h-2 rounded-full bg-apcRed-500 animate-pulse"></span>
            <span className="font-semibold text-white">Kwara State Chapter</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">Official Stakeholder Registry</span>
          </div>

          {/* Main Headline with APC Light Blue Accent - Exactly One Primary H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            UNITING APC STAKEHOLDERS FOR <span className="text-sky-400">VICTORY 2027</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-lg text-slate-100 leading-relaxed font-normal max-w-2xl drop-shadow">
            The official centralized platform for APC forums, associations, and support groups in Kwara State to register, obtain official accreditation, connect with party leadership, and coordinate grassroots engagement.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link
              href="/register"
              className="px-7 py-3.5 bg-brand-600 hover:bg-brand-500 hover:ring-2 hover:ring-apcRed-500/40 active:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg transition text-center flex items-center justify-center gap-2 text-sm sm:text-base group"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform" />
              Register Your Forum
            </Link>

            <Link
              href="/verified-groups"
              className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800/90 active:bg-slate-950 backdrop-blur text-white font-semibold rounded-xl border border-white/20 hover:border-sky-400/50 transition text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
              Browse Verified Forums
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/15 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>Digital Accreditation</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Official Letter of Recognition</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Landmark className="w-4 h-4 text-sky-300 flex-shrink-0" />
              <span>16 Kwara LGAs Unified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Indicators */}
      <div className="absolute bottom-5 right-5 sm:right-8 z-20 flex items-center gap-2">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur border border-white/20 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-[11px] font-mono text-white/80 px-2 py-1 bg-black/40 rounded-full border border-white/10 backdrop-blur">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur border border-white/20 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
