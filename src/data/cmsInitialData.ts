import {
  CMSService,
  CMSPage,
  CMSHomepageContent,
  CMSNavigationItem,
  CMSFooterContent,
  CMSMediaItem,
  CMSLead,
  CMSCustomer,
  CMSReview,
  CMSServiceArea,
  CMSContactSettings,
  CMSWebsiteSettings,
  CMSActivityLog,
  CMSTrashItem,
  CMSRevision,
  CMSRedirect,
  CMSFAQItem,
  CMSSchemaConfig,
  CMSSitemapConfig,
  CMSRobotsConfig,
} from '../types';
import { SERVICES_DETAIL_DATA, BANGALORE_LOCALITIES } from './servicesData';

// Convert existing static services to CMS Services
export const INITIAL_CMS_SERVICES: CMSService[] = Object.values(SERVICES_DETAIL_DATA).map((s, idx) => ({
  ...s,
  id: `srv-${idx + 1}`,
  status: 'Active' as const,
  priceType: s.startingPrice ? 'Starting Price' : 'Fixed Inspection',
  fullDescription: s.shortDescription + ' ' + (s.aboutContent?.[0] || ''),
  featuredImage: s.heroImage,
  galleryImages: [s.heroImage],
  ctaButtonText: s.categoryType === 'consultation' ? 'Book Design Consultation' : 'Book Doorstep Service',
  ctaButtonLink: '/contact',
  lastUpdated: '2026-09-16T08:00:00.000Z',
}));

// Default 5 main pages
export const INITIAL_CMS_PAGES: Record<string, CMSPage> = {
  home: {
    id: 'page-home',
    slug: '',
    title: 'Home | RC Call Elite',
    heroHeading: "Bangalore's Premier Home Services & Turnkey Solutions",
    heroDescription:
      'From precision appliance repairs to full residential interior fit-outs, RC Call Elite delivers certified technicians, transparent pricing, and 90-day warranty coverage across Bengaluru.',
    ctaText: 'Explore All 10 Categories',
    ctaLink: '/services',
    sections: [
      {
        id: 'sec-hero',
        title: 'Hero Welcome Banner',
        subtitle: 'Main entry header',
        content: 'Your Home. Our Expertise. Certified technicians and turnkey interior specialists.',
        enabled: true,
      },
      {
        id: 'sec-trust',
        title: 'Customer Trust & Guarantees',
        subtitle: 'Our 4-Point Promise',
        content: 'Verified background-checked experts, upfront transparent pricing, and 30-90 day service warranty.',
        enabled: true,
      },
    ],
    seo: {
      title: 'RC Call Elite | Home Services, Appliance Care & Turnkey Interiors Bangalore',
      metaDescription:
        "Bangalore's trusted home service marketplace. AC service, washing machine repair, TV repair, refrigerator service, bike service, painting and interior design.",
      canonicalUrl: 'https://calleliterc.com/',
      ogTitle: 'RC Call Elite | Professional Home & Interior Services Bangalore',
      ogDescription: 'Certified doorstep technicians for appliances, bikes, plumbing, plus architectural interior design.',
    },
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  services: {
    id: 'page-services',
    slug: 'services',
    title: 'Services Directory | RC Call Elite',
    heroHeading: 'Professional Home & Turnkey Services in Bangalore',
    heroDescription:
      'Browse our complete catalog of doorstep repair services, regular maintenance plans, and turnkey interior design consultations.',
    ctaText: 'Need an Estimate?',
    ctaLink: '/contact',
    sections: [
      {
        id: 'sec-categories',
        title: 'Service Categories Filter',
        content: 'Quickly toggle between Appliance Care, Two-Wheeler, Home Repair, and Interiors & Build.',
        enabled: true,
      },
    ],
    seo: {
      title: 'Home & Appliance Services Directory in Bangalore | RC Call Elite',
      metaDescription:
        'Explore all services by RC Call Elite Bangalore: washing machine repair, AC service, TV repair, refrigerator, bike service, painting, and interior design.',
      canonicalUrl: 'https://calleliterc.com/services',
    },
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  'how-it-works': {
    id: 'page-how-it-works',
    slug: 'how-it-works',
    title: 'How It Works | RC Call Elite',
    heroHeading: 'Simple, Transparent & Reliable Service Process',
    heroDescription:
      'Learn how RC Call Elite pairs your service or renovation requirement with certified professionals across Bangalore in just a few clicks.',
    ctaText: 'Schedule a Visit Today',
    ctaLink: '/contact',
    sections: [
      {
        id: 'sec-steps',
        title: '5-Step Doorstep Execution',
        content: '1. Select Service -> 2. Choose Time Slot -> 3. Expert Arrives -> 4. Transparent Upfront Quote -> 5. Guaranteed Resolution.',
        enabled: true,
      },
    ],
    seo: {
      title: 'How It Works | Booking Process & Service Workflow | RC Call Elite',
      metaDescription:
        'Understand our doorstep appliance repair and interior consultation workflow: easy booking, transparent pricing, background-verified technicians, and warranty protection.',
      canonicalUrl: 'https://calleliterc.com/how-it-works',
    },
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  'about-us': {
    id: 'page-about-us',
    slug: 'about-us',
    title: 'About RC Call Elite',
    heroHeading: 'Your Trusted Partner in Home Maintenance & Interiors',
    heroDescription:
      'Founded in Bangalore with a mission to deliver integrity, craftsmanship, and accountability to every home service experience.',
    ctaText: 'Speak to Our Team',
    ctaLink: '/contact',
    sections: [
      {
        id: 'sec-story',
        title: 'Our Bangalore Journey',
        content:
          'From a localized appliance diagnostic team in Koramangala to an end-to-end doorstep network covering over 25 Bangalore localities.',
        enabled: true,
      },
      {
        id: 'sec-pillars',
        title: 'Our 6 Core Pillars',
        content: 'Punctuality, Genuine Spare Parts, Transparent Estimates, Skilled Technicians, Safety Protocols, and Customer Satisfaction.',
        enabled: true,
      },
    ],
    seo: {
      title: 'About RC Call Elite | Bangalore Home Services & Turnkey Solutions',
      metaDescription:
        'Learn about RC Call Elite: our mission, values, certified technician network, and commitment to transparent home repairs and interior construction in Bangalore.',
      canonicalUrl: 'https://calleliterc.com/about-us',
    },
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  contact: {
    id: 'page-contact',
    slug: 'contact',
    title: 'Contact RC Call Elite',
    heroHeading: 'Get in Touch with Our Bangalore Operations Team',
    heroDescription:
      'Have an emergency appliance breakdown or planning a 3BHK interior renovation? Reach out directly via Phone, WhatsApp, or our enquiry form.',
    ctaText: 'Call +91 87227 13026',
    ctaLink: 'tel:+918722713026',
    sections: [
      {
        id: 'sec-channels',
        title: 'Direct Support Channels',
        content: 'Phone: +91 87227 13026 | WhatsApp: +91 87227 13026 | Email: rccallelite@gmail.com | Hours: Mon-Sun 8:00 AM - 9:00 PM',
        enabled: true,
      },
    ],
    seo: {
      title: 'Contact RC Call Elite | Book Home & Interior Services in Bangalore',
      metaDescription:
        'Get in touch with RC Call Elite Bangalore. Call +91 87227 13026 or send an enquiry for appliance repair, bike service, painting, or interior consultations.',
      canonicalUrl: 'https://calleliterc.com/contact',
    },
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
};

// Initial Homepage Content
export const INITIAL_CMS_HOMEPAGE: CMSHomepageContent = {
  heroHeading: 'Your Home.',
  heroHighlight: 'Our Expertise.',
  heroDescription:
    'Reliable doorstep appliance repairs, two-wheeler servicing, home painting, and turnkey interior solutions across Bangalore. Verified specialists, upfront quotes, and service warranty.',
  heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200',
  primaryBtnText: 'Book a Service',
  primaryBtnLink: '/services',
  secondaryBtnText: 'Explore 10 Categories',
  secondaryBtnLink: '/services',
  sectionsOrder: [
    'hero',
    'categories',
    'popular',
    'how-it-works',
    'booking-preview',
    'why-choose',
    'service-types',
    'interior-banner',
    'trust',
    'cta',
  ],
  sectionVisibility: {
    hero: true,
    categories: true,
    popular: true,
    'how-it-works': true,
    'booking-preview': true,
    'why-choose': true,
    'service-types': true,
    'interior-banner': true,
    trust: true,
    cta: true,
  },
  sectionTitles: {
    categories: 'Popular Service Categories',
    popular: 'Frequently Requested Services',
    'how-it-works': 'How RC Call Elite Works',
    'why-choose': 'Why Bangalore Trusts RC Call Elite',
    'service-types': 'Choose Your Service Workflow',
    'interior-banner': 'Turnkey Interior Design & Civil Construction',
    trust: 'Peace of Mind Guaranteed',
  },
  sectionDescriptions: {
    categories: 'Select a category to schedule an on-demand technician or consultation visit.',
    popular: 'Transparent pricing with verified technicians and genuine spare parts guarantee.',
    'how-it-works': 'Effortless 4-step process from booking confirmation to completed doorstep service.',
    'why-choose': 'Designed for Bangalore residents prioritizing reliability, punctuality, and fair rates.',
  },
  lastUpdated: '2026-09-16T08:00:00.000Z',
};

// Default Navigation Menu Items (all dedicated paths)
export const INITIAL_CMS_NAVIGATION: CMSNavigationItem[] = [
  { id: 'nav-1', label: 'Home', path: '/', order: 1, visible: true, isSystem: true },
  { id: 'nav-2', label: 'Services', path: '/services', order: 2, visible: true, isSystem: true },
  { id: 'nav-3', label: 'How It Works', path: '/how-it-works', order: 3, visible: true, isSystem: true },
  { id: 'nav-4', label: 'About Us', path: '/about-us', order: 4, visible: true, isSystem: true },
  { id: 'nav-5', label: 'Contact', path: '/contact', order: 5, visible: true, isSystem: true },
];

// Default Footer Settings
export const INITIAL_CMS_FOOTER: CMSFooterContent = {
  description:
    'RC Call Elite is your comprehensive home maintenance and turnkey interior partner across Bangalore. Certified technicians, transparent pricing, and 30-day service warranty.',
  phone: '+91 87227 13026',
  whatsapp: '918722713026',
  email: 'rccallelite@gmail.com',
  address: 'Bangalore & Karnataka, India',
  copyrightText: '© 2026 RC Call Elite. All Rights Reserved.',
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact', path: '/contact' },
  ],
  serviceLinks: [
    { label: 'Washing Machine Repair', path: '/services/washing-machine-repair' },
    { label: 'AC Service & Repair', path: '/services/ac-service' },
    { label: 'LED / Smart TV Repair', path: '/services/tv-repair' },
    { label: 'Refrigerator Service', path: '/services/refrigerator-service' },
    { label: 'Water Purifier / RO Service', path: '/services/water-purifier-service' },
    { label: 'Doorstep Bike Service', path: '/services/bike-service' },
    { label: 'Home Painting', path: '/services/home-painting' },
    { label: 'Interior Design', path: '/services/interior-design' },
    { label: 'Interior Construction', path: '/services/interior-construction' },
  ],
  socialLinks: [
    { platform: 'WhatsApp', url: 'https://wa.me/918722713026' },
    { platform: 'Facebook', url: 'https://facebook.com' },
    { platform: 'Instagram', url: 'https://instagram.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
  ],
};

// Initial Media Library Items
export const INITIAL_CMS_MEDIA: CMSMediaItem[] = [
  {
    id: 'med-1',
    fileName: 'washing_machine_repair.jpg',
    fileType: 'image/jpeg',
    fileSize: '245 KB',
    url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=1200',
    altText: 'Technician repairing front load washing machine drum in Bangalore',
    uploadDate: '2026-09-10',
    usedBy: 'Washing Machine Repair Page',
  },
  {
    id: 'med-2',
    fileName: 'ac_service_deep_clean.jpg',
    fileType: 'image/jpeg',
    fileSize: '310 KB',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200',
    altText: 'Certified AC technician cleaning split AC filter with jet pump',
    uploadDate: '2026-09-10',
    usedBy: 'AC Service Page',
  },
  {
    id: 'med-3',
    fileName: 'smart_tv_repair.jpg',
    fileType: 'image/jpeg',
    fileSize: '198 KB',
    url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1200',
    altText: 'LED TV panel and backlight diagnosis',
    uploadDate: '2026-09-11',
    usedBy: 'TV Repair Page',
  },
  {
    id: 'med-4',
    fileName: 'luxury_interior_living.jpg',
    fileType: 'image/jpeg',
    fileSize: '412 KB',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
    altText: 'Modern turnkey living room with cove false ceiling and modular TV unit',
    uploadDate: '2026-09-12',
    usedBy: 'Interior Design Page',
  },
  {
    id: 'med-5',
    fileName: 'doorstep_bike_mechanic.jpg',
    fileType: 'image/jpeg',
    fileSize: '280 KB',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200',
    altText: 'Two-wheeler doorstep servicing and oil change',
    uploadDate: '2026-09-13',
    usedBy: 'Bike Service Page',
  },
];

// Initial Customer CRM records
export const INITIAL_CMS_CUSTOMERS: CMSCustomer[] = [
  {
    id: 'cust-1',
    name: 'Kavitha Ramaswamy',
    phone: '+91 98452 33190',
    email: 'kavitha.r@gmail.com',
    location: 'Koramangala 4th Block, Bangalore',
    servicesUsed: ['Washing Machine Repair'],
    totalBookings: 2,
    totalEnquiries: 0,
    lastContact: '2026-09-16',
    status: 'Active',
    notes: 'Preferred weekend time slots. Very polite.',
  },
  {
    id: 'cust-2',
    name: 'Arjun Venkatesh',
    phone: '+91 99008 11452',
    email: 'arjun.v@techcorp.in',
    location: 'Sobha Dream Acres, Panathur, Bangalore',
    servicesUsed: ['AC Service & Repair'],
    totalBookings: 1,
    totalEnquiries: 1,
    lastContact: '2026-09-16',
    status: 'Active',
    notes: 'Inquired about annual maintenance contract (AMC) for 3 AC units.',
  },
  {
    id: 'cust-3',
    name: 'Dr. Siddharth Menon',
    phone: '+91 98450 67123',
    email: 'dr.siddharth.m@apollo.com',
    location: 'Prestige Falcon City, Kanakapura Road',
    servicesUsed: ['Interior Design Consultation'],
    totalBookings: 0,
    totalEnquiries: 2,
    lastContact: '2026-09-16',
    status: 'VIP',
    notes: '3BHK complete acrylic modular kitchen + false ceiling. High budget interest (₹15L+).',
  },
  {
    id: 'cust-4',
    name: 'Manish Hegde',
    phone: '+91 97410 88231',
    email: 'manish.hegde@yahoo.com',
    location: 'Sarjapur Road, Bangalore',
    servicesUsed: ['Doorstep Bike Service'],
    totalBookings: 1,
    totalEnquiries: 0,
    lastContact: '2026-09-16',
    status: 'Active',
    notes: 'Royal Enfield enthusiast. Ordered synthetic Motul oil service.',
  },
];

// Initial CRM Leads
export const INITIAL_CMS_LEADS: CMSLead[] = [
  {
    id: 'lead-1',
    customerName: 'Dr. Siddharth Menon',
    phone: '+91 98450 67123',
    email: 'dr.siddharth.m@apollo.com',
    service: 'Interior Design Consultation',
    location: 'Prestige Falcon City, Kanakapura Road',
    requirement: 'End-to-end modular kitchen, master bedroom walk-in wardrobe, false ceiling with warm magnetic track lights.',
    source: 'Website Booking Flow',
    createdAt: '2026-09-16T06:40:00.000Z',
    status: 'Interested',
    notes: 'Site visit confirmed for Thursday 5:00 PM. Architect Rajesh assigned.',
  },
  {
    id: 'lead-2',
    customerName: 'Deepak & Sneha Rao',
    phone: '+91 99805 23789',
    email: 'deepak.rao@outlook.com',
    service: 'Interior Construction',
    location: 'HSR Layout Sector 2',
    requirement: 'Complete civil remodel, open kitchen partition removal, terrace waterproofing and exterior painting.',
    source: 'Website Consultation Form',
    createdAt: '2026-09-15T14:10:00.000Z',
    status: 'Contacted',
    notes: 'Civil quote submitted for 2800 sq.ft villa.',
  },
  {
    id: 'lead-3',
    customerName: 'Ananya Deshmukh',
    phone: '+91 98455 12098',
    service: 'Home Painting',
    location: 'Whitefield (ITPL)',
    requirement: '2BHK full repaint with Asian Paints Royale Luxury Emulsion.',
    source: 'Contact Us Form',
    createdAt: '2026-09-16T08:10:00.000Z',
    status: 'New',
    notes: 'Requested moisture meter wall inspection.',
  },
];

// Legitimate customer reviews
export const INITIAL_CMS_REVIEWS: CMSReview[] = [
  {
    id: 'rev-1',
    customerName: 'Pooja Sundaram',
    reviewText:
      'Booked morning washing machine repair at 10 AM in HSR Layout. Suresh was at our apartment by 11 AM with original drain motor replacements. Fixed in 40 minutes with reasonable diagnostic fee.',
    rating: 5,
    date: '2026-09-12',
    serviceName: 'Washing Machine Repair',
    status: 'Published',
  },
  {
    id: 'rev-2',
    customerName: 'Naveen Chandran',
    reviewText:
      'Had our Daikin 1.5T AC deep cleaned with pressure jet pump. Extremely polite technicians who covered furniture with protective sheets. Cooling restored instantly.',
    rating: 5,
    date: '2026-09-14',
    serviceName: 'AC Service & Repair',
    status: 'Published',
  },
  {
    id: 'rev-3',
    customerName: 'Harini Balaji',
    reviewText:
      'Turnkey modular kitchen and wardrobe work completed for our 3BHK in Whitefield. Transparent quotes, top-notch marine plywood, and delivered within 35 days without delays.',
    rating: 5,
    date: '2026-09-08',
    serviceName: 'Interior Design',
    status: 'Published',
  },
  {
    id: 'rev-4',
    customerName: 'Vikramaditya G.',
    reviewText:
      'Doorstep bike service at my Koramangala tech park parking lot. Replaced engine oil, cleaned spark plug, and adjusted chain while I was at work. Excellent convenience!',
    rating: 5,
    date: '2026-09-15',
    serviceName: 'Doorstep Bike Service',
    status: 'Published',
  },
];

// Service Areas in Bangalore
export const INITIAL_CMS_SERVICE_AREAS: CMSServiceArea[] = BANGALORE_LOCALITIES.map((name, idx) => ({
  id: `area-${idx + 1}`,
  name,
  zone: ['Koramangala', 'HSR Layout', 'BTM Layout', 'Jayanagar', 'JP Nagar', 'Banashankari', 'Basavanagudi'].includes(name)
    ? 'South Bangalore'
    : ['Whitefield', 'Marathahalli', 'Bellandur', 'Sarjapur Road', 'Electronic City'].includes(name)
    ? 'East & IT Corridor'
    : ['Indiranagar', 'Domlur', 'Kalyan Nagar'].includes(name)
    ? 'Central / East'
    : 'North & West Bangalore',
  status: 'Active' as const,
}));

// Contact Settings
export const INITIAL_CMS_CONTACT: CMSContactSettings = {
  businessName: 'RC Call Elite',
  phone: '+91 87227 13026',
  primaryPhone: '+91 87227 13026',
  whatsapp: '918722713026',
  whatsappNumber: '8722713026',
  email: 'rccallelite@gmail.com',
  supportEmail: 'rccallelite@gmail.com',
  businessAddress: '#42, 1st Cross, Koramangala 4th Block, Bangalore, Karnataka 560034',
  address: '#42, 1st Cross, Koramangala 4th Block, Bangalore, Karnataka 560034',
  businessHours: 'Monday – Sunday: 8:00 AM – 9:00 PM',
  workingHours: 'Monday – Sunday: 8:00 AM – 9:00 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Bangalore+Karnataka',
  socialLinks: [
    { platform: 'WhatsApp', url: 'https://wa.me/918722713026' },
    { platform: 'Instagram', url: 'https://instagram.com/rccallelite' },
    { platform: 'Facebook', url: 'https://facebook.com/rccallelite' },
  ],
};

// Website Settings
export const INITIAL_CMS_SETTINGS: CMSWebsiteSettings = {
  businessName: 'RC Call Elite',
  tagline: 'Your Home. Our Expertise.',
  logoUrl: 'https://i.ibb.co/Pz3pXwZ2/Whats-App-Image-2026-07-09-at-2-32-40-PM.png',
  faviconUrl: '/rc-call-elite-logo.png',
  primaryContact: '+91 87227 13026',
  whatsapp: '918722713026',
  email: 'rccallelite@gmail.com',
  businessHours: '8:00 AM – 9:00 PM Daily',
  defaultSeoTitle: 'RC Call Elite | Home Services, Appliance Care & Turnkey Interiors Bangalore',
  defaultSeoDescription:
    "Bangalore's trusted home service marketplace. AC service, washing machine repair, TV repair, refrigerator service, bike service, painting and interior design.",
  defaultOgImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200',
  brandColor: '#E53935',
  announcementBarEnabled: false,
  announcementText: '🎉 Special Monsoon Discount: 15% OFF on AC & Washing Machine Services across Bangalore!',
  announcementLink: '/services',
  footerText: 'RC Call Elite is your trusted partner for doorstep appliance repair, routine maintenance, two-wheeler servicing, and turnkey architectural interiors in Bangalore.',
  copyrightText: '© 2026 RC Call Elite. All Rights Reserved.',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    twitter: 'https://x.com',
  },
};

// Initial Activity Logs
export const INITIAL_CMS_ACTIVITY_LOGS: CMSActivityLog[] = [
  {
    id: 'act-1',
    action: 'System Initialized',
    entity: 'CMS Core',
    details: 'Loaded initial 10 service catalogs, 5 main pages, and navigation models.',
    timestamp: '2026-09-16T08:00:00.000Z',
    operator: 'System Admin (rccallelite@gmail.com)',
  },
  {
    id: 'act-2',
    action: 'Booking Status Updated',
    entity: 'Booking RCCE-8924',
    entityId: 'b-101',
    details: 'Status changed to Technician Assigned (Suresh Kumar #RC-402).',
    timestamp: '2026-09-16T08:45:00.000Z',
    operator: 'Operator rccallelite@gmail.com',
  },
  {
    id: 'act-3',
    action: 'Lead Contacted',
    entity: 'Lead RCINT-9042',
    entityId: 'lead-1',
    details: 'Site visit scheduled for Dr. Siddharth Menon (Prestige Falcon City).',
    timestamp: '2026-09-16T09:10:00.000Z',
    operator: 'Operator rccallelite@gmail.com',
  },
];

// Initial Trash (Soft-deleted demo item)
export const INITIAL_CMS_TRASH: CMSTrashItem[] = [
  {
    id: 'trash-demo-1',
    originalId: 'srv-archived-sample',
    type: 'service',
    title: 'Commercial Kitchen Deep Clean (Archived Sample)',
    deletedAt: '2026-09-15T14:30:00.000Z',
    deletedBy: 'Super Admin',
    data: {
      id: 'srv-archived-sample',
      name: 'Commercial Kitchen Deep Clean (Archived Sample)',
      slug: 'commercial-kitchen-clean',
      category: 'Home Services',
      startingPrice: '₹2,499',
      status: 'Draft',
    },
  },
];

// Initial Revisions History
export const INITIAL_CMS_REVISIONS: CMSRevision[] = [
  {
    id: 'rev-1',
    entityType: 'service',
    entityId: 'srv-1',
    version: 1,
    timestamp: '2026-09-16T08:00:00.000Z',
    updatedBy: 'Super Admin',
    summary: 'Initial production launch of AC Service & Repair specifications.',
    snapshot: INITIAL_CMS_SERVICES[0],
  },
  {
    id: 'rev-2',
    entityType: 'homepage',
    entityId: 'home',
    version: 1,
    timestamp: '2026-09-16T08:00:00.000Z',
    updatedBy: 'Super Admin',
    summary: 'Configured monsoon service highlights and hero typography.',
    snapshot: INITIAL_CMS_HOMEPAGE,
  },
];

// Initial Redirects (301 & 302)
export const INITIAL_CMS_REDIRECTS: CMSRedirect[] = [
  {
    id: 'red-1',
    fromPath: '/ac-repair',
    toPath: '/services/ac-service',
    type: 301,
    enabled: true,
    createdAt: '2026-09-16T08:00:00.000Z',
    notes: 'Legacy campaign URL redirected to primary AC service page.',
  },
  {
    id: 'red-2',
    fromPath: '/bike-service',
    toPath: '/services/two-wheeler-service',
    type: 301,
    enabled: true,
    createdAt: '2026-09-16T08:00:00.000Z',
    notes: 'Direct alias for two-wheeler doorstep service.',
  },
  {
    id: 'red-3',
    fromPath: '/monsoon-offer',
    toPath: '/services',
    type: 302,
    enabled: true,
    createdAt: '2026-09-16T08:00:00.000Z',
    notes: 'Temporary seasonal campaign redirect.',
  },
];

// Initial Standalone & Global FAQs
export const INITIAL_CMS_FAQS: CMSFAQItem[] = [
  {
    id: 'faq-1',
    question: 'How quickly can an RC Call Elite technician arrive at my home?',
    answer: 'We offer same-day doorstep service across Bangalore within 90 to 120 minutes of booking confirmation. You can also select a preferred 2-hour slot for today or tomorrow.',
    category: 'Booking & Pricing',
    scope: 'global',
    order: 1,
    status: 'Published',
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  {
    id: 'faq-2',
    question: 'Are your technicians background-verified and certified?',
    answer: 'Yes, 100% of our service specialists undergo police verification, government ID verification, and trade certification before being dispatched to customer premises.',
    category: 'Global',
    scope: 'global',
    order: 2,
    status: 'Published',
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  {
    id: 'faq-3',
    question: 'What is your warranty policy on spare parts and repairs?',
    answer: 'All doorstep appliance repairs and bike servicing come with an upfront 30 to 90-day warranty on labor and replaced components, documented on your digital invoice.',
    category: 'Booking & Pricing',
    scope: 'global',
    order: 3,
    status: 'Published',
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  {
    id: 'faq-4',
    question: 'Which areas in Bangalore do you currently cover?',
    answer: 'We cover all major Bangalore localities including HSR Layout, Koramangala, Indiranagar, Whitefield, Bellandur, JP Nagar, Jayanagar, Electronic City, BTM Layout, and surrounding zones.',
    category: 'Service Area',
    scope: 'global',
    order: 4,
    status: 'Published',
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  {
    id: 'faq-5',
    question: 'How do consultation projects for home interiors and construction work?',
    answer: 'For interior design and civil construction, you submit a project enquiry. Our senior architect or project manager contacts you within 2 hours to schedule a free site evaluation and 3D design blueprint.',
    category: 'Interiors',
    scope: 'global',
    order: 5,
    status: 'Published',
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
];

// Initial Schema Configurations
export const INITIAL_CMS_SCHEMAS: CMSSchemaConfig[] = [
  {
    id: 'sch-localbiz',
    type: 'HomeAndConstructionBusiness',
    name: 'RC Call Elite Local Business Schema',
    enabled: true,
    jsonLd: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: 'RC Call Elite',
      url: 'https://calleliterc.com',
      logo: 'https://i.ibb.co/Pz3pXwZ2/Whats-App-Image-2026-07-09-at-2-32-40-PM.png',
      image: 'https://i.ibb.co/Pz3pXwZ2/Whats-App-Image-2026-07-09-at-2-32-40-PM.png',
      telephone: '+91 87227 13026',
      email: 'rccallelite@gmail.com',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'HSR Layout Sector 2, 27th Main',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560102',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 12.9121,
        longitude: 77.6446,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '21:00',
        },
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Bangalore' },
        { '@type': 'AdministrativeArea', name: 'Karnataka' },
      ],
    }, null, 2),
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
  {
    id: 'sch-faq',
    type: 'FAQPage',
    name: 'Global Verified Customer FAQ Schema',
    enabled: true,
    jsonLd: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How quickly can an RC Call Elite technician arrive?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide same-day doorstep service across Bangalore within 90-120 minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are technicians background-verified?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100% of technicians undergo police background verification and trade certifications.',
          },
        },
      ],
    }, null, 2),
    lastUpdated: '2026-09-16T08:00:00.000Z',
  },
];

// Initial Sitemap Config
export const INITIAL_CMS_SITEMAP: CMSSitemapConfig = {
  excludedUrls: ['/admin', '/login', '/api'],
  customUrls: [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/how-it-works', priority: '0.8', changefreq: 'monthly' },
    { url: '/about-us', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  ],
  autoGenerate: true,
  lastRegenerated: '2026-09-16T08:00:00.000Z',
};

// Initial Robots.txt Config
export const INITIAL_CMS_ROBOTS: CMSRobotsConfig = {
  content: `# Robots.txt for RC Call Elite (calleliterc.com)
User-agent: *
Allow: /
Allow: /services
Allow: /services/*
Allow: /about-us
Allow: /how-it-works
Allow: /contact

# Disallow Private & Admin Consoles
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*
Disallow: /login

# Sitemap Reference
Sitemap: https://calleliterc.com/sitemap.xml
`,
  lastUpdated: '2026-09-16T08:00:00.000Z',
  isCustom: false,
};

