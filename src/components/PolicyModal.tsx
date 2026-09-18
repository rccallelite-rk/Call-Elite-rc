import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            {isPrivacy ? (
              <ShieldCheck className="w-5 h-5 text-[#E53935]" />
            ) : (
              <FileText className="w-5 h-5 text-[#0A192F]" />
            )}
            <h3 className="text-lg font-black text-[#0A192F]">
              {isPrivacy ? 'Privacy Policy - RC Call Elite' : 'Terms & Conditions - RC Call Elite'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-sm text-slate-600 space-y-4 leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="font-semibold text-slate-800">
                Effective Date: 2026. At RC Call Elite (“Your Home. Our Expertise.”), we value the privacy and trust of our customers.
              </p>
              <h4 className="font-bold text-slate-900 text-base">1. Information Collection</h4>
              <p>
                We collect essential details including your name, contact phone number, address, and requested service requirements to dispatch verified professionals to your location.
              </p>
              <h4 className="font-bold text-slate-900 text-base">2. Service Punctuality & Security</h4>
              <p>
                Technician dispatches are logged to ensure quality control, on-time arrivals, and safety. Your phone number is strictly used for booking confirmations and technician updates.
              </p>
              <h4 className="font-bold text-slate-900 text-base">3. Data Protection</h4>
              <p>
                We do not sell or lease your personal information to external telemarketers. For queries, contact us at rccallelite@gmail.com or 8722713026.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-800">
                Terms of Service for RC Call Elite home-service bookings and turnkey works.
              </p>
              <h4 className="font-bold text-slate-900 text-base">1. Doorstep Service Protocols</h4>
              <p>
                Our technicians provide on-site inspections, estimates, and certified servicing. Any replacement parts required are billed transparently after customer approval.
              </p>
              <h4 className="font-bold text-slate-900 text-base">2. Service Guarantee & Warranty</h4>
              <p>
                Standard repairs include a workmanship warranty. Major appliances and civil painting follow specified warranty periods as noted on your service receipt.
              </p>
              <h4 className="font-bold text-slate-900 text-base">3. Cancellation & Rescheduling</h4>
              <p>
                You may reschedule or cancel appointments at zero penalty before the technician departs for your location.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#0A192F] hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
