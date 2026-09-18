import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { POPULAR_SERVICES } from '../data/servicesData';
import { PopularService } from '../types';
import { AnimatedSection, AnimatedStagger, AnimatedItem, HeadingReveal } from './motion';

interface PopularServicesProps {
  onBookService?: (service: PopularService) => void;
}

export const PopularServices: React.FC<PopularServicesProps> = () => {
  return (
    <AnimatedSection id="popular-services" variant="fade-lift" className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with HeadingReveal */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#E53935]" />
              <span>Customer Favorites</span>
            </div>
            <HeadingReveal as="h2" className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
              Popular Services
            </HeadingReveal>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Top requested doorstep repairs and maintenance solutions with verified ratings — select any card for full details.
            </p>
          </div>
        </div>

        {/* Cards Grid with Layered Motion & Stagger */}
        <AnimatedStagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SERVICES.map((service) => (
            <AnimatedItem key={service.id} variant="stagger-up">
              <Link
                to={`/services/${service.slug}`}
                id={`popular-card-${service.id}`}
                className="interactive-card bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-red-400/50 flex flex-col group h-full transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="card-img-zoom w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

                  {/* Badge if available */}
                  {service.badge && (
                    <div className="absolute top-3 left-3 bg-[#0A192F]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm group-hover:scale-105 transition-transform">
                      {service.badge}
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm text-xs font-bold text-slate-900 group-hover:translate-y-[-2px] transition-transform">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{service.rating}</span>
                    <span className="text-slate-400 font-normal">({service.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Body with Layered Depth */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="card-content-shift">
                    <div className="text-[11px] font-bold text-[#E53935] uppercase tracking-wider mb-1">
                      {service.category}
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0A192F] group-hover:text-[#E53935] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed font-normal">
                      “{service.description}”
                    </p>
                  </div>

                  {/* Bottom Row: Starting price + "View Service" Button */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Starts from</div>
                      <div className="text-lg font-black text-[#0A192F]">{service.startingPrice}</div>
                    </div>

                    <span
                      id={`book-popular-${service.id}`}
                      className="interactive-btn inline-flex items-center gap-2 bg-[#0A192F] group-hover:bg-[#E53935] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all duration-300"
                    >
                      <span>View Service</span>
                      <ArrowRight className="icon-arrow-right w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              </Link>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

      </div>
    </AnimatedSection>
  );
};
