import React from 'react';
import { Calendar, MapPin, Camera, Info, Sparkles, Clock, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: 'Events & Photo Gallery | APC Stakeholders Congress Kwara',
  description:
    'Schedule of official stakeholder coordination summits, consultative rallies, voter education workshops, and grassroots photo archives in Kwara State.',
  canonicalPath: '/events-gallery',
  keywords: [
    'APC events Kwara',
    'APC Stakeholders Congress summit',
    'APC Kwara rallies',
    'grassroots voter education Kwara',
    'APC Ilorin meetings',
    'Offa APC workshop',
  ],
});

export default function EventsGalleryPage() {
  const upcomingEvents: any[] = [];

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Events & Gallery', path: '/events-gallery' }]} />

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <span className="w-1.5 h-1.5 rounded-full bg-apcRed-500"></span>
            Field Gallery & Event Calendar
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Congress Events & Field Archives
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Schedule of stakeholder summits, consultative rallies, and official photo archives across Kwara State.
          </p>
        </div>

        {/* Upcoming Events Section */}
        <section aria-labelledby="events-heading" className="space-y-6">
          <h2 id="events-heading" className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Calendar className="w-5 h-5 text-brand-600" />
            Upcoming Congress Events & Summits
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.title}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                        {ev.date}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {ev.time}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ev.desc}</p>
                  </div>

                  <div className="pt-3 text-xs text-slate-500 space-y-1 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                      <span><strong>Venue:</strong> {ev.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-dashed border-slate-300 text-center max-w-xl mx-auto space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Events Scheduled Currently</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Official notices, consultative rallies, and stakeholder summit schedules will be published here by the Directorate upon confirmation.
              </p>
            </div>
          )}
        </section>

        {/* Grassroots Mobilization Gallery */}
        <section aria-labelledby="gallery-heading" className="space-y-6">
          <h2 id="gallery-heading" className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Camera className="w-5 h-5 text-gold-600" />
            Grassroots Mobilization Photo Archive
          </h2>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-dashed border-slate-300 text-center max-w-xl mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Official Media Archives</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Official high-resolution photo archives and video coverage from upcoming consultative rallies and senatorial summits will be published here by the Directorate Media & Publicity Committee.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
