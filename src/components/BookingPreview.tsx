import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Check, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { AnimatedSection, HeadingReveal, MagneticButton } from './motion';

interface BookingPreviewProps {
  onContinueBooking: (bookingData: {
    serviceName: string;
    date: string;
    slot: string;
  }) => void;
}

export const BookingPreview: React.FC<BookingPreviewProps> = ({ onContinueBooking }) => {
  const [selectedService, setSelectedService] = useState('AC Service');
  const [selectedDateOption, setSelectedDateOption] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM – 01:00 PM');

  const timeSlots = [
    '09:00 AM – 11:00 AM',
    '11:00 AM – 01:00 PM',
    '02:00 PM – 04:00 PM',
    '04:00 PM – 06:00 PM',
    '06:00 PM – 08:00 PM',
  ];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    let dateStr = 'Today';
    if (selectedDateOption === 'tomorrow') dateStr = 'Tomorrow';
    else if (selectedDateOption === 'custom') dateStr = customDate;

    onContinueBooking({
      serviceName: selectedService,
      date: dateStr,
      slot: selectedSlot,
    });
  };

  return (
    <AnimatedSection id="smart-booking-section" variant="fade-lift" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Scheduling Demo</span>
          </div>
          <HeadingReveal as="h2" className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            Your Time. Your Choice.
          </HeadingReveal>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Choose a convenient date and time for your service visit.
          </p>
        </div>

        {/* Mock Booking Interface Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 relative overflow-hidden">
          
          {/* Subtle Top Red & Navy Brand Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0A192F] via-[#E53935] to-[#0A192F]" />

          <form onSubmit={handleContinue} className="space-y-8">
            
            {/* Step A: Select Service */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                1. Select Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SERVICE_CATEGORIES.slice(0, 4).map((cat) => {
                  const isSelected = selectedService === cat.name;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedService(cat.name)}
                      className={`interactive-btn p-3 rounded-2xl text-left border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0A192F] bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#E53935] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step B: Select Date */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>2. Select Date</span>
                </label>
                <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Instant Availability
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Today */}
                <button
                  type="button"
                  id="date-option-today"
                  onClick={() => setSelectedDateOption('today')}
                  className={`interactive-card p-4 rounded-2xl border text-center transition-all ${
                    selectedDateOption === 'today'
                      ? 'border-[#E53935] bg-red-50/50 ring-2 ring-red-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E53935]">Express</div>
                  <div className="text-base font-extrabold text-[#0A192F] mt-0.5">Today</div>
                  <div className="text-[11px] text-slate-500 mt-1">Available in 60 mins</div>
                </button>

                {/* Tomorrow */}
                <button
                  type="button"
                  id="date-option-tomorrow"
                  onClick={() => setSelectedDateOption('tomorrow')}
                  className={`interactive-card p-4 rounded-2xl border text-center transition-all ${
                    selectedDateOption === 'tomorrow'
                      ? 'border-[#E53935] bg-red-50/50 ring-2 ring-red-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled</div>
                  <div className="text-base font-extrabold text-[#0A192F] mt-0.5">Tomorrow</div>
                  <div className="text-[11px] text-slate-500 mt-1">All slots open</div>
                </button>

                {/* Choose Date */}
                <div
                  onClick={() => setSelectedDateOption('custom')}
                  className={`interactive-card p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedDateOption === 'custom'
                      ? 'border-[#E53935] bg-red-50/50 ring-2 ring-red-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Custom Date</div>
                  <div className="text-base font-extrabold text-[#0A192F] mt-0.5">Choose Date</div>
                  <input
                    type="date"
                    id="custom-date-picker"
                    value={customDate}
                    onChange={(e) => {
                      setCustomDate(e.target.value);
                      setSelectedDateOption('custom');
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    className="interactive-input mt-1 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Step C: Select Time */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-[#E53935]" />
                <span>3. Select Time Slot</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {timeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`interactive-btn py-3 px-3 rounded-2xl border text-xs sm:text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'border-[#0A192F] bg-[#0A192F] text-white shadow-md'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#E53935]" />}
                      <span className="whitespace-nowrap">{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Action Row */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 text-center sm:text-left">
                <MapPin className="w-4 h-4 text-[#E53935] shrink-0" />
                <span>Doorstep visit by verified technicians across Bangalore & Karnataka</span>
              </div>

              <MagneticButton
                id="continue-booking-submit-btn"
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E53935] hover:bg-[#d32f2f] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-red-500/25 transition-all duration-200"
              >
                <span>Continue Booking</span>
                <ArrowRight className="icon-arrow-right w-4 h-4" />
              </MagneticButton>
            </div>

          </form>

          {/* Demonstration Architecture Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-100/80 text-center">
            <span className="inline-block text-[11px] font-medium text-slate-400 bg-slate-100/70 px-3 py-1 rounded-full">
              Frontend preview prototype • Pre-configured for future technician dispatch & scheduling integration
            </span>
          </div>

        </div>

      </div>
    </AnimatedSection>
  );
};
