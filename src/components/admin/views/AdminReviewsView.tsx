import React, { useState } from 'react';
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Save,
  X,
  Search,
  MessageSquare
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSReview } from '../../../types';

export const AdminReviewsView: React.FC = () => {
  const { reviews, saveReview, deleteReview } = useCMS();
  const [editingReview, setEditingReview] = useState<CMSReview | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const filtered = reviews.filter(r =>
    r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.reviewText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNew = () => {
    const newRev: CMSReview = {
      id: 'rev-' + Date.now(),
      customerName: 'Customer Name',
      reviewText: 'Excellent service provided by the technician. Prompt arrival and transparent pricing.',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      serviceName: 'Washing Machine Repair',
      status: 'Published',
    };
    setEditingReview(newRev);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    saveReview(editingReview);
    setToast(`Saved review for ${editingReview.customerName}!`);
    setEditingReview(null);
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
          <h2 className="text-base font-black text-[#0A192F]">Customer Testimonials & Reviews</h2>
          <p className="text-xs text-slate-500">
            Publish, edit, and moderate verified customer feedback displayed on landing pages.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    r.status === 'Published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{r.reviewText}"
              </p>

              <div className="pt-2 border-t border-slate-100">
                <div className="font-bold text-[#0A192F] text-xs">{r.customerName}</div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{r.serviceName}</span>
                  <span>{r.date}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setEditingReview({ ...r })}
                className="p-1.5 text-slate-600 hover:text-[#E53935] rounded-lg hover:bg-slate-100"
                title="Edit review"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete review from ${r.customerName}?`)) {
                    deleteReview(r.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                title="Delete review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-black text-[#0A192F]">Review Editor</h3>
              </div>
              <button
                onClick={() => setEditingReview(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={editingReview.customerName}
                  onChange={e => setEditingReview({ ...editingReview, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    value={editingReview.serviceName}
                    onChange={e => setEditingReview({ ...editingReview, serviceName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating (1-5)</label>
                  <select
                    value={editingReview.rating}
                    onChange={e => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Feedback Text *</label>
                <textarea
                  rows={3}
                  required
                  value={editingReview.reviewText}
                  onChange={e => setEditingReview({ ...editingReview, reviewText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingReview.date}
                    onChange={e => setEditingReview({ ...editingReview, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingReview.status}
                    onChange={e => setEditingReview({ ...editingReview, status: e.target.value as 'Published' | 'Draft' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E53935] text-white rounded-xl font-bold shadow-xs hover:bg-[#c62828]"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
