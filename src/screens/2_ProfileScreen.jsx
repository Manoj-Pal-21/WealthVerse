import React, { useState } from 'react';
import { 
  User, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  ShieldAlert, 
  Target, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Building2, 
  CheckCircle2, 
  Coins, 
  PieChart,
  Users,
  Compass,
  ChevronRight,
  ShieldCheck,
  Percent,
  GraduationCap,
  Plus,
  Trash2,
  X,
  Layers,
  AlertCircle
} from 'lucide-react';
import { defaultProfileData } from '../services/healthScoreCalculator';
import { DEEP_WEALTH_DATA } from '../data/wealthDeepData';

export default function ProfileScreen({ 
  initialData, 
  onSubmit, 
  onBack,
  step = 1,
  onStepChange
}) {
  const [formData, setFormData] = useState(() => ({
    ...defaultProfileData,
    ...(initialData || {}),
    stockHoldings: initialData?.stockHoldings || defaultProfileData.stockHoldings || DEEP_WEALTH_DATA.equityPortfolio.holdings,
    mutualFundSchemes: initialData?.mutualFundSchemes || defaultProfileData.mutualFundSchemes || DEEP_WEALTH_DATA.mutualFundsPortfolio.schemes,
    liabilitiesList: initialData?.liabilitiesList || defaultProfileData.liabilitiesList || DEEP_WEALTH_DATA.liabilities
  }));

  const [localStep, setLocalStep] = useState(step || 1);

  // Outside Input Modals / Inline Forms State
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    symbol: '',
    name: '',
    sector: 'Information Technology',
    shares: '',
    avgPrice: '',
    currentPrice: ''
  });

  const [isAddMFOpen, setIsAddMFOpen] = useState(false);
  const [newMF, setNewMF] = useState({
    schemeName: '',
    category: 'Flexi Cap',
    folioNumber: '',
    nav: '',
    monthlySip: '',
    currentValue: '',
    xirr: '16.5'
  });

  const [isAddLiabilityOpen, setIsAddLiabilityOpen] = useState(false);
  const [newLiability, setNewLiability] = useState({
    name: '',
    lender: '',
    type: 'Private Hand Loan',
    outstandingAmount: '',
    interestRate: '0.0',
    monthlyEmi: '0',
    priority: 'Relationship Priority'
  });

  const currentStep = onStepChange ? step : localStep;
  const setCurrentStep = (s) => {
    setLocalStep(s);
    if (onStepChange) onStepChange(s);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'name' || field === 'financialGoal' || field === 'nomineeName' 
        ? value 
        : Number(value) || 0
    }));
  };

  const handleReset = () => {
    setFormData({
      ...defaultProfileData,
      stockHoldings: DEEP_WEALTH_DATA.equityPortfolio.holdings,
      mutualFundSchemes: DEEP_WEALTH_DATA.mutualFundsPortfolio.schemes,
      liabilitiesList: DEEP_WEALTH_DATA.liabilities
    });
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // --- OUTSIDE INPUT HANDLERS: DIRECT EQUITY ---
  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newStock.symbol || !newStock.shares || !newStock.currentPrice) return;
    const shares = Number(newStock.shares) || 0;
    const currentPrice = Number(newStock.currentPrice) || 0;
    const avgPrice = Number(newStock.avgPrice) || currentPrice;
    const currentValue = shares * currentPrice;
    const pnl = shares * (currentPrice - avgPrice);
    const pnlPercent = avgPrice > 0 ? Math.round(((currentPrice - avgPrice) / avgPrice) * 1000) / 10 : 0;

    const stockItem = {
      symbol: newStock.symbol.toUpperCase().trim(),
      name: newStock.name.trim() || newStock.symbol.toUpperCase().trim(),
      sector: newStock.sector || 'Diversified',
      shares,
      avgPrice,
      currentPrice,
      currentValue,
      pnl,
      pnlPercent,
      isOutside: true
    };

    setFormData(prev => {
      const updatedHoldings = [...(prev.stockHoldings || []), stockItem];
      const updatedEquity = updatedHoldings.reduce((sum, s) => sum + (Number(s.currentValue) || 0), 0);
      return {
        ...prev,
        stockHoldings: updatedHoldings,
        equityInvestments: updatedEquity
      };
    });

    setNewStock({ symbol: '', name: '', sector: 'Information Technology', shares: '', avgPrice: '', currentPrice: '' });
    setIsAddStockOpen(false);
  };

  const handleDeleteStock = (symbolToDelete) => {
    setFormData(prev => {
      const updatedHoldings = (prev.stockHoldings || []).filter(s => s.symbol !== symbolToDelete);
      const updatedEquity = updatedHoldings.reduce((sum, s) => sum + (Number(s.currentValue) || 0), 0);
      return {
        ...prev,
        stockHoldings: updatedHoldings,
        equityInvestments: updatedEquity
      };
    });
  };

  // --- OUTSIDE INPUT HANDLERS: MUTUAL FUNDS ---
  const handleAddMF = (e) => {
    e.preventDefault();
    if (!newMF.schemeName || !newMF.currentValue) return;
    const currentValue = Number(newMF.currentValue) || 0;
    const monthlySip = Number(newMF.monthlySip) || 0;
    const nav = Number(newMF.nav) || 120;
    const xirr = Number(newMF.xirr) || 15.0;

    const mfItem = {
      schemeName: newMF.schemeName.trim(),
      category: newMF.category || 'Flexi Cap',
      folioNumber: newMF.folioNumber.trim() || `${Math.floor(1000 + Math.random() * 9000)}****${Math.floor(10 + Math.random() * 90)}`,
      nav,
      monthlySip,
      currentValue,
      xirr,
      isOutside: true
    };

    setFormData(prev => {
      const updatedSchemes = [...(prev.mutualFundSchemes || []), mfItem];
      const updatedMf = updatedSchemes.reduce((sum, m) => sum + (Number(m.currentValue) || 0), 0);
      const updatedSip = updatedSchemes.reduce((sum, m) => sum + (Number(m.monthlySip) || 0), 0);
      return {
        ...prev,
        mutualFundSchemes: updatedSchemes,
        mutualFunds: updatedMf,
        monthlyInvestment: updatedSip
      };
    });

    setNewMF({ schemeName: '', category: 'Flexi Cap', folioNumber: '', nav: '', monthlySip: '', currentValue: '', xirr: '16.5' });
    setIsAddMFOpen(false);
  };

  const handleDeleteMF = (folioToDelete) => {
    setFormData(prev => {
      const updatedSchemes = (prev.mutualFundSchemes || []).filter(m => m.folioNumber !== folioToDelete);
      const updatedMf = updatedSchemes.reduce((sum, m) => sum + (Number(m.currentValue) || 0), 0);
      const updatedSip = updatedSchemes.reduce((sum, m) => sum + (Number(m.monthlySip) || 0), 0);
      return {
        ...prev,
        mutualFundSchemes: updatedSchemes,
        mutualFunds: updatedMf,
        monthlyInvestment: updatedSip
      };
    });
  };

  // --- OUTSIDE INPUT HANDLERS: LIABILITIES & LOANS ---
  const handleAddLiability = (e) => {
    e.preventDefault();
    if (!newLiability.name || !newLiability.outstandingAmount) return;
    const outstandingAmount = Number(newLiability.outstandingAmount) || 0;
    const interestRateNum = Number(newLiability.interestRate) || 0;
    const monthlyEmi = Number(newLiability.monthlyEmi) || 0;
    const isHandLoan = newLiability.type === 'Private Hand Loan' || newLiability.name.toLowerCase().includes('hand loan');

    const liabItem = {
      id: `outside-liab-${Date.now()}`,
      name: newLiability.name.trim(),
      lender: newLiability.lender.trim() || (isHandLoan ? "Private Hand Loan / Personal" : "Institutional Lender"),
      type: newLiability.type || (isHandLoan ? "Private Hand Loan" : "Bank Term Loan"),
      outstandingAmount,
      monthlyEmi,
      interestRate: `${interestRateNum}% p.a.`,
      priority: isHandLoan ? "Relationship Priority" : "Standard Debt",
      status: "Active",
      isOutside: true
    };

    setFormData(prev => {
      const updatedList = [...(prev.liabilitiesList || []), liabItem];
      const updatedTotalLiab = updatedList.reduce((sum, l) => sum + (Number(l.outstandingAmount) || 0), 0);
      const updatedTotalEmi = updatedList.reduce((sum, l) => sum + (Number(l.monthlyEmi) || 0), 0);
      const handLoansTotal = updatedList
        .filter(l => l.type === 'Private Hand Loan' || l.id === 'third-party-loan' || (l.name && l.name.toLowerCase().includes('hand')))
        .reduce((sum, l) => sum + (Number(l.outstandingAmount) || 0), 0);

      return {
        ...prev,
        liabilitiesList: updatedList,
        totalLiabilities: updatedTotalLiab,
        monthlyEmi: updatedTotalEmi || prev.monthlyEmi,
        thirdPartyLoan: handLoansTotal
      };
    });

    setNewLiability({ name: '', lender: '', type: 'Private Hand Loan', outstandingAmount: '', interestRate: '0.0', monthlyEmi: '0', priority: 'Relationship Priority' });
    setIsAddLiabilityOpen(false);
  };

  const handleDeleteLiability = (idToDelete) => {
    setFormData(prev => {
      const updatedList = (prev.liabilitiesList || []).filter(l => l.id !== idToDelete);
      const updatedTotalLiab = updatedList.reduce((sum, l) => sum + (Number(l.outstandingAmount) || 0), 0);
      const updatedTotalEmi = updatedList.reduce((sum, l) => sum + (Number(l.monthlyEmi) || 0), 0);
      const handLoansTotal = updatedList
        .filter(l => l.type === 'Private Hand Loan' || l.id === 'third-party-loan' || (l.name && l.name.toLowerCase().includes('hand')))
        .reduce((sum, l) => sum + (Number(l.outstandingAmount) || 0), 0);

      return {
        ...prev,
        liabilitiesList: updatedList,
        totalLiabilities: updatedTotalLiab,
        monthlyEmi: updatedTotalEmi,
        thirdPartyLoan: handLoansTotal
      };
    });
  };

  // --- LIVE TOTALS CALCULATION ---
  const stocksTotal = (formData.stockHoldings || []).reduce((sum, s) => {
    const val = s.currentValue !== undefined ? Number(s.currentValue) : ((Number(s.shares) || 0) * (Number(s.currentPrice) || 0));
    return sum + (val || 0);
  }, 0);
  const equity = stocksTotal || (formData.equityInvestments !== undefined ? Number(formData.equityInvestments) : 1650000);

  const mfTotal = (formData.mutualFundSchemes || []).reduce((sum, m) => sum + (Number(m.currentValue) || 0), 0);
  const mf = mfTotal || (formData.mutualFunds !== undefined ? Number(formData.mutualFunds) : 1280000);

  const gold = formData.goldInvestments !== undefined ? Number(formData.goldInvestments) : 320000;
  const fd = formData.fixedDeposits !== undefined ? Number(formData.fixedDeposits) : 410000;
  const cash = Number(formData.currentSavings) || 120000;
  const totalAssets = equity + mf + gold + fd + cash;

  const liabTotal = (formData.liabilitiesList || []).reduce((sum, l) => sum + (Number(l.outstandingAmount) || 0), 0);
  const loan = Number(formData.outstandingLoan) || 600000;
  const cc = Number(formData.creditUsage) || 180000;
  const thirdPartyLoan = formData.thirdPartyLoan !== undefined ? Number(formData.thirdPartyLoan) : 150000;
  const otherDebt = formData.otherLiabilities !== undefined ? Number(formData.otherLiabilities) : 76000;
  const totalLiabilities = liabTotal || (loan + cc + thirdPartyLoan + otherDebt);

  const liveNetWorth = totalAssets - totalLiabilities;
  const age = formData.age || 34;

  const steps = [
    { id: 1, title: "1. Cashflow & Age", subtitle: "Demographics & Living Costs", icon: Wallet },
    { id: 2, title: "2. Asset Investments", subtitle: "Stocks, MF, Gold & FD", icon: PieChart },
    { id: 3, title: "3. Loans & Borrowings", subtitle: "Bank & Third-Party Debt", icon: CreditCard },
    { id: 4, title: "4. Protection & Goals", subtitle: "Insurance, Nominee & Inflation", icon: ShieldCheck },
  ];

  const goals = [
    { id: "Build emergency fund", label: "Build Emergency Fund", desc: "Create 3-6 months liquid safety net (Recommended)" },
    { id: "Reduce debt", label: "Eliminate High-Interest Debt", desc: "Clear 36% APR credit card & Third-Party loan" },
    { id: "Increase investments", label: "Scale Long-term SIPs", desc: "Increase equity mutual funds allocation" },
    { id: "Save for major purchase", label: "Child Education Corpus", desc: "Aarav's university fund in 12 years" },
    { id: "Retirement planning", label: "Retirement Compounding", desc: "Build ₹2.5 Cr corpus by age 60" },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Compass className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                360° Financial Health Onboarding Journey
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Provide your profile details, verified demat holdings, and custom assets/debts to generate your verified balance sheet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Manoj Pal Demo</span>
            </button>
          </div>
        </div>

        {/* Live Net Worth Telemetry Strip */}
        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center font-bold">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">
                Real-Time Verified Net Worth
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-extrabold text-white">
                  ₹{liveNetWorth.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  (₹{(liveNetWorth / 100000).toFixed(2)} Lakh)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Total Assets</span>
              <span className="text-emerald-400 font-bold">₹{(totalAssets / 100000).toFixed(2)}L</span>
            </div>
            <span className="text-slate-400">—</span>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Liabilities (incl 3rd Party)</span>
              <span className="text-rose-400 font-bold">₹{(totalLiabilities / 100000).toFixed(2)}L</span>
            </div>
            <span className="text-slate-400">=</span>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Debt Ratio</span>
              <span className="text-blue-300 font-bold">
                {totalAssets > 0 ? ((totalLiabilities / totalAssets) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* 4-Step Progress Navigator */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.id;
            const isPassed = currentStep > s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStep(s.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : isPassed
                    ? 'bg-blue-50/70 text-blue-900 border-blue-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-xl ${
                  isActive ? 'bg-white/20 text-white' : isPassed ? 'bg-blue-200/60 text-blue-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-extrabold block truncate">
                    {s.title}
                  </span>
                  <span className={`text-[10px] truncate block ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {s.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Form Journey Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          {/* STEP 1: DEMOGRAPHICS, AGE & CASHFLOW */}
          {currentStep === 1 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                  <Wallet className="w-5 h-5 text-blue-600" />
                  <span>Step 1 of 4: Client Identity, Age Factor & Cashflow</span>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  Lifecycle Stage: Peak Wealth Accumulation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name / Client Profile
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Client Age (Years)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    required
                  />
                  <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
                    At Age {age}: 100 - Age rule benchmark recommends <strong>{100 - age}% Equity</strong>.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Monthly In-Hand Income (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Post-tax monthly in-hand salary</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Monthly Living Expenses (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={formData.monthlyExpenses}
                      onChange={(e) => handleChange('monthlyExpenses', e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Household, rent, food, and lifestyle</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Liquid Bank Savings (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={formData.currentSavings}
                      onChange={(e) => handleChange('currentSavings', e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Instant liquid balance in savings account</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Continue to Multi-Asset Investments</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: MULTI-ASSET INVESTMENTS & OUTSIDE HOLDINGS */}
          {currentStep === 2 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-7 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                    <PieChart className="w-5 h-5 text-emerald-600" />
                    <span>Step 2 of 4: Investments & Asset Allocation (Consolidated Holdings)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    View verified demat/folio holdings or add external stocks, mutual funds, gold, and debt instruments.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  Total Assets: ₹{(totalAssets / 100000).toFixed(2)} Lakh
                </span>
              </div>

              {/* 1. Multi-Asset Summary Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-teal-700 block">Direct Equities</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{(equity / 100000).toFixed(2)}L</span>
                  <span className="text-[10px] text-slate-400 block">{((equity / totalAssets) * 100).toFixed(1)}% share</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-blue-700 block">Mutual Funds</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{(mf / 100000).toFixed(2)}L</span>
                  <span className="text-[10px] text-slate-400 block">{((mf / totalAssets) * 100).toFixed(1)}% share</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-amber-700 block">Gold & SGB</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{(gold / 100000).toFixed(2)}L</span>
                  <span className="text-[10px] text-slate-400 block">{((gold / totalAssets) * 100).toFixed(1)}% share</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-purple-700 block">Fixed Deposits</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{(fd / 100000).toFixed(2)}L</span>
                  <span className="text-[10px] text-slate-400 block">{((fd / totalAssets) * 100).toFixed(1)}% share</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-2.5 bg-white rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Liquid Cash</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">₹{(cash / 100000).toFixed(2)}L</span>
                  <span className="text-[10px] text-slate-400 block">{((cash / totalAssets) * 100).toFixed(1)}% share</span>
                </div>
              </div>

              {/* 2. DIRECT EQUITY HOLDINGS SECTION */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-teal-100 text-teal-700 rounded-md">
                        <TrendingUp className="w-4 h-4" />
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Direct Equity Holdings ({formData.stockHoldings?.length || 0} Stocks • ₹{(equity / 100000).toFixed(2)} Lakh)
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Live portfolio telemetry. Add external/custom stocks or edit verified demat holdings.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddStockOpen(!isAddStockOpen)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold rounded-xl transition-colors shadow-2xs w-fit"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Stock Holding</span>
                  </button>
                </div>

                {/* Inline Add Stock Form */}
                {isAddStockOpen && (
                  <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-teal-950 uppercase tracking-wide">
                        Add Stock Holding (Manual / External)
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAddStockOpen(false)}
                        className="text-teal-700 hover:text-teal-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-teal-900 block mb-1">Ticker Symbol</label>
                        <input
                          type="text"
                          placeholder="e.g. TATAMOTORS"
                          value={newStock.symbol}
                          onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-teal-900 block mb-1">Company Name</label>
                        <input
                          type="text"
                          placeholder="Tata Motors Ltd"
                          value={newStock.name}
                          onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-teal-300 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-teal-900 block mb-1">Sector</label>
                        <select
                          value={newStock.sector}
                          onChange={(e) => setNewStock({ ...newStock, sector: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-teal-300 rounded-lg focus:outline-none"
                        >
                          <option value="Information Technology">Information Technology</option>
                          <option value="Banking & Financial Services">Banking & Finance</option>
                          <option value="Energy & Petrochemicals">Energy & Petrochem</option>
                          <option value="Automotive">Automotive</option>
                          <option value="FMCG & Consumer">FMCG & Consumer</option>
                          <option value="Pharmaceuticals">Pharma & Healthcare</option>
                          <option value="Infrastructure">Infrastructure</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-teal-900 block mb-1">Shares Count</label>
                        <input
                          type="number"
                          placeholder="100"
                          value={newStock.shares}
                          onChange={(e) => setNewStock({ ...newStock, shares: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-teal-900 block mb-1">Avg Buy Price (₹)</label>
                        <input
                          type="number"
                          placeholder="920.00"
                          value={newStock.avgPrice}
                          onChange={(e) => setNewStock({ ...newStock, avgPrice: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-teal-900 block mb-1">Current Price (₹)</label>
                        <input
                          type="number"
                          placeholder="1020.00"
                          value={newStock.currentPrice}
                          onChange={(e) => setNewStock({ ...newStock, currentPrice: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddStockOpen(false)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddStock}
                        className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        Add to Equity Portfolio
                      </button>
                    </div>
                  </div>
                )}

                {/* Stocks Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3">Stock / Symbol</th>
                        <th className="p-3">Sector</th>
                        <th className="p-3 text-right">Shares</th>
                        <th className="p-3 text-right">Avg Price</th>
                        <th className="p-3 text-right">LTP (₹)</th>
                        <th className="p-3 text-right">Current Value</th>
                        <th className="p-3 text-right">Gain / Loss</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {(formData.stockHoldings || []).map((stock) => (
                        <tr key={stock.symbol} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-900">{stock.symbol}</span>
                              {stock.isOutside && (
                                <span className="px-1.5 py-0.2 bg-teal-100 text-teal-800 text-[9px] font-extrabold rounded">
                                  External
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 block truncate max-w-[140px]">{stock.name}</span>
                          </td>
                          <td className="p-3 text-slate-600 text-[11px]">{stock.sector}</td>
                          <td className="p-3 text-right font-bold">{stock.shares}</td>
                          <td className="p-3 text-right">₹{Number(stock.avgPrice || 0).toFixed(2)}</td>
                          <td className="p-3 text-right font-bold text-slate-900">₹{Number(stock.currentPrice || 0).toFixed(2)}</td>
                          <td className="p-3 text-right font-extrabold text-slate-900">
                            ₹{(stock.currentValue || (stock.shares * stock.currentPrice)).toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 text-right">
                            <span className={`font-extrabold block ${(stock.pnl || 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {(stock.pnl || 0) >= 0 ? '+' : ''}₹{(stock.pnl || 0).toLocaleString('en-IN')}
                            </span>
                            <span className={`text-[10px] font-bold ${(stock.pnlPercent || 0) >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {(stock.pnlPercent || 0) >= 0 ? '+' : ''}{stock.pnlPercent || 0}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteStock(stock.symbol)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Delete Stock"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. MUTUAL FUNDS & SIPS SECTION */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-blue-100 text-blue-700 rounded-md">
                        <PieChart className="w-4 h-4" />
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Mutual Funds Portfolio & SIPs ({formData.mutualFundSchemes?.length || 0} Funds • ₹{(mf / 100000).toFixed(2)} Lakh)
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Active monthly SIPs: ₹{(formData.monthlyInvestment || 20000).toLocaleString('en-IN')}/mo. Add custom SIPs or external folios.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddMFOpen(!isAddMFOpen)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold rounded-xl transition-colors shadow-2xs w-fit"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Mutual Fund SIP</span>
                  </button>
                </div>

                {/* Inline Add Mutual Fund Form */}
                {isAddMFOpen && (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wide">
                        Add Mutual Fund Scheme / SIP (Manual / External)
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAddMFOpen(false)}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                      <div className="col-span-2 sm:col-span-2">
                        <label className="text-[10px] font-bold text-blue-900 block mb-1">Scheme Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Quant Small Cap Fund - Direct (G)"
                          value={newMF.schemeName}
                          onChange={(e) => setNewMF({ ...newMF, schemeName: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-blue-300 rounded-lg focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-blue-900 block mb-1">Category</label>
                        <select
                          value={newMF.category}
                          onChange={(e) => setNewMF({ ...newMF, category: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-blue-300 rounded-lg focus:outline-none"
                        >
                          <option value="Flexi Cap">Flexi Cap</option>
                          <option value="Large & Mid Cap">Large & Mid Cap</option>
                          <option value="Small Cap">Small Cap</option>
                          <option value="Index Fund">Index Fund</option>
                          <option value="ELSS Tax Saver">ELSS Tax Saver</option>
                          <option value="Debt / Short Duration">Debt / Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-blue-900 block mb-1">Monthly SIP (₹)</label>
                        <input
                          type="number"
                          placeholder="5000"
                          value={newMF.monthlySip}
                          onChange={(e) => setNewMF({ ...newMF, monthlySip: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-blue-300 rounded-lg focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-blue-900 block mb-1">Current Value (₹)</label>
                        <input
                          type="number"
                          placeholder="150000"
                          value={newMF.currentValue}
                          onChange={(e) => setNewMF({ ...newMF, currentValue: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-blue-300 rounded-lg focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-blue-900 block mb-1">XIRR Return (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="16.5"
                          value={newMF.xirr}
                          onChange={(e) => setNewMF({ ...newMF, xirr: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-blue-300 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddMFOpen(false)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddMF}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        Add to Mutual Funds
                      </button>
                    </div>
                  </div>
                )}

                {/* MF Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3">Scheme Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3 text-right">NAV (₹)</th>
                        <th className="p-3 text-right">Monthly SIP</th>
                        <th className="p-3 text-right">Current Value</th>
                        <th className="p-3 text-right">XIRR</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {(formData.mutualFundSchemes || []).map((scheme) => (
                        <tr key={scheme.folioNumber} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-900">{scheme.schemeName}</span>
                              {scheme.isOutside && (
                                <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[9px] font-extrabold rounded">
                                  External
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">Folio: {scheme.folioNumber}</span>
                          </td>
                          <td className="p-3 text-slate-600 text-[11px]">{scheme.category}</td>
                          <td className="p-3 text-right">₹{Number(scheme.nav || 0).toFixed(2)}</td>
                          <td className="p-3 text-right font-bold text-indigo-700">
                            ₹{Number(scheme.monthlySip || 0).toLocaleString('en-IN')}/mo
                          </td>
                          <td className="p-3 text-right font-extrabold text-slate-900">
                            ₹{Number(scheme.currentValue || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 text-right">
                            <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                              {scheme.xirr || 15.0}% p.a.
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteMF(scheme.folioNumber)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Delete Mutual Fund"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. OTHER ASSETS (GOLD, FD & CASH) */}
              <div className="pt-2 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Gold, Fixed Deposits & Liquid Reserve Adjustments
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Gold (Digital Gold & SGB) (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        value={gold}
                        onChange={(e) => handleChange('goldInvestments', e.target.value)}
                        className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
                      Inflation hedge (~8.5% optimal allocation)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Fixed Deposits & Debt (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        value={fd}
                        onChange={(e) => handleChange('fixedDeposits', e.target.value)}
                        className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-purple-700 font-semibold mt-1 block">
                      Bank FDs & short duration debt funds
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Emergency Reserve (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        value={formData.emergencyFund}
                        onChange={(e) => handleChange('emergencyFund', e.target.value)}
                        className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-rose-600 font-semibold mt-1 block">
                      Current cover: 1.3 months (Target: ₹3.00L)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Back to Step 1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Continue to Liabilities & Loans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: LIABILITIES, BORROWINGS & THIRD-PARTY LOANS */}
          {currentStep === 3 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-7 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                    <CreditCard className="w-5 h-5 text-rose-600" />
                    <span>Step 3 of 4: Liabilities & Debt Obligations (Institutional & Personal Debts)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Institutional debt, revolving credit cards, and private hand loans (e.g. Ramesh Sharma @ 0%).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                    Total Debt: ₹{(totalLiabilities / 100000).toFixed(2)} Lakh
                  </span>
                </div>
              </div>

              {/* Informational Banner about Third Party Hand Loans */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                <Users className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 leading-relaxed">
                  <span className="font-extrabold block text-amber-900">Private Hand Loans & Third-Party Obligations Supported</span>
                  Track informal family & friend borrowings (such as your ₹1.50L loan from Ramesh Sharma) alongside institutional bank loans. 
                  This provides your AI advisor and Relationship Manager with an uncompromising, 100% realistic balance sheet.
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Active Liabilities Schedule ({formData.liabilitiesList?.length || 0} Obligations)
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Total monthly EMI burden: ₹{(formData.monthlyEmi || 18000).toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddLiabilityOpen(!isAddLiabilityOpen)}
                  className="flex items-center gap-1 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold rounded-xl transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Loan / Hand Loan</span>
                </button>
              </div>

              {/* Inline Add Loan Form */}
              {isAddLiabilityOpen && (
                <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-rose-950 uppercase tracking-wide">
                      Add Loan / Private Debt Obligation
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddLiabilityOpen(false)}
                      className="text-rose-700 hover:text-rose-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-rose-900 block mb-1">Obligation / Loan Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Hand Loan from Suresh / Car Loan"
                        value={newLiability.name}
                        onChange={(e) => setNewLiability({ ...newLiability, name: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-rose-300 rounded-lg focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-rose-900 block mb-1">Lender / Person Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Sharma / State Bank of India"
                        value={newLiability.lender}
                        onChange={(e) => setNewLiability({ ...newLiability, lender: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-rose-300 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-rose-900 block mb-1">Loan / Liability Type</label>
                      <select
                        value={newLiability.type}
                        onChange={(e) => setNewLiability({ ...newLiability, type: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-rose-300 rounded-lg focus:outline-none"
                      >
                        <option value="Private Hand Loan">Private Hand Loan (Family/Friend)</option>
                        <option value="Bank Term Loan">Bank Term / Personal Loan</option>
                        <option value="Credit Card">Credit Card Outstanding</option>
                        <option value="Home Loan">Home Loan</option>
                        <option value="Vehicle / Auto Loan">Vehicle / Auto Loan</option>
                        <option value="Education Loan">Education Loan</option>
                        <option value="Consumer Loan">Consumer / Electronics Loan</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-rose-900 block mb-1">Outstanding Balance (₹)</label>
                      <input
                        type="number"
                        placeholder="150000"
                        value={newLiability.outstandingAmount}
                        onChange={(e) => setNewLiability({ ...newLiability, outstandingAmount: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-rose-300 rounded-lg focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-rose-900 block mb-1">Annual Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0 for Hand Loan, 11.5 for Bank"
                        value={newLiability.interestRate}
                        onChange={(e) => setNewLiability({ ...newLiability, interestRate: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-rose-300 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-rose-900 block mb-1">Monthly EMI Outflow (₹)</label>
                      <input
                        type="number"
                        placeholder="0 for flexible, or monthly amount"
                        value={newLiability.monthlyEmi}
                        onChange={(e) => setNewLiability({ ...newLiability, monthlyEmi: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-rose-300 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddLiabilityOpen(false)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddLiability}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm"
                    >
                      Add Liability
                    </button>
                  </div>
                </div>
              )}

              {/* Liabilities Schedule Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Liability & Lender</th>
                      <th className="p-3">Type</th>
                      <th className="p-3 text-right">Outstanding (₹)</th>
                      <th className="p-3 text-right">Interest Rate</th>
                      <th className="p-3 text-right">Monthly EMI</th>
                      <th className="p-3">Payoff Priority</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {(formData.liabilitiesList || []).map((liab) => {
                      const isHandLoan = liab.type === 'Private Hand Loan' || liab.id === 'third-party-loan' || (liab.name && liab.name.toLowerCase().includes('hand'));
                      const isCreditCard = (liab.type && liab.type.toLowerCase().includes('credit')) || (liab.name && liab.name.toLowerCase().includes('card'));
                      return (
                        <tr key={liab.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-900">{liab.name}</span>
                              {liab.isOutside && (
                                <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 text-[9px] font-extrabold rounded">
                                  Manual / Hand Loan
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 block truncate max-w-[170px]">{liab.lender}</span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isHandLoan 
                                ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                                : isCreditCard 
                                ? 'bg-rose-100 text-rose-800' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {liab.type}
                            </span>
                          </td>
                          <td className="p-3 text-right font-extrabold text-slate-900">
                            ₹{Number(liab.outstandingAmount || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="p-3 text-right font-bold text-slate-700">
                            {typeof liab.interestRate === 'number' ? `${liab.interestRate}% p.a.` : (liab.interestRate || '0.0% p.a.')}
                          </td>
                          <td className="p-3 text-right font-bold text-purple-700">
                            {liab.monthlyEmi ? `₹${Number(liab.monthlyEmi).toLocaleString('en-IN')}/mo` : 'Flexible'}
                          </td>
                          <td className="p-3">
                            <span className={`text-[11px] font-bold ${
                              isCreditCard ? 'text-rose-600' : isHandLoan ? 'text-amber-700' : 'text-slate-600'
                            }`}>
                              {liab.priority || 'Standard'}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteLiability(liab.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Delete Liability"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Summary Metrics */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Total Liabilities</span>
                  <span className="text-base font-extrabold text-rose-600 block">
                    ₹{(totalLiabilities / 100000).toFixed(2)} Lakh
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Private Hand Loans</span>
                  <span className="text-base font-extrabold text-amber-600 block">
                    ₹{(thirdPartyLoan / 100000).toFixed(2)} Lakh
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Total Monthly EMI</span>
                  <span className="text-base font-extrabold text-purple-600 block">
                    ₹{Number(formData.monthlyEmi || 18000).toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Debt-to-Income</span>
                  <span className="text-base font-extrabold text-slate-900 block">
                    {(((Number(formData.monthlyEmi) || 18000) / (formData.monthlyIncome || 150000)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Back to Step 2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Continue to Protection & Family Goals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PROTECTION, FAMILY GOALS, INFLATION & NOMINEES */}
          {currentStep === 4 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>Step 4 of 4: Insurance Protection, Family Goals & Nominees</span>
                </div>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  Term Shortfall: ₹1.00 Cr
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Existing Life Insurance Cover (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={formData.existingLifeInsurance || 5000000}
                      onChange={(e) => handleChange('existingLifeInsurance', e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-rose-600 font-semibold mt-1 block">
                    Required: ₹1.50 Cr • Protection Gap of <strong>₹1.00 Crore</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Health Insurance Floater Cover (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={formData.healthInsuranceCover || 1500000}
                      onChange={(e) => handleChange('healthInsuranceCover', e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                    Care Supreme Family Floater (Adequate)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Registered Nominee Name
                  </label>
                  <input
                    type="text"
                    value={formData.nomineeName || "Neha Pal"}
                    onChange={(e) => handleChange('nomineeName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    required
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Spouse • 100% Verified Nominee across Demat & Folios
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Modeled CPI Inflation Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={formData.inflationRate || 6.0}
                      onChange={(e) => handleChange('inflationRate', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Used to model future education & retirement living costs
                  </span>
                </div>
              </div>

              {/* Primary Financial Goal Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Strategic Financial Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {goals.map((g) => {
                    const isSelected = formData.financialGoal === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => handleChange('financialGoal', g.id)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">{g.label}</h4>
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                          {g.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submission CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Back to Step 3
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Complete Journey & Launch 360° Dashboard with AI Copilot</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
