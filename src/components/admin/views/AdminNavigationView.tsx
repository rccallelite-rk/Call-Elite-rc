import React, { useState } from 'react';
import {
  Compass,
  Save,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSNavigationItem } from '../../../types';

export const AdminNavigationView: React.FC = () => {
  const { navigation, saveNavigation } = useCMS();
  const [items, setItems] = useState<CMSNavigationItem[]>([...navigation]);
  const [toast, setToast] = useState<string | null>(null);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;

    const copy = [...items];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;

    // re-stamp order
    const updated = copy.map((it, idx) => ({ ...it, order: idx + 1 }));
    setItems(updated);
  };

  const handleToggleVisible = (index: number) => {
    const copy = [...items];
    copy[index].visible = !copy[index].visible;
    setItems(copy);
  };

  const handleUpdate = (index: number, field: keyof CMSNavigationItem, val: any) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [field]: val };
    setItems(copy);
  };

  const handleAddNew = () => {
    const newItem: CMSNavigationItem = {
      id: 'nav-' + Date.now(),
      label: 'New Link',
      path: '/services',
      order: items.length + 1,
      visible: true,
      isSystem: false,
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (index: number) => {
    const item = items[index];
    if (item.isSystem) {
      alert('This is a primary system route and cannot be deleted. You can hide it if needed.');
      return;
    }
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveNavigation(items);
    setToast('Header navigation saved and updated across website!');
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
          <h2 className="text-base font-black text-[#0A192F]">Website Navigation Manager</h2>
          <p className="text-xs text-slate-500">
            Configure header menu labels, routes, sequence, and visibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Menu Item</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Navigation</span>
          </button>
        </div>
      </div>

      {/* List of Navigation items */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="text-xs text-slate-500 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Ordered Header Links</span>
          <span>{items.filter(i => i.visible).length} of {items.length} visible</span>
        </div>

        <div className="space-y-2.5">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                item.visible ? 'bg-slate-50 border-slate-200' : 'bg-slate-100/60 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="font-mono text-slate-400 font-bold w-4">#{idx + 1}</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                  <input
                    type="text"
                    value={item.label}
                    onChange={e => handleUpdate(idx, 'label', e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
                    placeholder="Menu Label"
                  />
                  <input
                    type="text"
                    value={item.path}
                    onChange={e => handleUpdate(idx, 'path', e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-slate-700"
                    placeholder="/path"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleVisible(idx)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] inline-flex items-center gap-1 ${
                    item.visible
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{item.visible ? 'Visible' : 'Hidden'}</span>
                </button>

                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-200"
                  title="Move up"
                >
                  <MoveUp className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  disabled={idx === items.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 rounded hover:bg-slate-200"
                  title="Move down"
                >
                  <MoveDown className="w-4 h-4" />
                </button>

                {item.isSystem ? (
                  <span className="p-1.5 text-slate-400" title="Protected System Route">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-200"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-md text-xs transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Navigation Menu</span>
          </button>
        </div>
      </form>
    </div>
  );
};
