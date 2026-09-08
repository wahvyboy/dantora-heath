import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, Mail, Compass } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinicData';
import { ClinicLocation } from '../types';

export const GeoSection: React.FC = () => {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<ClinicLocation>(CLINIC_LOCATIONS[0]);
  const [isLocating, setIsLocating] = useState(false);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in kilometers (Australia metric)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Location is not supported on this device.');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        setIsLocating(false);

        let minDistance = Infinity;
        let nearest = CLINIC_LOCATIONS[0];
        CLINIC_LOCATIONS.forEach((loc) => {
          const dist = parseFloat(calculateDistance(coords.lat, coords.lng, loc.coordinates.lat, loc.coordinates.lng));
          if (dist < minDistance) {
            minDistance = dist;
            nearest = loc;
          }
        });
        setSelectedLocation(nearest);
      },
      () => {
        setIsLocating(false);
        setGeoError('Could not find GPS automatically. You can choose your nearest clinic below.');
      },
      { timeout: 8000 }
    );
  };

  return (
    <section id="locations" className="relative py-20 bg-stone-100/80 border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Our Locations
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-stone-900">
              Friendly clinic locations <br />
              <span className="font-semibold text-[#1e3d2c]">near your neighborhood</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={handleRequestLocation}
            disabled={isLocating}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-300 hover:border-emerald-700 px-4 py-2 text-xs font-semibold text-stone-800 shadow-2xs hover:text-emerald-900 transition-all self-start md:self-auto"
          >
            <Navigation className={`h-3.5 w-3.5 text-emerald-700 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Finding...' : 'Find Closest Clinic (GPS)'}</span>
          </button>
        </div>

        {geoError && (
          <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-800">
            {geoError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Clinic List */}
          <div className="lg:col-span-5 space-y-3">
            {CLINIC_LOCATIONS.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              const distance = userCoords
                ? calculateDistance(userCoords.lat, userCoords.lng, loc.coordinates.lat, loc.coordinates.lng)
                : null;

              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-700 shadow-sm ring-1 ring-emerald-700'
                      : 'bg-white/80 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-sm text-stone-900">{loc.name}</h4>
                    {distance && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                        {distance} km
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-emerald-700 flex-shrink-0" />
                    <span>{loc.address}, {loc.city}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                    {loc.imagingWings.map((w, i) => (
                      <span key={i} className="text-[10px] rounded-full bg-stone-100 px-2 py-0.5 text-stone-600">
                        {w}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Clinic Details */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-xl font-bold text-stone-900">{selectedLocation.name}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">{selectedLocation.address}, {selectedLocation.city}</p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedLocation.name + ' ' + selectedLocation.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#244836] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1a3527] self-start sm:self-auto"
                >
                  <MapPin className="h-3.5 w-3.5 text-lime-300" />
                  <span>Open Map</span>
                </a>
              </div>

              {/* Hours & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 rounded-2xl bg-stone-50 p-3.5 border border-stone-100">
                  <div className="flex items-center gap-1.5 font-bold uppercase text-stone-700">
                    <Clock className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Opening Hours</span>
                  </div>
                  <p className="text-stone-600">Mon - Fri: {selectedLocation.hours.weekdays}</p>
                  <p className="text-stone-600">Saturday: {selectedLocation.hours.saturday}</p>
                  <p className="text-stone-500">Sunday: {selectedLocation.hours.sunday}</p>
                </div>

                <div className="space-y-1.5 rounded-2xl bg-stone-50 p-3.5 border border-stone-100">
                  <div className="flex items-center gap-1.5 font-bold uppercase text-stone-700">
                    <Mail className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Campus Email Desk</span>
                  </div>
                  <p className="text-stone-900 font-semibold truncate">{selectedLocation.email}</p>
                  <a
                    href={`mailto:${selectedLocation.email}?subject=Inquiry%20for%20${encodeURIComponent(selectedLocation.name)}`}
                    className="inline-block text-xs font-semibold text-emerald-800 hover:underline"
                  >
                    Email this facility →
                  </a>
                  <p className="text-emerald-800 font-medium">Free patient parking available</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-2">
                  Building Amenities
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.amenities.map((item, i) => (
                    <span key={i} className="rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs text-emerald-900">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
