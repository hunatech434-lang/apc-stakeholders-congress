import React from 'react';
import { Calendar, MapPin, Camera, Info, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default function EventsGalleryPage() {
  const upcomingEvents = [
    {
      title: 'Statewide Stakeholder Coordination Summit',
      date: 'Saturday, 12th September 2026',
      time: '10:00 AM WAT',
      venue: 'APC Kwara North House, Fate Road, Ilorin',
      desc: 'All accredited forum coordinators and secretaries across Kwara State convene for the 2027 victory synchronization blueprint.',
    },
    {
      title: 'Grassroots Canvassers & Voter Education Workshop',
      date: 'Thursday, 24th September 2026',
      time: '11:00 AM WAT',
      venue: 'Town Hall, Offa, Kwara South',
      desc: 'Capacity building seminar on modern digital campaign tracking and polling unit mobilization.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <span className="w-1.5 h-1.5 rounded-full bg-apcRed-500"></span>
            Field Gallery & Schedule
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Events & Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Schedule of stakeholder summits, consultative rallies, and official photo archives across Kwara State.
          </p>
        </div>

        {/* Upcoming Events Section */}
        <div className="space-y-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Calendar className="w-5 h-5 text-brand-600" />
            Upcoming Congress Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.title}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4"
              >
                <div className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full w-fit border border-brand-200">
                  {ev.date}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">{ev.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ev.desc}</p>
                <div className="pt-2 text-xs text-slate-500 space-y-1 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-600" />
                    <span>{ev.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grassroots Mobilization Gallery Clean Empty State */}
        <div className="space-y-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Camera className="w-5 h-5 text-gold-600" />
            Grassroots Mobilization Gallery
          </h2>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-dashed border-slate-300 text-center max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Official Media Archive</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Official high-resolution photo archives and video coverage from upcoming rallies and senatorial consultations will be published here by the Directorate Media & Publicity Committee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
