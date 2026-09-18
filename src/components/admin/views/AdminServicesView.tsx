import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit2,
  Copy,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  HelpCircle,
  ShieldCheck,
  Tag,
  Eye,
  Save,
  X,
  Sparkles,
  ArrowUpDown,
  History,
  RotateCcw
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSService, ServiceStatus } from '../../../types';
import { BANGALORE_LOCALITIES } from '../../../data/servicesData';

interface AdminServicesViewProps {
  initialEditServiceId?: string | null;
  onClearInitialEdit?: () => void;
  openNewModalTrigger?: number;
}

export const AdminServicesView: React.FC<AdminServicesViewProps> = ({
  initialEditServiceId,
  onClearInitialEdit,
  openNewModalTrigger,
}) => {
  const {
    services,
    saveService,
    deleteService,
    duplicateService,
    toggleServiceStatus,
    reorderServices,
    bulkUpdateServicesStatus,
    bulkTrashServices,
    getRevisionsFor,
    restoreRevision,
  } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [historyService, setHistoryService] = useState<CMSService | null>(null);
  const [editingService, setEditingService] = useState<CMSService | null>(() => {
    if (initialEditServiceId) {
      return services.find(s => s.id === initialEditServiceId) || null;
    }
    return null;
  });
  const [activeEditorTab, setActiveEditorTab] = useState<'general' | 'content' | 'problems' | 'faqs' | 'seo'>('general');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Available categories
  const categories = ['All', 'Appliance Care', 'Two-Wheeler', 'Home Repair', 'Interiors & Build'];

  // Filtered services
  const filteredServices = services.filter(s => {
    const matchesSearch =
      searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' ||
      s.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      (categoryFilter === 'Appliance Care' && s.category === 'Appliance') ||
      (categoryFilter === 'Home Repair' && s.category === 'Home Services') ||
      (categoryFilter === 'Interiors & Build' && (s.category === 'Interiors' || s.categoryType === 'consultation'));

    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle create new service template
  const handleCreateNew = () => {
    const newService: CMSService = {
      id: 'srv-' + Date.now(),
      slug: 'new-service-' + Math.floor(Math.random() * 900 + 100),
      name: 'New Home Service',
      category: 'Appliance',
      categoryType: 'appointment',
      status: 'Draft',
      startingPrice: '₹399',
      priceType: 'Starting Price',
      pricingDisclaimer: 'Diagnostic charge included in bill if work is approved.',
      heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200',
      featuredImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200',
      galleryImages: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200'],
      shortDescription: 'Professional doorstep service with certified technicians in Bangalore.',
      aboutTitle: 'Expert Doorstep Repair & Maintenance in Bangalore',
      aboutContent: [
        'RC Call Elite provides certified doorstep specialists across Bengaluru.',
        'All work includes transparent estimates and genuine spare parts backed by a service guarantee.'
      ],
      commonProblemsTitle: 'Common Issues We Resolve',
      commonProblems: [
        { title: 'Device not turning on or power failure', description: 'Internal electrical short, blown fuse, or power supply module breakdown.' },
        { title: 'Unusual noise or vibration during operation', description: 'Worn out bearings, loose mounting hardware, or motor imbalance.' }
      ],
      whatsIncluded: [
        { title: 'Complete Diagnostic Inspection', description: 'Comprehensive inspection by a certified service specialist.' },
        { title: '30-Day Service Guarantee', description: 'Peace of mind warranty on labor and replaced components.' }
      ],
      howItWorks: [
        { step: 1, title: 'Book Online or Call', description: 'Select your preferred time slot and tell us the issue.' },
        { step: 2, title: 'Technician Visit', description: 'Background-verified expert arrives at your doorstep on time.' },
        { step: 3, title: 'Guaranteed Resolution', description: 'Transparent quote provided before repair; 30-day warranty.' }
      ],
      whyChoosePoints: [
        { title: 'Bangalore Verified Experts', description: 'Experienced technicians with background checks.' },
        { title: 'Upfront Transparent Pricing', description: 'No hidden call-out fees or sudden price jumps.' }
      ],
      serviceAreas: BANGALORE_LOCALITIES.slice(0, 15),
      faqs: [
        { question: 'How quickly can a technician visit my home?', answer: 'We offer same-day doorstep service across Bangalore within 90-120 minutes of booking confirmation.' },
        { question: 'Is there a warranty on the service?', answer: 'Yes, we provide an upfront 30 to 90-day service warranty on repaired components.' }
      ],
      relatedServiceSlugs: ['ac-service', 'washing-machine-repair'],
      ctaButtonText: 'Book Doorstep Service',
      ctaButtonLink: '/contact',
      seo: {
        title: 'New Service in Bangalore | Doorstep Care | RC Call Elite',
        metaDescription: 'Book certified doorstep service in Bangalore with RC Call Elite. Upfront pricing, genuine parts, and guaranteed resolution.',
        keywords: ['Bangalore repair', 'doorstep service', 'RC Call Elite'],
      },
      rating: 4.8,
      reviewsCount: 120,
      lastUpdated: new Date().toISOString(),
    };

    setEditingService(newService);
    setActiveEditorTab('general');
  };

  // Open create modal if triggered from quick actions
  React.useEffect(() => {
    if (openNewModalTrigger && openNewModalTrigger > 0) {
      handleCreateNew();
    }
  }, [openNewModalTrigger]);

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    saveService(editingService);
    setSaveNotification(`Successfully saved "${editingService.name}"!`);
    setTimeout(() => {
      setSaveNotification(null);
      setEditingService(null);
      if (onClearInitialEdit) onClearInitialEdit();
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {saveNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-bold">{saveNotification}</span>
        </div>
      )}

      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-base font-black text-[#0A192F]">Website Services Management</h2>
          <p className="text-xs text-slate-500">
            Control service landing pages, doorstep prices, FAQs, and common problem lists.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service name, slug, description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active (Live on Website)</option>
            <option value="Draft">Draft</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* BULK ACTIONS TOOLBAR */}
      {selectedServiceIds.length > 0 && (
        <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E53935]" />
            <span className="text-xs font-black">{selectedServiceIds.length} Services Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                bulkUpdateServicesStatus(selectedServiceIds, 'Active');
                setSelectedServiceIds([]);
                setSaveNotification('Selected services published to Active.');
                setTimeout(() => setSaveNotification(null), 3000);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Bulk Activate
            </button>
            <button
              onClick={() => {
                bulkUpdateServicesStatus(selectedServiceIds, 'Draft');
                setSelectedServiceIds([]);
                setSaveNotification('Selected services set to Draft.');
                setTimeout(() => setSaveNotification(null), 3000);
              }}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Bulk Draft
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Move ${selectedServiceIds.length} services to Trash?`)) {
                  bulkTrashServices(selectedServiceIds);
                  setSelectedServiceIds([]);
                  setSaveNotification('Selected services moved to Trash Vault.');
                  setTimeout(() => setSaveNotification(null), 3000);
                }
              }}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Trash</span>
            </button>
            <button
              onClick={() => setSelectedServiceIds([])}
              className="px-2.5 py-1.5 text-slate-400 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SERVICES TABLE / DIRECTORY */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-3 py-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredServices.length > 0 &&
                      filteredServices.every(s => selectedServiceIds.includes(s.id))
                    }
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedServiceIds(filteredServices.map(s => s.id));
                      } else {
                        setSelectedServiceIds([]);
                      }
                    }}
                    className="rounded border-slate-300 text-[#E53935] focus:ring-[#E53935]"
                  />
                </th>
                <th className="px-3 py-3.5 w-12 text-center">Sort</th>
                <th className="px-4 py-3.5">Service Details</th>
                <th className="px-4 py-3.5">Category & Type</th>
                <th className="px-4 py-3.5">Starting Price</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Last Updated</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                    No services found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service, idx) => (
                  <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Checkbox */}
                    <td className="px-3 py-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedServiceIds.includes(service.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedServiceIds(prev => [...prev, service.id]);
                          } else {
                            setSelectedServiceIds(prev => prev.filter(id => id !== service.id));
                          }
                        }}
                        className="rounded border-slate-300 text-[#E53935] focus:ring-[#E53935]"
                      />
                    </td>

                    {/* Reorder Arrows */}
                    <td className="px-3 py-3.5 text-center">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <button
                          onClick={() => {
                            if (idx === 0) return;
                            const copy = [...services];
                            const currIndex = copy.findIndex(s => s.id === service.id);
                            if (currIndex > 0) {
                              const temp = copy[currIndex];
                              copy[currIndex] = copy[currIndex - 1];
                              copy[currIndex - 1] = temp;
                              reorderServices(copy);
                            }
                          }}
                          disabled={idx === 0}
                          className={`text-slate-400 hover:text-slate-700 ${idx === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                          title="Move Up"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (idx === filteredServices.length - 1) return;
                            const copy = [...services];
                            const currIndex = copy.findIndex(s => s.id === service.id);
                            if (currIndex < copy.length - 1) {
                              const temp = copy[currIndex];
                              copy[currIndex] = copy[currIndex + 1];
                              copy[currIndex + 1] = temp;
                              reorderServices(copy);
                            }
                          }}
                          disabled={idx === filteredServices.length - 1}
                          className={`text-slate-400 hover:text-slate-700 ${idx === filteredServices.length - 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                          title="Move Down"
                        >
                          ▼
                        </button>
                      </div>
                    </td>

                    {/* Service Name & Slug */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={service.heroImage || service.featuredImage}
                          alt={service.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-black text-[#0A192F] text-xs truncate max-w-xs sm:max-w-md">
                            {service.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            /services/{service.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Type */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-700">{service.category}</div>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {service.categoryType || 'appointment'}
                      </span>
                    </td>

                    {/* Starting Price */}
                    <td className="px-4 py-3.5 font-bold text-[#E53935]">
                      {service.startingPrice || 'On Inspection'}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleServiceStatus(service.id)}
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${
                          service.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : service.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle Active / Draft status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            service.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        <span>{service.status}</span>
                      </button>
                    </td>

                    {/* Last Updated */}
                    <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px]">
                      {new Date(service.lastUpdated || Date.now()).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/services/${service.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                          title="View on live website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            setEditingService({ ...service });
                            setActiveEditorTab('general');
                          }}
                          className="p-1.5 text-slate-600 hover:text-[#E53935] rounded-lg hover:bg-slate-100"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => duplicateService(service.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                          title="Duplicate Service"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setHistoryService(service)}
                          className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-slate-100"
                          title="Version History"
                        >
                          <History className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Move service "${service.name}" to Trash Vault?`)) {
                              deleteService(service.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                          title="Move to Trash"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VERSION HISTORY MODAL */}
      {historyService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0A192F]">Version History</h3>
                  <p className="text-[11px] text-slate-500">{historyService.name}</p>
                </div>
              </div>
              <button
                onClick={() => setHistoryService(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {getRevisionsFor('service', historyService.id).length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No previous snapshots recorded yet for this service. Revisions are created automatically whenever edits are saved.
                </div>
              ) : (
                getRevisionsFor('service', historyService.id).map(rev => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-slate-50/50 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">
                          v{rev.version}
                        </span>
                        <span className="text-xs font-bold text-[#0A192F]">{rev.summary}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">
                        {new Date(rev.timestamp).toLocaleString()} • {rev.updatedBy}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        restoreRevision(rev.id);
                        setSaveNotification(`Restored version v${rev.version} of "${historyService.name}".`);
                        setTimeout(() => setSaveNotification(null), 3000);
                        setHistoryService(null);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setHistoryService(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SERVICE RICH CONTENT EDITOR MODAL / DRAWER */}
      {/* ========================================================= */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-100 text-[#E53935]">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#0A192F]">
                    Edit Service: {editingService.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Live URL: /services/{editingService.slug}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingService(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setActiveEditorTab('general')}
                className={`pb-3 font-bold border-b-2 transition-colors shrink-0 ${
                  activeEditorTab === 'general'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Basic & Pricing
              </button>

              <button
                type="button"
                onClick={() => setActiveEditorTab('content')}
                className={`pb-3 font-bold border-b-2 transition-colors shrink-0 ${
                  activeEditorTab === 'content'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Banner, About & What's Included
              </button>

              <button
                type="button"
                onClick={() => setActiveEditorTab('problems')}
                className={`pb-3 font-bold border-b-2 transition-colors shrink-0 ${
                  activeEditorTab === 'problems'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Common Problems ({editingService.commonProblems?.length || 0})
              </button>

              <button
                type="button"
                onClick={() => setActiveEditorTab('faqs')}
                className={`pb-3 font-bold border-b-2 transition-colors shrink-0 ${
                  activeEditorTab === 'faqs'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                FAQs ({editingService.faqs?.length || 0})
              </button>

              <button
                type="button"
                onClick={() => setActiveEditorTab('seo')}
                className={`pb-3 font-bold border-b-2 transition-colors shrink-0 ${
                  activeEditorTab === 'seo'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                SEO & Google Preview
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveEditor} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              {/* TAB 1: GENERAL & PRICING */}
              {activeEditorTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Service Title *</label>
                      <input
                        type="text"
                        required
                        value={editingService.name}
                        onChange={e => setEditingService({ ...editingService, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-[#E53935]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">URL Slug (e.g. ac-service) *</label>
                      <input
                        type="text"
                        required
                        value={editingService.slug}
                        onChange={e =>
                          setEditingService({
                            ...editingService,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingService.category}
                        onChange={e => setEditingService({ ...editingService, category: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Service Type</label>
                      <select
                        value={editingService.categoryType}
                        onChange={e =>
                          setEditingService({
                            ...editingService,
                            categoryType: e.target.value as 'appointment' | 'consultation',
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                      >
                        <option value="appointment">Appointment (Fixed Doorstep)</option>
                        <option value="consultation">Consultation (Interiors & Build)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Status</label>
                      <select
                        value={editingService.status}
                        onChange={e =>
                          setEditingService({
                            ...editingService,
                            status: e.target.value as ServiceStatus,
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                      >
                        <option value="Active">Active (Published)</option>
                        <option value="Draft">Draft (Hidden)</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Starting Price (e.g. ₹299)</label>
                      <input
                        type="text"
                        value={editingService.startingPrice}
                        onChange={e => setEditingService({ ...editingService, startingPrice: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-[#E53935]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pricing Disclaimer</label>
                      <input
                        type="text"
                        value={editingService.pricingDisclaimer}
                        onChange={e => setEditingService({ ...editingService, pricingDisclaimer: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                        placeholder="e.g. Starting price covers diagnostic inspection."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Short Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingService.shortDescription}
                      onChange={e => setEditingService({ ...editingService, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: BANNER, ABOUT & WHAT'S INCLUDED */}
              {activeEditorTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Hero Image URL</label>
                    <input
                      type="url"
                      value={editingService.heroImage}
                      onChange={e =>
                        setEditingService({
                          ...editingService,
                          heroImage: e.target.value,
                          featuredImage: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs"
                    />
                    {editingService.heroImage && (
                      <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                        <img
                          src={editingService.heroImage}
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={editingService.ctaButtonText || 'Book Doorstep Service'}
                        onChange={e => setEditingService({ ...editingService, ctaButtonText: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CTA Button Link</label>
                      <input
                        type="text"
                        value={editingService.ctaButtonLink || '/contact'}
                        onChange={e => setEditingService({ ...editingService, ctaButtonLink: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">About Section Heading</label>
                    <input
                      type="text"
                      value={editingService.aboutTitle}
                      onChange={e => setEditingService({ ...editingService, aboutTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-slate-700">What's Included List</label>
                      <button
                        type="button"
                        onClick={() => {
                          const list = editingService.whatsIncluded || [];
                          setEditingService({
                            ...editingService,
                            whatsIncluded: [...list, { title: 'New Included Item', description: 'Description of what is covered.' }],
                          });
                        }}
                        className="text-xs font-bold text-[#E53935] hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Item</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(editingService.whatsIncluded || []).map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={item.title}
                              onChange={e => {
                                const list = [...(editingService.whatsIncluded || [])];
                                list[idx].title = e.target.value;
                                setEditingService({ ...editingService, whatsIncluded: list });
                              }}
                              className="w-full px-2 py-1 bg-white border border-slate-300 rounded font-bold"
                              placeholder="Feature title"
                            />
                            <input
                              type="text"
                              value={item.description}
                              onChange={e => {
                                const list = [...(editingService.whatsIncluded || [])];
                                list[idx].description = e.target.value;
                                setEditingService({ ...editingService, whatsIncluded: list });
                              }}
                              className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-600"
                              placeholder="Feature description"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const list = (editingService.whatsIncluded || []).filter((_, i) => i !== idx);
                              setEditingService({ ...editingService, whatsIncluded: list });
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: COMMON PROBLEMS */}
              {activeEditorTab === 'problems' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Common Problems Section</h4>
                      <p className="text-slate-500 text-[11px]">
                        Diagnosed issues displayed to customers looking for specific symptoms.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const list = editingService.commonProblems || [];
                        setEditingService({
                          ...editingService,
                          commonProblems: [...list, { title: 'New Symptom/Issue', description: 'Technical cause and repair steps.' }],
                        });
                      }}
                      className="px-3 py-1.5 bg-[#E53935] text-white rounded-lg font-bold inline-flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Problem</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(editingService.commonProblems || []).map((prob, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-[#E53935] font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>

                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={prob.title}
                            onChange={e => {
                              const list = [...(editingService.commonProblems || [])];
                              list[idx].title = e.target.value;
                              setEditingService({ ...editingService, commonProblems: list });
                            }}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
                            placeholder="Problem title (e.g. Water not draining)"
                          />
                          <textarea
                            rows={2}
                            value={prob.description}
                            onChange={e => {
                              const list = [...(editingService.commonProblems || [])];
                              list[idx].description = e.target.value;
                              setEditingService({ ...editingService, commonProblems: list });
                            }}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-600"
                            placeholder="Diagnosis and resolution description"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const list = (editingService.commonProblems || []).filter((_, i) => i !== idx);
                            setEditingService({ ...editingService, commonProblems: list });
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: FAQS */}
              {activeEditorTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Frequently Asked Questions</h4>
                      <p className="text-slate-500 text-[11px]">
                        Questions and answers rendered in the interactive accordion on this service page.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const list = editingService.faqs || [];
                        setEditingService({
                          ...editingService,
                          faqs: [...list, { question: 'New Question?', answer: 'Comprehensive answer regarding this service.' }],
                        });
                      }}
                      className="px-3 py-1.5 bg-[#E53935] text-white rounded-lg font-bold inline-flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(editingService.faqs || []).map((faq, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                          Q{idx + 1}
                        </span>

                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={e => {
                              const list = [...(editingService.faqs || [])];
                              list[idx].question = e.target.value;
                              setEditingService({ ...editingService, faqs: list });
                            }}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
                            placeholder="Question"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={e => {
                              const list = [...(editingService.faqs || [])];
                              list[idx].answer = e.target.value;
                              setEditingService({ ...editingService, faqs: list });
                            }}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-600"
                            placeholder="Detailed Answer"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const list = (editingService.faqs || []).filter((_, i) => i !== idx);
                            setEditingService({ ...editingService, faqs: list });
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SEO & GOOGLE PREVIEW */}
              {activeEditorTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">SEO Title Tag</label>
                    <input
                      type="text"
                      value={editingService.seo?.title || ''}
                      onChange={e =>
                        setEditingService({
                          ...editingService,
                          seo: { ...(editingService.seo || { metaDescription: '', keywords: [] }), title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                    <div className="text-[10px] text-slate-400 mt-1">
                      Length: {(editingService.seo?.title || '').length}/60 characters (Optimal 50-60)
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
                    <textarea
                      rows={3}
                      value={editingService.seo?.metaDescription || ''}
                      onChange={e =>
                        setEditingService({
                          ...editingService,
                          seo: { ...(editingService.seo || { title: '', keywords: [] }), metaDescription: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                    <div className="text-[10px] text-slate-400 mt-1">
                      Length: {(editingService.seo?.metaDescription || '').length}/160 characters (Optimal 140-160)
                    </div>
                  </div>

                  {/* Google Search Live Preview Card */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                      Live Google Search Snippet Preview
                    </div>
                    <div className="font-sans space-y-1 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
                        <span>https://calleliterc.com</span>
                        <span>›</span>
                        <span>services</span>
                        <span>›</span>
                        <span className="text-slate-900 font-bold">{editingService.slug}</span>
                      </div>
                      <h4 className="text-blue-800 hover:underline text-sm font-semibold cursor-pointer">
                        {editingService.seo?.title || `${editingService.name} Bangalore | RC Call Elite`}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {editingService.seo?.metaDescription || editingService.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer / Save Bar */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between bg-white">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-xl font-bold text-slate-700 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Service Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
