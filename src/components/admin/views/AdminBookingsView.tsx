import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Phone,
  MessageSquare,
  UserCheck,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  X,
  Edit2
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';
import { StoredBooking, BookingStatus } from '../../../types';

export const AdminBookingsView: React.FC = () => {
  const { bookings, saveBookingRecord, deleteBookingRecord } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewingBooking, setViewingBooking] = useState<StoredBooking | null>(null);
  const [assigningTechnician, setAssigningTechnician] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const statuses: (BookingStatus | 'All')[] = [
    'All',
    'Pending',
    'Confirmed',
    'Technician Assigned',
    'In Progress',
    'Completed',
    'Cancelled',
  ];

  const filtered = bookings.filter(b => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      b.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerAddress.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (booking: StoredBooking, newStatus: BookingStatus) => {
    saveBookingRecord({ ...booking, status: newStatus });
    setToast(`Updated ${booking.refCode} to ${newStatus}`);
    setTimeout(() => setToast(null), 1500);
  };

  const handleAssignTechnician = (booking: StoredBooking) => {
    if (!assigningTechnician.trim()) return;
    saveBookingRecord({
      ...booking,
      assignedTechnician: assigningTechnician.trim(),
      status: 'Technician Assigned',
    });
    setToast(`Technician assigned to ${booking.refCode}!`);
    setAssigningTechnician('');
    setViewingBooking(null);
    setTimeout(() => setToast(null), 1500);
  };

  const exportCSV = () => {
    const headers = ['Ref Code', 'Customer Name', 'Phone', 'Service', 'Date', 'Slot', 'Address', 'Status', 'Technician'];
    const rows = bookings.map(b => [
      b.refCode,
      `"${b.customerName}"`,
      b.customerPhone,
      `"${b.serviceName}"`,
      b.scheduledDate,
      `"${b.timeSlot}"`,
      `"${b.customerAddress.replace(/"/g, '""')}"`,
      b.status,
      `"${b.assignedTechnician || 'Unassigned'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RC_Call_Elite_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h2 className="text-base font-black text-[#0A192F]">Doorstep Service Bookings</h2>
          <p className="text-xs text-slate-500">
            Real-time appointment orders, technician assignments, and job completion tracking.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-slate-300" />
          <span>Export Bookings CSV</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ref code, customer, phone, address, or service..."
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
              Status: {st}
            </option>
          ))}
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Ref & Customer</th>
                <th className="px-4 py-3.5">Service & Slot</th>
                <th className="px-4 py-3.5">Location Address</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Technician</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Ref & Customer */}
                    <td className="px-4 py-3.5">
                      <div className="font-mono text-[11px] font-bold text-[#E53935]">{b.refCode}</div>
                      <div className="font-bold text-[#0A192F] text-xs">{b.customerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{b.customerPhone}</div>
                    </td>

                    {/* Service & Slot */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-800">{b.serviceName}</div>
                      <div className="text-[11px] text-slate-500">
                        {b.scheduledDate} • <span className="text-slate-700 font-medium">{b.timeSlot}</span>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="text-slate-600 line-clamp-2 text-[11px]">{b.customerAddress}</div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-4 py-3.5">
                      <select
                        value={b.status}
                        onChange={e => handleUpdateStatus(b, e.target.value as BookingStatus)}
                        className={`text-[11px] font-extrabold px-2 py-1 rounded-lg border focus:outline-none ${
                          b.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : b.status === 'Cancelled'
                            ? 'bg-red-50 text-red-800 border-red-200'
                            : b.status === 'Technician Assigned'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : b.status === 'Pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Technician Assigned">Technician Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Technician Assigned */}
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-medium text-slate-700">
                        {b.assignedTechnician ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5" />
                            {b.assignedTechnician}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${b.customerPhone}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                            b.customerName
                          )},%20this%20is%20RC%20Call%20Elite%20regarding%20your%20service%20booking%20${b.refCode}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            setViewingBooking(b);
                            setAssigningTechnician(b.assignedTechnician || '');
                          }}
                          className="p-1.5 text-slate-400 hover:text-[#E53935] rounded-lg hover:bg-slate-100"
                          title="View / Assign"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete booking record ${b.refCode}?`)) {
                              deleteBookingRecord(b.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                          title="Delete"
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

      {/* DETAILS & TECHNICIAN ASSIGNMENT MODAL */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-[#E53935]">
                  {viewingBooking.refCode}
                </span>
                <h3 className="font-black text-sm text-[#0A192F]">Booking Order Inspection</h3>
              </div>
              <button onClick={() => setViewingBooking(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Customer:</span>
                <span className="font-bold text-slate-900">{viewingBooking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Phone:</span>
                <span className="font-bold text-slate-900 font-mono">{viewingBooking.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Service:</span>
                <span className="font-bold text-[#E53935]">{viewingBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Schedule:</span>
                <span className="font-bold text-slate-900">
                  {viewingBooking.scheduledDate} ({viewingBooking.timeSlot})
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block mb-0.5">Address:</span>
                <span className="text-slate-800 leading-relaxed font-medium block">
                  {viewingBooking.customerAddress}
                </span>
              </div>
              {viewingBooking.problemDescription && (
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">Reported Problem:</span>
                  <span className="text-slate-800 italic bg-white p-2 rounded-lg border border-slate-200 block">
                    "{viewingBooking.problemDescription}"
                  </span>
                </div>
              )}
            </div>

            {/* Assign Technician Form */}
            <div className="space-y-2 pt-1">
              <label className="block font-bold text-slate-700">Assign Certified Technician</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={assigningTechnician}
                  onChange={e => setAssigningTechnician(e.target.value)}
                  placeholder="e.g. Suresh Kumar (#RC-402)"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => handleAssignTechnician(viewingBooking)}
                  className="px-4 py-2 bg-[#E53935] hover:bg-[#c62828] text-white font-bold rounded-xl shadow-xs"
                >
                  Assign
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingBooking(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
