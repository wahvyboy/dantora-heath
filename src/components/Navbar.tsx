import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Menu, X, BookOpen } from 'lucide-react';
import { CLINIC_DATA } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPriceList?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Doctors', href: '#team' },
    { label: 'Hospital Blog', href: '#blog' },
    { label: 'Symptom Match', href: '#symptom-finder' },
    { label: 'Australian Locations', href: '#locations' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#fcfbf9] border-b border-stone-200/80 shadow-xs py-3 sm:py-3.5 transition-all duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Hospital Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 rounded-full py-1 transition-opacity hover:opacity-90 focus:outline-none"
            aria-label="Dantora Health Australia Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e3d2c] shadow-xs flex-shrink-0">
              <svg className="h-6 w-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="26" y="14" width="12" height="36" rx="6" fill="#ffffff" />
                <rect x="14" y="26" width="36" height="12" rx="6" fill="#ffffff" />
                <circle cx="32" cy="32" r="5" fill="#d7f766" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-stone-900 leading-tight font-display">
                Dantora
              </span>
              <span className="text-[10px] tracking-wider text-emerald-800 font-semibold uppercase">
                Hospital Australia
              </span>
            </div>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 border border-stone-200 shadow-2xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-emerald-900 hover:bg-stone-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`mailto:${CLINIC_DATA.triageEmail}`}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-emerald-900 bg-emerald-100/70 hover:bg-emerald-100 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-emerald-800" />
              <span>Email Us</span>
            </a>

            <button
              onClick={onOpenBooking}
              id="nav-contact-btn"
              className="inline-flex items-center gap-2 rounded-full bg-[#1e3d2c] pl-4 pr-2.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#152c20] transition-all"
            >
              <span>Book visit</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d7f766] text-[#1e3d2c]">
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1 rounded-full bg-[#244836] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs"
            >
              <span>Book</span>
              <ArrowUpRight className="h-3 w-3 text-lime-300" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-2xl bg-white p-4 border border-stone-200 shadow-lg animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-xs font-medium text-stone-800 hover:bg-stone-100"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-2 mt-2 border-t border-stone-100 flex flex-col gap-2">
                <a
                  href={`mailto:${CLINIC_DATA.triageEmail}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2 text-xs font-semibold text-emerald-900"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email: {CLINIC_DATA.triageEmail}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#244836] py-2 text-xs font-semibold text-white"
                >
                  <span>Request appointment</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-lime-300" />
                </button>
              </div>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};
