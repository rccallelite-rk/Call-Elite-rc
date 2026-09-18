import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Copy,
  Check,
  CheckCircle2,
  Edit2,
  ExternalLink,
  Search,
  FileCheck
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSMediaItem } from '../../../types';

export const AdminMediaView: React.FC = () => {
  const { media, addMedia, deleteMedia, updateMediaAlt } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // New Media Form State
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newUsedBy, setNewUsedBy] = useState('');

  const filteredMedia = media.filter(m =>
    m.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.usedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const item: CMSMediaItem = {
      id: 'med-' + Date.now(),
      fileName: newFileName || `asset_${Date.now()}.jpg`,
      fileType: 'image/jpeg',
      fileSize: '320 KB',
      url: newUrl,
      altText: newAlt || 'RC Call Elite service asset',
      uploadDate: new Date().toISOString().split('T')[0],
      usedBy: newUsedBy || 'Website Assets',
    };

    addMedia(item);
    setNewUrl('');
    setNewAlt('');
    setNewFileName('');
    setNewUsedBy('');
    setIsUploading(false);
    setToast('Media asset uploaded to library!');
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

      {/* Header & Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-[#0A192F]">Media Library Assets</h2>
          <p className="text-xs text-slate-500">
            Upload, inspect, and copy links for service banners, trust graphics, and hero photography.
          </p>
        </div>

        <button
          onClick={() => setIsUploading(!isUploading)}
          className="inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 active:scale-95"
        >
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Cancel Upload' : 'Upload Image'}</span>
        </button>
      </div>

      {/* Upload Dropdown / Form */}
      {isUploading && (
        <form
          onSubmit={handleCreateMedia}
          className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#E53935]/40 shadow-xs space-y-4 animate-in slide-in-from-top-2"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Upload className="w-4 h-4 text-[#E53935]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Add New Media Asset
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Image URL (Hosted or Unsplash) *</label>
              <input
                type="url"
                required
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">File Name</label>
              <input
                type="text"
                value={newFileName}
                onChange={e => setNewFileName(e.target.value)}
                placeholder="e.g. ac_service_doorstep.jpg"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alt Text (Accessibility & SEO)</label>
              <input
                type="text"
                value={newAlt}
                onChange={e => setNewAlt(e.target.value)}
                placeholder="e.g. Bangalore AC filter deep jet cleaning"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Used By Page/Service</label>
              <input
                type="text"
                value={newUsedBy}
                onChange={e => setNewUsedBy(e.target.value)}
                placeholder="e.g. AC Service Landing Page"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {newUrl && (
            <div className="w-32 h-20 rounded-xl overflow-hidden border border-slate-200">
              <img src={newUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsUploading(false)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Save Media
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter media by name, alt text, or usage..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#E53935]"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all group"
          >
            <div>
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {item.fileSize}
                </div>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <div>
                  <div className="font-black text-[#0A192F] truncate">{item.fileName}</div>
                  <div className="text-[10px] text-slate-400">{item.uploadDate}</div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Alt Text:</span>
                  <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                    "{item.altText || 'No alt text'}"
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {item.usedBy}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
              <button
                onClick={() => handleCopyUrl(item.url, item.id)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-[#E53935]"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete media asset "${item.fileName}"?`)) {
                    deleteMedia(item.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
