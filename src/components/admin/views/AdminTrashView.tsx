import React, { useState, useMemo } from 'react';
import {
  Trash2,
  RotateCcw,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  X,
  FileText,
  Wrench,
  CalendarCheck,
  Users,
  UserCheck,
  Image,
  Star,
  MapPin,
  HelpCircle,
  Binary
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSTrashItem } from '../../../types';

export const AdminTrashView: React.FC = () => {
  const { trash, restoreFromTrash, permanentlyDelete, emptyTrash } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Permanent Deletion Confirmation Modal State
  const [itemToDelete, setItemToDelete] = useState<CMSTrashItem | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Filtering
  const filteredTrash = useMemo(() => {
    return trash.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originalId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [trash, searchQuery, typeFilter]);

  const handleRestore = (item: CMSTrashItem) => {
    restoreFromTrash(item.id);
    setSuccessToast(`Successfully restored "${item.title}" to active records.`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleConfirmPermanentDelete = () => {
    if (!itemToDelete) return;
    if (deleteConfirmationText.trim() !== 'DELETE') {
      setDeleteError('You must type DELETE exactly (all uppercase) to confirm.');
      return;
    }

    permanentlyDelete(itemToDelete.id);
    setSuccessToast(`Permanently eliminated "${itemToDelete.title}".`);
    setTimeout(() => setSuccessToast(''), 4000);
    setItemToDelete(null);
    setDeleteConfirmationText('');
    setDeleteError('');
  };

  const getTypeIcon = (type: CMSTrashItem['type']) => {
    switch (type) {
      case 'service':
        return <Wrench className="w-4 h-4 text-amber-500" />;
      case 'page':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'booking':
        return <CalendarCheck className="w-4 h-4 text-emerald-500" />;
      case 'lead':
        return <Users className="w-4 h-4 text-purple-500" />;
      case 'customer':
        return <UserCheck className="w-4 h-4 text-indigo-500" />;
      case 'media':
        return <Image className="w-4 h-4 text-teal-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-amber-400" />;
      case 'area':
        return <MapPin className="w-4 h-4 text-rose-500" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-sky-500" />;
      case 'redirect':
        return <Binary className="w-4 h-4 text-slate-500" />;
      default:
        return <Trash2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-700 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#0A192F]">Trash Vault & Recovery</h1>
              <p className="text-xs text-slate-500">
                Safe two-stage deletion. Soft-deleted records are held securely here. You can restore them anytime or permanently erase them.
              </p>
            </div>
          </div>
        </div>

        {trash.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to empty the entire Trash vault? This will permanently eliminate all soft-deleted items.')) {
                emptyTrash();
              }
            }}
            className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Trash ({trash.length})</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deleted items by title, id, or content..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          />
        </div>

        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          >
            <option value="all">All Object Types ({trash.length})</option>
            <option value="service">Services ({trash.filter(t => t.type === 'service').length})</option>
            <option value="page">Pages ({trash.filter(t => t.type === 'page').length})</option>
            <option value="booking">Bookings ({trash.filter(t => t.type === 'booking').length})</option>
            <option value="lead">Leads ({trash.filter(t => t.type === 'lead').length})</option>
            <option value="customer">Customers ({trash.filter(t => t.type === 'customer').length})</option>
            <option value="media">Media ({trash.filter(t => t.type === 'media').length})</option>
            <option value="faq">FAQs ({trash.filter(t => t.type === 'faq').length})</option>
            <option value="redirect">Redirects ({trash.filter(t => t.type === 'redirect').length})</option>
            <option value="area">Service Areas ({trash.filter(t => t.type === 'area').length})</option>
            <option value="review">Reviews ({trash.filter(t => t.type === 'review').length})</option>
          </select>
        </div>
      </div>

      {/* Trash List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5">Item Name / Title</th>
                <th className="px-4 py-3.5">Original Reference</th>
                <th className="px-4 py-3.5">Deleted At</th>
                <th className="px-4 py-3.5">Deleted By</th>
                <th className="px-4 py-3.5 text-right">Recovery Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTrash.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Trash2 className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-slate-600">The Trash Vault is clean</div>
                      <div className="text-xs text-slate-400 max-w-sm">
                        No soft-deleted records match your filter. Any deleted services, bookings, leads, or media will appear here for safe recovery.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTrash.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-[11px] text-slate-700 uppercase">
                        {getTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#0A192F]">
                      {item.title}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">
                      {item.originalId}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                      {new Date(item.deletedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-[11px]">
                      {item.deletedBy}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* 1-Click Restore Button */}
                        <button
                          onClick={() => handleRestore(item)}
                          className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          title="Restore back to active catalog"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restore</span>
                        </button>

                        {/* Permanent Delete Trigger Button */}
                        <button
                          onClick={() => {
                            setItemToDelete(item);
                            setDeleteConfirmationText('');
                            setDeleteError('');
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          title="Permanently erase record"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Permanent Delete</span>
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

      {/* PERMANENT DELETION MANDATORY CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-rose-600">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-black text-base text-[#0A192F]">Permanent Deletion Required</h3>
              </div>
              <button
                onClick={() => setItemToDelete(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-1">
              <p className="font-extrabold">Warning: This action cannot be undone.</p>
              <p>
                You are about to permanently erase the {itemToDelete.type} record:
              </p>
              <p className="font-bold font-mono text-rose-950">"{itemToDelete.title}"</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Type <span className="font-mono text-rose-600 font-extrabold">DELETE</span> to continue:
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={e => {
                  setDeleteConfirmationText(e.target.value);
                  setDeleteError('');
                }}
                placeholder="Type DELETE"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
              {deleteError && (
                <p className="text-[11px] font-semibold text-rose-600">{deleteError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPermanentDelete}
                disabled={deleteConfirmationText.trim() !== 'DELETE'}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                  deleteConfirmationText.trim() === 'DELETE'
                    ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Permanent Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
