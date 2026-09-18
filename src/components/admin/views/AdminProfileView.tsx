import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  Lock,
  CheckCircle2,
  Save,
  Mail,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../../context/CMSContext';

export const AdminProfileView: React.FC = () => {
  const { adminUser, updateAdminProfile } = useCMS();
  const [draft, setDraft] = useState({ ...adminUser });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile(draft);
    setToast('Admin profile details updated successfully!');
    setTimeout(() => setToast(null), 2000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert('Please fill in password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setToast('Administrator password changed successfully!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
          <h2 className="text-base font-black text-[#0A192F]">Administrator Profile & Security</h2>
          <p className="text-xs text-slate-500">
            Account credentials, security settings, and session authorizations.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>Role: {draft.role}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info Form */}
        <form
          onSubmit={handleSaveProfile}
          className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-[#E53935]" />
            <h3 className="text-sm font-black text-[#0A192F]">Personal Details</h3>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={draft.name}
              onChange={e => setDraft({ ...draft, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={draft.email}
              onChange={e => setDraft({ ...draft, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
              <input
                type="text"
                disabled
                value={draft.role}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-100 rounded-xl font-bold text-slate-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Last Active</label>
              <input
                type="text"
                disabled
                value={new Date(draft.lastLogin).toLocaleString()}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-100 rounded-xl font-mono text-[11px] text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded-xl font-bold shadow-xs transition-all active:scale-95"
            >
              Update Profile Info
            </button>
          </div>
        </form>

        {/* Change Password Form */}
        <form
          onSubmit={handleUpdatePassword}
          className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Key className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-black text-[#0A192F]">Change Password</h3>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">New Password (Min 6 chars)</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xs transition-all active:scale-95"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
