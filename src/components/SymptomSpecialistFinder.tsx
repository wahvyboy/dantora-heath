import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SYMPTOM_GUIDES, DOCTORS } from '../data/clinicData';

interface SymptomSpecialistFinderProps {
  onSelectDoctorMatch: (doctorName: string, department: string) => void;
}

export const SymptomSpecialistFinder: React.FC<SymptomSpecialistFinderProps> = ({
  onSelectDoctorMatch,
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState<string>(SYMPTOM_GUIDES[0].symptom);

  const currentGuide = SYMPTOM_GUIDES.find((s) => s.symptom === selectedSymptom) || SYMPTOM_GUIDES[0];
  const matchedDoctor = DOCTORS.find((d) => d.id === currentGuide.suggestedDoctorId) || DOCTORS[0];

  return (
    <section id="symptom-finder" className="relative py-16 sm:py-20 bg-stone-900 text-stone-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Simple Helper
          </span>
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
            Not sure who to see? <span className="font-semibold text-emerald-400">Pick how you feel</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Click your main symptom below and we will show you the best doctor and test for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left: Symptoms list */}
          <div className="lg:col-span-6 space-y-2.5">
            {SYMPTOM_GUIDES.map((guide) => {
              const isSelected = selectedSymptom === guide.symptom;
              return (
                <button
                  key={guide.symptom}
                  onClick={() => setSelectedSymptom(guide.symptom)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm'
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm sm:text-base flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${guide.urgency === 'priority' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <span>{guide.symptom}</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {guide.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-stone-950">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                    ) : (
                      <ArrowRight className="h-4 w-4 text-stone-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Matched Doctor Box */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-stone-800 bg-stone-950 p-6 sm:p-7 shadow-xl space-y-5">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Recommended Doctor For You
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Department: {currentGuide.suggestedDepartment}
                </h4>
              </div>

              {/* Matched Doctor */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-stone-900 p-3.5 border border-stone-800">
                <img
                  src={matchedDoctor.image}
                  alt={matchedDoctor.name}
                  className="h-14 w-14 rounded-xl object-cover object-top border border-emerald-700/60"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-base font-bold text-white truncate">{matchedDoctor.name}</h5>
                  <p className="text-xs text-stone-400 truncate">{matchedDoctor.role}</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">Available this week</p>
                </div>
              </div>

              <div className="rounded-xl bg-stone-900/80 p-3.5 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                <span className="font-semibold text-emerald-300">What happens on your visit: </span>
                You will talk directly with {matchedDoctor.name.split(' ')[1]}, do any quick check you need, and leave with a clear plan.
              </div>

              <button
                type="button"
                onClick={() => onSelectDoctorMatch(matchedDoctor.name, currentGuide.suggestedDepartment)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#d7f766] py-3 text-xs sm:text-sm font-bold text-[#1e3d2c] hover:bg-lime-200 transition-all shadow-xs"
              >
                <span>Book with {matchedDoctor.name}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
