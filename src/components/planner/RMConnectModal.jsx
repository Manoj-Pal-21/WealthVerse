import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  MessageCircle, 
  Video, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Building2,
  ChevronRight
} from 'lucide-react';
import { DEEP_WEALTH_DATA } from '../../data/wealthDeepData';
import { addAppointment } from '../../services/rmDataService';

export default function RMConnectModal({ isOpen, onClose, clientNetWorth = "₹27.74 Lakh", onNavigateToRM }) {
  const [selectedSlot, setSelectedSlot] = useState("Today, 4:30 PM (IST)");
  const [consultationType, setConsultationType] = useState("video");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [topic, setTopic] = useState("Portfolio Rebalancing & Tax Harvesting");

  if (!isOpen) return null;

  const rm = DEEP_WEALTH_DATA.relationshipManager;

  const availableSlots = [
    "Today, 4:30 PM (IST)",
    "Tomorrow, 11:00 AM (IST)",
    "Tomorrow, 3:00 PM (IST)",
    "Friday, 5:00 PM (IST)"
  ];

  const handleConfirmBooking = () => {
    addAppointment({
      clientId: 'client-manoj-pal',
      clientName: 'Manoj Pal',
      clientNetWorth: clientNetWorth,
      date: selectedSlot,
      type: consultationType,
      topic: topic,
      isLiveBooking: true,
      notes: `Direct client booking via 360° Portal. Topic: ${topic}`
    });
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
              Private Wealth Desk • HNI & UHNI Advisory
            </span>
            <span className="text-xs text-slate-400">• Net Worth: {clientNetWorth}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Connect with Your Dedicated Wealth Manager
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Bespoke multi-asset advisory, tax harvesting, estate planning, and pre-IPO deal access.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* RM Profile Snapshot */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="relative">
              <img
                src={rm.avatar}
                alt={rm.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Available Online" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">{rm.name}</h3>
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold">
                  SEBI RIA
                </span>
              </div>
              <p className="text-xs font-semibold text-indigo-700">{rm.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{rm.firm} • {rm.experience}</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                <span>{rm.qualifications}</span>
                <span>•</span>
                <span className="text-slate-600 font-medium">📍 {rm.officeLocation}</span>
              </div>
            </div>
          </div>

          {/* Bespoke Capabilities */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Bespoke Solutions for Manoj Pal
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rm.bespokeOfferings.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100/80 text-xs text-slate-700 font-medium flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {bookingConfirmed ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-emerald-900">
                Consultation Confirmed with {rm.name}!
              </h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Scheduled for <strong>{selectedSlot}</strong> via <strong>{consultationType.toUpperCase()}</strong>.
                Calendar invite & meeting link have been dispatched to Manoj Pal's registered email.
              </p>
              <div className="pt-3 flex items-center justify-center gap-2.5 flex-wrap">
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-700 transition-colors"
                >
                  Return to Dashboard
                </button>
                {onNavigateToRM && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToRM();
                    }}
                    className="px-5 py-2 bg-slate-900 text-amber-300 font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>View in RM Desk Schedule</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Communication Channel Options */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Choose Immediate Action or Schedule Consultation
                </span>
                
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType("video")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                      consultationType === "video"
                        ? "border-blue-600 bg-blue-50/60 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <Video className={`w-5 h-5 ${consultationType === "video" ? "text-blue-600" : "text-slate-500"}`} />
                    <span className="text-xs font-bold text-slate-900">1:1 Video Meet</span>
                    <span className="text-[10px] text-slate-500">Google Meet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType("phone")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                      consultationType === "phone"
                        ? "border-blue-600 bg-blue-50/60 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <Phone className={`w-5 h-5 ${consultationType === "phone" ? "text-blue-600" : "text-slate-500"}`} />
                    <span className="text-xs font-bold text-slate-900">Direct Call</span>
                    <span className="text-[10px] text-slate-500">{rm.phone}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType("whatsapp")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                      consultationType === "whatsapp"
                        ? "border-blue-600 bg-blue-50/60 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <MessageCircle className={`w-5 h-5 ${consultationType === "whatsapp" ? "text-emerald-600" : "text-slate-500"}`} />
                    <span className="text-xs font-bold text-slate-900">WhatsApp Desk</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Instant Chat</span>
                  </button>
                </div>
              </div>

              {/* Consultation Topic & Slot */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Discussion Priority
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Portfolio Rebalancing & Tax Harvesting">Portfolio Rebalancing & Tax Harvesting (LTCG ₹1.25L)</option>
                    <option value="Closing ₹1.0 Cr Life Insurance Gap">Closing ₹1.0 Cr Life Insurance Gap</option>
                    <option value="Third-Party Loan & Debt Restructuring">Third-Party Loan & Debt Payoff Strategy</option>
                    <option value="PMS & Pre-IPO Wealth Allocation">PMS & High-Alpha Pre-IPO Allocation</option>
                    <option value="Family Trust & Digital Vault Succession">Family Trust & Digital Vault Succession</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Available Window
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                          selectedSlot === slot
                            ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{slot}</span>
                        {selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Confidential • Zero Sales Pressure</span>
                </span>

                <button
                  onClick={handleConfirmBooking}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>Confirm Appointment with Vikram</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
