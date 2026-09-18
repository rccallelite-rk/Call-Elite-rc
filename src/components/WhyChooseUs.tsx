import React from 'react';
import { UserCheck, CalendarCheck, Home, Layers } from 'lucide-react';
import { AnimatedSection, AnimatedStagger, AnimatedItem, HeadingReveal } from './motion';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 'trusted-pros',
      title: 'Trusted Professionals',
      description: 'Skilled and verified experts with rigorous vetting and police clearance.',
      icon: UserCheck,
      iconBg: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      id: 'easy-sched',
      title: 'Easy Scheduling',
      description: 'Choose a convenient date and time with instant confirmation.',
      icon: CalendarCheck,
      iconBg: 'bg-red-50 text-[#E53935] border-red-100',
    },
    {
      id: 'home-visits',
      title: 'Convenient Home Visits',
      description: 'We come directly to your doorstep equipped with genuine spares.',
      icon: Home,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      id: 'multiple-services',
      title: 'Multiple Services',
      description: 'All your home repairs, appliances, bike care & interiors in one place.',
      icon: Layers,
      iconBg: 'bg-purple-50 text-purple-700 border-purple-100',
    },
  ];

  return (
    <AnimatedSection id="why-choose-us" variant="fade-lift" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with HeadingReveal */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            The Elite Standard
          </div>
          <HeadingReveal as="h2" className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            Why Choose Call Elite?
          </HeadingReveal>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Built from the ground up to deliver hassle-free home care and dependable craftsmanship.
          </p>
        </div>

        {/* 4 Feature Cards with Stagger */}
        <AnimatedStagger staggerDelay={0.08} variant="stagger-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <AnimatedItem key={feature.id} variant="stagger-up">
                <div
                  id={`why-choose-${feature.id}`}
                  className="interactive-card h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className={`card-icon-react w-13 h-13 rounded-2xl ${feature.iconBg} border flex items-center justify-center mb-5 shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="card-content-shift">
                      <h3 className="text-lg font-black text-[#0A192F] group-hover:text-[#E53935] transition-colors mb-2 leading-tight">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#E53935]">
                    <span>RC Elite Certified</span>
                    <span>✓</span>
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
