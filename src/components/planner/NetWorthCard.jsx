import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  Landmark, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  PieChart, 
  ArrowUpRight, 
  AlertTriangle, 
  Info,
  Layers,
  CheckCircle2,
  ChevronRight,
  Wallet,
  Users,
  Lock,
  ReceiptText,
  Scale,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { DEEP_WEALTH_DATA } from '../../data/wealthDeepData';

export default function NetWorthCard({ 
  metrics, 
  onNavigate, 
  onOpenRM, 
  onOpenTax, 
  onOpenRebalance, 
  onOpenVault,
  onUpdateProfileData
}) {
  const [activeTab, setActiveTab] = useState('all'); 
  // 'all' | 'investments' | 'stocks' | 'mutual-funds' | 'liabilities' | 'recommendations'

  // Inline Modals for Outside Inputs
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
    monthlyEmi: '0'
  });

  const {
    netWorth = 2774000,
    totalAssets = 3780000,
    totalInvestments = 3660000,
    totalLiabilities = 1006000,
    thirdPartyLoan = 150000,
    debtToAssetRatio = 26.6,
    assetBreakdown = [],
    liabilityBreakdown = [],
    stockHoldings = DEEP_WEALTH_DATA.equityPortfolio.holdings,
    mutualFundSchemes = DEEP_WEALTH_DATA.mutualFundsPortfolio.schemes,
    liabilitiesList = DEEP_WEALTH_DATA.liabilities,
    stockHoldingsStats = {},
    mfStats = {},
    netWorthRecommendations = []
  } = metrics || {};

  const formatLakhs = (amount) => {
    const val = Number(amount) || 0;
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  const formatExact = (amount) => {
    return `₹${(Number(amount) || 0).toLocaleString('en-IN')}`;
  };

  // --- ADD / DELETE HANDLERS ---
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

    if (onUpdateProfileData) {
      onUpdateProfileData(prev => {
        const updatedHoldings = [...(prev.stockHoldings || stockHoldings), stockItem];
        const updatedEquity = updatedHoldings.reduce((sum, s) => sum + (Number(s.currentValue) || 0), 0);
        return {
          ...prev,
          stockHoldings: updatedHoldings,
          equityInvestments: updatedEquity
        };
      });
    }

    setNewStock({ symbol: '', name: '', sector: 'Information Technology', shares: '', avgPrice: '', currentPrice: '' });
    setIsAddStockOpen(false);
  };

  const handleDeleteStock = (symbolToDelete) => {
    if (onUpdateProfileData) {
      onUpdateProfileData(prev => {
        const updatedHoldings = (prev.stockHoldings || stockHoldings).filter(s => s.symbol !== symbolToDelete);
        const updatedEquity = updatedHoldings.reduce((sum, s) => sum + (Number(s.currentValue) || 0), 0);
        return {
          ...prev,
          stockHoldings: updatedHoldings,
          equityInvestments: updatedEquity
        };
      });
    }
  };

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

    if (onUpdateProfileData) {
      onUpdateProfileData(prev => {
        const updatedSchemes = [...(prev.mutualFundSchemes || mutualFundSchemes), mfItem];
        const updatedMf = updatedSchemes.reduce((sum, m) => sum + (Number(m.currentValue) || 0), 0);
        const updatedSip = updatedSchemes.reduce((sum, m) => sum + (Number(m.monthlySip) || 0), 0);
        return {
          ...prev,
          mutualFundSchemes: updatedSchemes,
          mutualFunds: updatedMf,
          monthlyInvestment: updatedSip
        };
      });
    }

    setNewMF({ schemeName: '', category: 'Flexi Cap', folioNumber: '', nav: '', monthlySip: '', currentValue: '', xirr: '16.5' });
    setIsAddMFOpen(false);
  };

  const handleDeleteMF = (folioToDelete) => {
    if (onUpdateProfileData) {
      onUpdateProfileData(prev => {
        const updatedSchemes = (prev.mutualFundSchemes || mutualFundSchemes).filter(m => m.folioNumber !== folioToDelete);
        const updatedMf = updatedSchemes.reduce((sum, m) => sum + (Number(m.currentValue) || 0), 0);
        const updatedSip = updatedSchemes.reduce((sum, m) => sum + (Number(m.monthlySip) || 0), 0);
        return {
          ...prev,
          mutualFundSchemes: updatedSchemes,
          mutualFunds: updatedMf,
          monthlyInvestment: updatedSip
        };
      });
    }
  };

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
      lender: newLiability.lender.trim() || (isHandLoan ? "Private Hand Loan / Friend" : "Financial Institution"),
      type: newLiability.type || (isHandLoan ? "Private Hand Loan" : "Bank Term Loan"),
      outstandingAmount,
      monthlyEmi,
      interestRate: `${interestRateNum}% p.a.`,
      priority: isHandLoan ? "Relationship Priority" : "Standard Debt",
      status: "Active",
      isOutside: true
    };

    if (onUpdateProfileData) {
      onUpdateProfileData(prev => {
        const updatedList = [...(prev.liabilitiesList || liabilitiesList), liabItem];
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
    }

    setNewLiability({ name: '', lender: '', type: 'Private Hand Loan', outstandingAmount: '', interestRate: '0.0', monthlyEmi: '0' });
    setIsAddLiabilityOpen(false);
  };

  const handleDeleteLiability = (idToDelete) => {
    if (onUpdateProfileData) {
      onUpdateProfileData(prev => {
        const updatedList = (prev.liabilitiesList || liabilitiesList).filter(l => l.id !== idToDelete);
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
    }
  };

  // Live Stock & MF Totals
  const stockValue = stockHoldings.reduce((sum, s) => sum + (s.currentValue !== undefined ? Number(s.currentValue) : ((Number(s.shares) || 0) * (Number(s.currentPrice) || 0))), 0);
  const stockInvested = stockHoldings.reduce((sum, s) => sum + ((Number(s.shares) || 0) * (Number(s.avgPrice) || 0)), 0);
  const stockPnL = stockValue - stockInvested;
  const stockPnLPct = stockInvested > 0 ? Math.round((stockPnL / stockInvested) * 1000) / 10 : 0;

  const mfValue = mutualFundSchemes.reduce((sum, m) => sum + (Number(m.currentValue) || 0), 0);
  const mfMonthlySipTotal = mutualFundSchemes.reduce((sum, m) => sum + (Number(m.monthlySip) || 0), 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* 1. Header & Net Worth Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30">
                <Coins className="w-4 h-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-300">
                Verified Balance Sheet & Net Worth
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                +12.4% YoY
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {formatExact(netWorth)}
              </h2>
              <span className="text-lg sm:text-xl font-bold text-slate-300">
                ({formatLakhs(netWorth)})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              Combined assets (Equity, Mutual Funds, Gold, FD, Cash) minus liabilities (including Ramesh Sharma third-party hand loan).
            </p>
          </div>

          {/* Quick Balance Sheet Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] font-semibold text-slate-300 block uppercase">
                Total Assets
              </span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-400 block mt-0.5">
                {formatLakhs(totalAssets)}
              </span>
              <span className="text-[10px] text-slate-300">
                {formatExact(totalAssets)}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] font-semibold text-slate-300 block uppercase">
                Total Liabilities
              </span>
              <span className="text-base sm:text-lg font-extrabold text-rose-400 block mt-0.5">
                {formatLakhs(totalLiabilities)}
              </span>
              <span className="text-[10px] text-slate-300">
                {formatExact(totalLiabilities)}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] font-semibold text-slate-300 block uppercase">
                Debt-to-Asset
              </span>
              <span className="text-base sm:text-lg font-extrabold text-blue-300 block mt-0.5">
                {debtToAssetRatio}%
              </span>
              <span className="text-[10px] text-emerald-300 font-semibold">
                Healthy (&lt; 30%)
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Segment Asset Allocation Color Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">Asset Distribution Breakdown</span>
            <span className="text-blue-300 font-bold">100% of Total Assets</span>
          </div>

          <div className="w-full h-3.5 bg-slate-800 rounded-full flex overflow-hidden p-0.5 gap-0.5">
            {assetBreakdown.map((item) => (
              <div
                key={item.id}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full rounded-xs transition-all duration-500 hover:opacity-85 cursor-pointer relative group"
                title={`${item.name}: ${formatExact(item.value)} (${item.percentage}%)`}
              />
            ))}
          </div>

          {/* Asset Allocation Legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs">
            {assetBreakdown.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 font-medium">{item.shortName}:</span>
                <span className="font-bold text-white">{item.percentage}%</span>
                <span className="text-slate-400 text-[11px]">({formatLakhs(item.value)})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Interactive Section Tabs */}
      <div className="p-4 sm:px-8 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All 4 Core Sections' },
            { id: 'investments', label: '1. Investments & Allocation' },
            { id: 'stocks', label: '2. Direct Equity Holdings', count: stockHoldings.length },
            { id: 'mutual-funds', label: '3. Mutual Funds & SIPs', count: mutualFundSchemes.length },
            { id: 'liabilities', label: '4. Liabilities & Debt', count: liabilitiesList.length },
            { id: 'recommendations', label: 'Net Worth Recommendations' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-200/80 text-slate-600 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-extrabold ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick Launch Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {onOpenRM && (
            <button
              onClick={onOpenRM}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors shadow-2xs"
            >
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span>Private Wealth RM</span>
            </button>
          )}

          {onOpenTax && (
            <button
              onClick={onOpenTax}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold transition-colors shadow-2xs"
            >
              <ReceiptText className="w-3.5 h-3.5 text-teal-700" />
              <span>Tax Saver (80C/LTCG)</span>
            </button>
          )}

          {onOpenRebalance && (
            <button
              onClick={onOpenRebalance}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold transition-colors shadow-2xs"
            >
              <Scale className="w-3.5 h-3.5 text-indigo-700" />
              <span>Rebalance (Age 34)</span>
            </button>
          )}

          {onOpenVault && (
            <button
              onClick={onOpenVault}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-colors shadow-2xs"
            >
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>Family Vault</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Tab Contents */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* SECTION 1: INVESTMENTS & ASSET ALLOCATION */}
        {(activeTab === 'all' || activeTab === 'investments') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  1. Investments & Asset Allocation Overview
                </h3>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                Total Assets: {formatExact(totalAssets)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assetBreakdown.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50/70 p-4 hover:bg-slate-50 border border-slate-200/90 rounded-2xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                        {item.percentage}% of Assets
                      </span>
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-2.5">
                      {item.name}
                    </h4>

                    <div className="mt-1">
                      <span className="text-xl font-extrabold text-slate-900 block">
                        {formatExact(item.value)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {formatLakhs(item.value)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Portfolio Weight</span>
                    <span className="font-semibold text-blue-600">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: DIRECT EQUITY HOLDINGS */}
        {(activeTab === 'all' || activeTab === 'stocks') && (
          <div className={activeTab === 'all' ? 'pt-6 border-t border-slate-200 space-y-4' : 'space-y-4'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-teal-50 text-teal-700 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    2. Direct Equity Holdings ({stockHoldings.length} Stocks • {formatLakhs(stockValue)})
                  </h3>
                  <span className="text-xs text-slate-500">
                    Live demat holdings. Add external/custom stocks or edit share quantities.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Total Gain: {stockPnL >= 0 ? '+' : ''}{formatExact(stockPnL)} ({stockPnLPct >= 0 ? '+' : ''}{stockPnLPct}%)
                </span>
                <button
                  onClick={() => setIsAddStockOpen(!isAddStockOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Stock Holding</span>
                </button>
              </div>
            </div>

            {/* Inline Add Stock Form */}
            {isAddStockOpen && (
              <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-teal-950 uppercase tracking-wide">
                    Add Stock Holding (Manual / External)
                  </span>
                  <button onClick={() => setIsAddStockOpen(false)} className="text-teal-700 hover:text-teal-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-teal-900 block mb-1">Ticker</label>
                    <input
                      type="text"
                      placeholder="e.g. TATAMOTORS"
                      value={newStock.symbol}
                      onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-teal-900 block mb-1">Company</label>
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
                    <input
                      type="text"
                      placeholder="Automotive"
                      value={newStock.sector}
                      onChange={(e) => setNewStock({ ...newStock, sector: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-teal-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-teal-900 block mb-1">Shares</label>
                    <input
                      type="number"
                      placeholder="100"
                      value={newStock.shares}
                      onChange={(e) => setNewStock({ ...newStock, shares: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-teal-900 block mb-1">Avg Price (₹)</label>
                    <input
                      type="number"
                      placeholder="920.00"
                      value={newStock.avgPrice}
                      onChange={(e) => setNewStock({ ...newStock, avgPrice: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-teal-900 block mb-1">LTP (₹)</label>
                    <input
                      type="number"
                      placeholder="1020.00"
                      value={newStock.currentPrice}
                      onChange={(e) => setNewStock({ ...newStock, currentPrice: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-teal-300 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddStockOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddStock}
                    className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Add to Holdings
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Stock / Company</th>
                    <th className="p-3">Sector</th>
                    <th className="p-3 text-right">Shares</th>
                    <th className="p-3 text-right">Avg Price</th>
                    <th className="p-3 text-right">LTP (₹)</th>
                    <th className="p-3 text-right">Current Value</th>
                    <th className="p-3 text-right">Total P&L</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {stockHoldings.map((stock) => {
                    const cVal = stock.currentValue !== undefined ? Number(stock.currentValue) : (stock.shares * stock.currentPrice);
                    const pnl = stock.pnl !== undefined ? Number(stock.pnl) : (cVal - (stock.shares * stock.avgPrice));
                    const pnlPct = stock.pnlPercent !== undefined ? stock.pnlPercent : (stock.avgPrice > 0 ? (((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100).toFixed(1) : 0);
                    return (
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
                          <span className="text-[11px] text-slate-500 block">{stock.name}</span>
                        </td>
                        <td className="p-3 text-slate-600">{stock.sector}</td>
                        <td className="p-3 text-right font-bold">{stock.shares}</td>
                        <td className="p-3 text-right">₹{Number(stock.avgPrice || 0).toFixed(2)}</td>
                        <td className="p-3 text-right font-bold text-slate-900">₹{Number(stock.currentPrice || 0).toFixed(2)}</td>
                        <td className="p-3 text-right font-extrabold text-slate-900">
                          {formatExact(cVal)}
                        </td>
                        <td className="p-3 text-right">
                          <span className={`font-extrabold block ${pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {pnl >= 0 ? '+' : ''}{formatExact(pnl)}
                          </span>
                          <span className={`text-[10px] font-bold ${pnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {pnl >= 0 ? '+' : ''}{pnlPct}%
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteStock(stock.symbol)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Stock"
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
          </div>
        )}

        {/* SECTION 3: MUTUAL FUNDS PORTFOLIO & SIPS */}
        {(activeTab === 'all' || activeTab === 'mutual-funds') && (
          <div className={activeTab === 'all' ? 'pt-6 border-t border-slate-200 space-y-4' : 'space-y-4'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
                  <PieChart className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    3. Mutual Funds Portfolio & SIPs ({mutualFundSchemes.length} Funds • {formatLakhs(mfValue)})
                  </h3>
                  <span className="text-xs text-slate-500">
                    Active SIP total: {formatExact(mfMonthlySipTotal)}/month
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  Active Monthly SIP: {formatExact(mfMonthlySipTotal)}/mo
                </span>
                <button
                  onClick={() => setIsAddMFOpen(!isAddMFOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Mutual Fund / SIP</span>
                </button>
              </div>
            </div>

            {/* Inline Add MF Form */}
            {isAddMFOpen && (
              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wide">
                    Add Mutual Fund Scheme / SIP (Manual / External)
                  </span>
                  <button onClick={() => setIsAddMFOpen(false)} className="text-blue-700 hover:text-blue-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-blue-900 block mb-1">Scheme Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Quant Small Cap Fund"
                      value={newMF.schemeName}
                      onChange={(e) => setNewMF({ ...newMF, schemeName: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-blue-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-blue-900 block mb-1">Category</label>
                    <input
                      type="text"
                      placeholder="Flexi Cap"
                      value={newMF.category}
                      onChange={(e) => setNewMF({ ...newMF, category: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-blue-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-blue-900 block mb-1">Monthly SIP (₹)</label>
                    <input
                      type="number"
                      placeholder="5000"
                      value={newMF.monthlySip}
                      onChange={(e) => setNewMF({ ...newMF, monthlySip: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-blue-300 rounded-lg focus:outline-none"
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
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-blue-900 block mb-1">XIRR (%)</label>
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
                    onClick={() => setIsAddMFOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMF}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Add Scheme
                  </button>
                </div>
              </div>
            )}

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
                  {mutualFundSchemes.map((mf) => (
                    <tr key={mf.folioNumber} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-slate-900">{mf.schemeName}</span>
                          {mf.isOutside && (
                            <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[9px] font-extrabold rounded">
                              External
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">Folio: {mf.folioNumber}</span>
                      </td>
                      <td className="p-3 text-slate-600">{mf.category}</td>
                      <td className="p-3 text-right">₹{Number(mf.nav || 0).toFixed(2)}</td>
                      <td className="p-3 text-right font-bold text-indigo-700">
                        {formatExact(mf.monthlySip)}/mo
                      </td>
                      <td className="p-3 text-right font-extrabold text-slate-900">
                        {formatExact(mf.currentValue)}
                      </td>
                      <td className="p-3 text-right">
                        <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {mf.xirr || 15.0}% p.a.
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteMF(mf.folioNumber)}
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
        )}

        {/* SECTION 4: LIABILITIES & DEBT OBLIGATIONS */}
        {(activeTab === 'all' || activeTab === 'liabilities') && (
          <div className={activeTab === 'all' ? 'pt-6 border-t border-slate-200 space-y-4' : 'space-y-4'}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                  <CreditCard className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    4. Liabilities & Debt Obligations ({liabilitiesList.length} Items • Total: {formatLakhs(totalLiabilities)})
                  </h3>
                  <span className="text-xs text-slate-500">
                    Includes institutional bank debt & private hand loans (Ramesh Sharma @ 0%).
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  Total Debt: {formatExact(totalLiabilities)}
                </span>
                <button
                  onClick={() => setIsAddLiabilityOpen(!isAddLiabilityOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Loan / Liability</span>
                </button>
              </div>
            </div>

            {/* Inline Add Outside Loan Form */}
            {isAddLiabilityOpen && (
              <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-rose-950 uppercase tracking-wide">
                    Add Loan / Hand Loan Obligation (Personal / Bank)
                  </span>
                  <button onClick={() => setIsAddLiabilityOpen(false)} className="text-rose-700 hover:text-rose-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-rose-900 block mb-1">Obligation Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Hand Loan from Suresh / Car Loan"
                      value={newLiability.name}
                      onChange={(e) => setNewLiability({ ...newLiability, name: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-rose-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-rose-900 block mb-1">Lender / Person</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma / SBI"
                      value={newLiability.lender}
                      onChange={(e) => setNewLiability({ ...newLiability, lender: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-rose-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-rose-900 block mb-1">Type</label>
                    <select
                      value={newLiability.type}
                      onChange={(e) => setNewLiability({ ...newLiability, type: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-rose-300 rounded-lg focus:outline-none"
                    >
                      <option value="Private Hand Loan">Private Hand Loan (0% Interest)</option>
                      <option value="Bank Term Loan">Bank Term Loan</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Vehicle / Auto Loan">Vehicle / Auto Loan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-rose-900 block mb-1">Outstanding (₹)</label>
                    <input
                      type="number"
                      placeholder="150000"
                      value={newLiability.outstandingAmount}
                      onChange={(e) => setNewLiability({ ...newLiability, outstandingAmount: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-rose-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-rose-900 block mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="0.0 for Hand Loan"
                      value={newLiability.interestRate}
                      onChange={(e) => setNewLiability({ ...newLiability, interestRate: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-rose-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-rose-900 block mb-1">Monthly EMI (₹)</label>
                    <input
                      type="number"
                      placeholder="0 or monthly EMI"
                      value={newLiability.monthlyEmi}
                      onChange={(e) => setNewLiability({ ...newLiability, monthlyEmi: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-rose-300 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddLiabilityOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLiability}
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Add Obligation
                  </button>
                </div>
              </div>
            )}

            {/* Liabilities Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {liabilityBreakdown.map((liab) => (
                <div
                  key={liab.id}
                  className="bg-slate-50/70 p-4 hover:bg-slate-50 border border-slate-200/90 rounded-2xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {liab.type}
                      </span>
                      <span className="text-xs font-bold text-rose-600">
                        {liab.percentage}% of Debt
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-2">
                      {liab.name}
                    </h4>
                    {liab.subName && (
                      <span className="text-[11px] text-amber-800 font-bold block">{liab.subName}</span>
                    )}

                    <div className="mt-1.5">
                      <span className="text-xl font-extrabold text-slate-900 block">
                        {formatExact(liab.value)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Interest: {liab.interestRate}
                      </span>
                    </div>

                    {liab.emi ? (
                      <p className="text-xs text-purple-700 font-semibold mt-2">
                        Monthly EMI: {formatExact(liab.emi)}/mo
                      </p>
                    ) : (
                      <p className="text-xs text-amber-700 font-semibold mt-2">
                        Flexible / Mutual Settlement
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Status</span>
                    <span className="font-semibold text-emerald-600">Active</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Liabilities Detailed Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl mt-2">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Obligation Name</th>
                    <th className="p-3">Lender / Source</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-right">Outstanding (₹)</th>
                    <th className="p-3 text-right">Interest</th>
                    <th className="p-3 text-right">Monthly EMI</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {liabilitiesList.map((liab) => {
                    const isHandLoan = liab.type === 'Private Hand Loan' || liab.id === 'third-party-loan' || (liab.name && liab.name.toLowerCase().includes('hand'));
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
                        </td>
                        <td className="p-3 text-slate-600">{liab.lender}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isHandLoan ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {liab.type}
                          </span>
                        </td>
                        <td className="p-3 text-right font-extrabold text-slate-900">
                          {formatExact(liab.outstandingAmount || liab.value)}
                        </td>
                        <td className="p-3 text-right font-bold text-slate-700">
                          {typeof liab.interestRate === 'number' ? `${liab.interestRate}% p.a.` : (liab.interestRate || '0.0% p.a.')}
                        </td>
                        <td className="p-3 text-right font-bold text-purple-700">
                          {liab.monthlyEmi ? `${formatExact(liab.monthlyEmi)}/mo` : 'Flexible'}
                        </td>
                        <td className="p-3 text-center">
                          <button
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
          </div>
        )}

        {/* SECTION 5: NET WORTH & ASSET-BASED RECOMMENDATIONS */}
        {(activeTab === 'all' || activeTab === 'recommendations') && (
          <div className={activeTab === 'all' ? 'pt-6 border-t border-slate-200 space-y-4' : 'space-y-4'}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  5. Actionable Recommendations Based on Net Worth & Asset Mix
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                Actionable Diagnostics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {netWorthRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {rec.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rec.impactColor}`}>
                        {rec.impact}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mt-2">
                      {rec.title}
                    </h4>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">
                      <strong>Action:</strong> {rec.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer Call to Action */}
      <div className="bg-slate-50 p-4 sm:px-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="text-slate-600">
          Want to simulate net worth growth under different gold, mutual fund SIP, or equity allocation models?
        </div>
        <button
          onClick={() => onNavigate('advisor')}
          className="flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>Ask AI Advisor about Asset Allocation</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
