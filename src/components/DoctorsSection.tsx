import React, { useState } from 'react';
import { ArrowUpRight, GraduationCap, Clock, X } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctor: Doctor) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onSelectDoctorForBooking,
}) => {
  const [selectedDoctorModal, setSelectedDoctorModal] = useState<Doctor | null>(null);

  return (
    <section id="team" className="relative py-20 bg-stone-100/60 border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Doctors 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Intro Card */}
          <div className="flex flex-col justify-between rounded-3xl bg-[#274f3b] p-7 text-white min-h-[380px] shadow-sm">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Our Doctors
              </span>
              <h3 className="text-2xl font-normal leading-snug tracking-tight text-white">
                The friendly doctors you <br />
                <span className="font-semibold text-lime-300">actually talk to</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed pt-1">
                No rushed visits or confusing words. Our doctors sit down, listen to your story, and explain every test clearly.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-800">
              <span className="text-xs text-emerald-200 block mb-1">
                Need a recommendation?
              </span>
              <a
                href="#symptom-finder"
                className="text-xs font-semibold text-lime-300 hover:underline"
              >
                Use our simple symptom finder →
              </a>
            </div>
          </div>

          {/* Cards 2, 3, 4: Individual Doctors */}
          {DOCTORS.slice(0, 3).map((doctor) => (
            <div
              key={doctor.id}
              id={`doctor-card-${doctor.id}`}
              className="group flex flex-col justify-between rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-xs transition-all duration-300 hover:shadow-md min-h-[380px]"
            >
              {/* Doctor Photo */}
              <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" />
                
                <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 shadow-2xs">
                  {doctor.department}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-base font-bold text-white tracking-tight">{doctor.name}</h4>
                  <p className="text-xs text-stone-200 truncate">{doctor.role}</p>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2">
                  {doctor.bio}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedDoctorModal(doctor)}
                    className="text-xs font-semibold text-stone-700 hover:text-emerald-900"
                  >
                    View profile
                  </button>

                  <button
                    onClick={() => onSelectDoctorForBooking(doctor)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#244836] hover:bg-[#1a3527] px-3 py-1.5 text-xs font-semibold text-white transition-all"
                  >
                    <span>Book</span>
                    <ArrowUpRight className="h-3 w-3 text-lime-300" />
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Doctor Modal */}
      {selectedDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedDoctorModal(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200"
              aria-label="Close profile"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedDoctorModal.image}
                alt={selectedDoctorModal.name}
                className="h-16 w-16 rounded-2xl object-cover object-top border border-stone-200 shadow-2xs"
              />
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800">
                  {selectedDoctorModal.department}
                </span>
                <h3 className="text-xl font-bold text-stone-900">{selectedDoctorModal.name}</h3>
                <p className="text-xs text-stone-500">{selectedDoctorModal.role}</p>
              </div>
            </div>

            <div className="space-y-3 mb-5 text-xs">
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-100 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-700" />
                  <span>{selectedDoctorModal.education}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-500">
                  <Clock className="h-3.5 w-3.5 text-emerald-700" />
                  <span>{selectedDoctorModal.availability}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-stone-800 uppercase text-[10px]">About the doctor</span>
                <p className="text-stone-600 leading-relaxed mt-1">{selectedDoctorModal.bio}</p>
              </div>

              <div>
                <span className="font-bold text-stone-800 uppercase text-[10px]">What they help with</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedDoctorModal.specialties.map((spec, i) => (
                    <span key={i} className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] text-stone-700">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const doc = selectedDoctorModal;
                setSelectedDoctorModal(null);
                onSelectDoctorForBooking(doc);
              }}
              className="w-full rounded-full bg-[#244836] py-2.5 text-xs font-semibold text-white hover:bg-[#1a3527]"
            >
              Book a visit with {selectedDoctorModal.name}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
