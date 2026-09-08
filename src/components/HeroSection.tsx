import React from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { CLINIC_DATA } from '../data/clinicData';

interface HeroSectionProps {
  onBookVisit: () => void;
  onSelectServiceCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookVisit,
  onSelectServiceCategory,
}) => {
  const servicePills = [
    { label: 'Body Scans', id: 'imaging' },
    { label: 'Check-ups', id: 'checkups' },
    { label: 'DNA & Genetics', id: 'genetics' },
    { label: 'Blood Tests', id: 'laboratory' },
    { label: 'Doctor Visits', id: 'specialist' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[90vh] pt-28 sm:pt-36 pb-16 flex flex-col justify-between overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content - Simple, clear, easy to read */}
          <div className="lg:col-span-8 xl:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Top clean pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-900/5 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-900">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Modern Hospital & Quick Scans</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-stone-900 leading-[1.15]">
              Healthcare that starts with <br className="hidden sm:inline" />
              <span className="font-semibold text-[#1e3d2c]">understanding you</span>
            </h1>

            {/* Subheading in simple English */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              Clear check-ups, modern body scans, and helpful doctors all in one friendly clinic. We explain all your results in plain, simple words.
            </p>

            {/* Trust badge */}
            <div className="flex items-center gap-3 pt-1 text-xs sm:text-sm text-stone-500 font-medium">
              <div className="flex -space-x-1.5">
                <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-800">40k</span>
                <span className="inline-block h-6 w-6 rounded-full bg-lime-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-lime-800">★</span>
              </div>
              <span>Trusted by over 40,000 happy patients</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookVisit}
                id="hero-book-btn"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#244836] px-6 sm:px-7 py-3 text-sm font-semibold text-white shadow-xs hover:bg-[#1a3527] transition-all"
              >
                <span>Book a visit</span>
                <ArrowUpRight className="h-4 w-4 text-lime-300" />
              </button>

              <a
                href="#services"
                id="hero-services-btn"
                className="inline-flex items-center justify-center rounded-full bg-white hover:bg-stone-50 px-6 sm:px-7 py-3 text-sm font-semibold text-[#244836] border border-stone-200 shadow-xs transition-all"
              >
                See our services
              </a>
            </div>

          </div>

          {/* Right Spacer Column letting the DNA canvas show seamlessly */}
          <div className="lg:col-span-4 xl:col-span-5 relative min-h-[80px] lg:min-h-[420px] pointer-events-none">
            <div className="hidden sm:block absolute right-0 top-10 max-w-xs rounded-2xl border border-stone-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-xs pointer-events-auto">
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Fast & Gentle Care</span>
              <p className="text-xs text-stone-600 mt-1">
                Scroll down to see our doctor rooms, test choices, and campus locations.
              </p>
            </div>
          </div>

        </div>

        {/* Quick Category Buttons */}
        <div className="mt-12 sm:mt-20 pt-6 border-t border-stone-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Popular services:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {servicePills.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => onSelectServiceCategory(pill.id)}
                  className="rounded-full bg-white hover:bg-stone-50 border border-stone-200 px-3.5 py-1.5 text-xs font-medium text-stone-700 shadow-2xs transition-all hover:border-emerald-700 hover:text-emerald-900"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="w-full flex justify-center pt-6 text-stone-400">
        <a
          href="#services"
          aria-label="Scroll down to services"
          className="flex flex-col items-center text-xs font-medium hover:text-emerald-800 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-widest mb-1 font-semibold">Scroll down</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
