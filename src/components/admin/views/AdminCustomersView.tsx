import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Phone,
  MessageSquare,
  Star,
  CheckCircle2,
  Calendar,
  Layers,
  Edit2,
  Plus,
  Save,
  X
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSCustomer } from '../../../types';

export const AdminCustomersView: React.FC = () => {
  const { customers, saveCustomer } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingCustomer, setEditingCustomer] = useState<CMSCustomer | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = customers.filter(c => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleAddNew = () => {
    const newCust: CMSCustomer = {
      id: 'cust-' + Date.now(),
      name: 'New Client',
      phone: '+91 98450 11223',
      email: '',
      location: 'Bangalore',
      servicesUsed: ['Washing Machine Repair'],
      totalBookings: 1,
      totalEnquiries: 0,
      lastContact: new Date().toISOString().split('T')[0],
      status: 'Active',
      notes: '',
    };
    setEditingCustomer(newCust);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    saveCustomer(editingCustomer);
    setToast(`Saved customer profile for ${editingCustomer.name}!`);
    setEditingCustomer(null);
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
          <h2 className="text-base font-black text-[#0A192F]">Customer Relationship Directory</h2>
          <p className="text-xs text-slate-500">
            Verified Bangalore client profiles, service history, and repeat engagement tracking.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or neighborhood..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#E53935]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 bg-white text-xs border border-slate-200 rounded-xl"
        >
          <option value="All">All Client Tiers</option>
          <option value="VIP">VIP Clients</option>
          <option value="Active">Active Customers</option>
          <option value="Lead">Prospective Leads</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Customer Details</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Services Utilized</th>
                <th className="px-4 py-3.5">Orders & Leads</th>
                <th className="px-4 py-3.5">Tier Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#0A192F]">{c.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{c.phone}</div>
                    {c.email && <div className="text-[10px] text-slate-400">{c.email}</div>}
                  </td>

                  <td className="px-4 py-3.5 text-slate-600 font-medium">
                    {c.location}
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {c.servicesUsed.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-800">
                      {c.totalBookings} Bookings
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {c.totalEnquiries} Enquiries • Last {c.lastContact}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                        c.status === 'VIP'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : c.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`tel:${c.phone}`}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100"
                        title="WhatsApp Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setEditingCustomer({ ...c })}
                        className="p-1.5 text-slate-400 hover:text-[#E53935] rounded-lg hover:bg-slate-100"
                        title="Edit Customer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm text-[#0A192F]">Customer Profile</h3>
              <button onClick={() => setEditingCustomer(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingCustomer.name}
                  onChange={e => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={editingCustomer.phone}
                    onChange={e => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tier Status</label>
                  <select
                    value={editingCustomer.status}
                    onChange={e =>
                      setEditingCustomer({ ...editingCustomer, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="Active">Active</option>
                    <option value="VIP">VIP</option>
                    <option value="Lead">Lead</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bangalore Address / Area</label>
                <input
                  type="text"
                  value={editingCustomer.location}
                  onChange={e => setEditingCustomer({ ...editingCustomer, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={editingCustomer.notes || ''}
                  onChange={e => setEditingCustomer({ ...editingCustomer, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  placeholder="Preferences, property details, etc."
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
