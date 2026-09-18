import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X, PhoneCall, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from './Logo';
import { useCMS } from '../context/CMSContext';
import { ScrollProgressBar, MagneticButton } from './motion';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const { navigation, contactSettings, websiteSettings } = useCMS();

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = navigation.length > 0 ? navigation : [
    { id: '1', label: 'Home', path: '/', order: 1 },
    { id: '2', label: 'Services', path: '/services', order: 2 },
    { id: '3', label: 'How It Works', path: '/how-it-works', order: 3 },
    { id: '4', label: 'About Us', path: '/about', order: 4 },
    { id: '5', label: 'Contact', path: '/contact', order: 5 },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Sleek, Minimal Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 1. ANNOUNCEMENT BAR (Controlled via CMS) */}
      {(websiteSettings.announcementBarEnabled || (websiteSettings as any).showAnnouncementBar) && websiteSettings.announcementText && !announcementDismissed && (
        <div
          id="announcement-bar"
          className="bg-[#0A192F] text-white text-xs py-2 px-4 flex items-center justify-between border-b border-white/10 relative z-50"
        >
          <div className="flex-1 flex items-center justify-center gap-2 text-center">
            <Sparkles className="w-3.5 h-3.5 text-[#E53935] animate-pulse" />
            <span className="font-medium text-slate-200">{websiteSettings.announcementText}</span>
            {websiteSettings.announcementLink && (
              <Link
                to={websiteSettings.announcementLink}
                className="underline text-red-300 hover:text-white inline-flex items-center gap-0.5 ml-1"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="text-slate-400 hover:text-white p-1"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header
        id="main-header"
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Official Logo */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-1 -m-1"
              aria-label="RC Call Elite Home"
            >
              <Logo variant="light" size="md" />
            </Link>

            {/* CENTER: Desktop Navigation with Micro-Interactions */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map(link => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.id}
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    to={link.path}
                    className={`nav-animated-link relative px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      active
                        ? 'is-active text-[#E53935] font-bold bg-red-50/70 shadow-2xs'
                        : 'text-slate-700 hover:text-[#0A192F] hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Quick Call Phone */}
              <a
                href={`tel:${contactSettings.primaryPhone.replace(/[^0-9]/g, '')}`}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0A192F] transition-all hover:-translate-y-0.5"
                title="Call RC Call Elite Support"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E53935] transition-transform hover:rotate-12" />
                <span>{contactSettings.primaryPhone}</span>
              </a>

              {/* "Book a Service" Magnetic CTA */}
              <MagneticButton
                id="header-book-service-btn"
                onClick={onOpenBooking}
                type="button"
                className="bg-[#0A192F] hover:bg-[#14284b] text-white px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all group"
              >
                <Calendar className="w-4 h-4 text-[#E53935] transition-transform group-hover:scale-110" />
                <span>Book a Service</span>
              </MagneticButton>

              {/* Mobile Hamburger Toggle */}
              <button
                id="mobile-menu-toggle"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer with Staggered Items */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl"
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.03, staggerDirection: -1 },
                  },
                }}
                className="flex flex-col space-y-1"
              >
                {navLinks.map(link => {
                  const active = isLinkActive(link.path);
                  return (
                    <motion.div
                      key={link.id}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          active
                            ? 'bg-red-50 text-[#E53935] font-bold translate-x-1'
                            : 'text-slate-800 hover:bg-slate-50 hover:translate-x-1'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="interactive-btn w-full flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#d32f2f] text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Service Now</span>
                </button>

                <a
                  href={`https://wa.me/${contactSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20RC%20Call%20Elite,%20I%20would%20like%20to%20inquire%20about%20a%20home%20service`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-btn w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-2.5 px-4 rounded-xl text-xs font-semibold"
                >
                  <span>WhatsApp: {contactSettings.whatsappNumber}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
