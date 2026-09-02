import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck,
  Send,
  Building
} from 'lucide-react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact State Secretariat | APC Stakeholders Congress Kwara',
  description:
    'Contact the official APC Stakeholders Congress State Directorate at Fate Road, Ilorin, Kwara State. Inquiries on forum registration, document verification, and stakeholder appointments.',
  canonicalPath: '/contact',
  keywords: [
    'APC Kwara secretariat address',
    'APC Stakeholders Congress office',
    'APC Fate Road Ilorin',
    'APC Kwara phone numbers',
    'APC support group enquiries Kwara',
  ],
});

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: SITE_CONFIG.name,
      image: `${SITE_CONFIG.canonicalDomain}${SITE_CONFIG.images.ogDefault}`,
      telephone: SITE_CONFIG.contact.phones[0],
      email: SITE_CONFIG.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.secretariatAddress.streetAddress,
        addressLocality: SITE_CONFIG.secretariatAddress.addressLocality,
        addressRegion: SITE_CONFIG.secretariatAddress.addressRegion,
        postalCode: SITE_CONFIG.secretariatAddress.postalCode,
        addressCountry: SITE_CONFIG.secretariatAddress.addressCountry,
      },
      openingHours: SITE_CONFIG.contact.officeHours,
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <JsonLd data={contactSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Contact Secretariat', path: '/contact' }]} />

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider rounded-full border border-brand-200">
            <span className="w-1.5 h-1.5 rounded-full bg-apcRed-500"></span>
            State Secretariat & Directorate
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact the Directorate
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            For registration enquiries, document verification, stakeholder harmonization, or secretariat appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Secretariat Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Headquarters Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-brand-50 text-brand-700 rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Physical Secretariat</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {SITE_CONFIG.secretariatAddress.streetAddress}, {SITE_CONFIG.secretariatAddress.addressLocality}, {SITE_CONFIG.secretariatAddress.addressRegion}, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-gold-50 text-gold-700 rounded-xl flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Telephone Lines</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {SITE_CONFIG.contact.displayPhones}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-sky-50 text-sky-700 rounded-xl flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Official Email</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-700 hover:underline">
                        {SITE_CONFIG.contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Office Hours</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monday – Friday: 9:00 AM – 5:00 PM (WAT)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry / Message Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Send an Official Enquiry
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Comrade Ibrahim Balogun"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08012345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Affiliated Forum / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Kwara Youth Movement for APC"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Purpose of Enquiry *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly state your inquiry or request..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full py-3 bg-brand-700 hover:bg-brand-600 active:bg-brand-800 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Submit Message to Secretariat
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
