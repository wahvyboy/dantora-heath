import React, { useState } from 'react';
import { ArrowUpRight, Check, Clock, X, FileText, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { MedicalService } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
  selectedCategoryFilter: string | null;
  onClearCategoryFilter: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  selectedCategoryFilter,
  onClearCategoryFilter,
}) => {
  const [activeModalService, setActiveModalService] = useState<MedicalService | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const activeCategory = selectedCategoryFilter || filter;

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'imaging', label: 'Body Scans' },
    { id: 'checkups', label: 'Check-ups' },
    { id: 'genetics', label: 'DNA & Genetics' },
    { id: 'laboratory', label: 'Lab Tests' },
    { id: 'specialist', label: 'Doctor Visits' },
  ];

  return (
    <section id="services" className="relative py-20 bg-stone-100/70 border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-stone-900">
              Simple health services, <br />
              <span className="font-semibold text-[#1e3d2c]">ready when you need them</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            Choose what you need today. Quick body scans, easy blood tests, and friendly doctor visits with no wait across Australia.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (selectedCategoryFilter) onClearCategoryFilter();
                setFilter(cat.id);
              }}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#244836] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isSolid = service.id === 'genetic-testing';
            
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`group flex flex-col justify-between rounded-3xl transition-all duration-300 hover:shadow-md ${
                  isSolid
                    ? 'bg-[#274f3b] text-white min-h-[340px] p-6'
                    : 'bg-white text-stone-900 border border-stone-200 min-h-[340px] p-6'
                }`}
              >
                {!isSolid ? (
                  <div className="space-y-4">
                    <div className="relative h-44 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl bg-stone-900">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-stone-900/80 px-2.5 py-0.5 text-[11px] font-bold text-lime-300">
                        {service.turnaroundTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <span className="inline-block rounded-full bg-emerald-950/60 px-3 py-1 text-xs font-bold text-lime-300">
                      Painless Swab
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                )}

                {/* Footer details & actions (Pricing completely removed) */}
                <div className={`pt-4 mt-4 border-t flex items-center justify-between ${isSolid ? 'border-emerald-800' : 'border-stone-100'}`}>
                  <div>
                    <span className={`text-[10px] font-semibold uppercase ${isSolid ? 'text-emerald-200' : 'text-stone-400'}`}>
                      Turnaround
                    </span>
                    <div className={`text-xs font-semibold ${isSolid ? 'text-white' : 'text-[#244836]'}`}>
                      {service.turnaroundTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                        isSolid ? 'bg-emerald-950 text-white' : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      <span>Read info</span>
                      <FileText className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => onSelectServiceForBooking(service.title)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isSolid ? 'bg-lime-300 text-[#244836]' : 'bg-[#244836] text-white'
                      }`}
                      aria-label={`Book ${service.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Service Guide
            </span>
            <h3 className="text-2xl font-bold text-stone-900 mt-1 mb-2">
              {activeModalService.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
              {activeModalService.fullDesc}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-100">
                <span className="text-[10px] font-bold uppercase text-stone-400">Results time</span>
                <p className="text-xs font-semibold text-stone-800 mt-0.5">{activeModalService.turnaroundTime}</p>
              </div>
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-100">
                <span className="text-[10px] font-bold uppercase text-stone-400">Delivery</span>
                <p className="text-xs font-semibold text-stone-800 mt-0.5">Secure Email Summary</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              <span className="text-xs font-bold uppercase text-stone-700">What is included</span>
              <ul className="space-y-1.5">
                {activeModalService.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                    <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3.5 mb-6 text-xs text-emerald-950 space-y-1">
              <span className="font-bold">Easy Preparation:</span>
              {activeModalService.preparation.map((prep, i) => (
                <p key={i}>• {prep}</p>
              ))}
            </div>

            <button
              onClick={() => {
                const title = activeModalService.title;
                setActiveModalService(null);
                onSelectServiceForBooking(title);
              }}
              className="w-full rounded-full bg-[#244836] py-3 text-xs font-semibold text-white hover:bg-[#1a3527]"
            >
              Request email consultation for this service
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
