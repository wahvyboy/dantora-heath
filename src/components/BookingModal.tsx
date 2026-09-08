import React, { useState } from 'react';
import { X, Mail, Check, Calendar, MapPin, Clock } from 'lucide-react';
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

  React.useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialDoctor) setSelectedDoctorId(initialDoctor.id);
  }, [initialService, initialDoctor]);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !email) {
      alert('Please enter your full name and email address.');
      return;
    }
    setConfirmed(true);
  };

  const handleSendEmailDispatch = () => {
    const locObj = CLINIC_LOCATIONS.find((l) => l.id === selectedLocationId);
    const doctorObj = DOCTORS.find((d) => d.id === selectedDoctorId);
    const doctorName = doctorObj ? doctorObj.name : 'First Available Specialist';

    const subject = encodeURIComponent(`Consultation Booking: ${patientName} - ${selectedService}`);
    const body = encodeURIComponent(
      `Hello Dantora Health Australia,\n\nI would like to confirm my consultation appointment:\n\n• Patient Name: ${patientName}\n• Email: ${email}\n• Mobile Reference: ${mobile || 'Not provided'}\n• Service: ${selectedService}\n• Doctor Preference: ${doctorName}\n• Location: ${locObj?.name || 'Sydney Central'}\n• Desired Date & Time: ${selectedDate} at ${selectedTimeSlot}\n\nNotes / Symptoms:\n${notes || 'No additional notes provided.'}\n\nPlease email me confirmation of this booking.\n\nThank you,\n${patientName}`
    );

    window.location.href = `mailto:${CLINIC_DATA.triageEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {!confirmed ? (
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-0.5 text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-2">
              <Mail className="h-3 w-3" />
              <span>Strictly Email Scheduling</span>
            </div>

            <h3 className="text-2xl font-bold text-stone-900 mt-1 mb-1">
              Request Your Appointment
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Select your preferred Australian campus and time slot. Our clinical desk confirms all details via email.
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs sm:text-sm">
              
              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@example.com.au"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Australian Mobile (Optional)
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 0412 345 678"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                  Service / Scan Required
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Doctor Preference
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  >
                    <option value="any">First Available Australian Specialist</option>
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.department})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Australian Campus
                  </label>
                  <select
                    value={selectedLocationId}
                    onChange={(e) => setSelectedLocationId(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  >
                    {CLINIC_LOCATIONS.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Preferred Day
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  >
                    <option value="Today">Today (Urgent Scan)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                  >
                    <option value="08:30 AM">08:30 AM (Fasting / Early)</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-500 mb-1">
                  Symptoms or Referral Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Doctor referral notes, recent scans, or special assistance..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-full bg-[#244836] py-3 text-xs font-semibold text-white hover:bg-[#1a3527] transition-all shadow-xs"
              >
                Continue to Email Confirmation
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Check className="h-6 w-6 text-emerald-700" />
            </div>

            <h3 className="text-2xl font-bold text-stone-900">
              Request Ready to Send
            </h3>

            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-stone-900">{patientName}</span>. Your appointment request for <span className="font-semibold text-stone-900">{selectedService}</span> on <span className="font-semibold text-stone-900">{selectedDate} at {selectedTimeSlot}</span> has been structured.
            </p>

            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-left space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                <MapPin className="h-3.5 w-3.5" />
                <span>Australian Campus: {CLINIC_LOCATIONS.find((l) => l.id === selectedLocationId)?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-stone-500" />
                <span>Confirmation will be sent to: <strong>{email}</strong></span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleSendEmailDispatch}
                className="flex items-center justify-center gap-2 rounded-full bg-[#244836] hover:bg-[#1a3527] py-3 px-4 text-xs font-semibold text-white shadow-xs"
              >
                <Mail className="h-4 w-4 text-lime-300" />
                <span>Open Email & Send Request to Doctors</span>
              </button>

              <button
                onClick={onClose}
                className="rounded-full bg-stone-100 hover:bg-stone-200 py-2.5 text-xs font-medium text-stone-700"
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
