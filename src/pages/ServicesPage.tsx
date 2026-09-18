import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Sparkles,
  Calendar,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Search
} from 'lucide-react';
import { SERVICES_DETAIL_DATA } from '../data/servicesData';
import { SEOHead } from '../components/SEOHead';
import { useCMS } from '../context/CMSContext';
import {
  AnimatedSection,
  AnimatedStagger,
  AnimatedItem,
  HeadingReveal,
  MagneticButton,
  BackgroundAmbient
} from '../components/motion';

interface ServicesPageProps {
  onOpenBooking: (serviceName?: string, type?: 'appointment' | 'consultation') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { services: cmsServices, pages } = useCMS();

  const services = cmsServices && cmsServices.length > 0 ? cmsServices : Object.values(SERVICES_DETAIL_DATA);
  const pageSEO = pages['services']?.seo;

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Appliance', label: 'Appliance Care' },
    { id: 'Two-Wheeler', label: 'Two-Wheeler' },
    { id: 'Home Services', label: 'Home Repair' },
    { id: 'Interiors', label: 'Interiors & Build' },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'Appliance' && ['Washing Machine Repair', 'AC Service', 'LED / Smart TV Repair', 'Refrigerator Service', 'Water Purifier Service'].includes(service.name)) ||
      (selectedCategory === 'Two-Wheeler' && service.name.includes('Bike')) ||
      (selectedCategory === 'Home Services' && (service.name.includes('Plumbing') || service.name.includes('Painting'))) ||
      (selectedCategory === 'Interiors' && (service.name.includes('Interior') || service.categoryType === 'consultation'));

    const matchesSearch =
      searchQuery === '' ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <SEOHead
        title={pageSEO?.title || "Home Services & Interior Services in Bangalore | RC Call Elite"}
        description={pageSEO?.metaDescription || "Explore comprehensive home services in Bangalore with RC Call Elite. Professional doorstep appliance repair, bike servicing, painting, and turnkey interiors."}
        canonicalUrl={pageSEO?.canonicalUrl || "https://calleliterc.com/services"}
        breadcrumbs={[
          { name: 'Home', url: 'https://calleliterc.com/' },
          { name: 'Services', url: 'https://calleliterc.com/services' }
        ]}
      />

      {/* 1. HERO HEADER */}
      <section className="bg-[#0A192F] text-white pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
        <BackgroundAmbient variant="navy-ambient" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-red-400 font-semibold">Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bangalore's Complete Home Service Directory</span>
            </div>

            <HeadingReveal as="h1" className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Our Services in <span className="text-[#E53935]">Bangalore</span>
            </HeadingReveal>

            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Professional doorstep appliance repair, scheduled two-wheeler servicing, wall painting, and turnkey architectural interiors — delivered by vetted professionals across Bangalore.
            </p>
          </div>

          {/* Quick Search & Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g. AC, Washing Machine, Painting, Interiors)..."
                className="interactive-input w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm pl-11 pr-4 py-3 rounded-2xl border border-slate-700 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS */}
      <section className="sticky top-[69px] z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`interactive-btn px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#0A192F] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ALL SERVICES GRID */}
      <AnimatedSection variant="fade-lift" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <HeadingReveal as="h2" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
                {selectedCategory === 'all' ? 'All Available Services' : `${categories.find(c => c.id === selectedCategory)?.label}`}
              </HeadingReveal>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Showing {filteredServices.length} dedicated home and lifestyle services
              </p>
            </div>
          </div>

          <AnimatedStagger staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <AnimatedItem key={service.slug} variant="stagger-up">
                <div
                  className="interactive-card h-full bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image Banner */}
                  <Link to={`/services/${service.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={service.heroImage}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="card-img-zoom w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#0A192F]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </div>
                    {service.startingPrice && (
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
                        From {service.startingPrice}
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mb-2">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{service.rating}</span>
                        <span className="text-slate-400 font-normal">({service.reviewsCount} reviews)</span>
                      </div>

                      <Link to={`/services/${service.slug}`}>
                        <h3 className="text-xl font-black text-[#0A192F] group-hover:text-[#E53935] transition-colors leading-snug">
                          {service.name}
                        </h3>
                      </Link>

                      <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed font-normal">
                        {service.shortDescription}
                      </p>

                      {/* Common Problems Sample */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Common Fixes Covered:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {service.commonProblems.slice(0, 3).map((problem, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-700"
                            >
                              <CheckCircle className="w-2.5 h-2.5 text-[#E53935]" />
                              <span className="truncate max-w-[150px]">{problem.title}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                      <Link
                        to={`/services/${service.slug}`}
                        className="interactive-btn flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors group/link"
                      >
                        <span>View Details</span>
                        <ArrowRight className="icon-arrow-right w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onOpenBooking(service.name, service.categoryType)}
                        className="interactive-btn flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#E53935] text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto">
              <Wrench className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900">No Services Found</h3>
              <p className="text-slate-500 text-sm mt-1 mb-4">
                We couldn't find any services matching "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="interactive-btn bg-[#0A192F] text-white text-xs font-bold px-4 py-2 rounded-full"
              >
                Reset Search
              </button>
            </div>
          )}

        </div>
      </AnimatedSection>

      {/* 4. WHY BOOK WITH CALL ELITE */}
      <AnimatedSection variant="fade-lift" className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A192F] flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-[#E53935]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0A192F]">Doorstep Convenience</h4>
                <p className="text-xs text-slate-500 mt-0.5">Technicians visit your home across Bangalore at your chosen time slot.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A192F] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#E53935]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0A192F]">Genuine Spare Parts</h4>
                <p className="text-xs text-slate-500 mt-0.5">Original OEM parts with transparent part-level pricing and bills.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A192F] flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-[#E53935]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0A192F]">Trained Professionals</h4>
                <p className="text-xs text-slate-500 mt-0.5">Verified technicians specialized in their respective equipment domains.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A192F] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#E53935]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0A192F]">Upfront Quotation</h4>
                <p className="text-xs text-slate-500 mt-0.5">Clear diagnosis and price quote provided before any repair starts.</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. NEED CUSTOM ENQUIRY CTA */}
      <AnimatedSection variant="cinematic" className="pt-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0A192F] p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
            <BackgroundAmbient variant="navy-ambient" />
            <div className="relative z-10">
              <HeadingReveal as="h3" className="text-2xl sm:text-3xl font-black mb-3 text-white">
                Need Assistance Choosing the Right Service?
              </HeadingReveal>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Speak directly with our Bangalore customer support helpline for custom requirements, emergency repairs, or turnkey project estimates.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  type="button"
                  onClick={() => onOpenBooking()}
                  glowEffect={true}
                  className="bg-[#E53935] hover:bg-[#d32f2f] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-md transition-colors"
                >
                  Book a Service
                </MagneticButton>
                <a href="tel:8722713026">
                  <MagneticButton
                    type="button"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full text-sm font-bold transition-colors"
                  >
                    Call Support: 8722713026
                  </MagneticButton>
                </a>
                <a
                  href="https://wa.me/918722713026?text=Hi%20RC%20Call%20Elite,%20I%20have%20an%20enquiry%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MagneticButton
                    type="button"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-full text-sm font-bold transition-colors"
                  >
                    WhatsApp Chat
                  </MagneticButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
