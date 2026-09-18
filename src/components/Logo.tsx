import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const PRIMARY_LOGO_URL = 'https://i.ibb.co/Pz3pXwZ2/Whats-App-Image-2026-07-09-at-2-32-40-PM.png';
const FALLBACK_LOGO_URL = '/rc-call-elite-logo.png';

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = true,
  showText = true,
  size = 'md',
}) => {
  const isDark = variant === 'dark';
  const { websiteSettings } = useCMS();
  const configuredLogo = websiteSettings?.logoUrl || PRIMARY_LOGO_URL;

  const [imgSrc, setImgSrc] = useState(configuredLogo);

  // If website settings changes dynamically
  React.useEffect(() => {
    if (websiteSettings?.logoUrl) {
      setImgSrc(websiteSettings.logoUrl);
    }
  }, [websiteSettings?.logoUrl]);

  const sizeClasses = {
    sm: {
      emblem: 'w-10 h-10',
      title: 'text-lg',
      tagline: 'text-[9px]',
      gap: 'gap-2.5',
    },
    md: {
      emblem: 'w-12 h-12 sm:w-14 sm:h-14',
      title: 'text-xl sm:text-2xl',
      tagline: 'text-[10px] sm:text-[11px]',
      gap: 'gap-3',
    },
    lg: {
      emblem: 'w-16 h-16 sm:w-20 sm:h-20',
      title: 'text-2xl sm:text-3xl',
      tagline: 'text-xs',
      gap: 'gap-3.5',
    },
    xl: {
      emblem: 'w-24 h-24 sm:w-28 sm:h-28',
      title: 'text-3xl sm:text-4xl',
      tagline: 'text-sm',
      gap: 'gap-4',
    },
  }[size];

  return (
    <div
      className={`flex items-center ${sizeClasses.gap} select-none group ${className}`}
      id="rc-call-elite-logo"
    >
      {/* Official RC Call Elite Soaring Eagle Crest */}
      <div
        className={`relative ${sizeClasses.emblem} shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center ${
          isDark
            ? 'bg-white/95 p-1 rounded-2xl shadow-md ring-1 ring-white/20'
            : ''
        }`}
      >
        <img
          src={imgSrc}
          alt="RC Call Elite Official Logo"
          className="w-full h-full object-contain filter drop-shadow-xs"
          referrerPolicy="no-referrer"
          loading="eager"
          onError={() => {
            if (imgSrc !== FALLBACK_LOGO_URL) {
              setImgSrc(FALLBACK_LOGO_URL);
            }
          }}
        />
      </div>

      {/* Brand Typography Lockup */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div
            className={`font-black tracking-tight font-serif ${sizeClasses.title} ${
              isDark ? 'text-white' : 'text-[#0A192F]'
            }`}
          >
            RC CALL <span className="text-[#BA1B22]">ELITE</span>
          </div>
          {showTagline && (
            <div
              className={`font-bold tracking-wider uppercase mt-1 ${sizeClasses.tagline} ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              YOUR HOME. <span className="text-[#BA1B22]">OUR EXPERTISE.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Logo;
