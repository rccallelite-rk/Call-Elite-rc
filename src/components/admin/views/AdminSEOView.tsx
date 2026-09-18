import React, { useState } from 'react';
import {
  Search,
  Globe,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Save,
  X,
  Sparkles,
  FileCode,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';

export const AdminSEOView: React.FC = () => {
  const { services, pages, saveService, savePage } = useCMS();
  const [activeTab, setActiveTab] = useState<'all' | 'pages' | 'services'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<{
    type: 'page' | 'service';
    id: string;
    url: string;
    title: string;
    metaDescription: string;
    ogTitle?: string;
    ogDescription?: string;
    canonicalUrl?: string;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Collate all SEO entries
  const pageEntries = Object.entries(pages).map(([key, p]) => ({
    type: 'page' as const,
    id: key,
    url: p.slug ? `/${p.slug}` : '/',
    title: p.seo?.title || p.title,
    metaDescription: p.seo?.metaDescription || p.heroDescription,
    ogTitle: p.seo?.ogTitle || p.seo?.title || p.title,
    ogDescription: p.seo?.ogDescription || p.seo?.metaDescription || p.heroDescription,
    canonicalUrl: p.seo?.canonicalUrl || `https://calleliterc.com/${p.slug}`,
  }));

  const serviceEntries = services.map(s => ({
    type: 'service' as const,
    id: s.id,
    url: `/services/${s.slug}`,
    title: s.seo?.title || `${s.name} Bangalore | RC Call Elite`,
    metaDescription: s.seo?.metaDescription || s.shortDescription,
    ogTitle: s.seo?.ogTitle || s.seo?.title || s.name,
    ogDescription: s.seo?.ogDescription || s.seo?.metaDescription || s.shortDescription,
    canonicalUrl: s.seo?.canonicalUrl || `https://calleliterc.com/services/${s.slug}`,
  }));

  const allEntries = [...pageEntries, ...serviceEntries];

  const filteredEntries = allEntries.filter(entry => {
    const matchesType =
      activeTab === 'all' ||
      (activeTab === 'pages' && entry.type === 'page') ||
      (activeTab === 'services' && entry.type === 'service');

    const matchesSearch =
      searchQuery === '' ||
      entry.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (editingItem.type === 'service') {
      const targetService = services.find(s => s.id === editingItem.id);
      if (targetService) {
        saveService({
          ...targetService,
          seo: {
            ...targetService.seo,
            title: editingItem.title,
            metaDescription: editingItem.metaDescription,
            ogTitle: editingItem.ogTitle,
            ogDescription: editingItem.ogDescription,
            canonicalUrl: editingItem.canonicalUrl,
          },
        });
      }
    } else {
      const targetPage = pages[editingItem.id];
      if (targetPage) {
        savePage(editingItem.id, {
          ...targetPage,
          seo: {
            ...targetPage.seo,
            title: editingItem.title,
            metaDescription: editingItem.metaDescription,
            ogTitle: editingItem.ogTitle,
            ogDescription: editingItem.ogDescription,
            canonicalUrl: editingItem.canonicalUrl,
          },
        });
      }
    }

    setToast('SEO metadata saved successfully!');
    setEditingItem(null);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-bold">{toast}</span>
        </div>
      )}

      {/* Header & Sitemap info */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-[#0A192F]">Centralized SEO & Metadata Manager</h2>
          <p className="text-xs text-slate-500">
            Control Google search snippets, OpenGraph share preview cards, and canonical tags for every route.
          </p>
        </div>

        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0"
        >
          <FileCode className="w-4 h-4 text-emerald-400" />
          <span>Live XML Sitemap ({allEntries.length} URLs)</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'all' ? 'bg-white text-[#0A192F] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All URLs ({allEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'pages' ? 'bg-white text-[#0A192F] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Static Pages ({pageEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'services' ? 'bg-white text-[#0A192F] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Services Catalog ({serviceEntries.length})
          </button>
        </div>

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search URL, meta title, keywords..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#E53935]"
          />
        </div>
      </div>

      {/* SEO Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">URL Route</th>
                <th className="px-4 py-3.5">Meta Title Tag</th>
                <th className="px-4 py-3.5">Meta Description</th>
                <th className="px-4 py-3.5">Indexing</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.map(entry => (
                <tr key={entry.url} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-[11px] font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-sans ${
                          entry.type === 'page' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {entry.type}
                      </span>
                      <span>{entry.url}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 max-w-xs">
                    <div className="font-bold text-[#0A192F] line-clamp-1">{entry.title}</div>
                    <div className="text-[10px] text-slate-400">{entry.title.length} chars</div>
                  </td>

                  <td className="px-4 py-3.5 max-w-sm">
                    <div className="text-slate-600 line-clamp-1">{entry.metaDescription}</div>
                    <div className="text-[10px] text-slate-400">{entry.metaDescription.length} chars</div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      <span>Index, Follow</span>
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                        title="View Route"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setEditingItem({ ...entry })}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#E53935] hover:text-white text-slate-700 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT SEO MODAL WITH GOOGLE PREVIEW */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-100 text-[#E53935]">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#0A192F]">
                    Edit SEO: {editingItem.url}
                  </h3>
                  <p className="text-[11px] text-slate-500">Search engine indexing metadata</p>
                </div>
              </div>

              <button
                onClick={() => setEditingItem(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSEO} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Meta Title Tag ({editingItem.title.length}/60 recommended) *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Meta Description ({editingItem.metaDescription.length}/160 recommended) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.metaDescription}
                  onChange={e => setEditingItem({ ...editingItem, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Canonical URL</label>
                <input
                  type="url"
                  value={editingItem.canonicalUrl || ''}
                  onChange={e => setEditingItem({ ...editingItem, canonicalUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-700"
                />
              </div>

              {/* Live Google Search Preview Card */}
              <div className="pt-2">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Live Search Engine Card Preview
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono truncate">
                    <span>https://calleliterc.com</span>
                    <span>{editingItem.url}</span>
                  </div>
                  <h4 className="text-blue-800 font-medium hover:underline text-sm cursor-pointer line-clamp-1">
                    {editingItem.title}
                  </h4>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {editingItem.metaDescription}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save SEO Metadata</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
