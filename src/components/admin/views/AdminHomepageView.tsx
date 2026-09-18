import React, { useState } from 'react';
import {
  Home,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Layers,
  Sparkles,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSHomepageContent } from '../../../types';

export const AdminHomepageView: React.FC = () => {
  const { homepageContent, saveHomepage } = useCMS();
  const [draft, setDraft] = useState<CMSHomepageContent>({ ...homepageContent });
  const [toast, setToast] = useState<string | null>(null);

  const sectionLabels: Record<string, string> = {
    hero: '1. Hero Section (Headline, Booking CTA, Bangalore highlights)',
    categories: '2. Service Categories Carousel (10 Doorstep categories)',
    popular: '3. Popular Services Grid (Washing machine, AC, TV, Refrigerator, etc.)',
    'how-it-works': '4. How It Works (4-Step Doorstep Workflow)',
    'booking-preview': '5. Quick Booking Preview Widget',
    'why-choose': '6. Why Choose RC Call Elite (Guarantees & Verified Technicians)',
    'service-types': '7. Service Type Cards (Doorstep Care vs Turnkey Consultations)',
    'interior-banner': '8. Interior Design & Civil Construction Feature Banner',
    trust: '9. Customer Trust & Service Badges',
    cta: '10. Bottom Emergency / Booking CTA Banner',
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...draft.sectionsOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setDraft({ ...draft, sectionsOrder: newOrder });
  };

  const toggleVisibility = (sectionId: string) => {
    setDraft({
      ...draft,
      sectionVisibility: {
        ...draft.sectionVisibility,
        [sectionId]: !draft.sectionVisibility[sectionId],
      },
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveHomepage(draft);
    setToast('Homepage changes saved and live on website!');
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

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-[#0A192F]">Homepage Layout & Content Editor</h2>
          <p className="text-xs text-slate-500">
            Control the hero banner, button destinations, and show/hide or reorder homepage sections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Homepage</span>
          </a>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. HERO BANNER CONFIGURATION */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-[#E53935]" />
            <h3 className="text-sm font-black text-[#0A192F]">Hero Section Headline & Content</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Headline (White Text)
              </label>
              <input
                type="text"
                value={draft.heroHeading}
                onChange={e => setDraft({ ...draft, heroHeading: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Highlight Headline (Red Text)
              </label>
              <input
                type="text"
                value={draft.heroHighlight}
                onChange={e => setDraft({ ...draft, heroHighlight: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-bold text-[#E53935]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Hero Description Subtitle
            </label>
            <textarea
              rows={3}
              value={draft.heroDescription}
              onChange={e => setDraft({ ...draft, heroDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Image URL
              </label>
              <input
                type="url"
                value={draft.heroImage}
                onChange={e => setDraft({ ...draft, heroImage: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary CTA Button</label>
                <input
                  type="text"
                  value={draft.primaryBtnText}
                  onChange={e => setDraft({ ...draft, primaryBtnText: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Secondary CTA Button</label>
                <input
                  type="text"
                  value={draft.secondaryBtnText}
                  onChange={e => setDraft({ ...draft, secondaryBtnText: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. HOMEPAGE SECTIONS REORDER & VISIBILITY */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-[#0A192F]">
                Homepage Sections Sequence & Visibility
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Use arrows to change vertical order on the page
            </span>
          </div>

          <div className="space-y-2.5">
            {draft.sectionsOrder.map((secId, index) => {
              const isVisible = draft.sectionVisibility[secId] !== false;
              const label = sectionLabels[secId] || secId;

              return (
                <div
                  key={secId}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                    isVisible
                      ? 'bg-slate-50/80 border-slate-200 text-slate-800'
                      : 'bg-slate-100/50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[11px] font-bold text-slate-500 w-5">
                      #{index + 1}
                    </span>
                    <span className="font-bold truncate">{label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleVisibility(secId)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-colors ${
                        isVisible
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {isVisible ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-200"
                      title="Move Up"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      disabled={index === draft.sectionsOrder.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-200"
                      title="Move Down"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. SECTION HEADINGS CUSTOMIZATION */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-[#0A192F] pb-2 border-b border-slate-100">
            Section Titles & Subtitle Overrides
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Categories Section Title
              </label>
              <input
                type="text"
                value={draft.sectionTitles?.categories || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    sectionTitles: { ...draft.sectionTitles, categories: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Popular Services Title
              </label>
              <input
                type="text"
                value={draft.sectionTitles?.popular || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    sectionTitles: { ...draft.sectionTitles, popular: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                How It Works Title
              </label>
              <input
                type="text"
                value={draft.sectionTitles?.['how-it-works'] || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    sectionTitles: { ...draft.sectionTitles, 'how-it-works': e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Why Choose Us Title
              </label>
              <input
                type="text"
                value={draft.sectionTitles?.['why-choose'] || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    sectionTitles: { ...draft.sectionTitles, 'why-choose': e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-md text-sm transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Homepage Layout</span>
          </button>
        </div>
      </form>
    </div>
  );
};
