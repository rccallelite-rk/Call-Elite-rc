import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Star, Wrench, Sparkles, Bike } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SearchBar } from './SearchBar';
import { useCMS } from '../context/CMSContext';
import { AnimatedCounter, BackgroundAmbient, MagneticButton } from './motion';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
  onSelectService: (serviceName: string, categoryId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreServices,
  onSelectService,
}) => {
  const { homepageContent } = useCMS();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-white to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Cinematic Ambient Background Motion */}
      <BackgroundAmbient variant="subtle-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Content & Search */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Small Eyebrow with Scale/Fade entrance */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-bold uppercase tracking-widest text-[#0A192F] mb-4 w-fit shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse"></span>
              <span>ALL HOME SERVICES UNDER ONE ROOF</span>
            </motion.div>

            {/* Main Headline: Masked Line-by-Line Reveal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight mb-4">
              <div className="overflow-hidden">
                <motion.span
                  initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#0A192F] block"
                >
                  {homepageContent.heroHeading || 'YOUR HOME.'}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#E53935] block"
                >
                  {homepageContent.heroHighlight || 'OUR EXPERTISE.'}
                </motion.span>
              </div>
            </h1>

            {/* Supporting Text with controlled timing */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-slate-600 max-w-xl mb-7 font-normal leading-relaxed"
            >
              {homepageContent.heroDescription ||
                'Home services, appliance care, bike services, interiors & more — all in one place.'}
            </motion.p>

            {/* Action Buttons: Staggered entrance + Magnetic micro-interactions */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 mb-8"
            >
              <MagneticButton
                id="hero-primary-book-btn"
                onClick={onOpenBooking}
                type="button"
                glowEffect={true}
                className="bg-[#E53935] hover:bg-[#d32f2f] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{homepageContent.primaryBtnText || 'Book a Service'}</span>
              </MagneticButton>

              <MagneticButton
                id="hero-secondary-explore-btn"
                onClick={onExploreServices}
                type="button"
                className="bg-white hover:bg-slate-50 text-[#0A192F] border border-slate-300 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base shadow-2xs hover:border-slate-400 transition-all"
              >
                <span>{homepageContent.secondaryBtnText || 'Explore Services'}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </motion.div>

            {/* Prominent Search Bar with entrance */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2"
            >
              <SearchBar onSelectService={onSelectService} />
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Cinematic Lifestyle Visual with Layered Depth */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Card Container */}
              <div className="interactive-card group relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-200/80 p-2 sm:p-3 transition-all duration-500">
                
                {/* Hero Lifestyle Photo with Zoom-Out Reveal */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-slate-900">
                  <motion.img
                    initial={shouldReduceMotion ? false : { scale: 1.14 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    src={
                      homepageContent.heroImage ||
                      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000'
                    }
                    alt="Happy family in a clean, well-serviced home by RC Call Elite"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent pointer-events-none" />

                  {/* Core Value Tag in Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E53935] text-[11px] font-bold uppercase tracking-wider mb-1.5 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>RC Call Elite Guarantee</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold leading-tight drop-shadow-sm">
                      “Everything for your home, all in one place.”
                    </p>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Doorstep repair, scheduled maintenance & turnkey spaces
                    </p>
                  </div>
                </div>

                {/* Micro-Pills of Ecosystem Services with Tactile States */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-1">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:-translate-y-1 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group/pill">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700 shrink-0 group-hover/pill:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-bold text-slate-800">Appliances</div>
                      <div className="text-[10px] text-slate-500">AC, TV, Fridge</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:-translate-y-1 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group/pill">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 group-hover/pill:scale-110 transition-transform">
                      <Bike className="w-4 h-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-bold text-slate-800">Bike Care</div>
                      <div className="text-[10px] text-slate-500">Doorstep repair</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:-translate-y-1 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group/pill">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 shrink-0 group-hover/pill:scale-110 transition-transform">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-bold text-slate-800">Interiors</div>
                      <div className="text-[10px] text-slate-500">Build & Paint</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Trust Badge: 4.9 Rating with Gentle Levitation */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: -15, scale: 0.9 }}
                animate={shouldReduceMotion ? { opacity: 1 } : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                }}
                transition={shouldReduceMotion ? { duration: 0.3 } : {
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.5, delay: 0.4 },
                  scale: { duration: 0.5, delay: 0.4 },
                }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 hover:-translate-y-1 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-sm">
                  <Star className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-sm text-slate-900">
                      <AnimatedCounter to={4.9} decimals={1} duration={1.2} /> / 5.0
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    <AnimatedCounter to={10000} suffix="+" duration={1.8} /> Happy Homes
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge: Fast Turnaround with Complementary Levitation */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15, scale: 0.9 }}
                animate={shouldReduceMotion ? { opacity: 1 } : {
                  opacity: 1,
                  scale: 1,
                  y: [0, 6, 0],
                }}
                transition={shouldReduceMotion ? { duration: 0.3 } : {
                  y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                  opacity: { duration: 0.5, delay: 0.55 },
                  scale: { duration: 0.5, delay: 0.55 },
                }}
                className="hidden sm:flex absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 items-center gap-2.5 hover:-translate-y-1 transition-transform"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 text-[#E53935] flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#0A192F] block">On-Demand Dispatch</span>
                  <span className="text-slate-500 text-[10px]">Trained & Background-Checked</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
