import React, { useState, useEffect } from 'react';
import { X, Mail, Check, MapPin } from 'lucide-react';
import { DOCTORS, SERVICES, CLINIC_DATA, CLINIC_LOCATIONS } from '../data/clinicData';
import { Doctor } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: Doctor | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  initialDoctor = null,
}) => {
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || SERVICES[0].title);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctor ? initialDoctor.id : 'any');
  const [selectedLocationId, setSelectedLocationId] = useState(CLINIC_LOCATIONS[0].id);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:30 AM');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialDoctor) setSelectedDoctorId(initialDoctor.id);
  }, [initialService, initialDoctor]);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !email.trim()) {
      return;
    }

    const locObj = CLINIC_LOCATIONS.find((l) => l.id === selectedLocationId);
    const doctorObj = DOCTORS.find((d) => d.id === selectedDoctorId);
    const doctorName = doctorObj ? doctorObj.name : 'First Available Doctor';

    const subject = encodeURIComponent(`Appointment Request: ${patientName} - ${selectedService}`);
    const bodyText = [
      `Hello Dantora Health,`,
      ``,
      `I would like to book an appointment:`,
      `• Patient Name: ${patientName}`,
      `• Email: ${email}`,
      mobile ? `• Phone: ${mobile}` : null,
      `• Service: ${selectedService}`,
      `• Preferred Doctor: ${doctorName}`,
      `• Campus: ${locObj?.name || 'Sydney Central'}`,
      `• Requested Time: ${selectedDate} at ${selectedTimeSlot}`,
      notes ? `• Notes/Symptoms: ${notes}` : null,
      ``,
      `Please email me to confirm my appointment.`,
      ``,
      `Thank you,`,
      patientName,
    ]
      .filter(Boolean)
      .join('\n');

    // Immediately trigger user's native email client with pre-filled content
    window.location.href = `mailto:${CLINIC_DATA.triageEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

    setConfirmed(true);
  };

  const handleResetAndClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {!confirmed ? (
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 mb-2">
              <Mail className="h-3.5 w-3.5" />
              <span>Fast Appointment Request</span>
            </div>

            <h3 className="text-2xl font-bold text-stone-900 mt-1 mb-1 font-display">
              Book Your Visit
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-5">
              Choose your scan or doctor. Clicking submit opens your email app so you can send your request in one click.
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs sm:text-sm">
              
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@example.com.au"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Mobile Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 0412 345 678"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Service / Test Needed
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Doctor Preference
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="any">First Available Specialist</option>
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.department})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Clinic Campus
                  </label>
                  <select
                    value={selectedLocationId}
                    onChange={(e) => setSelectedLocationId(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  >
                    {CLINIC_LOCATIONS.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Preferred Day
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Today">Today (Urgent)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="08:30 AM">08:30 AM (Early)</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Notes or Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Doctor notes or any questions..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-full bg-[#1e3d2c] py-3 text-sm font-semibold text-white hover:bg-[#152c20] transition-all shadow-xs"
              >
                Send Request via Email
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Check className="h-7 w-7 text-emerald-700" />
            </div>

            <h3 className="text-2xl font-bold text-stone-900 font-display">
              Email App Opened!
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              We opened your email app with your appointment details for <strong className="text-stone-900">{selectedService}</strong> on <strong className="text-stone-900">{selectedDate}</strong>. Just tap Send in your email!
            </p>

            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-left space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                <MapPin className="h-3.5 w-3.5" />
                <span>Campus: {CLINIC_LOCATIONS.find((l) => l.id === selectedLocationId)?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-stone-500" />
                <span>Confirmation will be sent to: <strong>{email}</strong></span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="w-full rounded-full bg-[#1e3d2c] hover:bg-[#152c20] py-3 text-xs font-semibold text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
