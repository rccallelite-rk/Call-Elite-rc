import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  ShieldAlert,
  CheckCircle2,
  Clock,
  UserCheck,
  Download
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';

export const AdminActivityLogView: React.FC = () => {
  const { activityLogs } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user || log.operator || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterCategory === 'all') return true;
    if (filterCategory === 'services' && (log.action.includes('Service') || log.entity.includes('Service'))) return true;
    if (filterCategory === 'pages' && (log.action.includes('Page') || log.entity.includes('Page') || log.entity.includes('Homepage'))) return true;
    if (filterCategory === 'trash' && (log.action.includes('Trash') || log.details.includes('Trash'))) return true;
    if (filterCategory === 'revisions' && (log.action.includes('Revision') || log.details.includes('Restored Version'))) return true;
    if (filterCategory === 'seo' && (log.action.includes('Redirect') || log.action.includes('Sitemap') || log.action.includes('Robots') || log.action.includes('Schema') || log.action.includes('FAQ'))) return true;
    if (filterCategory === 'leads' && (log.action.includes('Booking') || log.action.includes('Lead') || log.action.includes('Customer'))) return true;
    return true;
  });

  const exportLogsAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activityLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `rc-elite-audit-log-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-[#0A192F]">Administrative Activity Audit Log</h2>
          <p className="text-xs text-slate-500">
            Immutable tracking of changes, content modifications, and operational events across the system.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl font-bold">
            {activityLogs.length} Events
          </span>
          <button
            onClick={exportLogsAsJSON}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter audit log by action, entity, or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935]"
          >
            <option value="all">All Event Categories</option>
            <option value="services">Services CRUD</option>
            <option value="pages">Pages & Homepage</option>
            <option value="trash">Trash & Recovery</option>
            <option value="revisions">Version Restorations</option>
            <option value="seo">SEO, FAQs & Technical</option>
            <option value="leads">Bookings & Leads</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">User</th>
                <th className="px-4 py-3.5">Action & Entity</th>
                <th className="px-4 py-3.5">Change Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-slate-400">
                    No activity logs match the selected search or category filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-bold text-[#0A192F] inline-flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {log.user || log.operator}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-bold text-slate-800 mr-2">{log.action}</span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {log.entity}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
