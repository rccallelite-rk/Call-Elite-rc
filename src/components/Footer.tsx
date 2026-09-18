import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Logo } from './Logo';
import { useCMS } from '../context/CMSContext';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const { websiteSettings, contactSettings, services, navigation } = useCMS();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer id="footer" className="bg-[#071324] text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Grid with Motion Stagger */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80"
        >
          {/* Column 1: Logo & Tagline (4 cols on lg) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block transition-transform hover:scale-105 duration-200">
              <Logo variant="dark" size="md" />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-3 font-normal">
              {websiteSettings.footerText ||
                'RC Call Elite is your trusted partner for doorstep appliance repair, routine maintenance, two-wheeler servicing, and turnkey architectural interiors in Bangalore.'}
            </p>

            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Connect With Us
              </div>
              <div className="flex items-center gap-2.5">
                {websiteSettings.socialLinks?.facebook && (
                  <a
                    href={websiteSettings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-[#E53935] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-sm"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {websiteSettings.socialLinks?.instagram && (
                  <a
                    href={websiteSettings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-[#E53935] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-sm"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {websiteSettings.socialLinks?.youtube && (
                  <a
                    href={websiteSettings.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-[#E53935] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-sm"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {websiteSettings.socialLinks?.twitter && (
                  <a
                    href={websiteSettings.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-[#E53935] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-sm"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links (2 cols on lg) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navigation
                .filter(n => n.visible)
                .map(item => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 hover:translate-x-1 duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>

          {/* Column 3: Dedicated Service Pages (3 cols on lg) */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Dedicated Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.slice(0, 8).map(srv => (
                <li key={srv.id}>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-slate-400 hover:text-white transition-colors truncate block hover:translate-x-1 duration-200"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact (3 cols on lg) */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${contactSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group hover:text-emerald-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/50 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">WhatsApp</div>
                  <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">{contactSettings.whatsappNumber}</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${contactSettings.primaryPhone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2.5 group hover:text-red-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-red-950/60 text-[#E53935] flex items-center justify-center shrink-0 border border-red-800/50 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Phone Support</div>
                  <div className="font-bold text-white group-hover:text-red-400 transition-colors">{contactSettings.primaryPhone}</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contactSettings.supportEmail}`}
                className="flex items-center gap-2.5 group hover:text-blue-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/50 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Email</div>
                  <div className="font-medium text-white truncate group-hover:text-blue-400 transition-colors">{contactSettings.supportEmail}</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-2.5 text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700/50">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Location</div>
                  <div className="font-medium text-white line-clamp-1">{contactSettings.address}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright, Policies, Admin Direct Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {websiteSettings.copyrightText || '© 2026 RC Call Elite. All Rights Reserved.'}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <Link
              to="/admin"
              className="text-slate-400 hover:text-red-400 font-bold transition-colors inline-flex items-center gap-1"
            >
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
