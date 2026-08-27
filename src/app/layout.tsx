import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'APC Stakeholders Congress Portal | Kwara State Chapter',
  description:
    'Official registration, accreditation, and operational platform for APC forums, associations, and support groups in Kwara State. Uniting APC Stakeholders for Victory 2027.',
  keywords: [
    'APC',
    'All Progressives Congress',
    'APC Stakeholders Congress',
    'Kwara State',
    'Ilorin',
    'Victory 2027',
    'Grassroots Mobilization',
    'Party Support Groups',
  ],
  authors: [{ name: 'APC Stakeholders Congress Kwara Directorate' }],
  openGraph: {
    title: 'APC Stakeholders Congress Portal | Kwara State Chapter',
    description:
      'Uniting APC Stakeholders for Victory 2027. Official forum registration and accreditation platform.',
    url: 'https://apcstakeholderscongress.ng',
    siteName: 'APC Stakeholders Congress',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
