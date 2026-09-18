import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Trash2,
  CheckCircle2,
  Edit2,
  Plus,
  Save,
  X,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSLead, LeadStatus } from '../../../types';

export const AdminLeadsView: React.FC = () => {
  const { leads, saveLead, deleteLead } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingLead, setEditingLead] = useState<CMSLead | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const statuses: (LeadStatus | 'All')[] = [
    'All',
    'New',
    'Contacted',
    'Follow-up',
    'Interested',
    'Converted',
    'Not Interested',
    'Closed',
  ];

  const filtered = leads.filter(l => {
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.requirement.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (lead: CMSLead, newStatus: LeadStatus) => {
    saveLead({ ...lead, status: newStatus });
    setToast(`Lead status updated to ${newStatus}`);
    setTimeout(() => setToast(null), 1500);
  };

  const handleAddNew = () => {
    const newLead: CMSLead = {
      id: 'lead-' + Date.now(),
      customerName: 'New Enquiry',
      phone: '+91 98450 00000',
      email: '',
      service: 'Interior Design Consultation',
      location: 'Bangalore',
      requirement: 'Full home renovation and quote needed.',
      source: 'Direct Admin Entry',
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: '',
    };
    setEditingLead(newLead);
  };

  const handleSaveLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    saveLead(editingLead);
    setToast(`Saved lead for ${editingLead.customerName}!`);
    setEditingLead(null);
    setTimeout(() => setToast(null), 1500);
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
          <h2 className="text-base font-black text-[#0A192F]">Leads & Enquiries CRM Pipeline</h2>
          <p className="text-xs text-slate-500">
            Track customer inquiries, interior consultations, site visits, and conversions.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Lead</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer, phone, service, or locality..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#E53935]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#E53935]"
        >
          {statuses.map(st => (
            <option key={st} value={st}>
              Pipeline: {st}
            </option>
          ))}
        </select>
      </div>

      {/* CRM Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Customer Name & Phone</th>
                <th className="px-4 py-3.5">Service & Location</th>
                <th className="px-4 py-3.5">Requirement Details</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Source & Date</th>
                <th className="px-4 py-3.5 text-right">Contact / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                    No leads found matching the filters.
                  </td>
                </tr>
              ) : (
                filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#0A192F]">{lead.customerName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{lead.phone}</div>
                      {lead.email && <div className="text-[10px] text-slate-400">{lead.email}</div>}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-purple-700">{lead.service}</div>
                      <div className="text-[11px] text-slate-500">{lead.location}</div>
                    </td>

                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="text-slate-700 line-clamp-2">{lead.requirement}</div>
                      {lead.notes && (
                        <div className="text-[10px] text-amber-700 mt-1 font-medium italic">
                          Notes: {lead.notes}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <select
                        value={lead.status}
                        onChange={e => handleUpdateStatus(lead, e.target.value as LeadStatus)}
                        className={`text-[11px] font-extrabold px-2 py-1 rounded-lg border focus:outline-none ${
                          lead.status === 'Converted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : lead.status === 'Interested'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : lead.status === 'New'
                            ? 'bg-red-50 text-red-800 border-red-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Interested">Interested</option>
                        <option value="Converted">Converted</option>
                        <option value="Not Interested">Not Interested</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                      <div>{lead.source}</div>
                      <div>{new Date(lead.createdAt).toLocaleDateString()}</div>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                            lead.customerName
                          )},%20this%20is%20RC%20Call%20Elite%20following%20up%20on%20your%20${encodeURIComponent(
                            lead.service
                          )}%20enquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100"
                          title="WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => setEditingLead({ ...lead })}
                          className="p-1.5 text-slate-400 hover:text-[#E53935] rounded-lg hover:bg-slate-100"
                          title="Edit Lead Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete lead enquiry from ${lead.customerName}?`)) {
                              deleteLead(lead.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                          title="Delete Lead"
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

      {/* EDIT / CREATE LEAD MODAL */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm text-[#0A192F]">Lead Details & Pipeline Stage</h3>
              <button onClick={() => setEditingLead(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveLeadForm} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={editingLead.customerName}
                    onChange={e => setEditingLead({ ...editingLead, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={editingLead.phone}
                    onChange={e => setEditingLead({ ...editingLead, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Required</label>
                  <input
                    type="text"
                    value={editingLead.service}
                    onChange={e => setEditingLead({ ...editingLead, service: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / Area</label>
                  <input
                    type="text"
                    value={editingLead.location}
                    onChange={e => setEditingLead({ ...editingLead, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Requirement Notes</label>
                <textarea
                  rows={2}
                  value={editingLead.requirement}
                  onChange={e => setEditingLead({ ...editingLead, requirement: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Internal Follow-Up Notes</label>
                <textarea
                  rows={2}
                  value={editingLead.notes}
                  onChange={e => setEditingLead({ ...editingLead, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-amber-50/50"
                  placeholder="e.g. Scheduled site visit on Friday at 4 PM"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-xs"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
