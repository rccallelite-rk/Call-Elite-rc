import React, { useState } from 'react';
import {
  Binary,
  ArrowRight,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  Eye,
  ExternalLink,
  Code2,
  FileCode,
  ShieldCheck,
  Globe,
  Sliders
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { CMSRedirect, CMSSchemaConfig } from '../../../types';

export const AdminTechnicalSEOView: React.FC = () => {
  const {
    redirects,
    saveRedirect,
    deleteRedirect,
    duplicateRedirect,
    toggleRedirect,
    sitemap,
    updateSitemapConfig,
    regenerateSitemap,
    robots,
    saveRobotsConfig,
    resetRobotsToDefault,
    schemas,
    saveSchema,
    deleteSchema,
    toggleSchema,
    resetSchemasToDefault,
    services,
    pages,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'redirects' | 'sitemap' | 'robots' | 'schema'>('redirects');

  // Redirect form state
  const [editingRedirect, setEditingRedirect] = useState<CMSRedirect | null>(null);
  const [redirectFrom, setRedirectFrom] = useState('');
  const [redirectTo, setRedirectTo] = useState('');
  const [redirectType, setRedirectType] = useState<301 | 302>(301);
  const [redirectNotes, setRedirectNotes] = useState('');
  const [redirectError, setRedirectError] = useState('');

  // Robots text editor state
  const [robotsContent, setRobotsContent] = useState(robots.content);
  const [robotsSavedToast, setRobotsSavedToast] = useState(false);

  // Schema form state
  const [editingSchema, setEditingSchema] = useState<CMSSchemaConfig | null>(null);
  const [schemaName, setSchemaName] = useState('');
  const [schemaType, setSchemaType] = useState('LocalBusiness');
  const [schemaJsonLd, setSchemaJsonLd] = useState('');
  const [schemaError, setSchemaError] = useState('');

  // Sitemap excluded url input
  const [newExcludedUrl, setNewExcludedUrl] = useState('');

  // Success toast
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Redirect handling
  const handleSaveRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    setRedirectError('');

    let from = redirectFrom.trim();
    let to = redirectTo.trim();

    if (!from || !to) {
      setRedirectError('Both origin and destination paths are required.');
      return;
    }

    // Ensure leading slash
    if (!from.startsWith('/') && !from.startsWith('http')) from = '/' + from;
    if (!to.startsWith('/') && !to.startsWith('http')) to = '/' + to;

    // Loop check
    if (from.toLowerCase() === to.toLowerCase()) {
      setRedirectError('Redirect loop detected: Source and target URLs cannot be identical.');
      return;
    }

    const newRecord: CMSRedirect = {
      id: editingRedirect ? editingRedirect.id : `red-${Date.now()}`,
      fromPath: from,
      toPath: to,
      type: redirectType,
      enabled: editingRedirect ? editingRedirect.enabled : true,
      notes: redirectNotes,
      createdAt: editingRedirect ? editingRedirect.createdAt : new Date().toISOString(),
    };

    saveRedirect(newRecord);
    showToast(`Redirect rule ${newRecord.fromPath} → ${newRecord.toPath} saved.`);
    setEditingRedirect(null);
    setRedirectFrom('');
    setRedirectTo('');
    setRedirectNotes('');
  };

  // Robots.txt save
  const handleSaveRobots = () => {
    if (!robotsContent.includes('User-agent:')) {
      if (!window.confirm('Warning: No "User-agent" declaration detected in your robots.txt. Continue publishing anyway?')) {
        return;
      }
    }
    saveRobotsConfig(robotsContent);
    setRobotsSavedToast(true);
    setTimeout(() => setRobotsSavedToast(false), 3000);
  };

  // Schema save
  const handleSaveSchema = (e: React.FormEvent) => {
    e.preventDefault();
    setSchemaError('');

    try {
      JSON.parse(schemaJsonLd);
    } catch (err: any) {
      setSchemaError(`JSON syntax error: ${err.message}`);
      return;
    }

    const newSchema: CMSSchemaConfig = {
      id: editingSchema ? editingSchema.id : `schema-${Date.now()}`,
      name: schemaName.trim() || 'Custom Schema',
      type: schemaType,
      enabled: editingSchema ? editingSchema.enabled : true,
      jsonLd: schemaJsonLd,
      lastUpdated: new Date().toISOString(),
    };

    saveSchema(newSchema);
    showToast(`Schema "${newSchema.name}" successfully compiled and saved.`);
    setEditingSchema(null);
  };

  // Live Sitemap URL list calculation
  const calculatedSitemapUrls = [
    { url: '/', priority: '1.0', changefreq: 'weekly', type: 'Static Page' },
    { url: '/services', priority: '0.9', changefreq: 'weekly', type: 'Catalog Hub' },
    { url: '/how-it-works', priority: '0.8', changefreq: 'monthly', type: 'Static Page' },
    { url: '/about-us', priority: '0.8', changefreq: 'monthly', type: 'Static Page' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly', type: 'Static Page' },
    ...services
      .filter(s => s.status === 'Active' && !s.seo?.noIndex)
      .map(s => ({
        url: `/services/${s.slug}`,
        priority: '0.85',
        changefreq: 'weekly',
        type: `Service (${s.category})`,
      })),
    ...Object.entries(pages)
      .filter(([slug, p]) => slug !== 'home' && p.status === 'Published' && !p.seo?.noIndex)
      .map(([slug]) => ({
        url: `/${slug}`,
        priority: '0.70',
        changefreq: 'monthly',
        type: 'Published Page',
      })),
  ].filter(u => !sitemap.excludedUrls.includes(u.url));

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
          <div className="p-3 bg-slate-900 rounded-xl text-white">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#0A192F]">Technical SEO Control Center</h1>
            <p className="text-xs text-slate-500">
              Direct Super Admin authority over 301/302 Redirects, XML Sitemap, robots.txt crawler rules, and Schema.org JSON-LD definitions.
            </p>
          </div>
        </div>

        {/* Live Sitemap XML Link */}
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 text-xs font-bold text-[#0A192F] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View /sitemap.xml</span>
        </a>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('redirects')}
          className={`pb-3 px-4 text-xs font-extrabold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'redirects'
              ? 'border-[#E53935] text-[#E53935]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>301 & 302 Redirects ({redirects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sitemap')}
          className={`pb-3 px-4 text-xs font-extrabold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sitemap'
              ? 'border-[#E53935] text-[#E53935]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>XML Sitemap Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('robots')}
          className={`pb-3 px-4 text-xs font-extrabold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'robots'
              ? 'border-[#E53935] text-[#E53935]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>robots.txt Editor</span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`pb-3 px-4 text-xs font-extrabold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'schema'
              ? 'border-[#E53935] text-[#E53935]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Schema.org JSON-LD ({schemas.length})</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* 1. REDIRECTS TAB */}
      {/* ========================================== */}
      {activeTab === 'redirects' && (
        <div className="space-y-6">
          {/* Add / Edit Redirect Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h2 className="text-sm font-black text-[#0A192F] mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#E53935]" />
              <span>{editingRedirect ? 'Edit Redirect Rule' : 'Create 301 / 302 Redirect Rule'}</span>
            </h2>

            {redirectError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{redirectError}</span>
              </div>
            )}

            <form onSubmit={handleSaveRedirect} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">From URL (Path)</label>
                <input
                  type="text"
                  placeholder="/old-service-url"
                  value={redirectFrom}
                  onChange={e => setRedirectFrom(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">To Destination</label>
                <input
                  type="text"
                  placeholder="/services/target-slug"
                  value={redirectTo}
                  onChange={e => setRedirectTo(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">HTTP Redirect Type</label>
                <select
                  value={redirectType}
                  onChange={e => setRedirectType(Number(e.target.value) as 301 | 302)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
                >
                  <option value={301}>301 Permanent Redirect (Recommended for SEO)</option>
                  <option value={302}>302 Temporary Redirect</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-xs font-bold text-white bg-[#E53935] hover:bg-[#C62828] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{editingRedirect ? 'Update Rule' : 'Add Redirect'}</span>
                </button>
                {editingRedirect && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingRedirect(null);
                      setRedirectFrom('');
                      setRedirectTo('');
                    }}
                    className="px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Redirects Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Configured URL Mappings</span>
              <span className="text-[11px] text-slate-400">Total: {redirects.length} rules</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Origin (From)</th>
                    <th className="px-4 py-3">Destination (To)</th>
                    <th className="px-4 py-3">HTTP Code</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {redirects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                        No redirect rules created yet.
                      </td>
                    </tr>
                  ) : (
                    redirects.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleRedirect(r.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold cursor-pointer border ${
                              r.enabled
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}
                          >
                            {r.enabled ? 'Active' : 'Disabled'}
                          </button>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] font-semibold text-[#0A192F]">
                          {r.fromPath}
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-blue-600">
                          {r.toPath}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 font-bold rounded bg-slate-100 text-slate-700 text-[10px]">
                            {r.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-[11px]">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingRedirect(r);
                                setRedirectFrom(r.fromPath);
                                setRedirectTo(r.toPath);
                                setRedirectType(r.type);
                                setRedirectNotes(r.notes || '');
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                              title="Edit rule"
                            >
                              <Sliders className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => duplicateRedirect(r.id)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                              title="Duplicate rule"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteRedirect(r.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                              title="Delete rule (moves to Trash)"
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
        </div>
      )}

      {/* ========================================== */}
      {/* 2. SITEMAP TAB */}
      {/* ========================================== */}
      {activeTab === 'sitemap' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-black text-[#0A192F]">XML Sitemap Configuration</h2>
                <p className="text-xs text-slate-500">
                  Auto-generates verified search engine URLs. Never includes /admin, /login, private APIs or draft content.
                </p>
              </div>

              <button
                onClick={() => {
                  regenerateSitemap();
                  showToast('Sitemap regenerated with fresh timestamp.');
                }}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate Sitemap Now</span>
              </button>
            </div>

            {/* Sitemap Exclusions */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Excluded Path Directives</span>
              <div className="flex flex-wrap gap-2">
                {sitemap.excludedUrls.map(url => (
                  <span
                    key={url}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700"
                  >
                    <span>{url}</span>
                    <button
                      onClick={() => {
                        updateSitemapConfig({
                          excludedUrls: sitemap.excludedUrls.filter(u => u !== url),
                        });
                      }}
                      className="text-slate-400 hover:text-rose-600"
                      title="Remove exclusion"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="/custom-excluded-path"
                  value={newExcludedUrl}
                  onChange={e => setNewExcludedUrl(e.target.value)}
                  className="px-3 py-1.5 bg-white text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#E53935]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newExcludedUrl.trim()) return;
                    const url = newExcludedUrl.trim().startsWith('/') ? newExcludedUrl.trim() : '/' + newExcludedUrl.trim();
                    if (!sitemap.excludedUrls.includes(url)) {
                      updateSitemapConfig({
                        excludedUrls: [...sitemap.excludedUrls, url],
                      });
                      setNewExcludedUrl('');
                      showToast(`Added ${url} to sitemap exclusions.`);
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-[#0A192F] text-white rounded-xl hover:bg-slate-800"
                >
                  Add Exclusion
                </button>
              </div>
            </div>
          </div>

          {/* Live Included URLs Inspector */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Verified Search Engine Indexed URLs ({calculatedSitemapUrls.length})
              </span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                HTTP 200 Valid
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase">
                  <tr>
                    <th className="px-4 py-3">Page / Service URL</th>
                    <th className="px-4 py-3">Classification</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Change Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculatedSitemapUrls.map(u => (
                    <tr key={u.url} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-blue-600 font-medium">
                        https://calleliterc.com{u.url}
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">{u.type}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-500">{u.priority}</td>
                      <td className="px-4 py-2.5 text-slate-500">{u.changefreq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. ROBOTS.TXT TAB */}
      {/* ========================================== */}
      {activeTab === 'robots' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-black text-[#0A192F]">Live robots.txt Directives</h2>
                <p className="text-xs text-slate-500">
                  Defines search crawler policies (Googlebot, Bingbot). Private paths like /admin, /api, and /login are strictly protected.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset robots.txt to standard production template?')) {
                      resetRobotsToDefault();
                      setRobotsContent(robots.content);
                      showToast('robots.txt reset to verified default.');
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  Restore Default
                </button>
                <button
                  onClick={handleSaveRobots}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#E53935] hover:bg-[#C62828] rounded-xl shadow-xs"
                >
                  Publish robots.txt
                </button>
              </div>
            </div>

            {robotsSavedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>robots.txt published live! Available at /robots.txt</span>
              </div>
            )}

            <div className="relative">
              <textarea
                value={robotsContent}
                onChange={e => setRobotsContent(e.target.value)}
                rows={14}
                className="w-full p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E53935]/40 leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. SCHEMA.ORG JSON-LD TAB */}
      {/* ========================================== */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-[#0A192F]">Structured Data (Schema.org JSON-LD)</h2>
                <p className="text-xs text-slate-500">
                  Rich snippet definitions for Google Search. Note: Super Admin rules strictly ban fake reviews or fake ratings.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all Schema.org definitions to verified factory defaults?')) {
                      resetSchemasToDefault();
                      showToast('Schemas reset to verified business defaults.');
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  Reset to Defaults
                </button>
                <button
                  onClick={() => {
                    setEditingSchema({
                      id: '',
                      name: '',
                      type: 'Service',
                      enabled: true,
                      jsonLd: '{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  "name": "Custom Service",\n  "provider": {\n    "@type": "LocalBusiness",\n    "name": "RC Call Elite"\n  }\n}',
                    });
                    setSchemaName('');
                    setSchemaType('Service');
                    setSchemaJsonLd('{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  "name": "Custom Service",\n  "provider": {\n    "@type": "LocalBusiness",\n    "name": "RC Call Elite"\n  }\n}');
                    setSchemaError('');
                  }}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#0A192F] hover:bg-slate-800 rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" />
                  Add Custom Schema
                </button>
              </div>
            </div>

            {/* List of Schemas */}
            <div className="space-y-4 pt-2">
              {schemas.map(sch => (
                <div
                  key={sch.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-[#E53935]" />
                      <span className="font-extrabold text-xs text-[#0A192F]">{sch.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {sch.type}
                      </span>
                      {sch.isDefault && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          System Default
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSchema(sch.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer border ${
                          sch.enabled
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {sch.enabled ? 'Enabled in <head>' : 'Disabled'}
                      </button>

                      <button
                        onClick={() => {
                          setEditingSchema(sch);
                          setSchemaName(sch.name);
                          setSchemaType(sch.type);
                          setSchemaJsonLd(sch.jsonLd);
                          setSchemaError('');
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Edit
                      </button>

                      {!sch.isDefault && (
                        <button
                          onClick={() => deleteSchema(sch.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <pre className="p-3 bg-slate-900 text-emerald-400 text-[11px] font-mono rounded-lg overflow-x-auto max-h-40">
                    {sch.jsonLd}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Schema Editor Modal */}
          {editingSchema && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-[#0A192F]">
                    {editingSchema.id ? `Edit Schema: ${editingSchema.name}` : 'Create Structured Data Schema'}
                  </h3>
                  <button
                    onClick={() => setEditingSchema(null)}
                    className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                  >
                    ×
                  </button>
                </div>

                {schemaError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{schemaError}</span>
                  </div>
                )}

                <form onSubmit={handleSaveSchema} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Schema Label</label>
                      <input
                        type="text"
                        value={schemaName}
                        onChange={e => setSchemaName(e.target.value)}
                        placeholder="LocalBusiness Schema"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Schema.org Type</label>
                      <input
                        type="text"
                        value={schemaType}
                        onChange={e => setSchemaType(e.target.value)}
                        placeholder="LocalBusiness / FAQPage / Service"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      JSON-LD Content (must be valid JSON syntax)
                    </label>
                    <textarea
                      value={schemaJsonLd}
                      onChange={e => setSchemaJsonLd(e.target.value)}
                      rows={10}
                      className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E53935]/30"
                      spellCheck={false}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingSchema(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-[#E53935] hover:bg-[#C62828] rounded-xl"
                    >
                      Validate & Save Schema
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
