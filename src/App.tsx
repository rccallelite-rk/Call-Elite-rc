/**
 * RC Call Elite - Customer-Facing Home Services Platform
 * "Your Home. Our Expertise."
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, CheckCircle } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PolicyModal } from './components/PolicyModal';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/motion';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefills, setBookingPrefills] = useState({
    service: 'AC Service',
    date: 'Today',
    slot: '11:00 AM – 01:00 PM',
    type: 'appointment' as 'appointment' | 'consultation',
  });
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll listener for scroll-to-top (only on public site)
  useEffect(() => {
    if (isAdmin) return;
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  // Open booking modal with specific parameters
  const handleOpenBooking = (
    service = 'AC Service',
    type: 'appointment' | 'consultation' = 'appointment',
    date = 'Today',
    slot = '11:00 AM – 01:00 PM'
  ) => {
    setBookingPrefills({
      service,
      type,
      date,
      slot,
    });
    setIsBookingOpen(true);
  };

  // Dedicated Admin Portal: Clean viewport without customer website header/footer interference
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    );
  }

  return (
    <>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-600 selection:text-white">
        {/* 1. STICKY BRAND HEADER WITH DEDICATED ROUTES */}
        <Header
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 2. DYNAMIC APPLICATION ROUTING WITH PAGE TRANSITIONS */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              {/* Home Page Route */}
              <Route
                path="/"
                element={
                  <PageTransition>
                    <HomePage
                      onOpenBooking={handleOpenBooking}
                    />
                  </PageTransition>
                }
              />

              {/* Dedicated Services Landing Page */}
              <Route
                path="/services"
                element={
                  <PageTransition>
                    <ServicesPage
                      onOpenBooking={(serviceName, catType) =>
                        handleOpenBooking(serviceName || 'AC Service', catType || 'appointment')
                      }
                    />
                  </PageTransition>
                }
              />

              {/* Dedicated How It Works Page */}
              <Route
                path="/how-it-works"
                element={
                  <PageTransition>
                    <HowItWorksPage
                      onOpenBooking={() => handleOpenBooking()}
                    />
                  </PageTransition>
                }
              />

              {/* Dedicated About Us Page */}
              <Route
                path="/about-us"
                element={
                  <PageTransition>
                    <AboutUsPage
                      onOpenBooking={() => handleOpenBooking()}
                    />
                  </PageTransition>
                }
              />

              {/* Dedicated Contact Page */}
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <ContactPage
                      onOpenBookingModal={(serviceName) =>
                        handleOpenBooking(serviceName || 'AC Service', 'appointment')
                      }
                    />
                  </PageTransition>
                }
              />

              {/* Dedicated Service Detail Page */}
              <Route
                path="/services/:slug"
                element={
                  <PageTransition>
                    <ServiceDetailPage
                      onOpenBooking={(serviceName, catType) =>
                        handleOpenBooking(serviceName, catType || 'appointment')
                      }
                    />
                  </PageTransition>
                }
              />

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFoundPage />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* 3. SITE-WIDE FOOTER WITH DEDICATED ROUTES */}
        <Footer
          onOpenPrivacy={() => setActivePolicy('privacy')}
          onOpenTerms={() => setActivePolicy('terms')}
        />

        {/* 4. COMPREHENSIVE DUAL-FLOW BOOKING MODAL */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialService={bookingPrefills.service}
          initialCategoryType={bookingPrefills.type}
          initialDate={bookingPrefills.date}
          initialSlot={bookingPrefills.slot}
        />

        {/* 5. PRIVACY & TERMS POLICY MODAL */}
        <PolicyModal
          type={activePolicy}
          onClose={() => setActivePolicy(null)}
        />

        {/* 6. FLOATING WHATSAPP & SCROLL CONTROLS */}
        <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
          <motion.a
            href="https://wa.me/918722713026?text=Hello%20RC%20Call%20Elite,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20home%20service."
            target="_blank"
            rel="noopener noreferrer"
            id="floating-whatsapp-btn"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-200"
            aria-label="Chat with RC Call Elite on WhatsApp"
          >
            <svg className="w-5 h-5 fill-white shrink-0 group-hover:rotate-12 transition-transform duration-200" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="text-xs font-bold whitespace-nowrap">WhatsApp 8722713026</span>
          </motion.a>

          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                id="scroll-to-top-btn"
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 10 }}
                whileHover={{ scale: 1.1, backgroundColor: '#E53935' }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </aside>

        {/* 7. TOAST FEEDBACK */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 16, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 16, x: '-50%' }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-20 left-1/2 z-50 bg-[#0A192F] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold"
            >
              <CheckCircle className="w-4 h-4 text-[#E53935]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
