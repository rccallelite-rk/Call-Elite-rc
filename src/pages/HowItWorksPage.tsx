import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  CalendarCheck,
  CheckCircle2,
  Wrench,
  BadgeCheck,
  Calendar,
  PhoneCall,
  Sparkles,
  ArrowRight,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import {
  AnimatedSection,
  AnimatedStagger,
  AnimatedItem,
  HeadingReveal,
  MagneticButton,
  BackgroundAmbient
} from '../components/motion';

interface HowItWorksPageProps {
  onOpenBooking: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Service',
      description: 'Explore our catalog of home services — from washing machine, AC, TV, and refrigerator repairs to bike servicing, painting, and turnkey interiors.',
      icon: Search,
      badge: 'Step 1',
      highlight: 'Transparent service catalogs & starting prices',
    },
    {
      step: '02',
      title: 'Book Your Service',
      description: 'Fill in your name, contact phone number, address in Bangalore, and select your preferred 2-hour arrival slot and date. For interiors, schedule an on-site design consultation.',
      icon: CalendarCheck,
      badge: 'Step 2',
      highlight: 'Simple online or WhatsApp booking in under 60 seconds',
    },
    {
      step: '03',
      title: 'Get Instant Confirmation',
      description: 'Our team verifies slot availability and dispatches technician assignment details directly to your phone. We confirm the timing before the expert travels to your home.',
      icon: CheckCircle2,
      badge: 'Step 3',
      highlight: 'Direct WhatsApp & SMS booking reference',
    },
    {
      step: '04',
      title: 'Team / Technician Visit',
      description: 'A verified service technician arrives at your doorstep equipped with diagnostic instruments and OEM tools. They conduct a thorough initial diagnosis and quote transparently before beginning.',
      icon: Wrench,
      badge: 'Step 4',
      highlight: 'Upfront diagnosis & written estimate before work begins',
    },
    {
      step: '05',
      title: 'Service Completed & Verified',
      description: 'The technician completes the repair, tests the equipment thoroughly in front of you, cleans up the work area, and provides a digital invoice and post-service warranty.',
      icon: BadgeCheck,
      badge: 'Step 5',
      highlight: 'Live demonstration, warranty coverage & digital invoice',
    },
  ];

  const faqs = [
    {
      q: 'How quickly can a technician visit my house in Bangalore?',
      a: 'We offer flexible 2-hour scheduling slots starting from same-day emergency dispatch (subject to slot availability in your area) to pre-scheduled appointments up to 7 days in advance.',
    },
    {
      q: 'Do I have to pay upfront when booking?',
      a: 'No. You do not pay anything upfront. You only pay after our technician arrives, conducts the diagnosis, and presents the quote, or after the job is satisfactorily completed.',
    },
    {
      q: 'What if spare parts are required for appliance repair?',
      a: 'Our technician carries common OEM spare parts. If a specific part needs replacement, the technician explains the reason, shows you the part price, and proceeds only after your approval.',
    },
    {
      q: 'How does booking work for Interior Design and Construction?',
      a: 'For interior and structural projects, booking initiates a dedicated Site Survey. Our design engineer visits your property, takes exact measurements, reviews your requirements, and prepares a detailed 3D proposal and estimate.',
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'You can pay the technician directly via UPI (Google Pay, PhonePe, Paytm), cash, or net banking upon job completion.',
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEOHead
        title="How It Works | Booking Home Services with RC Call Elite Bangalore"
        description="Learn how easy it is to book home services with RC Call Elite in Bangalore. Transparent 5-step process from service selection to completed repair."
        canonicalUrl="https://calleliterc.com/how-it-works"
        breadcrumbs={[
          { name: 'Home', url: 'https://calleliterc.com/' },
          { name: 'How It Works', url: 'https://calleliterc.com/how-it-works' }
        ]}
      />

      {/* 1. HERO SECTION */}
      <section className="bg-[#0A192F] text-white pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
        <BackgroundAmbient variant="navy-ambient" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-red-400 font-semibold">How It Works</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple, Reliable & Transparent</span>
            </div>

            <HeadingReveal as="h1" className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              How RC Call Elite <span className="text-[#E53935]">Works</span>
            </HeadingReveal>

            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              We took the uncertainty and delays out of home repairs. Here is our straightforward 5-step process from selecting your service to guaranteed completion.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 5-STEP JOURNEY */}
      <AnimatedSection variant="fade-lift" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <HeadingReveal as="h2" className="text-3xl font-black text-[#0A192F] tracking-tight">
              Our 5-Step Service Process
            </HeadingReveal>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Designed for busy homeowners in Bangalore who value punctuality, quality workmanship, and upfront pricing.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.12} variant="stagger-sequence" className="space-y-8 relative">
            {/* Connecting Vertical Line for desktop */}
            <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-300 via-red-300 to-emerald-300" />

            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <AnimatedItem key={item.step} variant="stagger-sequence">
                  <div
                    className="interactive-card relative flex flex-col md:flex-row items-start gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all group"
                  >
                    {/* Step Number & Icon Circle */}
                    <div className="w-16 h-16 rounded-2xl bg-[#0A192F] group-hover:bg-[#E53935] group-hover:scale-105 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md transition-all duration-300 relative z-10">
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 card-content-shift">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-black uppercase tracking-wider text-[#E53935]">
                          {item.badge}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-slate-500">Step {item.step} of 05</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-[#0A192F] group-hover:text-[#E53935] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimatedStagger>

          {/* Primary CTA */}
          <div className="mt-12 text-center">
            <MagneticButton
              type="button"
              onClick={onOpenBooking}
              glowEffect={true}
              className="inline-flex items-center justify-center gap-2.5 bg-[#E53935] hover:bg-[#d32f2f] text-white px-8 py-4 rounded-full font-black text-base shadow-xl shadow-red-500/20 transition-all duration-200"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Service Now</span>
              <ArrowRight className="icon-arrow-right w-5 h-5" />
            </MagneticButton>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. DUAL-SERVICE MODEL EXPLAINED */}
      <AnimatedSection variant="fade-lift" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <HeadingReveal as="h2" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
              Two Service Flows Built for Different Needs
            </HeadingReveal>
            <p className="text-slate-600 text-sm mt-1">
              Whether you need a quick repair or a complete home makeover, we have calibrated processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Model A */}
            <div className="interactive-card p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0A192F] bg-white px-3 py-1 rounded-full border border-slate-200">
                  Doorstep Repair & Maintenance
                </span>
                <h3 className="text-xl font-black text-[#0A192F] mt-3 mb-2">
                  Appliance, Bike & Plumbing Visits
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Ideal for washing machines, ACs, refrigerators, TVs, water purifiers, and bike maintenance. Rapid 2-hour time slot booking with on-spot resolution.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                    <span>Choose your exact time slot (Morning, Noon, Evening)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                    <span>On-site diagnosis with genuine parts replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                    <span>Standard service inspection from ₹199</span>
                  </li>
                </ul>
              </div>
              <MagneticButton
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-[#0A192F] hover:bg-[#E53935] text-white font-bold text-xs transition-colors"
              >
                Book Doorstep Repair
              </MagneticButton>
            </div>

            {/* Model B */}
            <div className="interactive-card p-8 rounded-3xl bg-red-50/40 border border-red-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#E53935] bg-white px-3 py-1 rounded-full border border-red-200">
                  Architectural & Turnkey
                </span>
                <h3 className="text-xl font-black text-[#0A192F] mt-3 mb-2">
                  Interiors, Painting & Construction
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Designed for modular kitchens, living spaces, full-house interior design, structural builds, and home painting projects.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                    <span>Free on-site consultation and laser measurement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                    <span>Transparent 3D material estimates and timeline plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                    <span>Dedicated site supervisor and structured milestones</span>
                  </li>
                </ul>
              </div>
              <Link to="/services/interior-design" className="block">
                <MagneticButton
                  type="button"
                  glowEffect={true}
                  className="w-full py-3 rounded-xl bg-[#E53935] hover:bg-[#d32f2f] text-white font-bold text-xs text-center transition-colors block"
                >
                  Explore Interior Services
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. PROCESS FAQS */}
      <AnimatedSection variant="fade-lift" className="py-16 md:py-20 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeadingReveal as="h2" className="text-2xl sm:text-3xl font-black text-[#0A192F]">
              Frequently Asked Questions About Booking
            </HeadingReveal>
            <p className="text-slate-600 text-sm mt-1">
              Common questions on booking terms, scheduling, and warranty.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.07} className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedItem key={index} variant="stagger-up">
                <div
                  className="interactive-card bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs"
                >
                  <h3 className="text-base font-bold text-[#0A192F] flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 pl-7 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>

          {/* Contact Helpline */}
          <div className="interactive-card mt-12 text-center p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-bold text-[#0A192F] text-sm sm:text-base">
                Have questions or need an emergency repair?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Our Bangalore dispatch team is available from 8:00 AM to 9:00 PM daily.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:8722713026"
                className="interactive-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A192F] text-white text-xs font-bold hover:bg-[#E53935] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 8722713026</span>
              </a>
              <a
                href="https://wa.me/918722713026?text=Hi%20RC%20Call%20Elite,%20I%20have%20questions%20about%20booking%20a%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
