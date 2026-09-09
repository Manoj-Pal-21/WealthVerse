import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  KeyRound,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { DEEP_WEALTH_DATA } from '../../data/wealthDeepData';

export default function FamilyVaultAndNominationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('nominees'); // 'nominees' or 'vault'
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  if (!isOpen) return null;

  const nominees = DEEP_WEALTH_DATA.nominationAudit;
  const vault = DEEP_WEALTH_DATA.familyVault;

  const handleDownloadDoc = (docTitle) => {
    setDownloadSuccess(docTitle);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider">
              Estate & Estate Succession Security
            </span>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-bit AES Encrypted
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Family Digital Vault & Nomination Register
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Institutional estate audit ensuring 100% nominee coverage across Demat, Mutual Funds, Bank, and Policies.
          </p>

          {/* Dual Tabs */}
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => setActiveTab('nominees')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'nominees'
                  ? "bg-white text-slate-900 shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Asset Nomination Audit (100% Verified)</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'vault'
                  ? "bg-white text-slate-900 shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Encrypted Family Vault ({vault.documents.length} Docs)</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Decrypted & downloaded <strong>{downloadSuccess}</strong> for offline family access.</span>
            </div>
          )}

          {activeTab === 'nominees' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                      100% Nomination Compliance
                    </h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      All registered assets have <strong>Neha Pal (Spouse)</strong> registered as 100% nominee. Zero unclaimed estate risk.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-white px-3 py-1 rounded-xl border border-emerald-200">
                  4/4 Accounts Linked
                </span>
              </div>

              <div className="space-y-3">
                {nominees.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {item.institution}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                          {item.assetType}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Account: <span className="font-mono">{item.accountNumber}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Nominee Name</span>
                          <span className="text-xs font-bold text-slate-800">
                            {item.nomineeName} ({item.relationship} - {item.sharePercent}%)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 text-[11px] font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Emergency Protocol Strip */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-start gap-3">
                <KeyRound className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950">
                  <span className="font-bold">Emergency Family Access Protocol:</span> In case of emergency, verified nominee <strong>Neha Pal</strong> can access these certified documents using OTP authorization to settle estate claims smoothly.
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-3">
                {vault.documents.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between hover:bg-white transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {doc.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">Updated {doc.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadDoc(doc.title)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Compliant with SEBI Master Circular & RBI Account Aggregator
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
}
