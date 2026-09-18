import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceCategory } from '../types';
import { AnimatedSection, HeadingReveal } from './motion';

interface ServiceCategoriesProps {
  onSelectCategory?: (category: ServiceCategory) => void;
  onExploreAll: () => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  onExploreAll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <AnimatedSection id="services" variant="fade-lift" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
              Verified Solutions
            </div>
            <HeadingReveal as="h2" className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
              Our Services
            </HeadingReveal>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
              Everything you need for your home, appliances and more — click any service to view dedicated options and pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Horizontal Scroll Controls (Visible on medium/large screens) */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="interactive-btn p-2 rounded-lg bg-white shadow-2xs hover:bg-slate-50 text-slate-700 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="interactive-btn p-2 rounded-lg bg-white shadow-2xs hover:bg-slate-50 text-slate-700 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* "Explore All Services →" Link */}
            <button
              id="explore-all-services-btn"
              type="button"
              onClick={onExploreAll}
              className="interactive-btn inline-flex items-center gap-1.5 text-sm font-bold text-[#E53935] hover:text-[#c62828] transition-colors py-2 px-3 rounded-lg hover:bg-red-50"
            >
              <span>Explore All Services</span>
              <ArrowRight className="icon-arrow-right w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable & Responsive Grid */}
        <div
          ref={scrollContainerRef}
          className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SERVICE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/services/${cat.slug}`}
              id={`service-card-${cat.id}`}
              className="interactive-card snap-start shrink-0 w-[240px] sm:w-auto bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Image with zoom on hover */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3.5 bg-slate-100">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="card-img-zoom w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge Pill */}
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-2xs ${
                    cat.categoryType === 'consultation' 
                      ? 'bg-purple-900/80 text-white' 
                      : 'bg-[#0A192F]/80 text-white'
                  }`}>
                    {cat.categoryType === 'consultation' ? 'Site Visit' : 'At Home'}
                  </span>
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="card-content-shift">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-base text-[#0A192F] group-hover:text-[#E53935] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  {/* Small arrow button */}
                  <div className="card-icon-react w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#E53935] text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 ml-1">
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {cat.subtitle && (
                  <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                    {cat.subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4">
          <span>← Swipe to explore all 10 service categories →</span>
        </div>

      </div>
    </AnimatedSection>
  );
};
