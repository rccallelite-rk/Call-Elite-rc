import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Sparkles, ArrowRight, MessageSquare, Home, Layers } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import { BookingFormData, ProjectEnquiryData } from '../types';
import { saveBooking, saveProject } from '../utils/bookingStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDate?: string;
  initialSlot?: string;
  initialCategoryType?: 'appointment' | 'consultation';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'AC Service',
  initialDate = 'Today',
  initialSlot = '11:00 AM – 01:00 PM',
  initialCategoryType = 'appointment',
}) => {
  // Check if initial service is an Interior or Consultation service
  const isConsultationService = (serviceName: string) => {
    const s = serviceName.toLowerCase();
    return s.includes('interior') || s.includes('construction') || s.includes('painting');
  };

  const [activeTab, setActiveTab] = useState<'service' | 'project'>(
    isConsultationService(initialService) ? 'project' : 'service'
  );

  // Technician / Standard Service Booking State
  const [formData, setFormData] = useState<BookingFormData>({
    serviceName: initialService,
    serviceType: initialCategoryType,
    dateOption: initialDate === 'Tomorrow' ? 'tomorrow' : initialDate === 'Today' ? 'today' : 'custom',
    customDate: new Date().toISOString().split('T')[0],
    timeSlot: initialSlot,
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    problemDescription: '',
    notes: '',
  });

  // Turnkey Project Enquiry State (For Interior Design & Interior Construction)
  const [projectData, setProjectData] = useState<ProjectEnquiryData>({
    serviceName: initialService,
    customerName: '',
    customerPhone: '',
    projectType: '3BHK Apartment',
    location: '',
    approxArea: '1400 sq.ft',
    requirement: '',
    preferredContactTime: 'Evening (4:00 PM - 7:00 PM)',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (isOpen) {
      const isProj = isConsultationService(initialService);
      setActiveTab(isProj ? 'project' : 'service');

      setFormData(prev => ({
        ...prev,
        serviceName: initialService || 'General Home Service',
        serviceType: initialCategoryType || 'appointment',
        timeSlot: initialSlot || '11:00 AM – 01:00 PM',
        dateOption: initialDate === 'Tomorrow' ? 'tomorrow' : 'today',
      }));

      setProjectData(prev => ({
        ...prev,
        serviceName: initialService || 'Interior Design',
      }));

      setIsSubmitted(false);
    }
  }, [isOpen, initialService, initialDate, initialSlot, initialCategoryType]);

  if (!isOpen) return null;

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'RCCE-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(randomCode);

    // Save to persistent storage for the Admin dashboard
    saveBooking({
      refCode: randomCode,
      serviceName: formData.serviceName,
      serviceType: formData.serviceType,
      dateOption: formData.dateOption,
      scheduledDate:
        formData.dateOption === 'today'
          ? 'Today (' + new Date().toISOString().split('T')[0] + ')'
          : formData.dateOption === 'tomorrow'
          ? 'Tomorrow'
          : formData.customDate,
      timeSlot: formData.timeSlot,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerAddress: formData.customerAddress,
      problemDescription: formData.problemDescription,
      notes: formData.notes,
      estimatedAmount: 'Standard Rate Card',
    });

    setIsSubmitted(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'RCINT-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(randomCode);

    // Save to persistent storage for the Admin dashboard
    saveProject({
      refCode: randomCode,
      serviceName: projectData.serviceName,
      customerName: projectData.customerName,
      customerPhone: projectData.customerPhone,
      projectType: projectData.projectType,
      location: projectData.location,
      approxArea: projectData.approxArea,
      requirement: projectData.requirement,
      preferredContactTime: projectData.preferredContactTime,
      budgetRange: 'To be estimated during survey',
    });

    setIsSubmitted(true);
  };

  const timeSlots = [
    '09:00 AM – 11:00 AM',
    '11:00 AM – 01:00 PM',
    '02:00 PM – 04:00 PM',
    '04:00 PM – 06:00 PM',
    '06:00 PM – 08:00 PM',
  ];

  const projectTypes = [
    '1BHK Apartment',
    '2BHK Apartment',
    '3BHK Apartment',
    '4BHK / Penthouse',
    'Independent Villa / House',
    'Commercial / Office Space',
    'Complete Civil Renovation',
  ];

  const contactTimes = [
    'Morning (9:00 AM – 12:00 PM)',
    'Afternoon (12:00 PM – 4:00 PM)',
    'Evening (4:00 PM – 7:00 PM)',
    'Anytime',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#E53935]">
              RC Call Elite Booking Flow
            </div>
            <h3 className="text-lg font-black text-[#0A192F]">
              {isSubmitted
                ? 'Request Received'
                : activeTab === 'project'
                ? 'Project Design & Civil Consultation'
                : 'Schedule Doorstep Visit'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch if not yet submitted */}
        {!isSubmitted && (
          <div className="px-6 pt-3 pb-1 border-b border-slate-100 flex gap-2 bg-white">
            <button
              type="button"
              onClick={() => setActiveTab('service')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'service'
                  ? 'border-[#E53935] text-[#E53935]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Doorstep Service (Appliance, Bike, Plumbing)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('project')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'project'
                  ? 'border-[#E53935] text-[#E53935]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Project Consultation (Interiors & Civil)
            </button>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            /* Confirmation Success State */
            <div className="text-center py-4 space-y-5 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-[#0A192F]">
                  {activeTab === 'project' ? 'Project Consultation Reserved!' : 'Booking Request Placed!'}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {activeTab === 'project'
                    ? 'Our senior interior & civil consultant will contact you at your preferred time with free 3D and layout details.'
                    : 'We have reserved your doorstep slot. A verified RC Call Elite specialist will visit on time.'}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Reference Code:</span>
                  <span className="font-extrabold text-[#0A192F] font-mono">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Service Requested:</span>
                  <span className="font-bold text-slate-800">
                    {activeTab === 'project' ? projectData.serviceName : formData.serviceName}
                  </span>
                </div>
                {activeTab === 'project' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Project Type:</span>
                      <span className="font-bold text-slate-800">{projectData.projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Approx Area:</span>
                      <span className="font-bold text-slate-800">{projectData.approxArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Location:</span>
                      <span className="font-bold text-slate-800">{projectData.location || 'Bangalore'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Contact Time:</span>
                      <span className="font-bold text-slate-800">{projectData.preferredContactTime}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Scheduled Slot:</span>
                      <span className="font-bold text-slate-800">
                        {formData.dateOption === 'today' ? 'Today' : formData.dateOption === 'tomorrow' ? 'Tomorrow' : formData.customDate} ({formData.timeSlot})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Service Address:</span>
                      <span className="font-bold text-slate-800">{formData.customerAddress}</span>
                    </div>
                    {formData.problemDescription && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Observed Issue:</span>
                        <span className="font-bold text-slate-800">{formData.problemDescription}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500 font-medium">Contact Person:</span>
                  <span className="font-bold text-slate-800">
                    {activeTab === 'project' ? projectData.customerName : formData.customerName} (
                    {activeTab === 'project' ? projectData.customerPhone : formData.customerPhone})
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/918722713026?text=Hello%20RC%20Call%20Elite,%20I%20have%20submitted%20a%20booking%20for%20${encodeURIComponent(
                    activeTab === 'project' ? projectData.serviceName : formData.serviceName
                  )}%20(Ref:%20${bookingRef})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-sm transition-colors"
                >
                  <span>Connect Directly on WhatsApp (8722713026)</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : activeTab === 'project' ? (
            /* ================= PROJECT CONSULTATION FORM (INTERIORS & CONSTRUCTION) ================= */
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3 text-xs text-purple-900">
                ✨ <strong>Turnkey Project Advisory:</strong> Free on-site survey, 2D floor plans, 3D renders, and zero-obligation itemized BOQ across Bangalore.
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Consultation Category
                </label>
                <select
                  value={projectData.serviceName}
                  onChange={(e) => setProjectData({ ...projectData, serviceName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                >
                  <option value="Interior Design">Interior Design (Modular, Wardrobes, False Ceiling)</option>
                  <option value="Interior Construction">Interior Construction (Civil, Flooring, Renovation)</option>
                  <option value="Home Painting">Home Painting & Waterproofing</option>
                  <option value="Complete Home Transformation">Complete Home Transformation (Civil + Interiors)</option>
                </select>
              </div>

              {/* Project Type & Approx Area */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Project Type
                  </label>
                  <select
                    value={projectData.projectType}
                    onChange={(e) => setProjectData({ ...projectData, projectType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Approx Area (sq.ft)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1450 sq.ft"
                    value={projectData.approxArea}
                    onChange={(e) => setProjectData({ ...projectData, approxArea: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Reddy"
                      value={projectData.customerName}
                      onChange={(e) => setProjectData({ ...projectData, customerName: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 8722713026"
                      value={projectData.customerPhone}
                      onChange={(e) => setProjectData({ ...projectData, customerPhone: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Location in Bangalore */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Property Location / Community in Bangalore
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prestige Lakeside, Whitefield / Indiranagar"
                    value={projectData.location}
                    onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Requirement details */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Requirement Scope & Details
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need modular kitchen, 3 bedroom wardrobes, false ceiling, and civil bathroom renovation."
                  value={projectData.requirement}
                  onChange={(e) => setProjectData({ ...projectData, requirement: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              {/* Preferred Contact Time */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Preferred Time for Designer Call
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {contactTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setProjectData({ ...projectData, preferredContactTime: time })}
                      className={`py-1.5 px-2 rounded-xl border text-[11px] font-medium transition-all text-center ${
                        projectData.preferredContactTime === time
                          ? 'border-[#0A192F] bg-[#0A192F] text-white font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#d32f2f] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 transition-all duration-200 active:scale-98"
                >
                  <span>Request Free Design Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                ✓ Free site visit • 3D concepts included • 45-day handover
              </div>
            </form>
          ) : (
            /* ================= REGULAR AT-HOME TECHNICIAN SERVICE BOOKING ================= */
            <form onSubmit={handleStandardSubmit} className="space-y-4">
              {/* Service Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Selected Service
                </label>
                <select
                  value={formData.serviceName}
                  onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                >
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name} ({cat.categoryType === 'consultation' ? 'Consultation' : 'Doorstep Service'})
                    </option>
                  ))}
                  <option value="General Appliance Care">Other Home Repair</option>
                </select>
              </div>

              {/* Observed Problem / Issue */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Problem Description / Issue Faced
                </label>
                <div className="relative">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Water leaking from drum / Low cooling / Tap dripping"
                    value={formData.problemDescription}
                    onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Date Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Visit Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dateOption: 'today' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.dateOption === 'today'
                        ? 'border-[#E53935] bg-red-50 text-[#E53935]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dateOption: 'tomorrow' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.dateOption === 'tomorrow'
                        ? 'border-[#E53935] bg-red-50 text-[#E53935]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dateOption: 'custom' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.dateOption === 'custom'
                        ? 'border-[#E53935] bg-red-50 text-[#E53935]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Pick Date
                  </button>
                </div>

                {formData.dateOption === 'custom' && (
                  <input
                    type="date"
                    value={formData.customDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, customDate: e.target.value })}
                    className="mt-2 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                )}
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold transition-all text-center ${
                        formData.timeSlot === slot
                          ? 'border-[#0A192F] bg-[#0A192F] text-white shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 8722713026"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Doorstep Address & Bangalore Locality
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 302, Green Glen Layout, Bellandur, Bangalore"
                      value={formData.customerAddress}
                      onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#d32f2f] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 transition-all duration-200 active:scale-98"
                >
                  <span>Confirm Service Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                ✓ Pay after service inspection • Verified Bangalore technicians
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
