export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  iconName: string;
  imageUrl: string;
  bgLight: string;
  categoryType: 'appointment' | 'consultation';
  popular?: boolean;
}

export interface PopularService {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  imageUrl: string;
  badge?: string;
}

export interface ServiceProblem {
  title: string;
  description: string;
}

export interface ServiceIncludedItem {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  aliases?: string[];
  name: string;
  category: string;
  categoryType: 'appointment' | 'consultation';
  rating?: number;
  reviewsCount?: number;
  startingPrice?: string;
  pricingDisclaimer: string;
  heroImage: string;
  shortDescription: string;
  aboutTitle: string;
  aboutContent: string[];
  commonProblemsTitle: string;
  commonProblems: ServiceProblem[];
  whatsIncluded: ServiceIncludedItem[];
  howItWorks: { step: number; title: string; description: string }[];
  whyChoosePoints: { title: string; description: string }[];
  serviceAreas: string[];
  faqs: ServiceFAQ[];
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
  };
  relatedServiceSlugs: string[];
}

export interface BookingFormData {
  serviceId?: string;
  serviceName: string;
  serviceType: 'appointment' | 'consultation';
  dateOption: 'today' | 'tomorrow' | 'custom';
  customDate: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  problemDescription?: string;
  notes?: string;
}

export interface ProjectEnquiryData {
  serviceName: string;
  customerName: string;
  customerPhone: string;
  projectType: string;
  location: string;
  approxArea: string;
  requirement: string;
  preferredContactTime: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Technician Assigned' | 'In Progress' | 'Completed' | 'Cancelled';
export type ProjectStatus = 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Proposal Sent' | 'Converted' | 'Closed';
export type ContactStatus = 'New' | 'Read' | 'Resolved';

export interface StoredBooking {
  id: string;
  refCode: string;
  serviceName: string;
  serviceType: 'appointment' | 'consultation';
  dateOption: 'today' | 'tomorrow' | 'custom';
  scheduledDate: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  problemDescription?: string;
  notes?: string;
  createdAt: string;
  status: BookingStatus;
  assignedTechnician?: string;
  estimatedAmount?: string;
}

export interface StoredProjectEnquiry {
  id: string;
  refCode: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  projectType: string;
  location: string;
  approxArea: string;
  requirement: string;
  preferredContactTime: string;
  createdAt: string;
  status: ProjectStatus;
  budgetRange?: string;
}

export interface StoredContactMessage {
  id: string;
  name: string;
  phone: string;
  service: string;
  location: string;
  message: string;
  createdAt: string;
  status: ContactStatus;
}

// ==========================================
// FULL WEBSITE CMS TYPES
// ==========================================

export type ServiceStatus = 'Active' | 'Draft' | 'Inactive';

export interface CMSService extends ServiceDetail {
  id: string;
  status: ServiceStatus;
  priceType?: string;
  fullDescription?: string;
  featuredImage: string;
  galleryImages: string[];
  ctaButtonText: string;
  ctaButtonLink: string;
  lastUpdated: string;
}

export interface CMSPageSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  enabled: boolean;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  heroHeading: string;
  heroDescription: string;
  heroImage?: string;
  ctaText?: string;
  ctaLink?: string;
  status?: 'Published' | 'Draft';
  sections: CMSPageSection[];
  faqs?: ServiceFAQ[];
  seo: {
    title: string;
    metaDescription: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
  lastUpdated: string;
}

export interface CMSHomepageContent {
  heroHeading: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  sectionsOrder: string[];
  sectionVisibility: Record<string, boolean>;
  sectionTitles: Record<string, string>;
  sectionDescriptions: Record<string, string>;
  lastUpdated: string;
}

export interface CMSNavigationItem {
  id: string;
  label: string;
  path: string;
  order: number;
  visible: boolean;
  isSystem: boolean;
}

export interface CMSFooterContent {
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  copyrightText: string;
  quickLinks: { label: string; path: string }[];
  serviceLinks: { label: string; path: string }[];
  socialLinks: { platform: string; url: string }[];
}

export interface CMSMediaItem {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  url: string;
  altText: string;
  uploadDate: string;
  usedBy: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Interested' | 'Converted' | 'Not Interested' | 'Closed';

export interface CMSLead {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  service: string;
  location: string;
  requirement: string;
  source: string;
  createdAt: string;
  date?: string;
  status: LeadStatus;
  notes: string;
}

export interface CMSCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  servicesUsed: string[];
  totalBookings: number;
  totalEnquiries: number;
  lastContact: string;
  status: 'Active' | 'VIP' | 'Lead' | 'Inactive';
  notes?: string;
}

export interface CMSReview {
  id: string;
  customerName: string;
  reviewText: string;
  rating: number;
  date: string;
  serviceName: string;
  service?: string;
  photoUrl?: string;
  status: 'Published' | 'Draft';
}

export interface CMSServiceArea {
  id: string;
  name: string;
  pincode?: string;
  zone: string;
  status: 'Active' | 'Inactive';
}

export interface CMSContactSettings {
  businessName: string;
  phone: string;
  primaryPhone?: string;
  whatsapp: string;
  whatsappNumber?: string;
  email: string;
  supportEmail?: string;
  businessAddress: string;
  address?: string;
  businessHours: string;
  workingHours?: string;
  googleMapsUrl: string;
  socialLinks: { platform: string; url: string }[];
}

export interface CMSWebsiteSettings {
  businessName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryContact: string;
  whatsapp: string;
  email: string;
  businessHours: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage: string;
  brandColor: string;
  announcementBarEnabled?: boolean;
  announcementText?: string;
  announcementLink?: string;
  footerText?: string;
  copyrightText?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
}

export interface CMSActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details: string;
  timestamp: string;
  operator: string;
  user?: string;
}

// 2-Stage Soft Delete / Trash
export interface CMSTrashItem {
  id: string;
  originalId: string;
  type: 'service' | 'page' | 'booking' | 'lead' | 'customer' | 'review' | 'area' | 'media' | 'faq' | 'redirect';
  title: string;
  deletedAt: string;
  deletedBy: string;
  data: any;
}

// Version History & Rollback
export interface CMSRevision {
  id: string;
  entityType: 'service' | 'page' | 'homepage' | 'seo';
  entityId: string;
  version: number;
  timestamp: string;
  updatedBy: string;
  summary: string;
  snapshot: any;
}

// SEO Redirects (301/302)
export interface CMSRedirect {
  id: string;
  fromPath: string;
  toPath: string;
  type: 301 | 302;
  enabled: boolean;
  createdAt: string;
  notes?: string;
}

// Global & Scoped FAQs
export interface CMSFAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  scope: 'global' | 'service' | 'page';
  targetSlug?: string;
  associatedTarget?: string;
  order: number;
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

// Structured Data Schema JSON-LD
export interface CMSSchemaConfig {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
  isDefault?: boolean;
  jsonLd: string;
  lastUpdated: string;
}

// Sitemap Settings
export interface CMSSitemapConfig {
  excludedUrls: string[];
  customUrls: { url: string; priority: string; changefreq: string }[];
  autoGenerate: boolean;
  lastRegenerated: string;
}

// Robots.txt Settings
export interface CMSRobotsConfig {
  content: string;
  lastUpdated: string;
  isCustom: boolean;
}

