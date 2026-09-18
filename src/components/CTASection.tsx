import React from 'react';
import { Calendar, PhoneCall, ArrowRight } from 'lucide-react';
import { AnimatedSection, HeadingReveal, MagneticButton, BackgroundAmbient } from './motion';

interface CTASectionProps {
  onBookService: () => void;
  onContactUs: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onBookService, onContactUs }) => {
  const whatsappNumber = '8722713026';
  const whatsappUrl = `https://wa.me/918722713026?text=Hi%20RC%20Call%20Elite,%20I%20would%20like%20to%20book%20a%20home%20service.`;

  return (
    <AnimatedSection id="cta-section" variant="cinematic" className="py-20 sm:py-28 bg-[#0A192F] text-white relative overflow-hidden">
      {/* Premium Navy Atmospheric Background Motion */}
      <BackgroundAmbient variant="navy-ambient" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-red-400 border border-white/15 text-xs font-black tracking-widest uppercase mb-5 shadow-sm">
          NEED A SERVICE?
        </div>

        {/* Large Cinematic Headline with Mask Reveal */}
        <HeadingReveal as="h2" className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          BOOK YOUR SERVICE <span className="text-[#E53935]">TODAY</span>
        </HeadingReveal>

        {/* Supporting Text */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          From everyday home problems to appliances, bikes, painting and interiors — Call Elite makes it simple.
        </p>

        {/* Action Buttons with Magnetic Micro-Interactions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* Primary Magnetic CTA */}
          <MagneticButton
            id="cta-book-service-btn"
            type="button"
            onClick={onBookService}
            glowEffect={true}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E53935] hover:bg-[#d32f2f] text-white px-9 py-4 rounded-full font-extrabold text-sm sm:text-base shadow-2xl shadow-red-600/30 transition-all duration-200"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span>Book a Service</span>
            <ArrowRight className="icon-arrow-right w-4 h-4 ml-1" />
          </MagneticButton>

          {/* Secondary Button */}
          <MagneticButton
            id="cta-contact-us-btn"
            type="button"
            onClick={onContactUs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-200"
          >
            <PhoneCall className="w-4 h-4 text-slate-300" />
            <span>Contact Us</span>
          </MagneticButton>
        </div>

        {/* WhatsApp Direct Helpline Box */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 p-3.5 sm:p-2 sm:pr-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-btn inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
          >
            {/* WhatsApp Icon */}
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Chat with us on WhatsApp</span>
          </a>

          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
            <span>Direct helpline:</span>
            <a href="tel:8722713026" className="text-white hover:text-red-400 font-bold tracking-wider underline underline-offset-2 transition-colors">
              {whatsappNumber}
            </a>
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
};
