"use client";

import { useState } from 'react';
import Navbar from '../components/navigation/Navbar';
import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import AboutClinicSection from '../components/sections/AboutClinicSection';
import MeetDoctorSection from '../components/sections/MeetDoctorSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import TechnologySection from '../components/sections/TechnologySection';
import BeforeAfterSection from '../components/sections/BeforeAfterSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import GoogleReviewsSection from '../components/sections/GoogleReviewsSection';
import CredentialsSection from '../components/sections/CredentialsSection';
import ClinicGallerySection from '../components/sections/ClinicGallerySection';
import FAQSection from '../components/sections/FAQSection';
import AppointmentSection from '../components/sections/AppointmentSection';
import LocationSection from '../components/sections/LocationSection';
import ClinicConnect from '../components/sections/ClinicConnect';
import Footer from '../components/navigation/Footer';
import BookingModal from '../components/sections/BookingModal';
import MobileStickyBar from '../components/navigation/MobileStickyBar';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleOpenBooking = () => setBookingOpen(true);
  const handleCloseBooking = () => setBookingOpen(false);

  return (
    <main className="min-h-screen bg-white relative overflow-x-hidden w-full pb-16 md:pb-0">
      {/* Mobile Sticky Quick Action Bar */}
      <MobileStickyBar onOpenBooking={handleOpenBooking} />

      {/* 01. Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 02. Hero */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 03. Trust / Quick Introduction */}
      <TrustSection />

      {/* 04. About Clinic */}
      <AboutClinicSection />

      {/* 05. Meet Dr. Siulik */}
      <MeetDoctorSection />

      {/* 06. Services (All 7 categories) */}
      <ServicesSection onOpenBooking={handleOpenBooking} />

      {/* 07. The Difference / Care Philosophy (Consolidated Chapter) */}
      <WhyChooseUsSection />

      {/* 08. Technology */}
      <TechnologySection />

      {/* 11. Before & After (All 5 categories with drag slider) */}
      <BeforeAfterSection />

      {/* 12. Patient Testimonial Videos */}
      <TestimonialsSection />

      {/* 13. Google Reviews */}
      <GoogleReviewsSection />

      {/* 14. Achievements & Certificates */}
      <CredentialsSection />

      {/* 15. Clinic Gallery */}
      <ClinicGallerySection />

      {/* 16. FAQ */}
      <FAQSection />

      {/* 17. Book Appointment (Let's plan your next step) */}
      <AppointmentSection />

      {/* 18. Location / Contact */}
      <LocationSection onOpenBooking={handleOpenBooking} />

      {/* 19. Inside the Clinic / Clinic Connect */}
      <ClinicConnect />

      {/* 20. Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Appointment Booking Drawer / Modal */}
      <BookingModal isOpen={bookingOpen} onClose={handleCloseBooking} />
    </main>
  );
}
