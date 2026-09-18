import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  StoredBooking,
  CMSTrashItem,
  CMSRevision,
  CMSRedirect,
  CMSFAQItem,
  CMSSchemaConfig,
  CMSSitemapConfig,
  CMSRobotsConfig,
} from '../types';
import {
  INITIAL_CMS_SERVICES,
  INITIAL_CMS_PAGES,
  INITIAL_CMS_HOMEPAGE,
  INITIAL_CMS_NAVIGATION,
  INITIAL_CMS_FOOTER,
  INITIAL_CMS_MEDIA,
  INITIAL_CMS_LEADS,
  INITIAL_CMS_CUSTOMERS,
  INITIAL_CMS_REVIEWS,
  INITIAL_CMS_SERVICE_AREAS,
  INITIAL_CMS_CONTACT,
  INITIAL_CMS_SETTINGS,
  INITIAL_CMS_ACTIVITY_LOGS,
  INITIAL_CMS_TRASH,
  INITIAL_CMS_REVISIONS,
  INITIAL_CMS_REDIRECTS,
  INITIAL_CMS_FAQS,
  INITIAL_CMS_SCHEMAS,
  INITIAL_CMS_SITEMAP,
  INITIAL_CMS_ROBOTS,
} from '../data/cmsInitialData';
import { getBookings } from '../utils/bookingStore';

const STORAGE_KEYS = {
  SERVICES: 'rc_cms_services_v2',
  PAGES: 'rc_cms_pages_v2',
  HOMEPAGE: 'rc_cms_homepage_v2',
  NAVIGATION: 'rc_cms_navigation_v2',
  FOOTER: 'rc_cms_footer_v2',
  MEDIA: 'rc_cms_media_v2',
  LEADS: 'rc_cms_leads_v2',
  CUSTOMERS: 'rc_cms_customers_v2',
  REVIEWS: 'rc_cms_reviews_v2',
  AREAS: 'rc_cms_areas_v2',
  CONTACT: 'rc_cms_contact_v2',
  SETTINGS: 'rc_cms_settings_v2',
  LOGS: 'rc_cms_logs_v2',
  TRASH: 'rc_cms_trash_v2',
  REVISIONS: 'rc_cms_revisions_v2',
  REDIRECTS: 'rc_cms_redirects_v2',
  FAQS: 'rc_cms_faqs_v2',
  SCHEMAS: 'rc_cms_schemas_v2',
  SITEMAP: 'rc_cms_sitemap_v2',
  ROBOTS: 'rc_cms_robots_v2',
};

// Safe LocalStorage Helper
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to store key ${key}:`, err);
  }
}

export interface CMSContextType {
  // Core collections
  services: CMSService[];
  pages: Record<string, CMSPage>;
  homepageContent: CMSHomepageContent;
  navigation: CMSNavigationItem[];
  footer: CMSFooterContent;
  media: CMSMediaItem[];
  bookings: StoredBooking[];
  leads: CMSLead[];
  customers: CMSCustomer[];
  reviews: CMSReview[];
  serviceAreas: CMSServiceArea[];
  contactSettings: CMSContactSettings;
  websiteSettings: CMSWebsiteSettings;
  activityLogs: CMSActivityLog[];

  // Trash & Recovery Vault
  trash: CMSTrashItem[];
  moveToTrash: (item: { id: string; title: string; type: CMSTrashItem['type']; data: any }) => void;
  restoreFromTrash: (trashId: string) => void;
  permanentlyDelete: (trashId: string) => void;
  emptyTrash: () => void;

  // Version History & Revisions
  revisions: CMSRevision[];
  createRevision: (entityType: CMSRevision['entityType'], entityId: string, summary: string, snapshot: any) => void;
  getRevisionsFor: (entityType: CMSRevision['entityType'], entityId: string) => CMSRevision[];
  restoreRevision: (revisionId: string) => void;

  // Technical SEO
  redirects: CMSRedirect[];
  saveRedirect: (redirect: CMSRedirect) => void;
  deleteRedirect: (id: string) => void;
  duplicateRedirect: (id: string) => void;
  toggleRedirect: (id: string) => void;

  sitemap: CMSSitemapConfig;
  updateSitemapConfig: (config: Partial<CMSSitemapConfig>) => void;
  regenerateSitemap: () => void;

  robots: CMSRobotsConfig;
  saveRobotsConfig: (content: string) => void;
  resetRobotsToDefault: () => void;

  schemas: CMSSchemaConfig[];
  saveSchema: (schema: CMSSchemaConfig) => void;
  deleteSchema: (id: string) => void;
  toggleSchema: (id: string) => void;
  resetSchemasToDefault: () => void;

  // FAQs (Global, Service, Page)
  faqs: CMSFAQItem[];
  saveFAQ: (faq: CMSFAQItem) => void;
  deleteFAQ: (id: string) => void;
  duplicateFAQ: (id: string) => void;
  toggleFAQStatus: (id: string) => void;
  reorderFAQs: (orderedList: CMSFAQItem[]) => void;

  // Queries
  getService: (slug: string) => CMSService | undefined;
  getPage: (slug: string) => CMSPage | undefined;

  // Service Operations
  saveService: (service: CMSService) => void;
  deleteService: (id: string) => void; // Soft deletes to trash
  duplicateService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  reorderServices: (orderedServices: CMSService[]) => void;
  bulkUpdateServicesStatus: (ids: string[], status: 'Active' | 'Draft' | 'Inactive') => void;
  bulkTrashServices: (ids: string[]) => void;

  // Page Operations
  savePage: (slug: string, page: CMSPage) => void;
  deletePage: (slug: string) => void;
  duplicatePage: (slug: string) => void;

  // Homepage Operations
  saveHomepage: (content: CMSHomepageContent) => void;
  saveNavigation: (items: CMSNavigationItem[]) => void;
  saveFooter: (footer: CMSFooterContent) => void;

  // Media Operations
  addMedia: (item: CMSMediaItem) => void;
  deleteMedia: (id: string) => void;
  updateMediaAlt: (id: string, altText: string) => void;
  updateMediaMeta: (id: string, meta: { altText?: string; caption?: string; description?: string }) => void;

  // Bookings CRM
  saveBookingRecord: (booking: StoredBooking) => void;
  deleteBookingRecord: (id: string) => void;
  updateBookingStatus: (id: string, status: StoredBooking['status'], notes?: string) => void;
  bulkUpdateBookingsStatus: (ids: string[], status: StoredBooking['status']) => void;
  bulkTrashBookings: (ids: string[]) => void;

  // Leads CRM
  saveLead: (lead: CMSLead) => void;
  deleteLead: (id: string) => void;
  duplicateLead: (id: string) => void;
  updateLeadStatus: (id: string, status: CMSLead['status'], notes?: string) => void;
  bulkUpdateLeadsStatus: (ids: string[], status: CMSLead['status']) => void;
  bulkTrashLeads: (ids: string[]) => void;
  addLead: (leadData: Partial<CMSLead> & { name?: string; phone: string; service: string; location?: string; message?: string }) => void;

  // Customer Management
  saveCustomer: (customer: CMSCustomer) => void;
  deleteCustomer: (id: string) => void;
  mergeCustomers: (primaryId: string, duplicateId: string) => void;

  // Reviews
  saveReview: (review: CMSReview) => void;
  deleteReview: (id: string) => void;
  duplicateReview: (id: string) => void;
  toggleReviewStatus: (id: string) => void;

  // Service Areas
  saveArea: (area: CMSServiceArea) => void;
  deleteArea: (id: string) => void;
  duplicateArea: (id: string) => void;
  toggleAreaStatus: (id: string) => void;
  reorderAreas: (orderedAreas: CMSServiceArea[]) => void;

  // Contact & Website Settings
  saveContactSettings: (settings: CMSContactSettings) => void;
  saveContact: (settings: CMSContactSettings) => void;
  saveWebsiteSettings: (settings: CMSWebsiteSettings) => void;

  // Admin Profile & System
  adminUser: { name: string; email: string; role: string; lastLogin: string };
  updateAdminProfile: (profile: { name: string; email: string; role?: string; newPin?: string }) => void;

  logActivity: (action: string, entity: string, details: string) => void;
  refreshAll: () => void;
  refreshFromServer: () => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<CMSService[]>(() =>
    getStored(STORAGE_KEYS.SERVICES, INITIAL_CMS_SERVICES)
  );
  const [pages, setPages] = useState<Record<string, CMSPage>>(() =>
    getStored(STORAGE_KEYS.PAGES, INITIAL_CMS_PAGES)
  );
  const [homepageContent, setHomepageContent] = useState<CMSHomepageContent>(() =>
    getStored(STORAGE_KEYS.HOMEPAGE, INITIAL_CMS_HOMEPAGE)
  );
  const [navigation, setNavigation] = useState<CMSNavigationItem[]>(() =>
    getStored(STORAGE_KEYS.NAVIGATION, INITIAL_CMS_NAVIGATION)
  );
  const [footer, setFooter] = useState<CMSFooterContent>(() =>
    getStored(STORAGE_KEYS.FOOTER, INITIAL_CMS_FOOTER)
  );
  const [media, setMedia] = useState<CMSMediaItem[]>(() =>
    getStored(STORAGE_KEYS.MEDIA, INITIAL_CMS_MEDIA)
  );
  const [bookings, setBookings] = useState<StoredBooking[]>(() => getBookings());
  const [leads, setLeads] = useState<CMSLead[]>(() =>
    getStored(STORAGE_KEYS.LEADS, INITIAL_CMS_LEADS)
  );
  const [customers, setCustomers] = useState<CMSCustomer[]>(() =>
    getStored(STORAGE_KEYS.CUSTOMERS, INITIAL_CMS_CUSTOMERS)
  );
  const [reviews, setReviews] = useState<CMSReview[]>(() =>
    getStored(STORAGE_KEYS.REVIEWS, INITIAL_CMS_REVIEWS)
  );
  const [serviceAreas, setServiceAreas] = useState<CMSServiceArea[]>(() =>
    getStored(STORAGE_KEYS.AREAS, INITIAL_CMS_SERVICE_AREAS)
  );
  const [contactSettings, setContactSettings] = useState<CMSContactSettings>(() =>
    getStored(STORAGE_KEYS.CONTACT, INITIAL_CMS_CONTACT)
  );
  const [websiteSettings, setWebsiteSettings] = useState<CMSWebsiteSettings>(() =>
    getStored(STORAGE_KEYS.SETTINGS, INITIAL_CMS_SETTINGS)
  );
  const [activityLogs, setActivityLogs] = useState<CMSActivityLog[]>(() =>
    getStored(STORAGE_KEYS.LOGS, INITIAL_CMS_ACTIVITY_LOGS)
  );

  // New Super Admin Data Collections
  const [trash, setTrash] = useState<CMSTrashItem[]>(() =>
    getStored(STORAGE_KEYS.TRASH, INITIAL_CMS_TRASH)
  );
  const [revisions, setRevisions] = useState<CMSRevision[]>(() =>
    getStored(STORAGE_KEYS.REVISIONS, INITIAL_CMS_REVISIONS)
  );
  const [redirects, setRedirects] = useState<CMSRedirect[]>(() =>
    getStored(STORAGE_KEYS.REDIRECTS, INITIAL_CMS_REDIRECTS)
  );
  const [faqs, setFaqs] = useState<CMSFAQItem[]>(() =>
    getStored(STORAGE_KEYS.FAQS, INITIAL_CMS_FAQS)
  );
  const [schemas, setSchemas] = useState<CMSSchemaConfig[]>(() =>
    getStored(STORAGE_KEYS.SCHEMAS, INITIAL_CMS_SCHEMAS)
  );
  const [sitemap, setSitemap] = useState<CMSSitemapConfig>(() =>
    getStored(STORAGE_KEYS.SITEMAP, INITIAL_CMS_SITEMAP)
  );
  const [robots, setRobots] = useState<CMSRobotsConfig>(() =>
    getStored(STORAGE_KEYS.ROBOTS, INITIAL_CMS_ROBOTS)
  );

  const [adminUser, setAdminUser] = useState(() =>
    getStored('rc_admin_profile_v1', {
      name: 'Super Admin',
      email: 'rccallelite@gmail.com',
      role: 'Super Administrator',
      lastLogin: new Date().toISOString(),
    })
  );

  // Sync to server API
  const syncToServer = useCallback(async (endpoint: string, payload: unknown) => {
    try {
      await fetch(`/api/cms/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Offline fallback
    }
  }, []);

  const logActivity = useCallback((action: string, entity: string, details: string) => {
    const newLog: CMSActivityLog = {
      id: 'act-' + Date.now(),
      action,
      entity,
      details,
      timestamp: new Date().toISOString(),
      operator: 'Super Administrator (rccallelite@gmail.com)',
    };
    setActivityLogs(prev => {
      const updated = [newLog, ...prev.slice(0, 199)];
      setStored(STORAGE_KEYS.LOGS, updated);
      syncToServer('logs', updated);
      return updated;
    });
  }, [syncToServer]);

  // Revisions & Version History
  const createRevision = useCallback(
    (entityType: CMSRevision['entityType'], entityId: string, summary: string, snapshot: any) => {
      const existing = revisions.filter(r => r.entityType === entityType && r.entityId === entityId);
      const nextVersion = existing.length + 1;
      const newRev: CMSRevision = {
        id: `rev-${entityType}-${entityId}-${Date.now()}`,
        entityType,
        entityId,
        version: nextVersion,
        timestamp: new Date().toISOString(),
        updatedBy: adminUser.name || 'Super Admin',
        summary,
        snapshot: JSON.parse(JSON.stringify(snapshot)),
      };
      setRevisions(prev => {
        const updated = [newRev, ...prev.slice(0, 150)];
        setStored(STORAGE_KEYS.REVISIONS, updated);
        syncToServer('revisions', updated);
        return updated;
      });
    },
    [adminUser.name, revisions, syncToServer]
  );

  const getRevisionsFor = useCallback(
    (entityType: CMSRevision['entityType'], entityId: string) => {
      return revisions.filter(r => r.entityType === entityType && r.entityId === entityId);
    },
    [revisions]
  );

  // Soft Delete / Trash System
  const moveToTrash = useCallback(
    (item: { id: string; title: string; type: CMSTrashItem['type']; data: any }) => {
      const trashRecord: CMSTrashItem = {
        id: `trash-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        originalId: item.id,
        type: item.type,
        title: item.title,
        deletedAt: new Date().toISOString(),
        deletedBy: adminUser.name || 'Super Admin',
        data: item.data,
      };

      setTrash(prev => {
        const updated = [trashRecord, ...prev];
        setStored(STORAGE_KEYS.TRASH, updated);
        syncToServer('trash', updated);
        return updated;
      });

      logActivity('Moved to Trash', item.title, `Soft deleted ${item.type} (can be restored from Trash)`);
    },
    [adminUser.name, logActivity, syncToServer]
  );

  const restoreFromTrash = useCallback(
    (trashId: string) => {
      const item = trash.find(t => t.id === trashId);
      if (!item) return;

      // Restore to appropriate active collection
      if (item.type === 'service' && item.data) {
        setServices(prev => {
          const updated = [item.data, ...prev.filter(s => s.id !== item.data.id)];
          setStored(STORAGE_KEYS.SERVICES, updated);
          syncToServer('services', updated);
          return updated;
        });
      } else if (item.type === 'page' && item.data) {
        setPages(prev => {
          const updated = { ...prev, [item.originalId]: item.data };
          setStored(STORAGE_KEYS.PAGES, updated);
          syncToServer('pages', updated);
          return updated;
        });
      } else if (item.type === 'booking' && item.data) {
        setBookings(prev => {
          const updated = [item.data, ...prev.filter(b => b.id !== item.data.id)];
          try {
            localStorage.setItem('rc_call_elite_bookings_v1', JSON.stringify(updated));
          } catch {}
          syncToServer('bookings', updated);
          return updated;
        });
      } else if (item.type === 'lead' && item.data) {
        setLeads(prev => {
          const updated = [item.data, ...prev.filter(l => l.id !== item.data.id)];
          setStored(STORAGE_KEYS.LEADS, updated);
          syncToServer('leads', updated);
          return updated;
        });
      } else if (item.type === 'customer' && item.data) {
        setCustomers(prev => {
          const updated = [item.data, ...prev.filter(c => c.id !== item.data.id)];
          setStored(STORAGE_KEYS.CUSTOMERS, updated);
          syncToServer('customers', updated);
          return updated;
        });
      } else if (item.type === 'review' && item.data) {
        setReviews(prev => {
          const updated = [item.data, ...prev.filter(r => r.id !== item.data.id)];
          setStored(STORAGE_KEYS.REVIEWS, updated);
          syncToServer('reviews', updated);
          return updated;
        });
      } else if (item.type === 'area' && item.data) {
        setServiceAreas(prev => {
          const updated = [item.data, ...prev.filter(a => a.id !== item.data.id)];
          setStored(STORAGE_KEYS.AREAS, updated);
          syncToServer('areas', updated);
          return updated;
        });
      } else if (item.type === 'media' && item.data) {
        setMedia(prev => {
          const updated = [item.data, ...prev.filter(m => m.id !== item.data.id)];
          setStored(STORAGE_KEYS.MEDIA, updated);
          syncToServer('media', updated);
          return updated;
        });
      } else if (item.type === 'faq' && item.data) {
        setFaqs(prev => {
          const updated = [item.data, ...prev.filter(f => f.id !== item.data.id)];
          setStored(STORAGE_KEYS.FAQS, updated);
          syncToServer('faqs', updated);
          return updated;
        });
      } else if (item.type === 'redirect' && item.data) {
        setRedirects(prev => {
          const updated = [item.data, ...prev.filter(r => r.id !== item.data.id)];
          setStored(STORAGE_KEYS.REDIRECTS, updated);
          syncToServer('redirects', updated);
          return updated;
        });
      }

      // Remove from trash
      setTrash(prev => {
        const updated = prev.filter(t => t.id !== trashId);
        setStored(STORAGE_KEYS.TRASH, updated);
        syncToServer('trash', updated);
        return updated;
      });

      logActivity('Restored from Trash', item.title, `Successfully restored ${item.type} back to live database`);
    },
    [logActivity, syncToServer, trash]
  );

  const permanentlyDelete = useCallback(
    (trashId: string) => {
      const item = trash.find(t => t.id === trashId);
      setTrash(prev => {
        const updated = prev.filter(t => t.id !== trashId);
        setStored(STORAGE_KEYS.TRASH, updated);
        syncToServer('trash', updated);
        return updated;
      });
      if (item) {
        logActivity('Permanently Deleted', item.title, `Hard delete executed on ${item.type} from Trash Vault`);
      }
    },
    [logActivity, syncToServer, trash]
  );

  const emptyTrash = useCallback(() => {
    setTrash([]);
    setStored(STORAGE_KEYS.TRASH, []);
    syncToServer('trash', []);
    logActivity('Trash Emptied', 'All Items', 'Permanently cleared all records from Trash Vault');
  }, [logActivity, syncToServer]);

  // Restore Revision
  const restoreRevision = useCallback(
    (revisionId: string) => {
      const rev = revisions.find(r => r.id === revisionId);
      if (!rev) return;

      if (rev.entityType === 'service' && rev.snapshot) {
        setServices(prev => {
          const index = prev.findIndex(s => s.id === rev.entityId);
          const updated = [...prev];
          if (index >= 0) updated[index] = rev.snapshot;
          else updated.unshift(rev.snapshot);
          setStored(STORAGE_KEYS.SERVICES, updated);
          syncToServer('services', updated);
          return updated;
        });
        logActivity('Revision Restored', rev.snapshot.name || rev.entityId, `Restored Version ${rev.version}`);
      } else if (rev.entityType === 'homepage' && rev.snapshot) {
        setHomepageContent(rev.snapshot);
        setStored(STORAGE_KEYS.HOMEPAGE, rev.snapshot);
        syncToServer('homepage', rev.snapshot);
        logActivity('Revision Restored', 'Homepage Sections', `Restored Version ${rev.version}`);
      } else if (rev.entityType === 'page' && rev.snapshot) {
        setPages(prev => {
          const updated = { ...prev, [rev.entityId]: rev.snapshot };
          setStored(STORAGE_KEYS.PAGES, updated);
          syncToServer('pages', updated);
          return updated;
        });
        logActivity('Revision Restored', `Page: ${rev.entityId}`, `Restored Version ${rev.version}`);
      }
    },
    [logActivity, revisions, syncToServer]
  );

  // Refresh All from Server
  const refreshAll = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/all');
      if (res.ok) {
        const serverData = await res.json();
        if (serverData.services) {
          setServices(serverData.services);
          setStored(STORAGE_KEYS.SERVICES, serverData.services);
        }
        if (serverData.pages) {
          setPages(serverData.pages);
          setStored(STORAGE_KEYS.PAGES, serverData.pages);
        }
        if (serverData.homepage) {
          setHomepageContent(serverData.homepage);
          setStored(STORAGE_KEYS.HOMEPAGE, serverData.homepage);
        }
        if (serverData.navigation) {
          setNavigation(serverData.navigation);
          setStored(STORAGE_KEYS.NAVIGATION, serverData.navigation);
        }
        if (serverData.footer) {
          setFooter(serverData.footer);
          setStored(STORAGE_KEYS.FOOTER, serverData.footer);
        }
        if (serverData.media) {
          setMedia(serverData.media);
          setStored(STORAGE_KEYS.MEDIA, serverData.media);
        }
        if (serverData.leads) {
          setLeads(serverData.leads);
          setStored(STORAGE_KEYS.LEADS, serverData.leads);
        }
        if (serverData.customers) {
          setCustomers(serverData.customers);
          setStored(STORAGE_KEYS.CUSTOMERS, serverData.customers);
        }
        if (serverData.reviews) {
          setReviews(serverData.reviews);
          setStored(STORAGE_KEYS.REVIEWS, serverData.reviews);
        }
        if (serverData.areas) {
          setServiceAreas(serverData.areas);
          setStored(STORAGE_KEYS.AREAS, serverData.areas);
        }
        if (serverData.contact) {
          setContactSettings(serverData.contact);
          setStored(STORAGE_KEYS.CONTACT, serverData.contact);
        }
        if (serverData.settings) {
          setWebsiteSettings(serverData.settings);
          setStored(STORAGE_KEYS.SETTINGS, serverData.settings);
        }
        if (serverData.trash) {
          setTrash(serverData.trash);
          setStored(STORAGE_KEYS.TRASH, serverData.trash);
        }
        if (serverData.revisions) {
          setRevisions(serverData.revisions);
          setStored(STORAGE_KEYS.REVISIONS, serverData.revisions);
        }
        if (serverData.redirects) {
          setRedirects(serverData.redirects);
          setStored(STORAGE_KEYS.REDIRECTS, serverData.redirects);
        }
        if (serverData.faqs) {
          setFaqs(serverData.faqs);
          setStored(STORAGE_KEYS.FAQS, serverData.faqs);
        }
        if (serverData.schemas) {
          setSchemas(serverData.schemas);
          setStored(STORAGE_KEYS.SCHEMAS, serverData.schemas);
        }
        if (serverData.sitemap) {
          setSitemap(serverData.sitemap);
          setStored(STORAGE_KEYS.SITEMAP, serverData.sitemap);
        }
        if (serverData.robots) {
          setRobots(serverData.robots);
          setStored(STORAGE_KEYS.ROBOTS, serverData.robots);
        }
      }
    } catch {
      // Offline fallback
    }

    setBookings(getBookings());
    setActivityLogs(getStored(STORAGE_KEYS.LOGS, INITIAL_CMS_ACTIVITY_LOGS));
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Lookups
  const getService = useCallback(
    (slug: string) => {
      return services.find(
        s =>
          s.slug === slug ||
          (s.aliases && s.aliases.includes(slug)) ||
          s.slug === slug.replace(/^\/services\//, '')
      );
    },
    [services]
  );

  const getPage = useCallback(
    (slug: string) => {
      const cleanSlug = slug === '' || slug === '/' ? 'home' : slug.replace(/^\//, '');
      return pages[cleanSlug];
    },
    [pages]
  );

  // Service Mutations
  const saveService = useCallback(
    (service: CMSService) => {
      // Create version snapshot before saving
      const existing = services.find(s => s.id === service.id);
      if (existing) {
        createRevision('service', service.id, `Updated service details for ${service.name}`, existing);
      }

      setServices(prev => {
        const index = prev.findIndex(s => s.id === service.id);
        const updated = [...prev];
        const stampedService: CMSService = {
          ...service,
          lastUpdated: new Date().toISOString(),
        };

        if (index >= 0) {
          updated[index] = stampedService;
        } else {
          updated.unshift(stampedService);
        }

        setStored(STORAGE_KEYS.SERVICES, updated);
        syncToServer('services', updated);
        return updated;
      });

      logActivity('Service Saved', service.name, `Catalog entry updated: /services/${service.slug}`);
    },
    [createRevision, logActivity, services, syncToServer]
  );

  const deleteService = useCallback(
    (id: string) => {
      const target = services.find(s => s.id === id);
      if (!target) return;

      // Soft delete to Trash Vault!
      moveToTrash({
        id: target.id,
        title: target.name,
        type: 'service',
        data: target,
      });

      setServices(prev => {
        const updated = prev.filter(s => s.id !== id);
        setStored(STORAGE_KEYS.SERVICES, updated);
        syncToServer('services', updated);
        return updated;
      });
    },
    [moveToTrash, services, syncToServer]
  );

  const duplicateService = useCallback(
    (id: string) => {
      const orig = services.find(s => s.id === id);
      if (!orig) return;

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const safeSlug = `${orig.slug}-draft-copy-${randomSuffix}`;
      const newId = `srv-${Date.now()}-${randomSuffix}`;

      // Clean duplicate copy: clear canonical URL, ensure Draft status
      const copy: CMSService = {
        ...JSON.parse(JSON.stringify(orig)),
        id: newId,
        name: `${orig.name} (Draft Copy)`,
        slug: safeSlug,
        status: 'Draft',
        lastUpdated: new Date().toISOString(),
        seo: orig.seo
          ? {
              ...orig.seo,
              canonicalUrl: '', // DO NOT copy conflicting canonical URL
              metaTitle: `${orig.seo.metaTitle || orig.name} (Draft Copy)`,
            }
          : undefined,
      };

      setServices(prev => {
        const updated = [copy, ...prev];
        setStored(STORAGE_KEYS.SERVICES, updated);
        syncToServer('services', updated);
        return updated;
      });

      logActivity(
        'Service Duplicated',
        copy.name,
        `Created safe draft copy with unique slug: /services/${copy.slug}`
      );
    },
    [logActivity, services, syncToServer]
  );

  const toggleServiceStatus = useCallback(
    (id: string) => {
      setServices(prev => {
        const updated = prev.map(s => {
          if (s.id === id) {
            const nextStatus: CMSService['status'] = s.status === 'Active' ? 'Draft' : 'Active';
            return {
              ...s,
              status: nextStatus,
              lastUpdated: new Date().toISOString(),
            };
          }
          return s;
        });
        setStored(STORAGE_KEYS.SERVICES, updated);
        syncToServer('services', updated);
        return updated;
      });
      const srv = services.find(s => s.id === id);
      if (srv) {
        logActivity('Service Status Toggled', srv.name, `Status toggled to ${srv.status === 'Active' ? 'Draft' : 'Active'}`);
      }
    },
    [logActivity, services, syncToServer]
  );

  const reorderServices = useCallback(
    (orderedServices: CMSService[]) => {
      setServices(orderedServices);
      setStored(STORAGE_KEYS.SERVICES, orderedServices);
      syncToServer('services', orderedServices);
      logActivity('Services Reordered', 'Catalog Layout', `Updated presentation order for ${orderedServices.length} services`);
    },
    [logActivity, syncToServer]
  );

  const bulkUpdateServicesStatus = useCallback(
    (ids: string[], status: 'Active' | 'Draft' | 'Inactive') => {
      setServices(prev => {
        const updated = prev.map(s => (ids.includes(s.id) ? { ...s, status, lastUpdated: new Date().toISOString() } : s));
        setStored(STORAGE_KEYS.SERVICES, updated);
        syncToServer('services', updated);
        return updated;
      });
      logActivity('Bulk Services Status', `${ids.length} Services`, `Bulk updated status to ${status}`);
    },
    [logActivity, syncToServer]
  );

  const bulkTrashServices = useCallback(
    (ids: string[]) => {
      const targets = services.filter(s => ids.includes(s.id));
      for (const t of targets) {
        moveToTrash({
          id: t.id,
          title: t.name,
          type: 'service',
          data: t,
        });
      }
      setServices(prev => {
        const updated = prev.filter(s => !ids.includes(s.id));
        setStored(STORAGE_KEYS.SERVICES, updated);
        syncToServer('services', updated);
        return updated;
      });
      logActivity('Bulk Services Moved to Trash', `${targets.length} Services`, 'Moved services to Trash Vault');
    },
    [logActivity, moveToTrash, services, syncToServer]
  );

  // Page Mutations
  const savePage = useCallback(
    (slug: string, page: CMSPage) => {
      const cleanSlug = slug === '' || slug === '/' ? 'home' : slug.replace(/^\//, '');
      const existing = pages[cleanSlug];
      if (existing) {
        createRevision('page', cleanSlug, `Updated page content for ${page.title}`, existing);
      }

      setPages(prev => {
        const updated = {
          ...prev,
          [cleanSlug]: {
            ...page,
            lastUpdated: new Date().toISOString(),
          },
        };
        setStored(STORAGE_KEYS.PAGES, updated);
        syncToServer('pages', updated);
        return updated;
      });

      logActivity('Page Saved', page.title, `Updated page slug: /${cleanSlug}`);
    },
    [createRevision, logActivity, pages, syncToServer]
  );

  const deletePage = useCallback(
    (slug: string) => {
      const cleanSlug = slug.replace(/^\//, '');
      const protectedSlugs = ['home', 'services', 'about-us', 'contact', 'how-it-works'];
      if (protectedSlugs.includes(cleanSlug)) {
        alert(`Cannot delete critical system page: /${cleanSlug}. This route is essential for website structure.`);
        return;
      }

      const target = pages[cleanSlug];
      if (!target) return;

      moveToTrash({
        id: cleanSlug,
        title: target.title,
        type: 'page',
        data: target,
      });

      setPages(prev => {
        const updated = { ...prev };
        delete updated[cleanSlug];
        setStored(STORAGE_KEYS.PAGES, updated);
        syncToServer('pages', updated);
        return updated;
      });
    },
    [moveToTrash, pages, syncToServer]
  );

  const duplicatePage = useCallback(
    (slug: string) => {
      const cleanSlug = slug.replace(/^\//, '');
      const target = pages[cleanSlug];
      if (!target) return;

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newSlug = `${cleanSlug}-copy-${randomSuffix}`;
      const copy: CMSPage = {
        ...JSON.parse(JSON.stringify(target)),
        slug: newSlug,
        title: `${target.title} (Draft Copy)`,
        status: 'Draft',
        lastUpdated: new Date().toISOString(),
        seo: target.seo
          ? {
              ...target.seo,
              canonicalUrl: '',
              metaTitle: `${target.seo.metaTitle || target.title} (Draft Copy)`,
            }
          : undefined,
      };

      setPages(prev => {
        const updated = { ...prev, [newSlug]: copy };
        setStored(STORAGE_KEYS.PAGES, updated);
        syncToServer('pages', updated);
        return updated;
      });

      logActivity('Page Duplicated', copy.title, `Created draft page copy at /${newSlug}`);
    },
    [logActivity, pages, syncToServer]
  );

  // Homepage Mutations
  const saveHomepage = useCallback(
    (content: CMSHomepageContent) => {
      createRevision('homepage', 'home', 'Updated homepage layout, text, or sections', homepageContent);

      const stamped: CMSHomepageContent = {
        ...content,
        lastUpdated: new Date().toISOString(),
      };
      setHomepageContent(stamped);
      setStored(STORAGE_KEYS.HOMEPAGE, stamped);
      syncToServer('homepage', stamped);
      logActivity('Homepage Updated', 'Homepage Sections', 'Modified hero banner, text, or section order');
    },
    [createRevision, homepageContent, logActivity, syncToServer]
  );

  // Navigation Mutations
  const saveNavigation = useCallback(
    (items: CMSNavigationItem[]) => {
      setNavigation(items);
      setStored(STORAGE_KEYS.NAVIGATION, items);
      syncToServer('navigation', items);
      logActivity('Navigation Updated', 'Header Menu', `Reconfigured ${items.length} primary navigation routes`);
    },
    [logActivity, syncToServer]
  );

  // Footer Mutations
  const saveFooter = useCallback(
    (footerContent: CMSFooterContent) => {
      setFooter(footerContent);
      setStored(STORAGE_KEYS.FOOTER, footerContent);
      syncToServer('footer', footerContent);
      logActivity('Footer Updated', 'Site Footer', 'Updated contact numbers, address, or footer links');
    },
    [logActivity, syncToServer]
  );

  // Media Library Mutations
  const addMedia = useCallback(
    (item: CMSMediaItem) => {
      setMedia(prev => {
        const updated = [item, ...prev];
        setStored(STORAGE_KEYS.MEDIA, updated);
        syncToServer('media', updated);
        return updated;
      });
      logActivity('Media Uploaded', item.fileName, `Added media asset: ${item.fileSize}`);
    },
    [logActivity, syncToServer]
  );

  const deleteMedia = useCallback(
    (id: string) => {
      const target = media.find(m => m.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: target.fileName,
          type: 'media',
          data: target,
        });
      }
      setMedia(prev => {
        const updated = prev.filter(m => m.id !== id);
        setStored(STORAGE_KEYS.MEDIA, updated);
        syncToServer('media', updated);
        return updated;
      });
    },
    [media, moveToTrash, syncToServer]
  );

  const updateMediaAlt = useCallback(
    (id: string, altText: string) => {
      setMedia(prev => {
        const updated = prev.map(m => (m.id === id ? { ...m, altText } : m));
        setStored(STORAGE_KEYS.MEDIA, updated);
        syncToServer('media', updated);
        return updated;
      });
    },
    [syncToServer]
  );

  const updateMediaMeta = useCallback(
    (id: string, meta: { altText?: string; caption?: string; description?: string }) => {
      setMedia(prev => {
        const updated = prev.map(m => (m.id === id ? { ...m, ...meta } : m));
        setStored(STORAGE_KEYS.MEDIA, updated);
        syncToServer('media', updated);
        return updated;
      });
      logActivity('Media Metadata Updated', id, 'Updated image alt tag, caption, or description');
    },
    [logActivity, syncToServer]
  );

  // Bookings Mutations
  const saveBookingRecord = useCallback(
    (booking: StoredBooking) => {
      setBookings(prev => {
        const index = prev.findIndex(b => b.id === booking.id);
        const updated = [...prev];
        if (index >= 0) {
          updated[index] = booking;
        } else {
          updated.unshift(booking);
        }
        try {
          localStorage.setItem('rc_call_elite_bookings_v1', JSON.stringify(updated));
        } catch {}
        syncToServer('bookings', updated);
        return updated;
      });
      logActivity('Booking Saved', booking.refCode, `Order status: ${booking.status}`);
    },
    [logActivity, syncToServer]
  );

  const updateBookingStatus = useCallback(
    (id: string, status: StoredBooking['status'], notes?: string) => {
      setBookings(prev => {
        const updated = prev.map(b => (b.id === id ? { ...b, status, ...(notes ? { notes } : {}) } : b));
        try {
          localStorage.setItem('rc_call_elite_bookings_v1', JSON.stringify(updated));
        } catch {}
        syncToServer('bookings', updated);
        return updated;
      });
      const b = bookings.find(b => b.id === id);
      logActivity('Booking Status Changed', b?.refCode || id, `Status changed to ${status}`);
    },
    [bookings, logActivity, syncToServer]
  );

  const deleteBookingRecord = useCallback(
    (id: string) => {
      const target = bookings.find(b => b.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: `Booking #${target.refCode} (${target.serviceName})`,
          type: 'booking',
          data: target,
        });
      }
      setBookings(prev => {
        const updated = prev.filter(b => b.id !== id);
        try {
          localStorage.setItem('rc_call_elite_bookings_v1', JSON.stringify(updated));
        } catch {}
        syncToServer('bookings', updated);
        return updated;
      });
    },
    [bookings, moveToTrash, syncToServer]
  );

  const bulkUpdateBookingsStatus = useCallback(
    (ids: string[], status: StoredBooking['status']) => {
      setBookings(prev => {
        const updated = prev.map(b => (ids.includes(b.id) ? { ...b, status } : b));
        try {
          localStorage.setItem('rc_call_elite_bookings_v1', JSON.stringify(updated));
        } catch {}
        syncToServer('bookings', updated);
        return updated;
      });
      logActivity('Bulk Bookings Status', `${ids.length} Bookings`, `Changed status to ${status}`);
    },
    [logActivity, syncToServer]
  );

  const bulkTrashBookings = useCallback(
    (ids: string[]) => {
      const targets = bookings.filter(b => ids.includes(b.id));
      for (const t of targets) {
        moveToTrash({
          id: t.id,
          title: `Booking #${t.refCode} (${t.serviceName})`,
          type: 'booking',
          data: t,
        });
      }
      setBookings(prev => {
        const updated = prev.filter(b => !ids.includes(b.id));
        try {
          localStorage.setItem('rc_call_elite_bookings_v1', JSON.stringify(updated));
        } catch {}
        syncToServer('bookings', updated);
        return updated;
      });
    },
    [bookings, moveToTrash, syncToServer]
  );

  // Leads CRM Mutations
  const saveLead = useCallback(
    (lead: CMSLead) => {
      setLeads(prev => {
        const index = prev.findIndex(l => l.id === lead.id);
        const updated = [...prev];
        if (index >= 0) {
          updated[index] = lead;
        } else {
          updated.unshift(lead);
        }
        setStored(STORAGE_KEYS.LEADS, updated);
        syncToServer('leads', updated);
        return updated;
      });
      logActivity('Lead Saved', lead.customerName, `Status: ${lead.status} for ${lead.service}`);
    },
    [logActivity, syncToServer]
  );

  const updateLeadStatus = useCallback(
    (id: string, status: CMSLead['status'], notes?: string) => {
      setLeads(prev => {
        const updated = prev.map(l => (l.id === id ? { ...l, status, ...(notes ? { notes } : {}) } : l));
        setStored(STORAGE_KEYS.LEADS, updated);
        syncToServer('leads', updated);
        return updated;
      });
      const lead = leads.find(l => l.id === id);
      logActivity('Lead Status Changed', lead?.customerName || id, `Status changed to ${status}`);
    },
    [leads, logActivity, syncToServer]
  );

  const deleteLead = useCallback(
    (id: string) => {
      const target = leads.find(l => l.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: `Lead: ${target.customerName} (${target.service})`,
          type: 'lead',
          data: target,
        });
      }
      setLeads(prev => {
        const updated = prev.filter(l => l.id !== id);
        setStored(STORAGE_KEYS.LEADS, updated);
        syncToServer('leads', updated);
        return updated;
      });
    },
    [leads, moveToTrash, syncToServer]
  );

  const duplicateLead = useCallback(
    (id: string) => {
      const target = leads.find(l => l.id === id);
      if (!target) return;
      const copy: CMSLead = {
        ...JSON.parse(JSON.stringify(target)),
        id: `lead-${Date.now()}`,
        customerName: `${target.customerName} (Copy)`,
        status: 'New',
        date: new Date().toISOString(),
      };
      setLeads(prev => {
        const updated = [copy, ...prev];
        setStored(STORAGE_KEYS.LEADS, updated);
        syncToServer('leads', updated);
        return updated;
      });
      logActivity('Lead Duplicated', copy.customerName, `Duplicated enquiry for ${copy.service}`);
    },
    [leads, logActivity, syncToServer]
  );

  const bulkUpdateLeadsStatus = useCallback(
    (ids: string[], status: CMSLead['status']) => {
      setLeads(prev => {
        const updated = prev.map(l => (ids.includes(l.id) ? { ...l, status } : l));
        setStored(STORAGE_KEYS.LEADS, updated);
        syncToServer('leads', updated);
        return updated;
      });
      logActivity('Bulk Leads Status', `${ids.length} Leads`, `Changed status to ${status}`);
    },
    [logActivity, syncToServer]
  );

  const bulkTrashLeads = useCallback(
    (ids: string[]) => {
      const targets = leads.filter(l => ids.includes(l.id));
      for (const t of targets) {
        moveToTrash({
          id: t.id,
          title: `Lead: ${t.customerName} (${t.service})`,
          type: 'lead',
          data: t,
        });
      }
      setLeads(prev => {
        const updated = prev.filter(l => !ids.includes(l.id));
        setStored(STORAGE_KEYS.LEADS, updated);
        syncToServer('leads', updated);
        return updated;
      });
    },
    [leads, moveToTrash, syncToServer]
  );

  const addLead = useCallback(
    (leadData: Partial<CMSLead> & { name?: string; phone: string; service: string; location?: string; message?: string }) => {
      const newLead: CMSLead = {
        id: 'lead-' + Date.now(),
        customerName: leadData.name || leadData.customerName || 'Anonymous Customer',
        phone: leadData.phone,
        email: leadData.email || 'Not Provided',
        service: leadData.service,
        location: leadData.location || 'Bangalore',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        requirement: leadData.requirement || leadData.message || 'General Enquiry',
        status: 'New',
        source: leadData.source || 'Website CTA',
        notes: leadData.message || leadData.notes || '',
      };
      setLeads(prev => {
        const updated = [newLead, ...prev];
        setStored(STORAGE_KEYS.LEADS, updated);
        syncToServer('leads', updated);
        return updated;
      });
      logActivity('New Enquiry Received', newLead.customerName, `${newLead.service} in ${newLead.location}`);
    },
    [logActivity, syncToServer]
  );

  // Customers Mutations
  const saveCustomer = useCallback(
    (customer: CMSCustomer) => {
      setCustomers(prev => {
        const index = prev.findIndex(c => c.id === customer.id);
        const updated = [...prev];
        if (index >= 0) {
          updated[index] = customer;
        } else {
          updated.unshift(customer);
        }
        setStored(STORAGE_KEYS.CUSTOMERS, updated);
        syncToServer('customers', updated);
        return updated;
      });
      logActivity('Customer Saved', customer.name, `Phone: ${customer.phone}`);
    },
    [logActivity, syncToServer]
  );

  const deleteCustomer = useCallback(
    (id: string) => {
      const target = customers.find(c => c.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: `Customer: ${target.name} (${target.phone})`,
          type: 'customer',
          data: target,
        });
      }
      setCustomers(prev => {
        const updated = prev.filter(c => c.id !== id);
        setStored(STORAGE_KEYS.CUSTOMERS, updated);
        syncToServer('customers', updated);
        return updated;
      });
    },
    [customers, moveToTrash, syncToServer]
  );

  const mergeCustomers = useCallback(
    (primaryId: string, duplicateId: string) => {
      const primary = customers.find(c => c.id === primaryId);
      const duplicate = customers.find(c => c.id === duplicateId);
      if (!primary || !duplicate) return;

      const merged: CMSCustomer = {
        ...primary,
        totalBookings: (primary.totalBookings || 0) + (duplicate.totalBookings || 0),
        totalSpent: `₹${(
          parseInt((primary.totalSpent || '₹0').replace(/[^0-9]/g, '') || '0', 10) +
          parseInt((duplicate.totalSpent || '₹0').replace(/[^0-9]/g, '') || '0', 10)
        ).toLocaleString()}`,
        preferredServices: Array.from(new Set([...(primary.preferredServices || []), ...(duplicate.preferredServices || [])])),
        notes: `${primary.notes || ''}\n[Merged Record from ${duplicate.name} (${duplicate.phone})]: ${duplicate.notes || ''}`.trim(),
      };

      setCustomers(prev => {
        const updated = prev.filter(c => c.id !== duplicateId).map(c => (c.id === primaryId ? merged : c));
        setStored(STORAGE_KEYS.CUSTOMERS, updated);
        syncToServer('customers', updated);
        return updated;
      });

      logActivity('Customers Merged', primary.name, `Merged duplicate customer #${duplicateId} into #${primaryId}`);
    },
    [customers, logActivity, syncToServer]
  );

  // Reviews Mutations
  const saveReview = useCallback(
    (review: CMSReview) => {
      setReviews(prev => {
        const index = prev.findIndex(r => r.id === review.id);
        const updated = [...prev];
        if (index >= 0) {
          updated[index] = review;
        } else {
          updated.unshift(review);
        }
        setStored(STORAGE_KEYS.REVIEWS, updated);
        syncToServer('reviews', updated);
        return updated;
      });
      logActivity('Review Saved', review.customerName, `Status: ${review.status} (${review.rating} Stars)`);
    },
    [logActivity, syncToServer]
  );

  const deleteReview = useCallback(
    (id: string) => {
      const target = reviews.find(r => r.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: `Review by ${target.customerName} (${target.rating} Stars)`,
          type: 'review',
          data: target,
        });
      }
      setReviews(prev => {
        const updated = prev.filter(r => r.id !== id);
        setStored(STORAGE_KEYS.REVIEWS, updated);
        syncToServer('reviews', updated);
        return updated;
      });
    },
    [moveToTrash, reviews, syncToServer]
  );

  const duplicateReview = useCallback(
    (id: string) => {
      const target = reviews.find(r => r.id === id);
      if (!target) return;
      const copy: CMSReview = {
        ...JSON.parse(JSON.stringify(target)),
        id: `rev-copy-${Date.now()}`,
        customerName: `${target.customerName} (Copy)`,
        status: 'Draft',
        date: 'Recent',
      };
      setReviews(prev => {
        const updated = [copy, ...prev];
        setStored(STORAGE_KEYS.REVIEWS, updated);
        syncToServer('reviews', updated);
        return updated;
      });
      logActivity('Review Duplicated', copy.customerName, `Draft copy of review for ${copy.service}`);
    },
    [logActivity, reviews, syncToServer]
  );

  const toggleReviewStatus = useCallback(
    (id: string) => {
      setReviews(prev => {
        const updated = prev.map(r => (r.id === id ? { ...r, status: r.status === 'Published' ? 'Draft' : 'Published' } : r));
        setStored(STORAGE_KEYS.REVIEWS, updated);
        syncToServer('reviews', updated);
        return updated;
      });
      const r = reviews.find(r => r.id === id);
      logActivity('Review Status Toggled', r?.customerName || id, `Status set to ${r?.status === 'Published' ? 'Draft' : 'Published'}`);
    },
    [logActivity, reviews, syncToServer]
  );

  // Service Areas Mutations
  const saveArea = useCallback(
    (area: CMSServiceArea) => {
      setServiceAreas(prev => {
        const index = prev.findIndex(a => a.id === area.id);
        const updated = [...prev];
        if (index >= 0) {
          updated[index] = area;
        } else {
          updated.unshift(area);
        }
        setStored(STORAGE_KEYS.AREAS, updated);
        syncToServer('areas', updated);
        return updated;
      });
      logActivity('Service Area Saved', area.name, `Status: ${area.status} in ${area.zone}`);
    },
    [logActivity, syncToServer]
  );

  const deleteArea = useCallback(
    (id: string) => {
      const target = serviceAreas.find(a => a.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: `Service Area: ${target.name} (${target.zone})`,
          type: 'area',
          data: target,
        });
      }
      setServiceAreas(prev => {
        const updated = prev.filter(a => a.id !== id);
        setStored(STORAGE_KEYS.AREAS, updated);
        syncToServer('areas', updated);
        return updated;
      });
    },
    [moveToTrash, serviceAreas, syncToServer]
  );

  const duplicateArea = useCallback(
    (id: string) => {
      const target = serviceAreas.find(a => a.id === id);
      if (!target) return;
      const copy: CMSServiceArea = {
        ...JSON.parse(JSON.stringify(target)),
        id: `area-${Date.now()}`,
        name: `${target.name} (Copy)`,
        status: 'Inactive',
      };
      setServiceAreas(prev => {
        const updated = [copy, ...prev];
        setStored(STORAGE_KEYS.AREAS, updated);
        syncToServer('areas', updated);
        return updated;
      });
      logActivity('Service Area Duplicated', copy.name, `Created copy of ${target.name}`);
    },
    [logActivity, serviceAreas, syncToServer]
  );

  const toggleAreaStatus = useCallback(
    (id: string) => {
      setServiceAreas(prev => {
        const updated = prev.map(a => (a.id === id ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a));
        setStored(STORAGE_KEYS.AREAS, updated);
        syncToServer('areas', updated);
        return updated;
      });
      const a = serviceAreas.find(a => a.id === id);
      logActivity('Service Area Status Toggled', a?.name || id, `Status set to ${a?.status === 'Active' ? 'Inactive' : 'Active'}`);
    },
    [logActivity, serviceAreas, syncToServer]
  );

  const reorderAreas = useCallback(
    (orderedAreas: CMSServiceArea[]) => {
      setServiceAreas(orderedAreas);
      setStored(STORAGE_KEYS.AREAS, orderedAreas);
      syncToServer('areas', orderedAreas);
      logActivity('Service Areas Reordered', 'Coverage Order', `Updated order for ${orderedAreas.length} localities`);
    },
    [logActivity, syncToServer]
  );

  // Technical SEO: Redirects Mutations
  const saveRedirect = useCallback(
    (redirect: CMSRedirect) => {
      // Prevent simple redirect loops
      if (redirect.fromPath.toLowerCase() === redirect.toPath.toLowerCase()) {
        alert('Invalid redirect: destination path cannot be identical to origin path (redirect loop).');
        return;
      }
      setRedirects(prev => {
        const index = prev.findIndex(r => r.id === redirect.id);
        const updated = [...prev];
        if (index >= 0) {
          updated[index] = redirect;
        } else {
          updated.unshift(redirect);
        }
        setStored(STORAGE_KEYS.REDIRECTS, updated);
        syncToServer('redirects', updated);
        return updated;
      });
      logActivity('Redirect Saved', redirect.fromPath, `Redirects to ${redirect.toPath} (${redirect.type})`);
    },
    [logActivity, syncToServer]
  );

  const deleteRedirect = useCallback(
    (id: string) => {
      const target = redirects.find(r => r.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: `Redirect: ${target.fromPath} -> ${target.toPath}`,
          type: 'redirect',
          data: target,
        });
      }
      setRedirects(prev => {
        const updated = prev.filter(r => r.id !== id);
        setStored(STORAGE_KEYS.REDIRECTS, updated);
        syncToServer('redirects', updated);
        return updated;
      });
    },
    [moveToTrash, redirects, syncToServer]
  );

  const duplicateRedirect = useCallback(
    (id: string) => {
      const target = redirects.find(r => r.id === id);
      if (!target) return;
      const copy: CMSRedirect = {
        ...JSON.parse(JSON.stringify(target)),
        id: `red-${Date.now()}`,
        fromPath: `${target.fromPath}-copy`,
        enabled: false,
        createdAt: new Date().toISOString(),
      };
      setRedirects(prev => {
        const updated = [copy, ...prev];
        setStored(STORAGE_KEYS.REDIRECTS, updated);
        syncToServer('redirects', updated);
        return updated;
      });
      logActivity('Redirect Duplicated', copy.fromPath, `Created draft copy for ${target.fromPath}`);
    },
    [logActivity, redirects, syncToServer]
  );

  const toggleRedirect = useCallback(
    (id: string) => {
      setRedirects(prev => {
        const updated = prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r));
        setStored(STORAGE_KEYS.REDIRECTS, updated);
        syncToServer('redirects', updated);
        return updated;
      });
      const r = redirects.find(r => r.id === id);
      logActivity('Redirect Toggled', r?.fromPath || id, `Enabled status toggled to ${!r?.enabled}`);
    },
    [logActivity, redirects, syncToServer]
  );

  // Technical SEO: Sitemap Mutations
  const updateSitemapConfig = useCallback(
    (config: Partial<CMSSitemapConfig>) => {
      setSitemap(prev => {
        const updated = {
          ...prev,
          ...config,
          lastRegenerated: new Date().toISOString(),
        };
        setStored(STORAGE_KEYS.SITEMAP, updated);
        syncToServer('sitemap', updated);
        return updated;
      });
      logActivity('Sitemap Config Updated', 'XML Sitemap', 'Updated excluded paths or automatic regeneration settings');
    },
    [logActivity, syncToServer]
  );

  const regenerateSitemap = useCallback(() => {
    setSitemap(prev => {
      const updated = {
        ...prev,
        lastRegenerated: new Date().toISOString(),
      };
      setStored(STORAGE_KEYS.SITEMAP, updated);
      syncToServer('sitemap', updated);
      return updated;
    });
    logActivity('Sitemap Regenerated', 'sitemap.xml', 'Force refreshed all verified production URLs');
  }, [logActivity, syncToServer]);

  // Technical SEO: Robots.txt Mutations
  const saveRobotsConfig = useCallback(
    (content: string) => {
      const config: CMSRobotsConfig = {
        content,
        lastUpdated: new Date().toISOString(),
        isCustom: true,
      };
      setRobots(config);
      setStored(STORAGE_KEYS.ROBOTS, config);
      syncToServer('robots', config);
      logActivity('robots.txt Published', 'Robots Rules', 'Published updated web crawler directives');
    },
    [logActivity, syncToServer]
  );

  const resetRobotsToDefault = useCallback(() => {
    setRobots(INITIAL_CMS_ROBOTS);
    setStored(STORAGE_KEYS.ROBOTS, INITIAL_CMS_ROBOTS);
    syncToServer('robots', INITIAL_CMS_ROBOTS);
    logActivity('robots.txt Restored', 'Default Robots Rules', 'Reset crawler directives to initial production baseline');
  }, [logActivity, syncToServer]);

  // Technical SEO: Schema JSON-LD Mutations
  const saveSchema = useCallback(
    (schema: CMSSchemaConfig) => {
      // Validate valid JSON
      try {
        JSON.parse(schema.jsonLd);
      } catch (err) {
        alert('Invalid JSON-LD syntax. Please correct JSON formatting before saving.');
        return;
      }

      setSchemas(prev => {
        const index = prev.findIndex(s => s.id === schema.id);
        const updated = [...prev];
        const stamped: CMSSchemaConfig = {
          ...schema,
          lastUpdated: new Date().toISOString(),
        };
        if (index >= 0) updated[index] = stamped;
        else updated.unshift(stamped);
        setStored(STORAGE_KEYS.SCHEMAS, updated);
        syncToServer('schemas', updated);
        return updated;
      });
      logActivity('Schema Saved', schema.name, `Updated Schema.org ${schema.type} JSON-LD definition`);
    },
    [logActivity, syncToServer]
  );

  const deleteSchema = useCallback(
    (id: string) => {
      setSchemas(prev => {
        const updated = prev.filter(s => s.id !== id);
        setStored(STORAGE_KEYS.SCHEMAS, updated);
        syncToServer('schemas', updated);
        return updated;
      });
      logActivity('Schema Deleted', id, 'Removed structured data schema definition');
    },
    [logActivity, syncToServer]
  );

  const toggleSchema = useCallback(
    (id: string) => {
      setSchemas(prev => {
        const updated = prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s));
        setStored(STORAGE_KEYS.SCHEMAS, updated);
        syncToServer('schemas', updated);
        return updated;
      });
      const s = schemas.find(s => s.id === id);
      logActivity('Schema Toggled', s?.name || id, `Status set to ${!s?.enabled}`);
    },
    [logActivity, schemas, syncToServer]
  );

  const resetSchemasToDefault = useCallback(() => {
    setSchemas(INITIAL_CMS_SCHEMAS);
    setStored(STORAGE_KEYS.SCHEMAS, INITIAL_CMS_SCHEMAS);
    syncToServer('schemas', INITIAL_CMS_SCHEMAS);
    logActivity('Schemas Reset', 'Default Schemas', 'Restored verified LocalBusiness and FAQPage Schema');
  }, [logActivity, syncToServer]);

  // FAQs (Global, Service, Page)
  const saveFAQ = useCallback(
    (faq: CMSFAQItem) => {
      setFaqs(prev => {
        const index = prev.findIndex(f => f.id === faq.id);
        const updated = [...prev];
        const stamped: CMSFAQItem = {
          ...faq,
          lastUpdated: new Date().toISOString(),
        };
        if (index >= 0) updated[index] = stamped;
        else updated.unshift(stamped);
        setStored(STORAGE_KEYS.FAQS, updated);
        syncToServer('faqs', updated);
        return updated;
      });
      logActivity('FAQ Saved', faq.question.substring(0, 40) + '...', `Scope: ${faq.scope} | Status: ${faq.status}`);
    },
    [logActivity, syncToServer]
  );

  const deleteFAQ = useCallback(
    (id: string) => {
      const target = faqs.find(f => f.id === id);
      if (target) {
        moveToTrash({
          id: target.id,
          title: target.question,
          type: 'faq',
          data: target,
        });
      }
      setFaqs(prev => {
        const updated = prev.filter(f => f.id !== id);
        setStored(STORAGE_KEYS.FAQS, updated);
        syncToServer('faqs', updated);
        return updated;
      });
    },
    [faqs, moveToTrash, syncToServer]
  );

  const duplicateFAQ = useCallback(
    (id: string) => {
      const target = faqs.find(f => f.id === id);
      if (!target) return;
      const copy: CMSFAQItem = {
        ...JSON.parse(JSON.stringify(target)),
        id: `faq-${Date.now()}`,
        question: `${target.question} (Copy)`,
        status: 'Draft',
        order: (target.order || 0) + 1,
        lastUpdated: new Date().toISOString(),
      };
      setFaqs(prev => {
        const updated = [copy, ...prev];
        setStored(STORAGE_KEYS.FAQS, updated);
        syncToServer('faqs', updated);
        return updated;
      });
      logActivity('FAQ Duplicated', copy.question.substring(0, 40) + '...', 'Created draft copy');
    },
    [faqs, logActivity, syncToServer]
  );

  const toggleFAQStatus = useCallback(
    (id: string) => {
      setFaqs(prev => {
        const updated = prev.map(f => (f.id === id ? { ...f, status: f.status === 'Published' ? 'Draft' : 'Published' } : f));
        setStored(STORAGE_KEYS.FAQS, updated);
        syncToServer('faqs', updated);
        return updated;
      });
      const f = faqs.find(f => f.id === id);
      logActivity('FAQ Status Toggled', f?.question.substring(0, 40) || id, `Status set to ${f?.status === 'Published' ? 'Draft' : 'Published'}`);
    },
    [faqs, logActivity, syncToServer]
  );

  const reorderFAQs = useCallback(
    (orderedList: CMSFAQItem[]) => {
      const updated = orderedList.map((f, i) => ({ ...f, order: i + 1 }));
      setFaqs(updated);
      setStored(STORAGE_KEYS.FAQS, updated);
      syncToServer('faqs', updated);
      logActivity('FAQs Reordered', 'FAQ Sequence', `Reordered ${updated.length} questions`);
    },
    [logActivity, syncToServer]
  );

  // Contact Settings
  const saveContactSettings = useCallback(
    (settings: CMSContactSettings) => {
      setContactSettings(settings);
      setStored(STORAGE_KEYS.CONTACT, settings);
      syncToServer('contact', settings);
      logActivity('Contact Settings Updated', 'Global Contact', `Phone: ${settings.phone}, Email: ${settings.email}`);
    },
    [logActivity, syncToServer]
  );

  // Website Settings
  const saveWebsiteSettings = useCallback(
    (settings: CMSWebsiteSettings) => {
      setWebsiteSettings(settings);
      setStored(STORAGE_KEYS.SETTINGS, settings);
      syncToServer('settings', settings);
      logActivity('Website Settings Updated', 'Global Brand', `Business Name: ${settings.businessName}`);
    },
    [logActivity, syncToServer]
  );

  // Profile
  const updateAdminProfile = useCallback(
    async (profile: { name: string; email: string; role?: string; newPin?: string }) => {
      const updated = {
        name: profile.name,
        email: profile.email,
        role: profile.role || 'Super Administrator',
        lastLogin: new Date().toISOString(),
      };
      setAdminUser(updated);
      setStored('rc_admin_profile_v1', updated);

      if (profile.newPin) {
        try {
          await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              currentPassword: '8722',
              newPassword: profile.newPin,
            }),
          });
        } catch {}
      }

      logActivity('Admin Profile Updated', updated.email, 'Updated super admin credentials and profile settings');
    },
    [logActivity]
  );

  // Factory Reset
  const resetToDefaults = useCallback(() => {
    if (!window.confirm('Reset all CMS content and configuration back to factory default?')) return;
    setServices(INITIAL_CMS_SERVICES);
    setPages(INITIAL_CMS_PAGES);
    setHomepageContent(INITIAL_CMS_HOMEPAGE);
    setNavigation(INITIAL_CMS_NAVIGATION);
    setFooter(INITIAL_CMS_FOOTER);
    setMedia(INITIAL_CMS_MEDIA);
    setLeads(INITIAL_CMS_LEADS);
    setCustomers(INITIAL_CMS_CUSTOMERS);
    setReviews(INITIAL_CMS_REVIEWS);
    setServiceAreas(INITIAL_CMS_SERVICE_AREAS);
    setContactSettings(INITIAL_CMS_CONTACT);
    setWebsiteSettings(INITIAL_CMS_SETTINGS);
    setActivityLogs(INITIAL_CMS_ACTIVITY_LOGS);
    setTrash(INITIAL_CMS_TRASH);
    setRevisions(INITIAL_CMS_REVISIONS);
    setRedirects(INITIAL_CMS_REDIRECTS);
    setFaqs(INITIAL_CMS_FAQS);
    setSchemas(INITIAL_CMS_SCHEMAS);
    setSitemap(INITIAL_CMS_SITEMAP);
    setRobots(INITIAL_CMS_ROBOTS);

    setStored(STORAGE_KEYS.SERVICES, INITIAL_CMS_SERVICES);
    setStored(STORAGE_KEYS.PAGES, INITIAL_CMS_PAGES);
    setStored(STORAGE_KEYS.HOMEPAGE, INITIAL_CMS_HOMEPAGE);
    setStored(STORAGE_KEYS.NAVIGATION, INITIAL_CMS_NAVIGATION);
    setStored(STORAGE_KEYS.FOOTER, INITIAL_CMS_FOOTER);
    setStored(STORAGE_KEYS.MEDIA, INITIAL_CMS_MEDIA);
    setStored(STORAGE_KEYS.LEADS, INITIAL_CMS_LEADS);
    setStored(STORAGE_KEYS.CUSTOMERS, INITIAL_CMS_CUSTOMERS);
    setStored(STORAGE_KEYS.REVIEWS, INITIAL_CMS_REVIEWS);
    setStored(STORAGE_KEYS.AREAS, INITIAL_CMS_SERVICE_AREAS);
    setStored(STORAGE_KEYS.CONTACT, INITIAL_CMS_CONTACT);
    setStored(STORAGE_KEYS.SETTINGS, INITIAL_CMS_SETTINGS);
    setStored(STORAGE_KEYS.LOGS, INITIAL_CMS_ACTIVITY_LOGS);
    setStored(STORAGE_KEYS.TRASH, INITIAL_CMS_TRASH);
    setStored(STORAGE_KEYS.REVISIONS, INITIAL_CMS_REVISIONS);
    setStored(STORAGE_KEYS.REDIRECTS, INITIAL_CMS_REDIRECTS);
    setStored(STORAGE_KEYS.FAQS, INITIAL_CMS_FAQS);
    setStored(STORAGE_KEYS.SCHEMAS, INITIAL_CMS_SCHEMAS);
    setStored(STORAGE_KEYS.SITEMAP, INITIAL_CMS_SITEMAP);
    setStored(STORAGE_KEYS.ROBOTS, INITIAL_CMS_ROBOTS);

    logActivity('Factory Reset', 'Full CMS System', 'Restored initial catalog and settings defaults');
  }, [logActivity]);

  return (
    <CMSContext.Provider
      value={{
        services,
        pages,
        homepageContent,
        navigation,
        footer,
        media,
        bookings,
        leads,
        customers,
        reviews,
        serviceAreas,
        contactSettings,
        websiteSettings,
        activityLogs,
        trash,
        moveToTrash,
        restoreFromTrash,
        permanentlyDelete,
        emptyTrash,
        revisions,
        createRevision,
        getRevisionsFor,
        restoreRevision,
        redirects,
        saveRedirect,
        deleteRedirect,
        duplicateRedirect,
        toggleRedirect,
        sitemap,
        updateSitemapConfig,
        regenerateSitemap,
        robots,
        saveRobotsConfig,
        resetRobotsToDefault,
        schemas,
        saveSchema,
        deleteSchema,
        toggleSchema,
        resetSchemasToDefault,
        faqs,
        saveFAQ,
        deleteFAQ,
        duplicateFAQ,
        toggleFAQStatus,
        reorderFAQs,
        getService,
        getPage,
        saveService,
        deleteService,
        duplicateService,
        toggleServiceStatus,
        reorderServices,
        bulkUpdateServicesStatus,
        bulkTrashServices,
        savePage,
        deletePage,
        duplicatePage,
        saveHomepage,
        saveNavigation,
        saveFooter,
        addMedia,
        deleteMedia,
        updateMediaAlt,
        updateMediaMeta,
        saveBookingRecord,
        deleteBookingRecord,
        updateBookingStatus,
        bulkUpdateBookingsStatus,
        bulkTrashBookings,
        saveLead,
        deleteLead,
        duplicateLead,
        updateLeadStatus,
        bulkUpdateLeadsStatus,
        bulkTrashLeads,
        addLead,
        saveCustomer,
        deleteCustomer,
        mergeCustomers,
        saveReview,
        deleteReview,
        duplicateReview,
        toggleReviewStatus,
        saveArea,
        deleteArea,
        duplicateArea,
        toggleAreaStatus,
        reorderAreas,
        saveContactSettings,
        saveContact: saveContactSettings,
        saveWebsiteSettings,
        adminUser,
        updateAdminProfile,
        logActivity,
        refreshAll,
        refreshFromServer: refreshAll,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
