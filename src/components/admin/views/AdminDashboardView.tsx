import React from 'react';
import {
  CalendarCheck,
  Users,
  Wrench,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
  Sparkles,
  Phone,
  FileText,
  MapPin,
  HelpCircle,
  Layers,
  Activity
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { AdminTab } from '../AdminSidebar';

interface AdminDashboardViewProps {
  onNavigateTab?: (tab: AdminTab) => void;
  onNavigate?: (tab: AdminTab) => void;
  onOpenNewService?: () => void;
  onOpenNewArea?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onNavigateTab,
  onNavigate,
  onOpenNewService,
  onOpenNewArea,
}) => {
  const { services, bookings, leads, customers, activityLogs } = useCMS();

  // Unified resilient navigation helper
  const handleNav = (tab: AdminTab) => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    } else if (onNavigate) {
      onNavigate(tab);
    }
  };

  const handleAddService = () => {
    if (onOpenNewService) {
      onOpenNewService();
    } else {
      handleNav('services');
    }
  };

  const handleAddArea = () => {
    if (onOpenNewArea) {
      onOpenNewArea();
    } else {
      handleNav('service-areas');
    }
  };

  // Booking metrics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const assignedBookings = bookings.filter(b => b.status === 'Technician Assigned').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;
  const newBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed').length;

  // Lead metrics
  const totalLeads = leads.length;
  const newEnquiries = leads.filter(l => l.status === 'New').length;

  // Service metrics
  const totalServices = services.length;
  const activeServices = services.filter(s => s.status === 'Active').length;

  const recentBookings = bookings.slice(0, 5);
  const recentLeads = leads.slice(0, 5);
  const recentServices = [...services].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. TOP KPI METRICS GRID */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          Executive Operations Overview
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {/* Total Bookings */}
          <div
            onClick={() => handleNav('bookings')}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-xs font-bold">Total Bookings</span>
              <CalendarCheck className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A192F]">{totalBookings}</div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <span className="text-emerald-600 font-bold">{completedBookings} completed</span> • {cancelledBookings} cancelled
            </div>
          </div>

          {/* Pending / Confirmed */}
          <div
            onClick={() => handleNav('bookings')}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-xs font-bold">Pending / Action Needed</span>
              <Clock className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">{pendingBookings}</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              {confirmedBookings} confirmed • {assignedBookings} assigned
            </div>
          </div>

          {/* Total Leads & Turnkey CRM */}
          <div
            onClick={() => handleNav('leads')}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-xs font-bold">Total Leads / CRM</span>
              <Users className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-700">{totalLeads}</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              <span className="text-red-600 font-bold">{newEnquiries} new</span> enquiries awaiting contact
            </div>
          </div>

          {/* Total Services Catalog */}
          <div
            onClick={() => handleNav('services')}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-xs font-bold">Website Services</span>
              <Wrench className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">{totalServices}</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              <span className="text-emerald-700 font-bold">{activeServices} Active</span> live on website
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTIONS BAR */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
          <span>Quick Actions</span>
        </h3>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleAddService}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold shadow-xs transition-colors active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>

          <button
            onClick={() => handleNav('pages')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-600" />
            <span>Add / Edit Page</span>
          </button>

          <button
            onClick={handleAddArea}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-slate-600" />
            <span>Add Service Area</span>
          </button>

          <button
            onClick={() => handleNav('homepage')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-slate-600" />
            <span>Edit Homepage</span>
          </button>

          <button
            onClick={() => handleNav('bookings')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-slate-600" />
            <span>View Bookings ({totalBookings})</span>
          </button>

          <button
            onClick={() => handleNav('leads')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-slate-600" />
            <span>View Leads ({totalLeads})</span>
          </button>
        </div>
      </section>

      {/* 3. RECENT ORDERS & LEADS 2-COL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#0A192F]">Recent Customer Bookings</h3>
              <p className="text-[11px] text-slate-500">Live doorstep service appointments</p>
            </div>
            <button
              onClick={() => handleNav('bookings')}
              className="text-xs font-bold text-[#E53935] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No recent bookings</div>
            ) : (
              recentBookings.map(b => (
                <div
                  key={b.id}
                  onClick={() => handleNav('bookings')}
                  className="p-3.5 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 text-xs cursor-pointer group"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        {b.refCode}
                      </span>
                      <span className="font-bold text-[#0A192F] group-hover:text-[#E53935] transition-colors truncate">{b.customerName}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] truncate">
                      {b.serviceName} • {b.scheduledDate} ({b.timeSlot})
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        b.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : b.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {b.status}
                    </span>

                    <a
                      href={`tel:${b.customerPhone}`}
                      onClick={e => e.stopPropagation()}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                      title="Call customer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Turnkey Leads */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#0A192F]">Recent Turnkey & CRM Leads</h3>
              <p className="text-[11px] text-slate-500">Interior design, painting & renovation enquiries</p>
            </div>
            <button
              onClick={() => handleNav('leads')}
              className="text-xs font-bold text-purple-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">No leads recorded</div>
            ) : (
              recentLeads.map(l => (
                <div
                  key={l.id}
                  onClick={() => handleNav('leads')}
                  className="p-3.5 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 text-xs cursor-pointer group"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0A192F] group-hover:text-purple-700 transition-colors truncate">{l.customerName}</span>
                      <span className="text-[10px] text-slate-400">• {l.location}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] truncate">
                      {l.service} • {l.requirement || 'Standard Consultation'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        l.status === 'Interested' || l.status === 'Converted'
                          ? 'bg-purple-100 text-purple-800'
                          : l.status === 'New'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {l.status}
                    </span>

                    <a
                      href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="px-2 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Chat
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* 4. RECENTLY UPDATED SERVICES */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-[#0A192F]">Recently Updated Website Services</h3>
            <p className="text-[11px] text-slate-500">Live service landing pages and pricing cards</p>
          </div>
          <button
            onClick={() => handleNav('services')}
            className="text-xs font-bold text-[#E53935] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Manage All Services ({totalServices})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {recentServices.map(s => (
            <div
              key={s.id}
              onClick={() => handleNav('services')}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-[#E53935] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      s.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {s.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(s.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-black text-[#0A192F] group-hover:text-[#E53935] transition-colors line-clamp-1">
                  {s.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{s.shortDescription}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#E53935]">{s.startingPrice || 'Consultation'}</span>
                <span className="text-[10px] text-slate-400 font-mono">/services/{s.slug}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
