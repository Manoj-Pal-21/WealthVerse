import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  FileCheck2, 
  Server,
  Building2
} from 'lucide-react';

export default function SecurityComplianceCard() {
  const compliancePoints = [
    {
      title: "Bank-Grade 256-Bit AES Encryption",
      desc: "All financial records, bank statements, and PAN information are encrypted in-transit (TLS 1.3) and at-rest using military-grade AES-256.",
      icon: Lock,
      badge: "ISO 27001 Certified"
    },
    {
      title: "RBI Account Aggregator Protocol",
      desc: "Data ingestion uses the Reserve Bank of India (RBI) Account Aggregator framework with explicit, granular, time-bound consent architecture.",
      icon: Server,
      badge: "RBI Compliant"
    },
    {
      title: "SEBI RIA Fiduciary Standards",
      desc: "Advisory algorithms and Private Wealth recommendations comply with SEBI Investment Advisers Regulations (SEBI RIA No: INA000014820).",
      icon: FileCheck2,
      badge: "SEBI Registered"
    },
    {
      title: "Zero Data Selling Guarantee",
      desc: "Your financial balance sheet is never sold to telemarketers, credit card issuers, or third parties. Consent is 100% revocable with 1-click.",
      icon: ShieldCheck,
      badge: "Strict Privacy"
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
              Institutional Security & Regulatory Compliance
            </h3>
            <p className="text-xs text-slate-500">
              Protecting Manoj Pal's wealth telemetry with state-of-the-art cryptographic safeguards.
            </p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5 self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Security Audit: 100% Pass</span>
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {compliancePoints.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white rounded-xl border border-slate-200 text-slate-700 shadow-2xs">
                    <IconComp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
