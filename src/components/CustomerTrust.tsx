import React from 'react';
import { CheckCircle2, Shield, HeartHandshake, UserCheck, Clock, Layers, Sparkles } from 'lucide-react';
import { AnimatedSection, AnimatedStagger, AnimatedItem, HeadingReveal } from './motion';

export const CustomerTrust: React.FC = () => {
  const trustPoints = [
    {
      id: 'experts',
      title: 'Professional Experts',
      desc: 'Rigorous background verification, police-checked & trade-tested professionals.',
      icon: UserCheck,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'visits',
      title: 'Convenient Home Visits',
      desc: 'Uniformed technicians arrive punctually at your doorstep with full toolkits.',
      icon: CheckCircle2,
      color: 'text-red-600 bg-red-50',
    },
    {
      id: 'scheduling',
      title: 'Flexible Scheduling',
      desc: 'Same-day 60-minute emergency slots or custom scheduled calendar visits.',
      icon: Clock,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'multi-service',
      title: 'Multiple Services',
      desc: 'Appliances, two-wheelers, carpentry, painting, and complete civil construction.',
      icon: Layers,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'simple-booking',
      title: 'Simple Booking',
      desc: 'Three-tap booking on web or mobile with zero upfront cancellation fees.',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'support',
      title: 'Customer-Focused Support',
      desc: 'Dedicated resolution managers, post-service warranty, and WhatsApp assistance.',
      icon: HeartHandshake,
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  return (
    <AnimatedSection id="about-us" variant="fade-lift" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5 text-[#E53935]" />
            <span>The RC Call Elite Promise</span>
          </div>
          <HeadingReveal as="h2" className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            Built Around Your Convenience
          </HeadingReveal>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Every service is backed by transparent pricing, verified technicians, and our service guarantee.
          </p>
        </div>

        {/* 6 Trust Grid Items with Stagger */}
        <AnimatedStagger staggerDelay={0.08} variant="stagger-scale" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((item) => {
            const Icon = item.icon;
            return (
              <AnimatedItem key={item.id} variant="stagger-scale">
                <div
                  id={`trust-point-${item.id}`}
                  className="interactive-card h-full p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-300 group flex items-start gap-4"
                >
                  <div className={`card-icon-react w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0 shadow-2xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="card-content-shift">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-emerald-600 font-bold text-sm">✔</span>
                      <h3 className="font-extrabold text-base text-[#0A192F] group-hover:text-[#E53935] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            );
          })}
        </AnimatedStagger>

      </div>
    </AnimatedSection>
  );
};
