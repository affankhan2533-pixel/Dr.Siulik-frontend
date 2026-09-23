import './globals.css';
import { CLINIC_INFO } from '../data/clinicData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export const viewport = {
  themeColor: '#0a4d68',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(siteUrl || 'http://localhost:3000'),
  title: `${CLINIC_INFO.name} | ${CLINIC_INFO.doctorName} - ${CLINIC_INFO.title}`,
  description: CLINIC_INFO.subheadline,
  keywords: [
    "Dr. Siulik Bandyopadhyay",
    "Dr Siulik Dental Care",
    "Modern Dentist",
    "Implant Dentistry",
    "Cosmetic Dentist",
    "Preventive Dental Care",
    "Teeth Whitening",
    "Root Canal Treatment",
  ],
  alternates: {
    canonical: siteUrl ? '/' : undefined,
  },
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
    title: `${CLINIC_INFO.name} | ${CLINIC_INFO.doctorName}`,
    description: CLINIC_INFO.subheadline,
    url: siteUrl || undefined,
    siteName: CLINIC_INFO.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/branding/logo.png',
        width: 422,
        height: 379,
        alt: `${CLINIC_INFO.name} Authentic Emblem`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CLINIC_INFO.name} | ${CLINIC_INFO.doctorName}`,
    description: CLINIC_INFO.subheadline,
    images: ['/assets/branding/logo.png'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: CLINIC_INFO.name,
    image: siteUrl ? `${siteUrl}/assets/branding/logo.png` : undefined,
    telePhone: CLINIC_INFO.phonePrimary,
    email: CLINIC_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINIC_INFO.address,
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Sa 10:00-20:00',
    priceRange: '$$',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-brand-textDark antialiased selection:bg-brand-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
