import React, { useState } from 'react';
import { Mail, MapPin, ArrowUp, Instagram, Twitter, Linkedin, Youtube, Facebook, Shield, BookOpen } from 'lucide-react';
import { CLINIC_DATA } from '../data/clinicData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [socialNote, setSocialNote] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialPlaceholders = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: Twitter },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'YouTube', icon: Youtube },
    { name: 'Facebook', icon: Facebook },
  ];

  const handleSocialClick = (name: string) => {
    setSocialNote(`${name} channel (Social placeholder — no external link attached).`);
    setTimeout(() => setSocialNote(null), 3500);
  };

  return (
    <footer className="relative bg-stone-950 text-stone-300 pt-12 pb-10 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Quick email inquiry banner */}
        <div className="mb-10 rounded-3xl bg-emerald-950/50 border border-emerald-800/60 p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-emerald-300 uppercase">
                Patient Email Desk
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-medium text-white font-display">
              Need a quick scan, doctor consultation, or blood panel?
            </h4>
            <p className="text-xs text-stone-400">
              Our team reviews your questions and confirms your appointment via email within 4 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`mailto:${CLINIC_DATA.triageEmail}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#1e3d2c] hover:bg-[#152c20] border border-emerald-700/60 px-5 py-2.5 text-xs font-semibold text-white transition-colors shadow-xs"
            >
              <Mail className="h-3.5 w-3.5 text-lime-300" />
              <span>{CLINIC_DATA.triageEmail}</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand Info & Australian Address */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1e3d2c] shadow-xs flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="26" y="14" width="12" height="36" rx="6" fill="#ffffff" />
                  <rect x="14" y="26" width="36" height="12" rx="6" fill="#ffffff" />
                  <circle cx="32" cy="32" r="5" fill="#d7f766" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Dantora Health Australia
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Modern Australian hospital and diagnostic imaging centre with all results explained in plain words.
            </p>

            <div className="text-xs text-stone-400 space-y-1.5 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>187 Macquarie Street, Sydney NSW 2000, Australia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                <span>care@dantorahealth.com.au</span>
              </div>
            </div>

            {/* Social Media Placeholders */}
            <div className="pt-2 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Follow Dantora Health
              </div>
              
              <div className="flex items-center gap-2 pt-0.5">
                {socialPlaceholders.map((social) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.name}
                      type="button"
                      onClick={() => handleSocialClick(social.name)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 border border-stone-800 hover:border-emerald-700 hover:bg-stone-800 text-stone-400 hover:text-white transition-all"
                      title={`${social.name} placeholder`}
                      aria-label={`${social.name} placeholder`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-white">Diagnostic Services</div>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Body Scans & Imaging (MRI/CT)</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">DNA & Preventive Genetics</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Full Body Check-ups</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Fast Lab & Blood Tests</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Friendly Specialist Doctor Visits</a></li>
            </ul>
          </div>

          {/* Hospital Blog & Sector Discussions */}
          <div className="space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
              <span>Hospital Health Journal</span>
            </div>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Plain-English Radiology Reports</a></li>
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Ending the 6-Week Wait in Australia</a></li>
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Preventive Genomics in Healthcare</a></li>
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Human-First Hospital Architecture</a></li>
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Closing Regional Health Gaps</a></li>
            </ul>
          </div>

          {/* Australian Campus Locations & Hours */}
          <div className="space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-white">Australian Locations</div>
            <p className="text-stone-400"><strong className="text-stone-300">Sydney:</strong> 187 Macquarie Street (Mon-Fri 7:30am - 7:30pm)</p>
            <p className="text-stone-400"><strong className="text-stone-300">Melbourne:</strong> 310 St Kilda Road (Mon-Fri 8:00am - 7:00pm)</p>
            <p className="text-stone-400"><strong className="text-stone-300">Brisbane:</strong> 55 Little Edward Street, Spring Hill</p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Dantora Health Australia. All rights reserved.</p>
          <p>Macquarie Street, Sydney • St Kilda Road, Melbourne • Spring Hill, Brisbane</p>
        </div>

      </div>
    </footer>
  );
};
