import React from 'react';
import {
  Globe,
  Layout,
  Wrench,
  FileText,
  Compass,
  Image,
  Search,
  PhoneCall,
  Settings,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Star,
  MapPin
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { AdminTab } from '../AdminSidebar';

interface AdminWebsiteViewProps {
  onNavigateTab?: (tab: AdminTab) => void;
  onNavigate?: (tab: AdminTab) => void;
}

export const AdminWebsiteView: React.FC<AdminWebsiteViewProps> = ({
  onNavigateTab,
  onNavigate,
}) => {
  const { services, pages, homepageContent, navigation, media, reviews, serviceAreas, websiteSettings } = useCMS();

  const handleNav = (tab: AdminTab) => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    } else if (onNavigate) {
      onNavigate(tab);
    }
  };

  const activeServicesCount = services.filter(s => s.status === 'Active').length;
  const pagesCount = Object.keys(pages).length;
  const visibleNavCount = navigation.filter(n => n.visible).length;

  const modules = [
    {
      id: 'services' as AdminTab,
      title: 'Services Directory',
      description: 'Manage 10 primary categories, pricing, descriptions, FAQs, and common problems.',
      meta: `${activeServicesCount} Active Services`,
      icon: Wrench,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'homepage' as AdminTab,
      title: 'Homepage Layout',
      description: 'Reorder sections, update hero banners, headlines, trust badges, and CTA cards.',
      meta: `${homepageContent.sectionsOrder.length} Configured Sections`,
      icon: Layout,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'pages' as AdminTab,
      title: 'Static Pages',
      description: 'Edit content for /how-it-works, /about-us, /contact, /services, and /.',
      meta: `${pagesCount} Standard Pages`,
      icon: FileText,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'navigation' as AdminTab,
      title: 'Site Navigation',
      description: 'Control top header menu links, labels, ordering, and visibility.',
      meta: `${visibleNavCount} Active Menu Items`,
      icon: Compass,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'media' as AdminTab,
      title: 'Media Library',
      description: 'Store, inspect, and link high-resolution service banners and logos.',
      meta: `${media.length} Uploaded Assets`,
      icon: Image,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      id: 'seo' as AdminTab,
      title: 'SEO Central Manager',
      description: 'Customize meta titles, descriptions, canonical tags, and OpenGraph social cards.',
      meta: 'Dynamic XML Sitemap Active',
      icon: Search,
      color: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: 'reviews' as AdminTab,
      title: 'Customer Testimonials',
      description: 'Manage published customer reviews, ratings, and verified service feedback.',
      meta: `${reviews.length} Customer Reviews`,
      icon: Star,
      color: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    },
    {
      id: 'service-areas' as AdminTab,
      title: 'Service Areas',
      description: 'Bangalore localities, operational zones, and pin code coverage lists.',
      meta: `${serviceAreas.length} Bangalore Localities`,
      icon: MapPin,
      color: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    },
    {
      id: 'contact-settings' as AdminTab,
      title: 'Contact Information',
      description: 'Phone numbers, WhatsApp gateway, address, and Google Maps embed.',
      meta: 'Real Bangalore Direct Line',
      icon: PhoneCall,
      color: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    {
      id: 'website-settings' as AdminTab,
      title: 'Brand & Global Settings',
      description: 'Site title, brand colors, favicon, logo URL, and business hours.',
      meta: websiteSettings.businessName,
      icon: Settings,
      color: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-br from-[#0A192F] to-[#1E293B] text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Content Management System Connected</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Customer Website Control Hub
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Manage every section of <strong className="text-white">RC Call Elite</strong> without touching code.
            Updates to services, pricing, navigation, SEO, and contact numbers take effect immediately on the live website.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-black px-5 py-3 rounded-xl shadow-sm transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Open Customer Site</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-3 rounded-xl border border-slate-700 transition-all"
          >
            <span>View XML Sitemap</span>
          </a>
        </div>
      </div>

      {/* Website Management Modules Grid */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          Website Content Modules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(mod => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => handleNav(mod.id)}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#E53935] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${mod.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {mod.meta}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-[#0A192F] group-hover:text-[#E53935] transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-[#E53935] transition-colors">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
