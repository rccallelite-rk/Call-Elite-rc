import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Globe,
  Sliders,
  Share2,
  Code,
  Bell,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSWebsiteSettings } from '../../../types';

export const AdminWebsiteSettingsView: React.FC = () => {
  const { websiteSettings, saveWebsiteSettings } = useCMS();
  const [draft, setDraft] = useState<CMSWebsiteSettings>({ ...websiteSettings });
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveWebsiteSettings(draft);
    setToast('Website settings saved and broadcasted site-wide!');
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
          <h2 className="text-base font-black text-[#0A192F]">Global Website Settings</h2>
          <p className="text-xs text-slate-500">
            Brand identity, announcement banners, social links, footer disclaimer, and analytics tags.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Brand & Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-[#E53935]" />
            <h3 className="text-sm font-black text-[#0A192F]">Brand Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company / Brand Name *</label>
              <input
                type="text"
                required
                value={draft.siteName}
                onChange={e => setDraft({ ...draft, siteName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={draft.tagline}
                onChange={e => setDraft({ ...draft, tagline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Main Logo URL</label>
              <input
                type="url"
                value={draft.logoUrl || ''}
                onChange={e => setDraft({ ...draft, logoUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Favicon URL</label>
              <input
                type="url"
                value={draft.faviconUrl || ''}
                onChange={e => setDraft({ ...draft, faviconUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Logo Visual Live Preview */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Live Brand Logo Preview (Light & Dark Header Backgrounds)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center min-h-[90px]">
                <img
                  src={draft.logoUrl || '/rc-call-elite-logo.svg'}
                  alt="Logo Preview Light"
                  className="max-h-16 max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#0A192F] border border-slate-800 flex items-center justify-center min-h-[90px]">
                <img
                  src="/rc-call-elite-logo-dark.svg"
                  alt="Logo Preview Dark"
                  className="max-h-16 max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-black text-[#0A192F]">Top Announcement Bar</h3>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={draft.announcementBarEnabled}
                onChange={e => setDraft({ ...draft, announcementBarEnabled: e.target.checked })}
                className="rounded text-[#E53935]"
              />
              <span className="font-bold text-slate-700">Show Announcement Bar</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Announcement Message</label>
              <input
                type="text"
                value={draft.announcementText}
                onChange={e => setDraft({ ...draft, announcementText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Announcement Link / Button</label>
              <input
                type="text"
                value={draft.announcementLink || ''}
                onChange={e => setDraft({ ...draft, announcementLink: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                placeholder="/services or https://..."
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Share2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-black text-[#0A192F]">Social Media Profiles</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="url"
                value={draft.socialLinks?.instagram || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    socialLinks: { ...draft.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="url"
                value={draft.socialLinks?.facebook || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    socialLinks: { ...draft.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={draft.socialLinks?.linkedin || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    socialLinks: { ...draft.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={draft.socialLinks?.youtube || ''}
                onChange={e =>
                  setDraft({
                    ...draft,
                    socialLinks: { ...draft.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Footer & Copyright */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-black text-[#0A192F]">Footer Content & Copyright</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Footer About Text</label>
              <textarea
                rows={3}
                value={draft.footerText}
                onChange={e => setDraft({ ...draft, footerText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Copyright Statement</label>
              <textarea
                rows={3}
                value={draft.copyrightText}
                onChange={e => setDraft({ ...draft, copyrightText: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Third-Party Analytics & Tracking */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Code className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-black text-[#0A192F]">Analytics & Measurement IDs</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Google Analytics Measurement ID</label>
              <input
                type="text"
                value={draft.googleAnalyticsId || ''}
                onChange={e => setDraft({ ...draft, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Google Tag Manager Container ID</label>
              <input
                type="text"
                value={draft.tagManagerId || ''}
                onChange={e => setDraft({ ...draft, tagManagerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Meta Pixel ID</label>
              <input
                type="text"
                value={draft.metaPixelId || ''}
                onChange={e => setDraft({ ...draft, metaPixelId: e.target.value })}
                placeholder="123456789012345"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-md text-sm transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Global Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
