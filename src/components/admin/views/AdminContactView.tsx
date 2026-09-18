import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  CheckCircle2,
  ExternalLink,
  Building
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSContactSettings } from '../../../types';

export const AdminContactView: React.FC = () => {
  const { contactSettings, saveContact } = useCMS();
  const [draft, setDraft] = useState<CMSContactSettings>({ ...contactSettings });
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveContact(draft);
    setToast('Contact settings saved and updated site-wide!');
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
          <h2 className="text-base font-black text-[#0A192F]">Contact & Location Settings</h2>
          <p className="text-xs text-slate-500">
            Control customer-facing hotlines, WhatsApp routing, office address, and hours of operation.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Contact Info</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Phone & WhatsApp */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-4 h-4 text-[#E53935]" />
            <h3 className="text-sm font-black text-[#0A192F]">Phone & WhatsApp Channels</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Hotline *</label>
              <input
                type="text"
                required
                value={draft.primaryPhone}
                onChange={e => setDraft({ ...draft, primaryPhone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alternate Phone</label>
              <input
                type="text"
                value={draft.secondaryPhone || ''}
                onChange={e => setDraft({ ...draft, secondaryPhone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Business Number *</label>
              <input
                type="text"
                required
                value={draft.whatsappNumber}
                onChange={e => setDraft({ ...draft, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-emerald-700 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Mail className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-black text-[#0A192F]">Support & Inquiry Email Accounts</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Customer Support Email *</label>
              <input
                type="email"
                required
                value={draft.supportEmail}
                onChange={e => setDraft({ ...draft, supportEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">General Inquiries Email</label>
              <input
                type="email"
                value={draft.infoEmail}
                onChange={e => setDraft({ ...draft, infoEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Physical Office Address */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-black text-[#0A192F]">Bangalore Headquarters Address</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Street Address *</label>
              <textarea
                rows={2}
                required
                value={draft.address}
                onChange={e => setDraft({ ...draft, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Landmark</label>
                <input
                  type="text"
                  value={draft.landmark}
                  onChange={e => setDraft({ ...draft, landmark: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Google Maps Embed URL / Link</label>
                <input
                  type="url"
                  value={draft.googleMapsUrl || ''}
                  onChange={e => setDraft({ ...draft, googleMapsUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Clock className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-black text-[#0A192F]">Operating Timings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Weekday Hours</label>
              <input
                type="text"
                value={draft.workingHoursWeekday}
                onChange={e => setDraft({ ...draft, workingHoursWeekday: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Weekend Hours</label>
              <input
                type="text"
                value={draft.workingHoursWeekend}
                onChange={e => setDraft({ ...draft, workingHoursWeekend: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Emergency Support Note</label>
              <input
                type="text"
                value={draft.emergencyNote}
                onChange={e => setDraft({ ...draft, emergencyNote: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
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
            <span>Save Contact Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
