import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/clinicData';

export const AeoFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="relative py-20 bg-stone-50 border-t border-stone-200/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
            Questions & Answers
          </span>

          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-stone-900">
            Frequently asked questions <br />
            <span className="font-semibold text-[#1e3d2c]">answered simply</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600">
            Quick, plain answers about tests, results, and what to bring.
          </p>

          {/* Search */}
          <div className="relative mt-4 max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests, results time, food instructions..."
              className="w-full rounded-full border border-stone-200 bg-white pl-10 pr-4 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none shadow-2xs"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-3 focus:outline-none focus:bg-stone-50"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-stone-900">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex-shrink-0 text-stone-400">
                    {isOpen ? <ChevronUp className="h-4 w-4 text-emerald-800" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
