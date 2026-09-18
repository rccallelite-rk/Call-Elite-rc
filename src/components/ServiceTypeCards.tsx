import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck2, Compass, Check, ArrowRight } from 'lucide-react';
import { AnimatedSection, AnimatedStagger, AnimatedItem, HeadingReveal, MagneticButton } from './motion';

interface ServiceTypeCardsProps {
  onBookAppointment: () => void;
  onBookConsultation: () => void;
}

export const ServiceTypeCards: React.FC<ServiceTypeCardsProps> = ({
  onBookAppointment,
  onBookConsultation,
}) => {
  const appointmentServices = [
    { name: 'Washing Machine', slug: 'washing-machine-repair' },
    { name: 'TV Repair', slug: 'tv-repair' },
    { name: 'AC Service', slug: 'ac-service' },
    { name: 'Refrigerator', slug: 'refrigerator-service' },
    { name: 'Water Purifier', slug: 'water-purifier-service' },
    { name: 'Bike Services', slug: 'bike-service' },
    { name: 'Home Problems', slug: 'home-plumbing' },
  ];

  const consultationServices = [
    { name: 'Home Painting', slug: 'home-painting' },
    { name: 'Interior Design', slug: 'interior-design' },
    { name: 'Interior Construction', slug: 'interior-construction' },
  ];

  return (
    <AnimatedSection id="service-types" variant="fade-lift" className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            Tailored Booking Models
          </div>
          <HeadingReveal as="h2" className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            Services Designed Around Your Need
          </HeadingReveal>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Quick technician appointments for fast fixes, or in-depth site consultations for transformational projects.
          </p>
        </div>

        {/* 2 Distinguished Cards with Stagger and Depth */}
        <AnimatedStagger staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* CARD 1: SERVICE APPOINTMENT */}
          <AnimatedItem variant="stagger-up">
            <div
              id="service-appointment-card"
              className="interactive-card bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group h-full"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0A192F]" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="card-icon-react w-12 h-12 rounded-2xl bg-slate-100 text-[#0A192F] flex items-center justify-center shadow-2xs">
                    <CalendarCheck2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                    Fast Doorstep Fix
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0A192F] tracking-tight mb-2">
                  SERVICE APPOINTMENT
                </h3>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Direct technician visit for diagnosis, servicing, maintenance, and prompt on-spot repairs.
                </p>

                {/* Service List with direct links */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select a Service to View Details:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {appointmentServices.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/services/${item.slug}`}
                        className="interactive-card flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-red-50/60 border border-slate-100 hover:border-red-200 text-xs font-semibold text-slate-800 hover:text-[#E53935] transition-all group/item"
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#E53935] shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity text-[#E53935] group-hover/item:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Magnetic CTA */}
              <MagneticButton
                id="btn-book-appointment"
                type="button"
                onClick={onBookAppointment}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0A192F] hover:bg-[#152a4d] text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-md transition-all duration-200 group-hover:bg-[#E53935]"
              >
                <span>Book Appointment</span>
                <ArrowRight className="icon-arrow-right w-4 h-4" />
              </MagneticButton>
            </div>
          </AnimatedItem>

          {/* CARD 2: CONSULTATION / SITE VISIT */}
          <AnimatedItem variant="stagger-up">
            <div
              id="consultation-site-visit-card"
              className="interactive-card bg-white rounded-3xl p-7 sm:p-9 border border-red-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group h-full"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E53935]" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="card-icon-react w-12 h-12 rounded-2xl bg-red-50 text-[#E53935] flex items-center justify-center shadow-2xs">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] bg-red-50 px-3 py-1 rounded-full">
                    Detailed Estimation
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0A192F] tracking-tight mb-2">
                  CONSULTATION / SITE VISIT
                </h3>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Expert engineer & designer on-site survey, measurement, material samples, and 3D budget quotations.
                </p>

                {/* Service List with direct links */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select a Service to View Details:
                  </div>
                  <div className="space-y-2">
                    {consultationServices.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/services/${item.slug}`}
                        className="interactive-card flex items-center justify-between p-3 rounded-xl bg-red-50/40 hover:bg-red-50 border border-red-100 hover:border-red-200 text-sm font-semibold text-slate-800 hover:text-[#E53935] transition-all group/item"
                      >
                        <div className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-[#E53935] shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#E53935] bg-white px-2 py-0.5 rounded shadow-2xs">
                            Free Survey
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E53935] group-hover/item:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Magnetic CTA */}
              <MagneticButton
                id="btn-book-consultation"
                type="button"
                onClick={onBookConsultation}
                glowEffect={true}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#d32f2f] text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-lg shadow-red-500/25 transition-all duration-200"
              >
                <span>Book Consultation</span>
                <ArrowRight className="icon-arrow-right w-4 h-4" />
              </MagneticButton>
            </div>
          </AnimatedItem>

        </AnimatedStagger>

      </div>
    </AnimatedSection>
  );
};
