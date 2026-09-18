import React from 'react';
import { MousePointerClick, CalendarDays, CheckCheck, Truck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { AnimatedSection, AnimatedStagger, AnimatedItem, HeadingReveal } from './motion';

export const HowItWorks: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      number: '1',
      title: 'Choose Service',
      description: 'Select the service you need.',
      icon: MousePointerClick,
      color: 'bg-blue-50 text-[#0A192F] border-blue-200',
    },
    {
      number: '2',
      title: 'Pick Date & Time',
      description: 'Choose a convenient appointment slot.',
      icon: CalendarDays,
      color: 'bg-red-50 text-[#E53935] border-red-200',
    },
    {
      number: '3',
      title: 'Confirm Booking',
      description: 'Enter your details and confirm.',
      icon: CheckCheck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      number: '4',
      title: 'Get Service',
      description: 'Our professional reaches you at the scheduled time.',
      icon: Truck,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <AnimatedSection id="how-it-works" variant="fade-lift" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with HeadingReveal */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            Seamless Experience
          </div>
          <HeadingReveal as="h2" className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            How It Works
          </HeadingReveal>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Book your service in just a few simple steps.
          </p>
        </div>

        {/* 4 Steps Grid with Progressive Sequence and Animated Connector Line */}
        <div className="relative">
          {/* Animated Connecting Line on Desktop */}
          {!shouldReduceMotion && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-400 via-[#E53935] to-amber-400 origin-left -z-0"
              aria-hidden="true"
            />
          )}

          <AnimatedStagger
            staggerDelay={0.14}
            initialDelay={0.1}
            variant="stagger-sequence"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <AnimatedItem key={step.number} variant="stagger-sequence">
                  <div
                    id={`how-it-works-step-${step.number}`}
                    className="interactive-card h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    {/* Number Circle Badge with Reactive Glow */}
                    <div className="w-12 h-12 rounded-2xl bg-[#0A192F] text-white flex items-center justify-center font-black text-lg mb-5 shadow-md group-hover:bg-[#E53935] group-hover:scale-110 group-hover:shadow-red-500/25 transition-all duration-300">
                      {step.number}
                    </div>

                    {/* Modern Line Icon */}
                    <div className={`card-icon-react w-14 h-14 rounded-2xl ${step.color} border flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-black text-[#0A192F] mb-1.5 group-hover:text-[#E53935] transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Step Counter Indicator */}
                    <div className="mt-auto pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-red-500 transition-colors">
                      Step 0{step.number}
                    </div>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimatedStagger>
        </div>

      </div>
    </AnimatedSection>
  );
};
