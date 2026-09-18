import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useCMS } from '../context/CMSContext';
import {
  AnimatedSection,
  AnimatedStagger,
  AnimatedItem,
  HeadingReveal,
  MagneticButton,
  BackgroundAmbient
} from '../components/motion';

interface ContactPageProps {
  onOpenBookingModal: (serviceName?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBookingModal }) => {
  const { contactSettings, addLead, pages } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Washing Machine Repair',
    location: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableServices = [
    'Washing Machine Repair',
    'AC Service & Repair',
    'LED / Smart TV Repair',
    'Refrigerator Service',
    'Water Purifier / RO Service',
    'Doorstep Bike Service',
    'Home Plumbing & Repairs',
    'Home Painting',
    'Interior Design Consultation',
    'Interior Construction',
    'General Inquiry / Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save lead to CMSContext (persists to backend & localStorage)
    addLead({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      location: formData.location || 'Bangalore',
      message: formData.message,
      source: 'Contact Form',
      status: 'New',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const contactSEO = pages['contact']?.seo;

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <SEOHead
        title={contactSEO?.title || "Contact RC Call Elite | Book Home & Interior Services in Bangalore"}
        description={contactSEO?.metaDescription || "Get in touch with RC Call Elite Bangalore. Call or send an enquiry for appliance repair, bike service, painting, or interior consultations."}
        canonicalUrl={contactSEO?.canonicalUrl || "https://calleliterc.com/contact"}
        breadcrumbs={[
          { name: 'Home', url: 'https://calleliterc.com/' },
          { name: 'Contact', url: 'https://calleliterc.com/contact' }
        ]}
      />

      {/* 1. HERO SECTION */}
      <section className="bg-[#0A192F] text-white pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
        <BackgroundAmbient variant="navy-ambient" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-red-400 font-semibold">Contact</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>We Are Here to Assist You</span>
            </div>

            <HeadingReveal as="h1" className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Contact <span className="text-[#E53935]">RC Call Elite</span>
            </HeadingReveal>

            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Have an urgent appliance breakdown, need doorstep bike maintenance, or want to schedule an architectural interior consultation? Connect directly with our team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION: INFO + FORM */}
      <AnimatedSection variant="fade-lift" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT COLUMN: Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <HeadingReveal as="h2" className="text-2xl font-black text-[#0A192F]">
                  Get in Touch Directly
                </HeadingReveal>
                <p className="text-slate-600 text-sm mt-1">
                  Reach our customer support desk via phone, WhatsApp, or email.
                </p>
              </div>

              {/* Direct Action Cards */}
              <AnimatedStagger staggerDelay={0.08} className="space-y-4">
                {/* Phone Call */}
                <AnimatedItem variant="stagger-up">
                  <a
                    href={`tel:${contactSettings.primaryPhone.replace(/[^0-9]/g, '')}`}
                    className="interactive-card flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md transition-all group"
                  >
                    <div className="card-icon-react w-12 h-12 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center shrink-0">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div className="flex-1 card-content-shift">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Support</div>
                      <div className="text-lg font-black text-[#0A192F]">{contactSettings.primaryPhone}</div>
                      <div className="text-xs text-slate-500">Tap to call our dispatch desk</div>
                    </div>
                  </a>
                </AnimatedItem>

                {/* WhatsApp */}
                <AnimatedItem variant="stagger-up">
                  <a
                    href={`https://wa.me/${contactSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20RC%20Call%20Elite,%20I%20would%20like%20to%20inquire%20about%20a%20service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-card flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group"
                  >
                    <div className="card-icon-react w-12 h-12 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="flex-1 card-content-shift">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp Chat</div>
                      <div className="text-lg font-black text-slate-900">{contactSettings.whatsappNumber}</div>
                      <div className="text-xs text-emerald-600 font-medium">Quick responses & instant booking</div>
                    </div>
                  </a>
                </AnimatedItem>

                {/* Email */}
                <AnimatedItem variant="stagger-up">
                  <a
                    href={`mailto:${contactSettings.supportEmail}`}
                    className="interactive-card flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="card-icon-react w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 card-content-shift">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Email</div>
                      <div className="text-base font-bold text-slate-900 truncate">{contactSettings.supportEmail}</div>
                      <div className="text-xs text-slate-500">For quotations, billing & feedback</div>
                    </div>
                  </a>
                </AnimatedItem>

                {/* Address & Operational Hours */}
                <AnimatedItem variant="stagger-up">
                  <div className="interactive-card p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                    <div className="flex items-start gap-3.5">
                      <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Coverage</div>
                        <div className="text-sm font-bold text-[#0A192F]">{contactSettings.address}</div>
                        <div className="text-xs text-slate-500 mt-0.5">Indiranagar, Koramangala, Whitefield, HSR, Jayanagar & surrounding areas</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-start gap-3.5">
                      <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Timings</div>
                        <div className="text-sm font-bold text-[#0A192F]">{contactSettings.workingHours}</div>
                        <div className="text-xs text-slate-500 mt-0.5">Emergency requests prioritized</div>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              </AnimatedStagger>
            </div>

            {/* RIGHT COLUMN: Interactive Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="interactive-card bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm">
                {isSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-black text-[#0A192F]">
                      Thank You, {formData.name || 'Valued Customer'}!
                    </h3>

                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      We have received your message regarding <strong className="text-slate-900">{formData.service}</strong>. Our customer support executive will call you at <strong className="text-slate-900">{formData.phone}</strong> shortly to confirm details and scheduling.
                    </p>

                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            service: 'Washing Machine Repair',
                            location: '',
                            message: '',
                          });
                        }}
                        className="interactive-btn w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>

                      <MagneticButton
                        type="button"
                        onClick={() => onOpenBookingModal(formData.service)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0A192F] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                      >
                        Schedule Online Booking
                      </MagneticButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-red-600 mb-1">
                        <Send className="w-3.5 h-3.5" />
                        <span>Instant Service Inquiry</span>
                      </div>
                      <h3 className="text-xl font-black text-[#0A192F]">
                        Send Us a Direct Message
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Fill in your service requirement. We will call you within 15 minutes to confirm booking.
                      </p>
                    </div>

                    {/* Customer Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Sharma"
                        className="interactive-input w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Phone Number & Service Selector Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 98765 43210"
                          className="interactive-input w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-service" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Select Service <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="contact-service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="interactive-input w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
                        >
                          {availableServices.map((svc) => (
                            <option key={svc} value={svc}>
                              {svc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Neighborhood / Area in Bangalore */}
                    <div>
                      <label htmlFor="contact-location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Neighborhood / Area in Bangalore
                      </label>
                      <input
                        id="contact-location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Whitefield, Indiranagar, HSR Layout, Koramangala"
                        className="interactive-input w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Message or Specific Requirement */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Describe Your Issue or Requirement
                      </label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe the issue (e.g., Washing machine not draining, AC cooling low, 2-wheeler general maintenance)..."
                        className="interactive-input w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Magnetic Submit Button */}
                    <MagneticButton
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      glowEffect={true}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#E53935] hover:bg-[#d32f2f] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Service Request</span>
                        </>
                      )}
                    </MagneticButton>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>No spam guarantee. Data stored securely.</span>
                      </div>
                      <span>Typically responds in &lt; 15 mins</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
