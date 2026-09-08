/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DnaCanvas } from './components/DnaCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutClinicSection } from './components/AboutClinicSection';
import { DoctorsSection } from './components/DoctorsSection';
import { HospitalBlogSection } from './components/HospitalBlogSection';
import { SymptomSpecialistFinder } from './components/SymptomSpecialistFinder';
import { ContactSection } from './components/ContactSection';
import { GeoSection } from './components/GeoSection';
import { AeoFaqSection } from './components/AeoFaqSection';
import { PreFooterAnimation } from './components/PreFooterAnimation';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Doctor } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string>('');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  
  // Contact triage state
  const [contactDepartment, setContactDepartment] = useState('Body Scans & Imaging');
  const [contactDoctorName, setContactDoctorName] = useState('');
  
  // Service category selection from hero pills
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string | null>(null);

  const handleOpenBookingWithService = (serviceTitle: string) => {
    setBookingService(serviceTitle);
    setBookingDoctor(null);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithDoctor = (doctor: Doctor) => {
    setBookingDoctor(doctor);
    setBookingService('');
    setIsBookingOpen(true);
  };

  const handleSelectServiceCategoryFromHero = (category: string) => {
    setSelectedServiceCategory(category);
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSymptomDoctorMatch = (doctorName: string, department: string) => {
    setContactDepartment(department);
    setContactDoctorName(doctorName);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fcfbf9] text-stone-900 font-sans selection:bg-emerald-900 selection:text-white">
      
      {/* 
        Scroll-driven interactive DNA Canvas:
        Extends across hero and through body sections with smooth 60fps WebGL/Canvas rendering
      */}
      <DnaCanvas density="full" />

      {/* Main Navigation Bar */}
      <Navbar
        onOpenBooking={() => {
          setBookingDoctor(null);
          setBookingService('');
          setIsBookingOpen(true);
        }}
      />

      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onBookVisit={() => {
            setBookingDoctor(null);
            setBookingService('');
            setIsBookingOpen(true);
          }}
          onSelectServiceCategory={handleSelectServiceCategoryFromHero}
        />

        {/* 2. Diagnostic & Genomic Services (No pricing) */}
        <ServicesSection
          onSelectServiceForBooking={handleOpenBookingWithService}
          selectedCategoryFilter={selectedServiceCategory}
          onClearCategoryFilter={() => setSelectedServiceCategory(null)}
        />

        {/* 3. About Clinic & Australian Facts */}
        <AboutClinicSection
          onBookConsultation={() => {
            setBookingDoctor(null);
            setBookingService('Initial Diagnostic Specialist Consultation');
            setIsBookingOpen(true);
          }}
        />

        {/* 4. Board-Certified Doctor Showcase */}
        <DoctorsSection
          onSelectDoctorForBooking={handleOpenBookingWithDoctor}
        />

        {/* 5. Hospital Blog & Healthcare Sector Perspectives */}
        <HospitalBlogSection />

        {/* 6. Interactive Clinical Triage & Symptom Matcher */}
        <SymptomSpecialistFinder
          onSelectDoctorMatch={handleSymptomDoctorMatch}
        />

        {/* 7. Strictly Email Contact & Form with Pre-Formatted Templates + Social Placeholders */}
        <ContactSection
          initialDepartment={contactDepartment}
          initialDoctorName={contactDoctorName}
        />

        {/* 8. GEO-Enabled Australian Clinic Campus Locator & Navigation */}
        <GeoSection />

        {/* 9. AEO Knowledge Base */}
        <AeoFaqSection />

        {/* 10. Dedicated Scroll Genomic Convergence Animation just before Footer */}
        <PreFooterAnimation />
      </main>

      {/* 11. Smartly Placed Responsive Footer with Social Placeholders and Australian Address */}
      <Footer
        onOpenBooking={() => {
          setBookingDoctor(null);
          setBookingService('');
          setIsBookingOpen(true);
        }}
      />

      {/* Booking Modal (Strictly Email Confirmation) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={bookingService}
        initialDoctor={bookingDoctor}
      />

    </div>
  );
}
