import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Save,
  X,
  Search,
  Check
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSServiceArea } from '../../../types';

interface AdminServiceAreasViewProps {
  openNewModalTrigger?: number;
}

export const AdminServiceAreasView: React.FC<AdminServiceAreasViewProps> = ({
  openNewModalTrigger,
}) => {
  const { serviceAreas, saveArea, deleteArea } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingArea, setEditingArea] = useState<CMSServiceArea | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = serviceAreas.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.zone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNew = () => {
    const newArea: CMSServiceArea = {
      id: 'area-' + Date.now(),
      name: 'New Bangalore Locality',
      zone: 'South Bangalore',
      status: 'Active',
      pincode: '560001',
    };
    setEditingArea(newArea);
  };

  React.useEffect(() => {
    if (openNewModalTrigger && openNewModalTrigger > 0) {
      handleAddNew();
    }
  }, [openNewModalTrigger]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArea) return;
    saveArea(editingArea);
    setToast(`Saved service area: ${editingArea.name}!`);
    setEditingArea(null);
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
          <h2 className="text-base font-black text-[#0A192F]">Service Areas & Bangalore Localities</h2>
          <p className="text-xs text-slate-500">
            Control the coverage zones and doorstep availability across Bengaluru.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Area</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter localities by name or operational zone..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#E53935]"
        />
      </div>

      {/* Area Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map(area => (
          <div
            key={area.id}
            className="bg-white rounded-xl border border-slate-200/80 p-3.5 flex items-center justify-between gap-2 shadow-xs hover:border-slate-300 transition-all text-xs"
          >
            <div className="min-w-0">
              <div className="font-black text-[#0A192F] truncate">{area.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{area.zone}</div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditingArea({ ...area })}
                className="p-1 text-slate-500 hover:text-[#E53935] rounded"
                title="Edit area"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete coverage for ${area.name}?`)) {
                    deleteArea(area.id);
                  }
                }}
                className="p-1 text-slate-400 hover:text-red-600 rounded"
                title="Delete area"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingArea && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-sm text-[#0A192F]">Edit Service Area</h3>
              <button onClick={() => setEditingArea(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Locality Name *</label>
                <input
                  type="text"
                  required
                  value={editingArea.name}
                  onChange={e => setEditingArea({ ...editingArea, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Zone / Sector</label>
                <input
                  type="text"
                  value={editingArea.zone}
                  onChange={e => setEditingArea({ ...editingArea, zone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  placeholder="e.g. South Bangalore"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pin Code (Optional)</label>
                <input
                  type="text"
                  value={editingArea.pincode || ''}
                  onChange={e => setEditingArea({ ...editingArea, pincode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  placeholder="e.g. 560034"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingArea(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E53935] text-white rounded-xl font-bold hover:bg-[#c62828]"
                >
                  Save Area
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
