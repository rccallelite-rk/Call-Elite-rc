import React from 'react';
import { Logo } from '../Logo';
import {
  LayoutDashboard,
  Globe,
  Wrench,
  CalendarCheck,
  Users,
  UserCheck,
  FileText,
  Image,
  Search,
  Compass,
  Home,
  Star,
  MapPin,
  PhoneCall,
  Settings,
  ShieldAlert,
  History,
  LogOut,
  ChevronRight,
  Sparkles,
  ExternalLink,
  PanelLeftClose,
  PanelLeft,
  HelpCircle,
  Binary,
  Trash2,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'website'
  | 'services'
  | 'bookings'
  | 'leads'
  | 'customers'
  | 'pages'
  | 'homepage'
  | 'faqs'
  | 'navigation'
  | 'media'
  | 'reviews'
  | 'service-areas'
  | 'seo'
  | 'technical-seo'
  | 'trash'
  | 'contact-settings'
  | 'website-settings'
  | 'admin-profile'
  | 'activity-log';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  pendingBookingsCount?: number;
  newLeadsCount?: number;
  trashCount?: number;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
  width?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onStartResize?: (e: React.MouseEvent) => void;
  isResizing?: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  pendingBookingsCount = 0,
  newLeadsCount = 0,
  trashCount = 0,
  isOpenMobile,
  onToggleMobile,
  width = 260,
  isCollapsed = false,
  onToggleCollapse,
  onStartResize,
  isResizing = false,
}) => {
  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'website' as AdminTab, label: 'Website Hub', icon: Globe },
      ],
    },
    {
      title: 'CONTENT & CMS',
      items: [
        { id: 'services' as AdminTab, label: 'Services', icon: Wrench },
        { id: 'pages' as AdminTab, label: 'Pages', icon: FileText },
        { id: 'homepage' as AdminTab, label: 'Homepage Editor', icon: Home },
        { id: 'faqs' as AdminTab, label: 'FAQs Manager', icon: HelpCircle },
        { id: 'navigation' as AdminTab, label: 'Navigation', icon: Compass },
        { id: 'media' as AdminTab, label: 'Media Library', icon: Image },
        { id: 'reviews' as AdminTab, label: 'Reviews', icon: Star },
        { id: 'service-areas' as AdminTab, label: 'Service Areas', icon: MapPin },
      ],
    },
    {
      title: 'OPERATIONS & CRM',
      items: [
        {
          id: 'bookings' as AdminTab,
          label: 'Bookings',
          icon: CalendarCheck,
          badge: pendingBookingsCount > 0 ? pendingBookingsCount : undefined,
          badgeColor: 'bg-amber-500 text-white',
        },
        {
          id: 'leads' as AdminTab,
          label: 'Leads / Enquiries',
          icon: Users,
          badge: newLeadsCount > 0 ? newLeadsCount : undefined,
          badgeColor: 'bg-red-500 text-white',
        },
        { id: 'customers' as AdminTab, label: 'Customers', icon: UserCheck },
      ],
    },
    {
      title: 'SEO & SYSTEM ARCHITECTURE',
      items: [
        { id: 'seo' as AdminTab, label: 'On-Page SEO', icon: Search },
        { id: 'technical-seo' as AdminTab, label: 'Technical SEO', icon: Binary },
        {
          id: 'trash' as AdminTab,
          label: 'Trash & Recovery',
          icon: Trash2,
          badge: trashCount > 0 ? trashCount : undefined,
          badgeColor: 'bg-rose-500 text-white',
        },
        { id: 'contact-settings' as AdminTab, label: 'Contact Settings', icon: PhoneCall },
        { id: 'website-settings' as AdminTab, label: 'Website Settings', icon: Settings },
        { id: 'admin-profile' as AdminTab, label: 'Admin Profile', icon: ShieldAlert },
        { id: 'activity-log' as AdminTab, label: 'Activity Log', icon: History },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onToggleMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        style={{
          width: isCollapsed ? '72px' : `${width}px`,
        }}
        className={`bg-[#0A192F] text-slate-300 flex flex-col border-r border-slate-800 z-30 select-none ${
          /* Mobile: fixed drawer with transition */
          'max-lg:fixed max-lg:top-0 max-lg:bottom-0 max-lg:left-0 max-lg:!w-72 max-lg:z-50 max-lg:transition-transform max-lg:duration-300 max-lg:ease-in-out'
        } ${isOpenMobile ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'} ${
          /* Desktop: in-flow flex child, full-height, resizable or collapsed */
          'lg:relative lg:shrink-0 lg:h-screen lg:translate-x-0'
        } ${isResizing ? '' : 'lg:transition-[width] lg:duration-200 lg:ease-in-out'}`}
      >
        {/* Brand Header */}
        {isCollapsed ? (
          <div className="p-3 border-b border-slate-800 flex flex-col items-center gap-2.5">
            {/* Compact Eagle Crest */}
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Logo variant="dark" size="sm" showTagline={false} showText={false} />
            </div>

            {/* Expand button */}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <PanelLeft className="w-4 h-4 text-slate-300 hover:text-white" />
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
              <Logo variant="dark" size="sm" showTagline={false} />
              <span className="text-[9px] px-1.5 py-0.5 rounded font-extrabold bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
                CMS
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Desktop Collapse Button */}
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}

              {/* Mobile Drawer Close Button */}
              <button
                onClick={onToggleMobile}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden cursor-pointer"
                aria-label="Close sidebar"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Navigation Groups (Independent Scroll) */}
        <nav
          className={`flex-1 overflow-y-auto ${
            isCollapsed ? 'px-2 py-3 space-y-4' : 'px-3.5 py-4 space-y-6'
          } text-xs scrollbar-thin`}
        >
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              {/* Section Header */}
              {isCollapsed ? (
                <div
                  className="my-2 border-t border-slate-800/80 mx-1.5"
                  title={sec.title}
                />
              ) : (
                <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 truncate">
                  {sec.title}
                </div>
              )}

              {/* Section Items */}
              <div className="space-y-1">
                {sec.items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  if (isCollapsed) {
                    return (
                      <div key={item.id} className="relative group flex justify-center">
                        <button
                          onClick={() => {
                            onSelectTab(item.id);
                            if (isOpenMobile) onToggleMobile();
                          }}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer relative ${
                            isActive
                              ? 'bg-[#E53935] text-white shadow-md shadow-red-950/50'
                              : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                          }`}
                          title={item.label}
                          aria-label={item.label}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {item.badge !== undefined && (
                            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#E53935] text-white font-extrabold text-[9px] flex items-center justify-center ring-2 ring-[#0A192F]">
                              {item.badge > 99 ? '99+' : item.badge}
                            </span>
                          )}
                        </button>

                        {/* Instant Tooltip Flyout on Hover */}
                        <div className="hidden group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap z-50 pointer-events-none items-center gap-2 animate-in fade-in zoom-in-95">
                          <span>{item.label}</span>
                          {item.badge !== undefined && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#E53935] text-white font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        if (isOpenMobile) onToggleMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all duration-150 text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#E53935] text-white shadow-md shadow-red-950/50'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="truncate text-xs">{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shrink-0 ${item.badgeColor || 'bg-slate-700 text-white'}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info & Logout Footer */}
        {isCollapsed ? (
          <div className="p-2 border-t border-slate-800 bg-[#071324] flex flex-col items-center gap-2">
            {/* Live Website Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors group relative cursor-pointer"
              title="Customer Website (Live)"
            >
              <ExternalLink className="w-4 h-4" />
              <div className="hidden group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none">
                Customer Website
              </div>
            </a>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs group relative cursor-pointer"
              title="Super Administrator (rccallelite@gmail.com)"
            >
              OP
              <div className="hidden group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-xl shadow-2xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none flex-col">
                <span className="font-bold text-white">rccallelite@gmail.com</span>
                <span className="text-[10px] text-slate-400">Super Administrator</span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-800/80 rounded-xl transition-colors group relative cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
              <div className="hidden group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none">
                Logout
              </div>
            </button>
          </div>
        ) : (
          <div className="p-3.5 border-t border-slate-800 bg-[#071324] flex flex-col gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">Customer Website</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase shrink-0">Live</span>
            </a>

            <div className="flex items-center justify-between pt-1 px-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                  OP
                </div>
                <div className="truncate min-w-0">
                  <div className="text-xs font-bold text-white truncate">rccallelite@gmail.com</div>
                  <div className="text-[10px] text-slate-500 truncate">Super Administrator</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0 ml-1"
                title="Logout from Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Vertical Resize Handle (Desktop Only, Right Edge) */}
        {onStartResize && (
          <div
            onMouseDown={onStartResize}
            className="hidden lg:block absolute top-0 bottom-0 -right-1.5 w-3 cursor-col-resize select-none z-40 group"
            title="Drag to resize sidebar (220px - 420px)"
          >
            {/* Visual Indicator Line */}
            <div
              className={`w-1 h-full mx-auto transition-colors duration-150 rounded-full ${
                isResizing
                  ? 'bg-[#E53935] shadow-[0_0_8px_rgba(229,57,53,0.8)]'
                  : 'group-hover:bg-[#E53935]/80 bg-transparent'
              }`}
            />
          </div>
        )}
      </aside>
    </>
  );
};
