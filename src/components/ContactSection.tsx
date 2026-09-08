import React, { useState } from 'react';
import { Mail, Check, Copy, Send, MapPin, ShieldCheck, Instagram, Twitter, Linkedin, Youtube, Facebook, AlertCircle } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialDepartment) setDepartment(initialDepartment);
    if (initialDoctorName) setMessage((prev) => prev || `I would like to inquire about an appointment with ${initialDoctorName}.`);
  }, [initialDepartment, initialDoctorName]);

  const generateFormattedTemplate = () => {
    return `To: Dantora Health Australia <${CLINIC_DATA.triageEmail}>
Subject: Patient Clinical Inquiry / Consultation Request

Patient Name: ${name || '[Your Full Name]'}
Contact Email: ${email || '[Your Email Address]'}
Mobile Reference: ${phoneReference || '[Optional Australian Mobile]'}
Requested Clinical Service: ${department}

Clinical Questions & Details:
${message || 'I would like to request an appointment or ask a question regarding diagnostic services.'}

Preferred Australian Facility: Sydney Central (187 Macquarie St) / Melbourne / Brisbane`;
  };

  const handleCopyTemplate = () => {
    const template = generateFormattedTemplate();
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please enter your name and email address.');
      return;
    }

    const subject = encodeURIComponent(`Clinical Inquiry: ${name} - [${department}]`);
    const body = encodeURIComponent(generateFormattedTemplate());
    window.location.href = `mailto:${CLINIC_DATA.triageEmail}?subject=${subject}&body=${body}`;
    setSubmittedStatus(`Your default email client has been opened with your pre-filled inquiry to ${CLINIC_DATA.triageEmail}. Our Australian medical team will reply shortly.`);
  };

  const socialPlaceholders = [
    { name: 'Instagram', icon: Instagram, handle: '@dantorahealth.au' },
    { name: 'Twitter', icon: Twitter, handle: '@dantorahealth' },
    { name: 'LinkedIn', icon: Linkedin, handle: 'Dantora Health Australia' },
    { name: 'YouTube', icon: Youtube, handle: 'Dantora Health Channels' },
    { name: 'Facebook', icon: Facebook, handle: 'Dantora Health Clinic' },
  ];

  const handleSocialClick = (socialName: string) => {
    setSocialNotice(`Note: Social placeholder for ${socialName}. In accordance with clinic privacy policy, this button has no external link.`);
    setTimeout(() => setSocialNotice(null), 4000);
  };

  return (
    <section id="contact" className="relative py-20 bg-stone-50 overflow-hidden border-t border-stone-200/60">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Strictly Email & Australian Location */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-emerald-900/5 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-900">
                <Mail className="h-3.5 w-3.5 text-emerald-800" />
                <span>Strictly Email Contact Policy</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-stone-900 leading-tight">
                Send Us An Email. <br />
                <span className="font-semibold text-[#1e3d2c]">Direct to our Australian doctors</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                To eliminate phone wait times and protect patient privacy, all appointments and medical questions are handled strictly via email. Our Sydney medical team replies within 4 hours.
              </p>
            </div>

            {/* Email Dispatch Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-stone-200/80 shadow-2xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-lime-300 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                    General Patient Inquiries & Appointments
                  </div>
                  <a
                    href={`mailto:${CLINIC_DATA.triageEmail}`}
                    className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-emerald-800 transition-colors truncate block"
                  >
                    {CLINIC_DATA.triageEmail}
                  </a>
                </div>
                <a
                  href={`mailto:${CLINIC_DATA.triageEmail}`}
                  className="rounded-full bg-[#244836] text-white hover:bg-[#1a3527] px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-colors flex-shrink-0"
                >
                  Email Us
                </a>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-stone-200/80 shadow-2xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700 flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-emerald-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Hospital Admissions & Specialist Referrals
                  </div>
                  <a
                    href={`mailto:${CLINIC_DATA.admissionsEmail}`}
                    className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-emerald-800 transition-colors truncate block"
                  >
                    {CLINIC_DATA.admissionsEmail}
                  </a>
                </div>
                <a
                  href={`mailto:${CLINIC_DATA.admissionsEmail}`}
                  className="rounded-full bg-stone-100 text-stone-800 hover:bg-stone-200 px-3.5 py-1.5 text-xs font-semibold transition-colors flex-shrink-0"
                >
                  Refer
                </a>
              </div>
            </div>

            {/* Australian Physical Location Card */}
            <div className="rounded-2xl bg-white p-4 border border-stone-200/80 shadow-2xs space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    Australian Clinical Headquarters
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    {CLINIC_DATA.headquarters}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Affiliated campuses in Melbourne (St Kilda Rd) and Brisbane (Spring Hill).
                  </div>
                </div>
              </div>
            </div>

            {/* Social Placeholders (No links per prompt instruction) */}
            <div className="rounded-2xl bg-white p-4 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Official Channels (Social Placeholders)
                </span>
                <span className="text-[10px] text-stone-400 font-medium">
                  Informational Only
                </span>
              </div>

              {socialNotice && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-[11px] text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-700 flex-shrink-0" />
                  <span>{socialNotice}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                {socialPlaceholders.map((social) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={social.name}
                      type="button"
                      onClick={() => handleSocialClick(social.name)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 hover:bg-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors"
                      title={`${social.name} placeholder (no external link)`}
                    >
                      <Icon className="h-3.5 w-3.5 text-stone-600" />
                      <span>{social.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-stone-400 italic">
                Notice: Social media buttons are placeholders with no external links in accordance with patient communication guidelines.
              </p>
            </div>

            {/* Formatted Template Preview */}
            <div className="rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Pre-Formatted Email Template
                </span>
                <button
                  type="button"
                  onClick={handleCopyTemplate}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy template</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl whitespace-pre-wrap leading-relaxed font-mono">
                {generateFormattedTemplate()}
              </pre>
            </div>

          </div>

          {/* Right Column: Email Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-stone-200 shadow-md">
              <div className="space-y-1 mb-5">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Direct Email Inquiry Form
                </h3>
                <p className="text-xs text-stone-500">
                  Fill in your details below to create an email draft directly addressed to <span className="font-semibold text-emerald-900">{CLINIC_DATA.triageEmail}</span>.
                </p>
              </div>

              {submittedStatus && (
                <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-900 flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>{submittedStatus}</div>
                </div>
              )}

              <form onSubmit={handleSendViaEmail} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label htmlFor="patient-name" className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lachlan Cooper"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="patient-email" className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="patient-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. lachlan@example.com.au"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="patient-phone" className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                      Mobile Reference (Optional)
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      value={phoneReference}
                      onChange={(e) => setPhoneReference(e.target.value)}
                      placeholder="e.g. 0400 123 456"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service-department" className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Department or Service Required
                  </label>
                  <select
                    id="service-department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  >
                    <option value="Body Scans & Imaging">Body Scans & Imaging (MRI/CT)</option>
                    <option value="Full Body Check-ups">Full Body Check-ups</option>
                    <option value="DNA & Genetics">DNA & Genetics</option>
                    <option value="Fast Blood & Lab Tests">Fast Blood & Lab Tests</option>
                    <option value="Friendly Doctor Visits">Friendly Doctor Visits</option>
                    <option value="Hospital Blog & Health Sector Ideas">Hospital Blog & Health Sector Ideas</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="patient-notes" className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Questions, Symptoms, or Desired Date
                  </label>
                  <textarea
                    id="patient-notes"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what test you need, any referral notes, or preferred times..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#244836] py-3 text-xs font-semibold text-white hover:bg-[#1a3527] shadow-xs transition-colors"
                  >
                    <Send className="h-3.5 w-3.5 text-lime-300" />
                    <span>Open Email Client & Send</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyTemplate}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-stone-100 hover:bg-stone-200 px-5 py-3 text-xs font-semibold text-stone-800 transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-stone-500 text-center pt-2">
                  Replies are sent directly to your email address within 4 business hours.
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
