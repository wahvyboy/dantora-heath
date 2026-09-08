import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { CLINIC_DATA } from '../data/clinicData';

interface AboutClinicSectionProps {
  onBookConsultation: () => void;
}

export const AboutClinicSection: React.FC<AboutClinicSectionProps> = ({
  onBookConsultation,
}) => {
  return (
    <section id="about" className="relative py-20 bg-stone-50 overflow-hidden border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner image with Australian location */}
        <div className="relative mb-12 sm:mb-16 overflow-hidden rounded-3xl bg-stone-900 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"
            alt="Doctors and friendly clinic team at Dantora Health Australia"
            className="h-56 sm:h-72 md:h-84 w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/20" />
          
          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <span className="text-xs font-semibold text-lime-300 tracking-wide uppercase">
                All-in-One Australian Care Center
              </span>
              <h3 className="text-lg sm:text-2xl font-normal mt-1">
                Everything you need under one roof
              </h3>
            </div>
            <span className="text-xs text-stone-300 bg-stone-900/80 px-3 py-1 rounded-full self-start sm:self-auto">
              Sydney, NSW • Australia
            </span>
          </div>
        </div>

        {/* 2-Column: Simple Numbers & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Numbers */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Quick Clinic Facts
            </span>

            <div className="grid grid-cols-2 gap-6 pt-1">
              <div className="border-l-2 border-emerald-700 pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                  {CLINIC_DATA.turnaroundAvg}
                </div>
                <div className="text-xs text-stone-600">
                  Most blood test and scan results ready on the same day
                </div>
              </div>

              <div className="border-l-2 border-emerald-700 pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                  {CLINIC_DATA.satisfactionRate}
                </div>
                <div className="text-xs text-stone-600">
                  Patients rate our doctors and nurses 5 out of 5 stars
                </div>
              </div>

              <div className="border-l-2 border-emerald-700 pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                  {CLINIC_DATA.doctorsCount}
                </div>
                <div className="text-xs text-stone-600">
                  Friendly specialist doctors ready to help you
                </div>
              </div>

              <div className="border-l-2 border-emerald-700 pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
                  {CLINIC_DATA.totalPatients}
                </div>
                <div className="text-xs text-stone-600">
                  Australians helped since our first clinic opened
                </div>
              </div>
            </div>
          </div>

          {/* Simple Story and actions */}
          <div className="lg:col-span-6 space-y-5 lg:pl-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Why Dantora
            </span>

            <h2 className="text-2xl sm:text-3xl font-light text-stone-900 leading-snug">
              No running between different buildings. <span className="font-semibold text-[#1e3d2c]">Your scan and your specialist doctor are in the exact same place.</span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              When you get a scan or blood check at Dantora, you do not have to wait weeks for someone to call. Our doctors review your pictures right away and sit down with you to explain what to do next in plain, everyday language.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookConsultation}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#244836] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#1a3527] transition-all"
              >
                <span>Request email consultation</span>
                <ArrowUpRight className="h-4 w-4 text-lime-300" />
              </button>

              <a
                href="#blog"
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-stone-100 border border-stone-200 px-6 py-3 text-xs sm:text-sm font-semibold text-[#244836] shadow-2xs transition-all"
              >
                <BookOpen className="h-4 w-4 text-emerald-800" />
                <span>Hospital Health Blog</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
