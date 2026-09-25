import './globals.css';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { CLINIC_INFO } from '../data/clinicData';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export const viewport = {
  themeColor: '#0a4d68',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "Dr. Siulik’s Dental Care | Dentist in Bhubaneswar, Chandaka",
  description: "Advanced dental care in Chandaka, Bhubaneswar with Dr. Siulik Badajena. Personalized dentistry, modern diagnostics, implant care, restorative and cosmetic treatments.",
  alternates: siteUrl ? { canonical: '/' } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/assets/branding/logo.png',
  },
  openGraph: {
    title: "Dr. Siulik’s Dental Care | Dentist in Bhubaneswar, Chandaka",
    description: "Advanced dental care in Chandaka, Bhubaneswar with Dr. Siulik Badajena. Personalized dentistry, modern diagnostics, implant care, restorative and cosmetic treatments.",
    url: siteUrl || undefined,
    siteName: CLINIC_INFO.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/hero/images/image.png',
        width: 1200,
        height: 630,
        alt: `${CLINIC_INFO.name} Consultation Suite`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dr. Siulik’s Dental Care | Dentist in Bhubaneswar, Chandaka",
    description: "Advanced dental care in Chandaka, Bhubaneswar with Dr. Siulik Badajena. Personalized dentistry, modern diagnostics, implant care, restorative and cosmetic treatments.",
    images: ['/assets/hero/images/image.png'],
  },
};

import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: CLINIC_INFO.name,
    url: siteUrl || undefined,
    logo: siteUrl ? `${siteUrl}/assets/branding/logo.png` : '/assets/branding/logo.png',
    image: siteUrl ? `${siteUrl}/assets/hero/images/image.png` : '/assets/hero/images/image.png',
    telephone: CLINIC_INFO.phonePrimary,
    email: CLINIC_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Chandaka Police Station',
      addressLocality: 'Bhubaneswar',
      addressRegion: 'Odisha',
      postalCode: '754012',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '16:00',
        closes: '20:30',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Dr. Siulik Badajena',
      jobTitle: 'Founder & Chief Dental Surgeon',
    },
  };

  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${jakarta.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/hero/images/image.png"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-brand-textDark antialiased selection:bg-brand-primary selection:text-white font-sans">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
