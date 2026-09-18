import React from 'react';
import { PanelLeft, ExternalLink, RefreshCw, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  currentTab: AdminTab;
  onToggleMobile: () => void;
  onToggleCollapse?: () => void;
  isSidebarCollapsed?: boolean;
  onQuickAddService: () => void;
  onRefreshData: () => void;
  tabTitles: Record<AdminTab, string>;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  onToggleMobile,
  onToggleCollapse,
  isSidebarCollapsed,
  onQuickAddService,
  onRefreshData,
  tabTitles,
}) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefreshData();
    setTimeout(() => setIsRefreshing(false), 700);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onToggleMobile}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        {/* Desktop Expand Trigger when collapsed */}
        {isSidebarCollapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-black text-[#0A192F] tracking-tight">
              {tabTitles[currentTab] || 'Admin Portal'}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live CMS Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Modifications save immediately and update customer pages in real-time.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {currentTab === 'services' && (
          <button
            onClick={onQuickAddService}
            className="inline-flex items-center gap-1.5 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-colors active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Service</span>
            <span className="sm:hidden">New</span>
          </button>
        )}

        <button
          onClick={handleRefresh}
          className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Refresh CMS Cache"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#E53935]' : ''}`} />
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            try {
              const newWin = window.open('/', '_blank');
              if (newWin) {
                e.preventDefault();
              }
            } catch {
              // Allow default anchor navigation
            }
          }}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Website</span>
        </a>
      </div>
    </header>
  );
};
