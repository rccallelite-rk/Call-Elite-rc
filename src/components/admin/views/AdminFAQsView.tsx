import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  Copy,
  Trash2,
  Edit2,
  CheckCircle2,
  ArrowUpDown,
  Globe,
  Wrench,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSFAQItem } from '../../../types';

export const AdminFAQsView: React.FC = () => {
  const {
    faqs,
    saveFAQ,
    deleteFAQ,
    duplicateFAQ,
    toggleFAQStatus,
    reorderFAQs,
    services,
    pages,
  } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'global' | 'service' | 'page'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Published' | 'Draft'>('all');

  // Modal editor state
  const [editingFAQ, setEditingFAQ] = useState<CMSFAQItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [scope, setScope] = useState<'global' | 'service' | 'page'>('global');
  const [targetSlug, setTargetSlug] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Filtered FAQs
  const filteredFAQs = useMemo(() => {
    return faqs
      .filter(f => {
        const matchesSearch =
          f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesScope = scopeFilter === 'all' || f.scope === scopeFilter;
        const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
        return matchesSearch && matchesScope && matchesStatus;
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [faqs, searchQuery, scopeFilter, statusFilter]);

  const handleOpenAdd = () => {
    setEditingFAQ(null);
    setQuestion('');
    setAnswer('');
    setScope('global');
    setTargetSlug('');
    setStatus('Published');
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: CMSFAQItem) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setScope(faq.scope);
    setTargetSlug(faq.targetSlug || '');
    setStatus(faq.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    const item: CMSFAQItem = {
      id: editingFAQ ? editingFAQ.id : `faq-${Date.now()}`,
      question: question.trim(),
      answer: answer.trim(),
      scope,
      targetSlug: scope !== 'global' ? targetSlug : undefined,
      status,
      order: editingFAQ ? editingFAQ.order : faqs.length + 1,
      lastUpdated: new Date().toISOString(),
    };

    saveFAQ(item);
    showToast(editingFAQ ? 'FAQ updated successfully.' : 'New genuine FAQ created.');
    setModalOpen(false);
  };

  // Reorder up/down
  const moveFAQ = (index: number, direction: 'up' | 'down') => {
    const list = [...filteredFAQs];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    reorderFAQs(list);
    showToast('FAQ presentation sequence updated.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-emerald-200 border border-emerald-800 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-600">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#0A192F]">Frequently Asked Questions (FAQs)</h1>
            <p className="text-xs text-slate-500">
              Manage Global, Service-specific, and Page-specific FAQs. Note: AI Studio Super Admin rules strictly mandate genuine, authentic Q&A only.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-bold text-white bg-[#E53935] hover:bg-[#C62828] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Genuine FAQ</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          />
        </div>

        <div>
          <select
            value={scopeFilter}
            onChange={e => setScopeFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          >
            <option value="all">All Scopes ({faqs.length})</option>
            <option value="global">Global Site FAQs ({faqs.filter(f => f.scope === 'global').length})</option>
            <option value="service">Service FAQs ({faqs.filter(f => f.scope === 'service').length})</option>
            <option value="page">Page FAQs ({faqs.filter(f => f.scope === 'page').length})</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published Live</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* FAQ Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5 w-12 text-center">Order</th>
                <th className="px-4 py-3.5">Question & Answer</th>
                <th className="px-4 py-3.5">Scope & Target</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFAQs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                    No FAQs found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredFAQs.map((faq, index) => (
                  <tr key={faq.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Order Controls */}
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <button
                          onClick={() => moveFAQ(index, 'up')}
                          disabled={index === 0}
                          className={`text-slate-400 hover:text-slate-800 ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                          title="Move up"
                        >
                          ▲
                        </button>
                        <span className="font-mono text-[10px] font-bold text-slate-500">{index + 1}</span>
                        <button
                          onClick={() => moveFAQ(index, 'down')}
                          disabled={index === filteredFAQs.length - 1}
                          className={`text-slate-400 hover:text-slate-800 ${index === filteredFAQs.length - 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                          title="Move down"
                        >
                          ▼
                        </button>
                      </div>
                    </td>

                    {/* Question & Answer */}
                    <td className="px-4 py-3.5 max-w-md">
                      <div className="font-black text-[#0A192F] text-xs mb-1">{faq.question}</div>
                      <div className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{faq.answer}</div>
                    </td>

                    {/* Scope & Target */}
                    <td className="px-4 py-3.5">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-700 uppercase">
                        {faq.scope === 'global' && <Globe className="w-3 h-3 text-emerald-600" />}
                        {faq.scope === 'service' && <Wrench className="w-3 h-3 text-amber-600" />}
                        {faq.scope === 'page' && <FileText className="w-3 h-3 text-blue-600" />}
                        <span>{faq.scope}</span>
                      </div>
                      {faq.targetSlug && (
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          /{faq.scope === 'service' ? 'services/' : ''}{faq.targetSlug}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleFAQStatus(faq.id)}
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${
                          faq.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${faq.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span>{faq.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(faq)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                          title="Edit FAQ"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateFAQ(faq.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                          title="Duplicate FAQ"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteFAQ(faq.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                          title="Delete FAQ (moves to Trash)"
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

      {/* FAQ Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-[#0A192F]">
                {editingFAQ ? 'Edit FAQ Item' : 'Add Genuine FAQ'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="e.g., How soon can a technician arrive for AC servicing?"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Answer</label>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  rows={4}
                  placeholder="e.g., Our certified technicians typically arrive within 60 to 90 minutes across Bangalore..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Scope</label>
                  <select
                    value={scope}
                    onChange={e => setScope(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="global">Global (All Pages)</option>
                    <option value="service">Service Specific</option>
                    <option value="page">Page Specific</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {scope === 'service' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Service</label>
                  <select
                    value={targetSlug}
                    onChange={e => setTargetSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    required
                  >
                    <option value="">Select Service...</option>
                    {services.map(s => (
                      <option key={s.id} value={s.slug}>
                        {s.name} (/services/{s.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {scope === 'page' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Page</label>
                  <select
                    value={targetSlug}
                    onChange={e => setTargetSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    required
                  >
                    <option value="">Select Page...</option>
                    {Object.entries(pages).map(([slug, p]) => (
                      <option key={slug} value={slug}>
                        {p.title} (/{slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#E53935] hover:bg-[#C62828] rounded-xl shadow-xs"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
