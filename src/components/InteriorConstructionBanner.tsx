import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home, Building2, CheckCircle } from 'lucide-react';
import { INTERIOR_SHOWCASE_ITEMS } from '../data/servicesData';
import { AnimatedSection, AnimatedStagger, AnimatedItem, HeadingReveal, MagneticButton, BackgroundAmbient } from './motion';

interface InteriorConstructionBannerProps {
  onExploreInteriors?: () => void;
  onExploreConstruction?: () => void;
}

export const InteriorConstructionBanner: React.FC<InteriorConstructionBannerProps> = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'interiors' | 'construction'>('all');

  const filteredItems = INTERIOR_SHOWCASE_ITEMS.filter((item) => {
    if (activeFilter === 'interiors') {
      return ['modular-kitchen', 'living-room', 'bedroom', 'false-ceiling'].includes(item.id);
    }
    if (activeFilter === 'construction') {
      return ['modern-house', 'construction'].includes(item.id);
    }
    return true;
  });

  return (
    <AnimatedSection id="interiors-construction" variant="cinematic" className="py-16 sm:py-24 bg-gradient-to-b from-[#0A192F] via-[#0E1E38] to-[#0A192F] text-white relative overflow-hidden">
      {/* Premium Grid Ambient Glow */}
      <BackgroundAmbient variant="grid-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-red-400 border border-white/10 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Turnkey Living Spaces</span>
            </div>

            <HeadingReveal as="h2" className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Build. Design. Transform.
            </HeadingReveal>

            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              From modular interiors to complete structural construction solutions, explore dedicated pages with full specifications.
            </p>
          </div>

          {/* Action Links with Magnetic Micro-Interactions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/services/interior-design" id="btn-explore-interiors">
              <MagneticButton
                type="button"
                className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#d32f2f] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-red-500/30 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Interior Design Page</span>
                <ArrowRight className="icon-arrow-right w-3.5 h-3.5 ml-0.5" />
              </MagneticButton>
            </Link>

            <Link to="/services/interior-construction" id="btn-explore-construction">
              <MagneticButton
                type="button"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-6 py-3.5 rounded-full font-bold text-sm backdrop-blur-sm transition-all duration-200"
              >
                <Building2 className="w-4 h-4" />
                <span>Construction Page</span>
              </MagneticButton>
            </Link>
          </div>
        </div>

        {/* 6 Premium Visual Showcase Cards with Layered Depth */}
        <AnimatedStagger staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const targetSlug = ['modern-house', 'construction'].includes(item.id)
              ? 'interior-construction'
              : 'interior-design';

            return (
              <AnimatedItem key={item.id} variant="stagger-up">
                <Link
                  to={`/services/${targetSlug}`}
                  className="interactive-card group relative rounded-3xl overflow-hidden bg-slate-900/60 border border-white/10 shadow-2xl transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/10 block h-full"
                >
                  {/* Image with zoom on hover */}
                  <div className="aspect-[16/11] overflow-hidden bg-slate-950">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="card-img-zoom w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Gradient Scrim & Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                    <div className="inline-block self-start px-2.5 py-0.5 rounded-md bg-[#E53935] text-[10px] font-extrabold uppercase tracking-wider text-white mb-2 shadow-2xs group-hover:scale-105 transition-transform">
                      {item.tag}
                    </div>

                    <div className="card-content-shift">
                      <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* View Details Link */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                      <span>View Specifications</span>
                      <ArrowRight className="icon-arrow-right w-4 h-4 text-red-400" />
                    </div>
                  </div>
                </Link>
              </AnimatedItem>
            );
          })}
        </AnimatedStagger>

      </div>
    </AnimatedSection>
  );
};
