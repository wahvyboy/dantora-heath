import React, { useState, useEffect } from 'react';
import { Mail, Send, Check, MapPin, Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react';
import { CLINIC_DATA } from '../data/clinicData';

interface ContactSectionProps {
  initialDepartment?: string;
  initialDoctorName?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialDepartment = 'Body Scans & Imaging',
  initialDoctorName = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneReference, setPhoneReference] = useState('');
  const [department, setDepartment] = useState(initialDepartment);
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialDepartment) setDepartment(initialDepartment);
    if (initialDoctorName) setMessage((prev) => prev || `Hi, I would like to book a visit with ${initialDoctorName}.`);
  }, [initialDepartment, initialDoctorName]);

  const handleSendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      return;
    }

    const emailBody = [
      `Hello Dantora Health Care Team,`,
      ``,
      `I would like to make an inquiry:`,
      `Name: ${name}`,
      `Email: ${email}`,
      phoneReference ? `Phone: ${phoneReference}` : null,
      `Service: ${department}`,
      ``,
      `Details:`,
      message || 'I would like to book an appointment or ask about your services.',
      ``,
      `Thank you,`,
      name,
    ]
      .filter(Boolean)
      .join('\n');

    const subject = encodeURIComponent(`Care Inquiry from ${name} - [${department}]`);
    const encodedBody = encodeURIComponent(emailBody);

    // Immediately trigger user's native email client with pre-filled content
    window.location.href = `mailto:${CLINIC_DATA.triageEmail}?subject=${subject}&body=${encodedBody}`;

    setStatusMessage(`Opening your email app now. Your message is pre-filled — just tap Send!`);
  };

  const socialPlaceholders = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: Twitter },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'YouTube', icon: Youtube },
    { name: 'Facebook', icon: Facebook },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-20 bg-stone-50 border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct email channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-emerald-900/5 px-3 py-1 text-xs font-semibold text-emerald-900">
                <Mail className="h-3.5 w-3.5 text-emerald-800" />
                <span>Fast Email Care</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-stone-900 leading-tight font-display">
                Send us an email. <br />
                <span className="font-semibold text-[#1e3d2c]">We reply within 4 hours</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg">
                No waiting on hold. Send your question or doctor referral here, and our team will get back to you promptly.
              </p>
            </div>

            {/* Email Channels */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-stone-200 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e3d2c] text-lime-300 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                    Patient Questions & Appointments
                  </div>
                  <a
                    href={`mailto:${CLINIC_DATA.triageEmail}`}
                    className="text-sm font-semibold text-stone-900 hover:text-emerald-800 transition-colors truncate block"
                  >
                    {CLINIC_DATA.triageEmail}
                  </a>
                </div>
                <a
                  href={`mailto:${CLINIC_DATA.triageEmail}`}
                  className="rounded-full bg-[#1e3d2c] text-white hover:bg-[#152c20] px-4 py-2 text-xs font-semibold shadow-xs transition-colors flex-shrink-0"
                >
                  Email Us
                </a>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-stone-200 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700 flex-shrink-0">
                  <Mail className="h-5 w-5 text-emerald-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Hospital Admissions & Specialist Referrals
                  </div>
                  <a
                    href={`mailto:${CLINIC_DATA.admissionsEmail}`}
                    className="text-sm font-semibold text-stone-900 hover:text-emerald-800 transition-colors truncate block"
                  >
                    {CLINIC_DATA.admissionsEmail}
                  </a>
                </div>
                <a
                  href={`mailto:${CLINIC_DATA.admissionsEmail}`}
                  className="rounded-full bg-stone-100 text-stone-800 hover:bg-stone-200 px-4 py-2 text-xs font-semibold transition-colors flex-shrink-0"
                >
                  Refer
                </a>
              </div>
            </div>

            {/* Australian Physical Location */}
            <div className="rounded-2xl bg-white p-4 border border-stone-200 shadow-xs space-y-1.5">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    Australian Hospital Headquarters
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    {CLINIC_DATA.headquarters}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-medium mt-1">
                    Open Monday to Friday 7:30am – 7:30pm | Saturday 8:30am – 5:00pm
                  </div>
                </div>
              </div>
            </div>

            {/* Social Placeholders */}
            <div className="pt-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                Follow Dantora Health
              </div>
              <div className="flex flex-wrap gap-2">
                {socialPlaceholders.map((social) => {
                  const Icon = social.icon;
                  return (
                    <div
                      key={social.name}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 shadow-2xs"
                    >
                      <Icon className="h-3.5 w-3.5 text-stone-600" />
                      <span>{social.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Instant Email Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-stone-200 shadow-sm">
              <div className="space-y-1 mb-5">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                  Quick Inquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Fill in your question below. Clicking send immediately opens your email with everything filled in.
                </p>
              </div>

              {statusMessage && (
                <div className="mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm text-emerald-900 flex items-start gap-2.5">
                  <Check className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>{statusMessage}</div>
                </div>
              )}

              <form onSubmit={handleSendViaEmail} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label htmlFor="patient-name" className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lachlan Cooper"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="patient-email" className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Your Email *
                    </label>
                    <input
                      id="patient-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. lachlan@example.com.au"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="patient-phone" className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      value={phoneReference}
                      onChange={(e) => setPhoneReference(e.target.value)}
                      placeholder="e.g. 0400 123 456"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service-department" className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    What can we help you with?
                  </label>
                  <select
                    id="service-department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Body Scans & Imaging">Body Scans & Imaging (MRI/CT)</option>
                    <option value="Full Body Check-ups">Full Body Check-ups</option>
                    <option value="DNA & Genetics">DNA & Genetics</option>
                    <option value="Fast Blood & Lab Tests">Fast Blood & Lab Tests</option>
                    <option value="Doctor Visit">Doctor Visit</option>
                    <option value="Hospital Health Journal Feedback">Hospital Health Journal Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="patient-notes" className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="patient-notes"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need or ask any questions..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none resize-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1e3d2c] py-3.5 text-sm font-semibold text-white hover:bg-[#152c20] shadow-xs transition-colors"
                  >
                    <Send className="h-4 w-4 text-lime-300" />
                    <span>Open in Email & Send</span>
                  </button>
                </div>

                <div className="text-[11px] text-stone-500 text-center pt-1">
                  We will reply to your email address within 4 hours.
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
