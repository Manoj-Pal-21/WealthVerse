import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Compass, 
  Sparkles, 
  Building, 
  ExternalLink,
  Shield,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  legacyReadiness, 
  legacyChecklist, 
  familyAssetSummary, 
  legacyProcessSteps 
} from '../data/legacyData';
import { formatINR } from '../utils/formatters';

export default function LegacyPage({ onOpenAI, onNavigate }) {
  const [checklist, setChecklist] = useState(legacyChecklist);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  const toggleChecklist = (id) => {
    setChecklist(checklist.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
          status: !item.isCompleted ? 'Completed' : 'Incomplete'
        };
      }
      return item;
    }));
  };

  const completedCount = checklist.filter(c => c.isCompleted).length;
  const calculatedReadiness = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Financial Legacy</h1>
          <p className="text-sm text-slate-500 mt-1">
            Help your family understand and manage your financial assets when needed.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="sm"
          onClick={() => onOpenAI("How will my family manage my assets?")}
          icon={Sparkles}
        >
          Ask AI Legacy Advisor
        </Button>
      </div>

      {/* Mandatory Compliance Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-start gap-3">
        <Shield className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Institutional Protocol:</strong> {legacyReadiness.legalDisclaimer}
        </p>
      </div>

      {/* Readiness & Family Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Legacy Readiness Score (1 col) */}
        <Card
          title="Legacy Readiness"
          subtitle="Family succession preparedness"
          action={
            <Badge variant="warning" size="sm">
              {legacyReadiness.status}
            </Badge>
          }
        >
          <div className="flex flex-col items-center text-center py-2">
            <div className="relative w-32 h-32 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500 transition-all duration-500"
                  strokeDasharray={`${calculatedReadiness}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900">{calculatedReadiness}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">/ 100</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              <strong>{completedCount} of {checklist.length}</strong> succession milestones verified.
            </p>
          </div>
        </Card>

        {/* What Your Family Should Know Banner (2 cols) */}
        <Card
          className="lg:col-span-2"
          title="What Your Family Should Know"
          subtitle="Consolidated asset and account inventory across all institutions"
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInventoryModal(true)}
            >
              View Asset Inventory
            </Button>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Investments</span>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {formatINR(familyAssetSummary.investments, true)}
              </div>
              <span className="text-[11px] text-slate-500">Across Equity & MFs</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Liabilities</span>
              <div className="text-base font-bold text-rose-600 mt-0.5">
                {formatINR(familyAssetSummary.liabilities, true)}
              </div>
              <span className="text-[11px] text-slate-500">Home Loan EMI active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Insurance Cover</span>
              <div className="text-base font-bold text-emerald-600 mt-0.5">
                {formatINR(familyAssetSummary.insurance, true)}
              </div>
              <span className="text-[11px] text-slate-500">Term Life Sum Assured</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Bank Accounts</span>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {familyAssetSummary.bankAccounts} Accounts
              </div>
              <span className="text-[11px] text-slate-500">HDFC, ICICI active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Demat Accounts</span>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {familyAssetSummary.dematAccounts} Accounts
              </div>
              <span className="text-[11px] text-slate-500">Zerodha & CDSL</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Mutual Funds</span>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {familyAssetSummary.mutualFundsCount} Folios
              </div>
              <span className="text-[11px] text-slate-500">Consolidated under CAMS</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Legacy Checklist & AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklist (2 cols) */}
        <Card
          className="lg:col-span-2"
          title="Legacy & Succession Checklist"
          subtitle="Click to toggle or mark items as completed"
        >
          <div className="divide-y divide-slate-100">
            {checklist.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleChecklist(item.id)}
                className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    item.isCompleted 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <Badge variant={item.isCompleted ? 'good' : 'warning'} size="sm">
                  {item.isCompleted ? 'Completed ✓' : 'Incomplete ⚠️'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Legacy Assistant Card (1 col) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50/80 via-white to-emerald-50/50 border border-brand-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-brand-700 font-bold text-xs mb-2">
              <Compass className="w-4 h-4 animate-pulse-subtle" />
              <span>360° AI Legacy Assistant</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              Assisting Family Preparedness
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              "I can help organize your family's financial dossier and explain institutional claim procedures step-by-step. Final verification and asset transfer are handled through the relevant banking institution and legal process."
            </p>

            <div className="mt-4 p-3 rounded-xl bg-white border border-brand-100 text-[11px] text-slate-600 space-y-1">
              <div>• Centralize all nominee IDs</div>
              <div>• Document demat client master list</div>
              <div>• Outline step-by-step institutional guide</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-brand-100">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowDocsModal(true)}
            >
              View Required Documents
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => onOpenAI("How will my family manage my assets?")}
              icon={Sparkles}
            >
              Ask AI Next Steps
            </Button>
          </div>
        </div>
      </div>

      {/* 5-Step Legacy Process Roadmap */}
      <Card
        title="Institutional Claim & Asset Transfer Roadmap"
        subtitle="Standard regulatory process mandated by SEBI, RBI, and IRDAI"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {legacyProcessSteps.map((step) => (
            <div key={step.step} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-bold text-xs flex items-center justify-center mb-2 shadow-xs">
                  {step.step}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{step.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Required Documents Modal */}
      <Modal
        isOpen={showDocsModal}
        onClose={() => setShowDocsModal(false)}
        title="Required Succession Documents"
        subtitle="Mandatory documentation required by depository participants and banks"
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900">1. Transmission Request Form (TRF)</h5>
            <p className="text-slate-500 mt-0.5">Signed by claimant / registered nominee with self-attested KYC.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900">2. Original Death Certificate</h5>
            <p className="text-slate-500 mt-0.5">Issued by municipal corporation or duly notarized copy.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900">3. Client Master Report (CMR)</h5>
            <p className="text-slate-500 mt-0.5">Depository statement showing claimant's active demat account.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="font-bold text-slate-900">4. Legal Heir Certificate / Will</h5>
            <p className="text-slate-500 mt-0.5">Required if no primary nominee was recorded with depository.</p>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" onClick={() => setShowDocsModal(false)}>
              Understood
            </Button>
          </div>
        </div>
      </Modal>

      {/* Asset Inventory Modal */}
      <Modal
        isOpen={showInventoryModal}
        onClose={() => setShowInventoryModal(false)}
        title="Family Asset & Institution Inventory"
        subtitle="Authorized ledger of accounts, folios, and policies"
      >
        <div className="space-y-2.5 text-xs">
          {familyAssetSummary.institutions.map((inst, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-slate-900">{inst.name}</h5>
                <p className="text-slate-500">{inst.type}</p>
              </div>
              <Badge variant="neutral" size="sm">{inst.ref}</Badge>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" onClick={() => setShowInventoryModal(false)}>
              Close Inventory
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
