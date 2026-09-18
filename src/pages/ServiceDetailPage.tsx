import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  CheckCircle,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Wrench,
  Sparkles,
  MapPin,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  BadgeCheck,
} from 'lucide-react';
import { getServiceBySlug } from '../data/servicesData';
import { SEOHead } from '../components/SEOHead';
import { ServiceDetail } from '../types';
import { useCMS } from '../context/CMSContext';
import {
  AnimatedSection,
  AnimatedStagger,
  AnimatedItem,
  HeadingReveal,
  MagneticButton,
  BackgroundAmbient
} from '../components/motion';

interface ServiceDetailPageProps {
  onOpenBooking: (serviceName: string, categoryType?: 'appointment' | 'consultation') => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const { services: cmsServices } = useCMS();

  // Find from CMS catalog or fallback to static services
  const cmsMatch = cmsServices.find(s => s.slug === slug);
  const service: ServiceDetail | undefined = cmsMatch || (slug ? getServiceBySlug(slug) : undefined);

  // FAQ Accordion open index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [searchArea, setSearchArea] = useState('');

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-[#E53935] flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A192F] mb-2">Service Not Found</h1>
        <p className="text-sm text-slate-600 max-w-md mb-6">
          We could not find the service you are looking for. Please browse our complete catalog of home services.
        </p>
        <Link
          to="/"
          className="interactive-btn inline-flex items-center gap-2 bg-[#0A192F] hover:bg-[#E53935] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
        >
          <span>Return to Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  const filteredAreas = searchArea.trim()
    ? service.serviceAreas.filter(area => area.toLowerCase().includes(searchArea.toLowerCase()))
    : service.serviceAreas;

  // Resolve related services
  const relatedServices: ServiceDetail[] = (service.relatedServiceSlugs || [])
    .map(sSlug => getServiceBySlug(sSlug))
    .filter((item): item is ServiceDetail => Boolean(item));

  const canonicalUrl = `https://calleliterc.com/services/${service.slug}`;

  return (
    <article className="min-h-screen bg-slate-50/50 pb-16">
      {/* 1. DYNAMIC SEO & SCHEMA INJECTION */}
      <SEOHead
        title={service.seo.title}
        description={service.seo.metaDescription}
        canonicalUrl={canonicalUrl}
        ogImage={service.heroImage}
        service={service}
        breadcrumbs={[
          { name: 'Home', url: 'https://calleliterc.com' },
          { name: 'Services', url: 'https://calleliterc.com/#services' },
          { name: service.name, url: canonicalUrl },
        ]}
      />

      {/* 2. BREADCRUMBS BAR */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-20 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#E53935] font-semibold transition-colors flex items-center gap-1">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link to="/#services" className="hover:text-[#E53935] font-semibold transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#0A192F] font-bold" aria-current="page">
            {service.name}
          </span>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <header className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Details & Call To Actions */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-red-50 text-[#E53935] border border-red-200/70 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {service.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  <MapPin className="w-3 h-3 text-[#E53935]" />
                  Bangalore Doorstep Service
                </span>
              </div>

              {/* H1 Title */}
              <HeadingReveal as="h1" className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0A192F] tracking-tight leading-[1.15]">
                {service.name} in Bangalore
              </HeadingReveal>

              {/* Short Description */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>

              {/* Rating & Reviews + Starting Price Bar */}
              <div className="flex flex-wrap items-center gap-4 py-3 border-y border-slate-100">
                {service.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-emerald-500 text-white text-xs font-black px-2 py-0.5 rounded-md shadow-xs">
                      <span>{service.rating.toFixed(2)}</span>
                      <Star className="w-3 h-3 fill-white" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      ({service.reviewsCount?.toLocaleString()} verified ratings)
                    </span>
                  </div>
                )}

                {service.startingPrice && (
                  <div className="flex items-baseline gap-1.5 ml-auto sm:ml-0">
                    <span className="text-xs text-slate-400 font-medium">Pricing:</span>
                    <span className="text-lg font-black text-[#0A192F]">{service.startingPrice}</span>
                  </div>
                )}
              </div>

              {/* CTAs: Primary BOOK A SERVICE, CALL NOW, WHATSAPP */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <MagneticButton
                  type="button"
                  id="service-book-now-btn"
                  onClick={() => onOpenBooking(service.name, service.categoryType)}
                  glowEffect={true}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#d32f2f] text-white px-7 py-3.5 rounded-xl font-black text-sm shadow-lg shadow-red-600/20 hover:shadow-xl transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK A SERVICE</span>
                </MagneticButton>

                <a
                  href="tel:8722713026"
                  id="service-call-now-btn"
                  className="inline-flex"
                >
                  <MagneticButton
                    type="button"
                    className="inline-flex items-center justify-center gap-2 bg-[#0A192F] hover:bg-[#132c52] text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call 8722713026</span>
                  </MagneticButton>
                </a>

                <a
                  href={`https://wa.me/918722713026?text=Hello%20RC%20Call%20Elite,%20I%20would%20like%20to%20inquire%20about%20booking%20${encodeURIComponent(
                    service.name
                  )}%20in%20Bangalore.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="service-whatsapp-btn"
                  aria-label="Chat on WhatsApp"
                  className="inline-flex"
                >
                  <MagneticButton
                    type="button"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp</span>
                  </MagneticButton>
                </a>
              </div>

              {/* Trust assurances strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Specialists
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Punctual 2-Hour Arrival
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#E53935]" />
                  Pay After Satisfaction
                </span>
              </div>

            </div>

            {/* Right Column: Hero Image with Overlay Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
                <img
                  src={service.heroImage}
                  alt={`${service.name} service in Bangalore`}
                  className="w-full h-72 sm:h-96 object-cover object-center card-img-zoom"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#E53935]">
                        Bangalore Coverage
                      </div>
                      <div className="text-sm font-black text-[#0A192F]">
                        {service.serviceAreas.length}+ Localities Active
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(service.name, service.categoryType)}
                      className="interactive-btn bg-[#0A192F] hover:bg-[#E53935] text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-colors"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* 4. ABOUT THIS SERVICE SECTION */}
        <AnimatedSection variant="fade-lift" aria-labelledby="about-service-heading" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-2">
              Overview & Details
            </div>
            <HeadingReveal as="h2" id="about-service-heading" className="text-2xl sm:text-3xl font-black text-[#0A192F] mb-6">
              {service.aboutTitle}
            </HeadingReveal>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {service.aboutContent.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 5. COMMON PROBLEMS / SERVICES COVERED */}
        <AnimatedSection variant="fade-lift" aria-labelledby="problems-heading" className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-2">
              Common Issues We Solve
            </div>
            <HeadingReveal as="h2" id="problems-heading" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
              {service.commonProblemsTitle}
            </HeadingReveal>
            <p className="text-slate-600 text-sm mt-1">
              Experienced diagnostics and precision repair for issues commonly encountered by Bangalore households.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.commonProblems.map((prob, idx) => (
              <AnimatedItem key={idx} variant="stagger-up">
                <div
                  className="interactive-card bg-white rounded-2xl p-5 border border-slate-200 hover:border-red-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="card-icon-react w-9 h-9 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center font-bold text-xs mb-3">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0A192F] mb-1.5 leading-snug">
                      {prob.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {prob.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-[#E53935]">
                    <span>Doorstep Inspection</span>
                    <ArrowRight className="icon-arrow-right w-3.5 h-3.5" />
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </AnimatedSection>

        {/* 6. WHAT'S INCLUDED */}
        <AnimatedSection variant="cinematic" aria-labelledby="included-heading" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <BackgroundAmbient variant="navy-ambient" />
          <div className="relative z-10 max-w-3xl mb-8">
            <div className="text-xs font-extrabold uppercase tracking-widest text-red-400 mb-2">
              Transparent Service Standards
            </div>
            <HeadingReveal as="h2" id="included-heading" className="text-2xl sm:text-3xl font-black text-white">
              What’s Included in Our Service
            </HeadingReveal>
            <p className="text-slate-300 text-sm mt-1">
              Every visit follows our strict multi-point standard of care, quality checks, and clean completion.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {service.whatsIncluded.map((item, idx) => (
              <AnimatedItem key={idx} variant="stagger-up">
                <div
                  className="interactive-card bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-white/25 transition-all h-full"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-8 font-normal">
                    {item.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </AnimatedSection>

        {/* 7. HOW IT WORKS (4 STEPS) */}
        <AnimatedSection variant="fade-lift" aria-labelledby="how-it-works-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-2">
              Simple Booking Process
            </div>
            <HeadingReveal as="h2" id="how-it-works-heading" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
              How It Works
            </HeadingReveal>
            <p className="text-slate-600 text-sm mt-1">
              Get your home service scheduled in four effortless steps with real-time updates.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.howItWorks.map((step) => (
              <AnimatedItem key={step.step} variant="stagger-up">
                <div
                  className="interactive-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col h-full"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center font-black text-sm mb-4">
                    0{step.step}
                  </div>
                  <h3 className="text-base font-bold text-[#0A192F] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </AnimatedSection>

        {/* 8. PRICING & FACTUAL DISCLAIMER */}
        <AnimatedSection variant="fade-lift" aria-labelledby="pricing-heading" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935]">
                Upfront & Honest Pricing
              </div>
              <HeadingReveal as="h2" id="pricing-heading" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
                Starting from {service.startingPrice || '₹299'}
              </HeadingReveal>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
                <div className="font-bold text-[#0A192F] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Transparent Pricing Policy:
                </div>
                <p>{service.pricingDisclaimer}</p>
              </div>
              <MagneticButton
                type="button"
                onClick={() => onOpenBooking(service.name, service.categoryType)}
                glowEffect={true}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#d32f2f] text-white px-7 py-3.5 rounded-xl font-black text-sm shadow-md transition-colors"
              >
                <span>BOOK THIS SERVICE</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="interactive-card p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="text-emerald-800 font-bold text-sm mb-1">Zero Hidden Surcharges</div>
                <div className="text-xs text-emerald-700">Detailed digital quotation provided before any repair commences.</div>
              </div>
              <div className="interactive-card p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                <div className="text-blue-800 font-bold text-sm mb-1">Adjustable Inspection Fee</div>
                <div className="text-xs text-blue-700">Diagnosis fee is deducted from the final repair bill if work is approved.</div>
              </div>
              <div className="interactive-card p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                <div className="text-amber-800 font-bold text-sm mb-1">Genuine OEM Spares</div>
                <div className="text-xs text-amber-700">Spares billed as per certified manufacturer MRP with individual warranty.</div>
              </div>
              <div className="interactive-card p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                <div className="text-purple-800 font-bold text-sm mb-1">Post-Work Satisfaction</div>
                <div className="text-xs text-purple-700">Pay conveniently via UPI, card, or cash only after testing the completed repair.</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 9. WHY CHOOSE RC CALL ELITE */}
        <AnimatedSection variant="fade-lift" aria-labelledby="why-choose-heading" className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-2">
              The Call Elite Advantage
            </div>
            <HeadingReveal as="h2" id="why-choose-heading" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
              Why Choose RC Call Elite
            </HeadingReveal>
            <p className="text-slate-600 text-sm mt-1">
              A dependable home-service network dedicated to punctual doorstep delivery and lasting repair quality.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.whyChoosePoints.map((pt, idx) => (
              <AnimatedItem key={idx} variant="stagger-up">
                <div
                  className="interactive-card bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="card-icon-react w-10 h-10 rounded-xl bg-[#0A192F]/5 text-[#0A192F] flex items-center justify-center font-bold text-sm mb-4">
                      <Sparkles className="w-5 h-5 text-[#E53935]" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0A192F] mb-2">
                      {pt.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {pt.description}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </AnimatedSection>

        {/* 10. SERVICE AREAS IN BANGALORE */}
        <AnimatedSection variant="fade-lift" aria-labelledby="service-areas-heading" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-2">
                Bangalore Coverage
              </div>
              <HeadingReveal as="h2" id="service-areas-heading" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
                Service Areas in Bangalore
              </HeadingReveal>
              <p className="text-slate-600 text-sm mt-1">
                Our technicians are stationed across key Bangalore hubs for swift doorstep arrival.
              </p>
            </div>

            {/* Quick Filter */}
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search your locality..."
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
                className="interactive-input w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {filteredAreas.map((area) => (
              <span
                key={area}
                className="interactive-card inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-red-50 hover:text-[#E53935] text-slate-700 text-xs font-semibold transition-colors border border-slate-200/60"
              >
                <MapPin className="w-3 h-3 text-[#E53935]" />
                {area}
              </span>
            ))}
          </div>

          <div className="pt-2 text-xs text-slate-500">
            Don't see your locality? We cover all urban and suburban Bangalore postal codes. Call <a href="tel:8722713026" className="text-[#0A192F] font-bold hover:underline">8722713026</a> to confirm instant dispatch.
          </div>
        </AnimatedSection>

        {/* 11. FAQ SECTION */}
        <AnimatedSection variant="fade-lift" aria-labelledby="faq-heading" className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-2">
              Frequently Asked Questions
            </div>
            <HeadingReveal as="h2" id="faq-heading" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
              Frequently Asked Questions About {service.name}
            </HeadingReveal>
            <p className="text-slate-600 text-sm mt-1">
              Clear answers to the questions our Bangalore customers ask most often.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.06} className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <AnimatedItem key={idx} variant="stagger-up">
                  <div
                    className="interactive-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-bold text-[#0A192F]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#E53935]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimatedStagger>
        </AnimatedSection>

        {/* 12. INTERNAL LINKING / RELATED SERVICES */}
        {relatedServices.length > 0 && (
          <AnimatedSection variant="fade-lift" aria-labelledby="related-services-heading" className="space-y-6 pt-4 border-t border-slate-200">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#E53935] mb-1">
                Explore More
              </div>
              <HeadingReveal as="h2" id="related-services-heading" className="text-xl sm:text-2xl font-black text-[#0A192F]">
                Other Popular Services in Bangalore
              </HeadingReveal>
            </div>

            <AnimatedStagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map((rel) => (
                <AnimatedItem key={rel.slug} variant="stagger-up">
                  <Link
                    to={`/services/${rel.slug}`}
                    className="interactive-card bg-white rounded-2xl p-4 border border-slate-200 hover:border-red-400 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between h-full"
                  >
                    <div className="space-y-3">
                      <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={rel.heroImage}
                          alt={rel.name}
                          className="w-full h-full object-cover card-img-zoom"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase text-[#E53935]">
                          {rel.category}
                        </div>
                        <h3 className="text-sm font-bold text-[#0A192F] group-hover:text-[#E53935] transition-colors">
                          {rel.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-normal">
                          {rel.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0A192F]">
                      <span>{rel.startingPrice || 'View Details'}</span>
                      <span className="text-[#E53935] flex items-center gap-1 text-[11px] group-hover:translate-x-1 transition-transform">
                        View Page <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </AnimatedItem>
              ))}
            </AnimatedStagger>
          </AnimatedSection>
        )}

        {/* 13. FINAL BOTTOM CTA BANNER */}
        <AnimatedSection variant="cinematic" className="bg-gradient-to-br from-[#0A192F] via-[#0A192F] to-[#162a4d] rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <BackgroundAmbient variant="navy-ambient" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full">
              <span>Fast Doorstep Response</span>
            </div>

            <HeadingReveal as="h2" className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              NEED {service.name.toUpperCase()} IN BANGALORE?
            </HeadingReveal>

            <p className="text-slate-300 text-sm sm:text-base font-normal">
              Book your service with RC CALL ELITE today. Experienced professionals, transparent pricing, and guaranteed customer satisfaction.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                type="button"
                onClick={() => onOpenBooking(service.name, service.categoryType)}
                glowEffect={true}
                className="bg-[#E53935] hover:bg-[#d32f2f] text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-xl shadow-red-600/30 transition-all"
              >
                BOOK A SERVICE
              </MagneticButton>

              <a href="tel:8722713026" className="inline-flex">
                <MagneticButton
                  type="button"
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-sm border border-white/20 transition-colors"
                >
                  Call 8722713026
                </MagneticButton>
              </a>

              <a
                href={`https://wa.me/918722713026?text=Hello%20RC%20Call%20Elite,%20I%20want%20to%20book%20${encodeURIComponent(
                  service.name
                )}%20now.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <MagneticButton
                  type="button"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors"
                >
                  WhatsApp Us
                </MagneticButton>
              </a>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </article>
  );
};
