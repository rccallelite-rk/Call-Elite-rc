import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle,
  Home,
  Wrench,
  Bike,
  Paintbrush,
  Tv,
  Wind,
  Droplets,
  Building2,
  Calendar,
  PhoneCall,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  Users,
  Award
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import {
  AnimatedSection,
  AnimatedStagger,
  AnimatedItem,
  HeadingReveal,
  MagneticButton,
  AnimatedCounter,
  ImageReveal,
  BackgroundAmbient
} from '../components/motion';

interface AboutUsPageProps {
  onOpenBooking: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenBooking }) => {
  const servicePillars = [
    {
      title: 'Home Appliance Services',
      description: 'Diagnosis, maintenance, deep cleaning, and doorstep repairs for major appliances including washing machines, split & window ACs, LED/smart TVs, double-door & frost-free refrigerators, and RO water purifiers.',
      icon: Wind,
      link: '/services/washing-machine-repair',
    },
    {
      title: 'Doorstep Bike Maintenance',
      description: 'Full multi-point servicing, oil replacement, brake pad tuning, carburetor adjustments, and general maintenance for commuter bikes and scooters right at your apartment or residence.',
      icon: Bike,
      link: '/services/bike-service',
    },
    {
      title: 'Home Plumbing & Repairs',
      description: 'Fast resolution of common home plumbing issues, tap leakages, drainage blockages, pipe fittings, and general utility maintenance across residential properties.',
      icon: Wrench,
      link: '/services/home-plumbing',
    },
    {
      title: 'Professional Home Painting',
      description: 'Interior and exterior painting services including surface wall preparation, crack filling, primer coating, and premium emulsion application with clean post-work handover.',
      icon: Paintbrush,
      link: '/services/home-painting',
    },
    {
      title: 'Turnkey Interior Design',
      description: 'End-to-end interior design solutions tailored for Bangalore homes, from modular kitchens and customized wardrobe units to false ceiling designs and complete living space transformations.',
      icon: Home,
      link: '/services/interior-design',
    },
    {
      title: 'Interior Construction',
      description: 'Structural and civil interior modifications, wall partitioning, bathroom refurbishments, flooring renewals, and complete residential construction management under professional engineering supervision.',
      icon: Building2,
      link: '/services/interior-construction',
    },
  ];

  const approaches = [
    {
      title: 'Doorstep Convenience',
      text: 'Instead of hauling appliances or bikes to congested workshops, our service technicians visit your home at your scheduled 2-hour window.',
    },
    {
      title: 'Transparent Diagnosis & Pricing',
      text: 'We inspect the issue first, clearly explain what is needed, and present the estimate before carrying out any repair work.',
    },
    {
      title: 'Genuine OEM Replacement Spares',
      text: 'Whenever parts replacement is required, we use genuine manufacturer-compatible spare parts to ensure longevity and safety.',
    },
    {
      title: 'Trained & Verified Professionals',
      text: 'Our technical teams are vetted, experienced in their trade, and adhere to safety and cleanliness protocols inside your home.',
    },
  ];

  const stats = [
    { label: 'Happy Homes Served', value: 10000, suffix: '+', icon: Users },
    { label: 'Verified Technicians', value: 150, suffix: '+', icon: ShieldCheck },
    { label: 'Customer Satisfaction', value: 4.9, suffix: ' / 5', decimals: 1, icon: Star },
    { label: 'On-Time Arrival Rate', value: 98, suffix: '%', icon: Clock },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEOHead
        title="About RC Call Elite | Home & Interior Services in Bangalore"
        description="Learn about RC Call Elite, Bangalore's trusted multi-service platform for doorstep appliance care, two-wheeler maintenance, painting, and turnkey interior design."
        canonicalUrl="https://calleliterc.com/about-us"
        breadcrumbs={[
          { name: 'Home', url: 'https://calleliterc.com/' },
          { name: 'About Us', url: 'https://calleliterc.com/about-us' }
        ]}
      />

      {/* 1. HERO SECTION */}
      <section className="bg-[#0A192F] text-white pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
        <BackgroundAmbient variant="navy-ambient" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-red-400 font-semibold">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Home. Our Expertise.</span>
            </div>

            <HeadingReveal as="h1" className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              About <span className="text-[#E53935]">RC Call Elite</span>
            </HeadingReveal>

            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              We are a Bangalore-based multi-service home solutions company bringing appliance repairs, vehicle maintenance, painting, and turnkey living spaces together under one reliable roof.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR WITH SMOOTH COUNTERS */}
      <section className="bg-slate-50 border-b border-slate-200 py-10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight">
                    <AnimatedCounter to={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} duration={1.6} />
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. COMPANY STORY & MISSION */}
      <AnimatedSection variant="fade-lift" className="py-16 md:py-20 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-black uppercase tracking-wider text-[#E53935]">
                Who We Are
              </div>
              <HeadingReveal as="h2" className="text-2xl sm:text-4xl font-black text-[#0A192F] tracking-tight leading-tight">
                Simplifying Home Maintenance for Bangalore Residents
              </HeadingReveal>
              <p className="text-slate-600 text-base leading-relaxed">
                RC Call Elite was built around a straightforward goal: providing urban households in Bangalore with a single dependable partner for everyday repair problems, scheduled preventative maintenance, and larger home improvement projects.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Rather than dealing with multiple unverified technicians, unclear pricing, and uncertain arrival times, our customers enjoy a centralized platform where you can book doorstep service appointments in seconds and receive transparent, professional support.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="interactive-card p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <MapPin className="w-5 h-5 text-[#E53935] mb-2" />
                  <div className="font-bold text-sm text-[#0A192F]">Bangalore Focused</div>
                  <div className="text-xs text-slate-500 mt-0.5">Serving major residential hubs across Bengaluru.</div>
                </div>

                <div className="interactive-card p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <Clock className="w-5 h-5 text-[#E53935] mb-2" />
                  <div className="font-bold text-sm text-[#0A192F]">Dedicated Support</div>
                  <div className="text-xs text-slate-500 mt-0.5">Available 7 days a week, 8:00 AM to 9:00 PM.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
                  alt="RC Call Elite Technician at work in Bangalore"
                  variant="zoom-out"
                  className="w-full h-80"
                />
                <div className="p-6 bg-slate-900 text-white">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider">Our Brand Promise</div>
                  <div className="text-lg font-black mt-1">“Your Home. Our Expertise.”</div>
                  <div className="text-xs text-slate-300 mt-1">
                    Every service request is backed by thorough diagnosis, honest communication, and prompt doorstep delivery.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </AnimatedSection>

      {/* 4. WHAT RC CALL ELITE DOES (6 PILLARS) */}
      <AnimatedSection variant="fade-lift" className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-black uppercase tracking-wider text-[#E53935] mb-2">
              Comprehensive Capabilities
            </div>
            <HeadingReveal as="h2" className="text-3xl font-black text-[#0A192F]">
              What We Do
            </HeadingReveal>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From small appliance fixes to full turnkey architectural interiors, our dedicated teams cover all residential needs.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <AnimatedItem key={i} variant="stagger-up">
                  <div
                    className="interactive-card h-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="card-icon-react w-12 h-12 rounded-2xl bg-slate-100 text-[#0A192F] flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-[#E53935]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0A192F] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                    </div>

                    <Link
                      to={pillar.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A192F] hover:text-[#E53935] transition-colors pt-4 border-t border-slate-100 group/link"
                    >
                      <span>View Dedicated Service Page</span>
                      <ArrowRight className="icon-arrow-right w-3.5 h-3.5" />
                    </Link>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* 5. OUR SERVICE APPROACH */}
      <AnimatedSection variant="fade-lift" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <HeadingReveal as="h2" className="text-3xl font-black text-[#0A192F]">
              Our Service Approach
            </HeadingReveal>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              How we maintain quality standards, transparent customer interactions, and reliable service.
            </p>
          </div>

          <AnimatedStagger staggerDelay={0.09} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {approaches.map((app, i) => (
              <AnimatedItem key={i} variant="stagger-up">
                <div
                  className="interactive-card h-full p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#E53935] flex items-center justify-center shrink-0 font-bold text-sm shadow-2xs">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0A192F] mb-1">
                      {app.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {app.text}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      {/* 6. CTA SECTION */}
      <AnimatedSection variant="cinematic" className="pt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0A192F] p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
            <BackgroundAmbient variant="navy-ambient" />
            <div className="relative z-10">
              <HeadingReveal as="h3" className="text-2xl sm:text-4xl font-black mb-3 text-white">
                Ready to Experience Hassle-Free Home Service?
              </HeadingReveal>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Book a doorstep technician appointment or schedule an on-site interior consultation today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  type="button"
                  onClick={onOpenBooking}
                  glowEffect={true}
                  className="bg-[#E53935] hover:bg-[#d32f2f] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-red-500/30 transition-all"
                >
                  Book a Service
                </MagneticButton>
                <Link to="/contact">
                  <MagneticButton
                    type="button"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full text-sm font-bold transition-colors"
                  >
                    Contact Us
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
