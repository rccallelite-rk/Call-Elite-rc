import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Logo } from '../components/Logo';
import { useCMS } from '../context/CMSContext';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';

// Views
import { AdminDashboardView } from '../components/admin/views/AdminDashboardView';
import { AdminWebsiteView } from '../components/admin/views/AdminWebsiteView';
import { AdminServicesView } from '../components/admin/views/AdminServicesView';
import { AdminBookingsView } from '../components/admin/views/AdminBookingsView';
import { AdminLeadsView } from '../components/admin/views/AdminLeadsView';
import { AdminCustomersView } from '../components/admin/views/AdminCustomersView';
import { AdminPagesView } from '../components/admin/views/AdminPagesView';
import { AdminMediaView } from '../components/admin/views/AdminMediaView';
import { AdminSEOView } from '../components/admin/views/AdminSEOView';
import { AdminNavigationView } from '../components/admin/views/AdminNavigationView';
import { AdminHomepageView } from '../components/admin/views/AdminHomepageView';
import { AdminReviewsView } from '../components/admin/views/AdminReviewsView';
import { AdminServiceAreasView } from '../components/admin/views/AdminServiceAreasView';
import { AdminContactView } from '../components/admin/views/AdminContactView';
import { AdminWebsiteSettingsView } from '../components/admin/views/AdminWebsiteSettingsView';
import { AdminProfileView } from '../components/admin/views/AdminProfileView';
import { AdminActivityLogView } from '../components/admin/views/AdminActivityLogView';
import { AdminTrashView } from '../components/admin/views/AdminTrashView';
import { AdminTechnicalSEOView } from '../components/admin/views/AdminTechnicalSEOView';
import { AdminFAQsView } from '../components/admin/views/AdminFAQsView';

export const AdminPage: React.FC = () => {
  const { bookings, leads, trash, refreshFromServer } = useCMS();

  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('rc_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab navigation
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Resizable and Collapsible Sidebar State (with persistent preferences)
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('rc_admin_sidebar_width');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 220 && parsed <= 420) {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    return 260; // Clean default width
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rc_admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [isResizing, setIsResizing] = useState(false);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('rc_admin_sidebar_collapsed', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleStartResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If collapsed, expand when user starts dragging the border
    if (isSidebarCollapsed) {
      setIsSidebarCollapsed(false);
      try {
        localStorage.setItem('rc_admin_sidebar_collapsed', 'false');
      } catch {
        // Ignore
      }
    }

    setIsResizing(true);
  };

  // Mouse drag listeners for real-time smooth resizing
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Clamped between min 220px and max 420px
      const newWidth = Math.min(Math.max(e.clientX, 220), 420);
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Persist sidebar width when resize ends
  useEffect(() => {
    if (!isResizing) {
      try {
        localStorage.setItem('rc_admin_sidebar_width', sidebarWidth.toString());
      } catch {
        // Ignore
      }
    }
  }, [sidebarWidth, isResizing]);

  // Quick action states
  const [serviceModalTrigger, setServiceModalTrigger] = useState(0);
  const [areaModalTrigger, setAreaModalTrigger] = useState(0);

  const tabTitles: Record<AdminTab, string> = {
    dashboard: 'Dashboard Overview',
    website: 'Website Content Hub',
    services: 'Service Catalog Management',
    bookings: 'Doorstep Service Bookings',
    leads: 'Customer Leads & Inquiries CRM',
    customers: 'Customer Directory',
    pages: 'Static Pages Management',
    media: 'Media Library Assets',
    seo: 'SEO & Metadata Center',
    'technical-seo': 'Technical SEO Control Center',
    faqs: 'Frequently Asked Questions (FAQs)',
    trash: 'Trash Vault & Recovery',
    navigation: 'Website Navigation Menu',
    homepage: 'Homepage Layout & Banner Editor',
    reviews: 'Customer Testimonials & Reviews',
    'service-areas': 'Service Coverage Areas',
    'contact-settings': 'Contact & Address Settings',
    'website-settings': 'Global Website Settings',
    'admin-profile': 'Administrator Profile & Security',
    'activity-log': 'System Activity Audit Log',
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim().toLowerCase();
    // Support default secure PINs: 8722, admin, 1234
    if (clean === '8722' || clean === 'admin' || clean === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('rc_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid access PIN. (Default master PIN: 8722 or admin)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('rc_admin_auth');
    setCurrentTab('dashboard');
  };

  const pendingBookingsCount = bookings.filter(
    b => b.status === 'Pending' || b.status === 'Confirmed'
  ).length;

  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  // LOGIN GATE IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071324] flex items-center justify-center p-4 relative overflow-hidden">
        <SEOHead
          title="Admin Portal Login | RC Call Elite"
          description="Administrative control center and content management system for RC Call Elite."
        />

        {/* Ambient background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E53935]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 relative z-10 border border-slate-100">
          <div className="text-center space-y-3 mb-8">
            <div className="flex justify-center">
              <Logo variant="light" size="xl" showText={false} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0A192F] tracking-tight">
                RC CALL <span className="text-[#BA1B22]">ELITE</span>
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-[#BA1B22] mt-0.5">
                Full Website Management & CMS
              </p>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Enter authorized PIN or master password to access the administration suite.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Administrator Access PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Default: 8722)"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:bg-white transition-all"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              {pinError && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-red-600 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#E53935] hover:bg-[#c62828] text-white font-black text-sm shadow-lg shadow-red-500/20 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>RC Call Elite CMS v3.0</span>
              <span className="font-mono font-bold text-slate-600">PIN: 8722</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // FULL ADMIN / CMS WORKSPACE (Separate Layout Regions: [ SIDEBAR ] [ MAIN CONTENT ])
  return (
    <div className="h-screen w-full flex bg-[#F8FAFC] text-slate-800">
      <SEOHead
        title={`${tabTitles[currentTab]} | RC Call Elite CMS`}
        description="Comprehensive Content Management System & Operational Hub for RC Call Elite."
      />

      {/* 18-ITEM RESIZABLE & COLLAPSIBLE SIDEBAR */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={tab => {
          setCurrentTab(tab);
          setIsMobileSidebarOpen(false);
        }}
        onLogout={handleLogout}
        pendingBookingsCount={pendingBookingsCount}
        newLeadsCount={newLeadsCount}
        trashCount={trash.length}
        isOpenMobile={isMobileSidebarOpen}
        onToggleMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        width={sidebarWidth}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onStartResize={handleStartResize}
        isResizing={isResizing}
      />

      {/* MAIN VIEWPORT REGION (Independent Vertical Scroll, Never Covered by Sidebar) */}
      <div
        id="admin-main-scroll-container"
        className="flex-1 min-w-0 min-h-0 h-screen flex flex-col overflow-y-auto"
      >
        {/* Sticky Header */}
        <AdminHeader
          currentTab={currentTab}
          onToggleMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onToggleCollapse={handleToggleCollapse}
          isSidebarCollapsed={isSidebarCollapsed}
          onQuickAddService={() => {
            setCurrentTab('services');
            setServiceModalTrigger(prev => prev + 1);
          }}
          onRefreshData={refreshFromServer}
          tabTitles={tabTitles}
        />

        {/* VIEW CONTENT CONTAINER (Tables scroll horizontally inside their card containers) */}
        <main className="flex-1 min-h-0 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto min-w-0 pb-24">
          {currentTab === 'dashboard' && (
            <AdminDashboardView
              onNavigateTab={tab => setCurrentTab(tab as AdminTab)}
              onNavigate={tab => setCurrentTab(tab as AdminTab)}
              onOpenNewService={() => {
                setCurrentTab('services');
                setServiceModalTrigger(prev => prev + 1);
              }}
              onOpenNewArea={() => {
                setCurrentTab('service-areas');
                setAreaModalTrigger(prev => prev + 1);
              }}
            />
          )}

          {currentTab === 'website' && (
            <AdminWebsiteView
              onNavigateTab={tab => setCurrentTab(tab as AdminTab)}
              onNavigate={tab => setCurrentTab(tab as AdminTab)}
            />
          )}

          {currentTab === 'services' && (
            <AdminServicesView openNewModalTrigger={serviceModalTrigger} />
          )}

          {currentTab === 'bookings' && <AdminBookingsView />}

          {currentTab === 'leads' && <AdminLeadsView />}

          {currentTab === 'customers' && <AdminCustomersView />}

          {currentTab === 'pages' && <AdminPagesView />}

          {currentTab === 'faqs' && <AdminFAQsView />}

          {currentTab === 'media' && <AdminMediaView />}

          {currentTab === 'seo' && <AdminSEOView />}

          {currentTab === 'technical-seo' && <AdminTechnicalSEOView />}

          {currentTab === 'trash' && <AdminTrashView />}

          {currentTab === 'navigation' && <AdminNavigationView />}

          {currentTab === 'homepage' && <AdminHomepageView />}

          {currentTab === 'reviews' && <AdminReviewsView />}

          {currentTab === 'service-areas' && (
            <AdminServiceAreasView openNewModalTrigger={areaModalTrigger} />
          )}

          {currentTab === 'contact-settings' && <AdminContactView />}

          {currentTab === 'website-settings' && <AdminWebsiteSettingsView />}

          {currentTab === 'admin-profile' && <AdminProfileView />}

          {currentTab === 'activity-log' && <AdminActivityLogView />}
        </main>
      </div>
    </div>
  );
};
