import React, { useState } from 'react';
import {
  FileText,
  ExternalLink,
  Edit2,
  CheckCircle2,
  Save,
  X,
  Plus,
  Trash2,
  Search,
  Eye,
  Layers,
  Sparkles,
  Copy,
  History,
  RotateCcw,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSPage, CMSPageSection } from '../../../types';

export const AdminPagesView: React.FC = () => {
  const {
    pages,
    savePage,
    deletePage,
    duplicatePage,
    getRevisionsFor,
    restoreRevision,
  } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingPageKey, setEditingPageKey] = useState<string | null>(null);
  const [pageDraft, setPageDraft] = useState<CMSPage | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [historyPageKey, setHistoryPageKey] = useState<string | null>(null);

  const protectedSlugs = ['home', 'services', 'about-us', 'contact', 'how-it-works'];

  const pageList = Object.entries(pages).filter(([key, page]) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      page.title.toLowerCase().includes(q) ||
      page.slug.toLowerCase().includes(q) ||
      page.heroHeading.toLowerCase().includes(q)
    );
  });

  const handleEdit = (key: string, page: CMSPage) => {
    setEditingPageKey(key);
    setPageDraft({ ...page });
  };

  const handleCreateNewPage = () => {
    const defaultSlug = `page-${Date.now().toString().slice(-4)}`;
    const newPage: CMSPage = {
      id: `page-${Date.now()}`,
      slug: defaultSlug,
      title: 'New Custom Page',
      heroHeading: 'Custom Page Heading',
      heroDescription: 'Describe the purpose and value proposition of this page for Bangalore customers.',
      status: 'Draft',
      sections: [
        {
          id: `sec-1`,
          title: 'Overview',
          content: 'Add detailed information, services list, or customer guidelines here.',
          enabled: true,
        },
      ],
      seo: {
        title: 'New Page | RC CALL ELITE Bangalore',
        metaDescription: 'RC CALL ELITE door-step service and repairs across Bangalore.',
      },
      lastUpdated: new Date().toISOString(),
    };
    setEditingPageKey(defaultSlug);
    setPageDraft(newPage);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPageKey || !pageDraft) return;

    const finalKey = pageDraft.slug.replace(/^\//, '') || editingPageKey;
    savePage(finalKey, { ...pageDraft, lastUpdated: new Date().toISOString() });
    setSaveToast(`Updated page "${pageDraft.title}"!`);
    setTimeout(() => {
      setSaveToast(null);
      setEditingPageKey(null);
      setPageDraft(null);
    }, 1200);
  };

  const handleToggleStatus = (key: string, page: CMSPage) => {
    const newStatus = page.status === 'Draft' ? 'Published' : 'Draft';
    savePage(key, { ...page, status: newStatus });
    setSaveToast(`Set "${page.title}" to ${newStatus}`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  return (
    <div className="space-y-6">
      {saveToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-bold">{saveToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-[#0A192F]">Website Pages Management</h2>
          <p className="text-xs text-slate-500">
            Full CMS control: Edit content, sections, SEO metadata, create new pages, duplicate, or soft-delete to Trash.
          </p>
        </div>

        <button
          onClick={handleCreateNewPage}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search pages by title, slug, or heading..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          />
        </div>
      </div>

      {/* Page Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageList.map(([key, page]) => {
          const isProtected = protectedSlugs.includes(key);
          const isDraft = page.status === 'Draft';

          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between hover:border-[#E53935] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      /{page.slug}
                    </span>
                    {isProtected && (
                      <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> Core
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleStatus(key, page)}
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                      !isDraft
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                    }`}
                    title="Click to toggle Published / Draft"
                  >
                    {!isDraft ? 'Published' : 'Draft'}
                  </button>
                </div>

                <h3 className="text-sm font-black text-[#0A192F] group-hover:text-[#E53935] transition-colors">
                  {page.title}
                </h3>
                <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                  {page.heroHeading}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {page.heroDescription}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span>{page.sections?.length || 0} sections</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">SEO Configured</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <a
                    href={`/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                    title="View live page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => duplicatePage(key)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                    title="Duplicate Page"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setHistoryPageKey(key)}
                    className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-slate-100"
                    title="Version History"
                  >
                    <History className="w-3.5 h-3.5" />
                  </button>

                  {!isProtected && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Move page "/${page.slug}" to Trash Vault?`)) {
                          deletePage(key);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                      title="Move to Trash"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleEdit(key, page)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-[#E53935] text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Content</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* VERSION HISTORY MODAL */}
      {historyPageKey && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#0A192F]">Page Version History</h3>
                  <p className="text-[11px] text-slate-500">/{historyPageKey}</p>
                </div>
              </div>
              <button
                onClick={() => setHistoryPageKey(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {getRevisionsFor('page', historyPageKey).length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No previous revisions logged yet for this page. Revisions are created automatically whenever edits are saved.
                </div>
              ) : (
                getRevisionsFor('page', historyPageKey).map(rev => (
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
                        setSaveToast(`Restored version v${rev.version} for /${historyPageKey}.`);
                        setTimeout(() => setSaveToast(null), 3000);
                        setHistoryPageKey(null);
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
                onClick={() => setHistoryPageKey(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PAGE MODAL */}
      {pageDraft && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#0A192F]">
                    Edit Page: /{pageDraft.slug}
                  </h3>
                  <p className="text-[11px] text-slate-500">{pageDraft.title}</p>
                </div>
              </div>

              <button
                onClick={() => setPageDraft(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Page Title & Tab Label *</label>
                  <input
                    type="text"
                    required
                    value={pageDraft.title}
                    onChange={e => setPageDraft({ ...pageDraft, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hero Section Main Heading *</label>
                  <input
                    type="text"
                    required
                    value={pageDraft.heroHeading}
                    onChange={e => setPageDraft({ ...pageDraft, heroHeading: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hero Description Paragraph *</label>
                  <textarea
                    rows={3}
                    required
                    value={pageDraft.heroDescription}
                    onChange={e => setPageDraft({ ...pageDraft, heroDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={pageDraft.ctaText || ''}
                      onChange={e => setPageDraft({ ...pageDraft, ctaText: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">CTA Button Link</label>
                    <input
                      type="text"
                      value={pageDraft.ctaLink || ''}
                      onChange={e => setPageDraft({ ...pageDraft, ctaLink: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                {/* Page Sections */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-bold text-slate-700">Sub-Sections & Paragraphs</label>
                    <button
                      type="button"
                      onClick={() => {
                        setPageDraft({
                          ...pageDraft,
                          sections: [
                            ...pageDraft.sections,
                            {
                              id: 'sec-' + Date.now(),
                              title: 'New Section',
                              content: 'Detailed explanation or company info.',
                              enabled: true,
                            },
                          ],
                        });
                      }}
                      className="text-xs font-bold text-[#E53935] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Section</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {pageDraft.sections.map((sec, idx) => (
                      <div key={sec.id || idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={sec.title}
                            onChange={e => {
                              const updated = [...pageDraft.sections];
                              updated[idx].title = e.target.value;
                              setPageDraft({ ...pageDraft, sections: updated });
                            }}
                            className="flex-1 px-2 py-1 bg-white border border-slate-300 rounded font-bold"
                            placeholder="Section Title"
                          />

                          <label className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sec.enabled}
                              onChange={e => {
                                const updated = [...pageDraft.sections];
                                updated[idx].enabled = e.target.checked;
                                setPageDraft({ ...pageDraft, sections: updated });
                              }}
                              className="rounded text-[#E53935]"
                            />
                            <span>Visible</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = pageDraft.sections.filter((_, i) => i !== idx);
                              setPageDraft({ ...pageDraft, sections: updated });
                            }}
                            className="p-1 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={sec.content}
                          onChange={e => {
                            const updated = [...pageDraft.sections];
                            updated[idx].content = e.target.value;
                            setPageDraft({ ...pageDraft, sections: updated });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                          placeholder="Section text or bullet points"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Configuration */}
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-800">Page SEO Metadata</h4>
                  <div>
                    <label className="block text-slate-600 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={pageDraft.seo.title}
                      onChange={e =>
                        setPageDraft({
                          ...pageDraft,
                          seo: { ...pageDraft.seo, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Meta Description</label>
                    <textarea
                      rows={2}
                      value={pageDraft.seo.metaDescription}
                      onChange={e =>
                        setPageDraft({
                          ...pageDraft,
                          seo: { ...pageDraft.seo, metaDescription: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPageDraft(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Page</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
