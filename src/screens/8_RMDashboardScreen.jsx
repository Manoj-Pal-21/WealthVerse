import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  Briefcase, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Calendar, 
  CheckSquare, 
  PieChart, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  RotateCcw, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Trash2,
  Lock,
  Wallet,
  Compass,
  CreditCard
} from 'lucide-react';
import { 
  getRMDatabase, 
  saveRMDatabase, 
  toggleTask, 
  updateAppointmentStatus, 
  deleteClient, 
  resetRMData,
  getRMAuthSession,
  clearRMAuthSession
} from '../services/rmDataService';
import RMClientDetailDrawer from '../components/rm/RMClientDetailDrawer';
import RMAddClientModal from '../components/rm/RMAddClientModal';
import RMAddTaskModal from '../components/rm/RMAddTaskModal';
import RMLoginModal from '../components/rm/RMLoginModal';

export default function RMDashboardScreen({ onNavigateToClient, clientMetrics }) {
  // Authentication State
  const [authSession, setAuthSession] = useState(() => getRMAuthSession());
  const [showLoginModal, setShowLoginModal] = useState(false);

  // RM Data State loaded from localStorage
  const [rmData, setRmData] = useState(() => getRMDatabase());
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' | 'appointments' | 'tasks' | 'analytics'
  
  // Modals & Drawers
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientDrawerOpen, setIsClientDrawerOpen] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all'); // 'all' | 'alert' | 'uhni' | 'hni' | 'emerging'

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const refreshData = () => {
    const updated = getRMDatabase();
    setRmData(updated);
  };

  useEffect(() => {
    const currentSession = getRMAuthSession();
    setAuthSession(currentSession);
    refreshData();
  }, []);

  const handleLoginSuccess = () => {
    setAuthSession(getRMAuthSession());
    setShowLoginModal(false);
    refreshData();
    showToast("Welcome, Vikram Malhotra • RM Command Center Active");
  };

  const handleLogout = () => {
    clearRMAuthSession();
    setAuthSession({ isAuthenticated: false });
    showToast("Logged out of RM Portal");
  };

  const handleResetData = () => {
    if (window.confirm("Reset RM database to fresh default state? This will reload the default 6 HNI clients and recalculate all metrics.")) {
      resetRMData();
      refreshData();
      showToast("RM database reset to initial state");
    }
  };

  const handleToggleTask = (taskId) => {
    toggleTask(taskId);
    refreshData();
  };

  const handleDeleteClient = (e, clientId, clientName) => {
    e.stopPropagation();
    if (window.confirm(`Remove ${clientName} from your active book?`)) {
      deleteClient(clientId);
      refreshData();
      showToast(`Removed ${clientName} from portfolio`);
    }
  };

  const handleOpenClient = (client) => {
    setSelectedClient(client);
    setIsClientDrawerOpen(true);
  };

  // Currency formatting helper
  const formatINR = (val) => {
    const num = Number(val) || 0;
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(num / 100000).toFixed(2)} Lakh`;
  };

  const { metrics, clients = [], appointments = [], tasks = [], rmProfile } = rmData;

  // Filter clients
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (tierFilter === 'alert') {
      return (c.healthScore && c.healthScore < 75) || (c.criticalFlags && c.criticalFlags.length >= 2);
    }
    if (tierFilter === 'uhni') return c.netWorth >= 50000000;
    if (tierFilter === 'hni') return c.netWorth >= 10000000 && c.netWorth < 50000000;
    if (tierFilter === 'emerging') return c.netWorth < 10000000;
    return true;
  });

  // If user is not authenticated as RM, render the prominent Login Welcome Wall
  if (!authSession || !authSession.isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-900">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-700 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-900 mx-auto flex items-center justify-center text-amber-400 shadow-xl border border-amber-400/30">
            <Briefcase className="w-8 h-8 text-amber-300" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-extrabold uppercase tracking-wider">
              m.Stock Wealth360 Institutional
            </span>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mt-3">
              Relationship Manager Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Advisory desk for HNI & UHNI client book management, SEBI-compliant telemetry, and portfolio health auditing.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80"
              alt="Vikram Malhotra"
              className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-400 shadow-sm"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">Vikram Malhotra</p>
              <p className="text-[11px] text-indigo-700 font-semibold">Vice President & Senior Private Banker</p>
              <p className="text-[10px] text-slate-500">Finquest Securities • SEBI RIA</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => handleLoginSuccess()}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Instant 1-Click Demo Login</span>
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs transition-colors cursor-pointer"
            >
              Enter Custom RM Credentials
            </button>

            <button
              onClick={() => onNavigateToClient && onNavigateToClient('dashboard')}
              className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Return to Client View (Manoj Pal)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-[10px] text-slate-400">
            Authorized SEBI RIA Access Only • Secured with 256-bit AES protocol
          </p>
        </div>

        <RMLoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-24">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* RM Institutional Header Bar */}
      <div className="bg-slate-950 text-white border-b border-slate-800 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* RM Profile Badge */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={rmProfile.avatar}
                  alt={rmProfile.name}
                  className="w-11 h-11 rounded-xl object-cover border-2 border-indigo-400 shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" title="Active on SEBI Desk" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-white">{rmProfile.name}</h2>
                  <span className="px-2 py-0.2 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-extrabold">
                    {rmProfile.sebiRegNo.split(' ')[0]}
                  </span>
                  <span className="text-xs text-slate-400 hidden lg:inline">• {rmProfile.title}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {rmProfile.firm} • <span className="text-indigo-400">{rmProfile.branch}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions & Client Switcher */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onNavigateToClient && onNavigateToClient('dashboard')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Switch view to Manoj Pal's Client Dashboard"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-200" />
                <span>Switch to Client View (Manoj Pal)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsAddClientOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add HNI Client</span>
              </button>

              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>New Task</span>
              </button>

              <button
                onClick={handleResetData}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Reset RM Database to Initial State"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 transition-colors"
                title="Log Out of RM Desk"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* TOP KPI CARDS (Calculated dynamically from localStorage) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          {/* Card 1: Total AUM */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Book AUM</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-black text-slate-950 mt-2">{formatINR(metrics.totalAum)}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>Target: {formatINR(metrics.targetAum)}</span>
                <span className="font-bold text-blue-600">{metrics.aumProgressPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, metrics.aumProgressPercent)}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Card 2: Active Clients */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">HNI Clients</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-black text-slate-950 mt-2">{metrics.totalClients} Active</p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-600 mt-2 font-medium">
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded font-bold">{metrics.tierBreakdown?.uhni} UHNI</span>
              <span>•</span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">{metrics.tierBreakdown?.hni} HNI</span>
              <span>•</span>
              <span>{metrics.tierBreakdown?.emerging} Affluent</span>
            </div>
          </div>

          {/* Card 3: Average Portfolio Health */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avg Health Score</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-xl font-black text-emerald-700">{metrics.avgHealthScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Institutional Portfolio Health</span>
            </p>
          </div>

          {/* Card 4: Critical Risk Alerts */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Critical Alerts</span>
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-black text-rose-600 mt-2">{metrics.criticalAlertsCount} Clients</p>
            <p className="text-[10px] text-slate-500 mt-2">
              Debt revolving / low cover / cash drag
            </p>
          </div>

          {/* Card 5: Monthly Inflows */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monthly Inflows</span>
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-black text-slate-950 mt-2">{formatINR(metrics.totalMonthlyInflow)}/mo</p>
            <p className="text-[10px] text-slate-500 mt-2">
              SIP cadence & surplus across book
            </p>
          </div>

        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>HNI Client Roster ({clients.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Consultations ({appointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Advisory Queue ({metrics.pendingTasksCount} Pending)</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Book Allocation</span>
            </button>
          </div>

          <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline px-3">
            Stored in LocalStorage (Dynamic)
          </span>
        </div>

        {/* TAB 1: CLIENT ROSTER */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client by name or city..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'All Clients' },
                  { id: 'alert', label: 'Attention Needed' },
                  { id: 'uhni', label: 'UHNI (> ₹5Cr)' },
                  { id: 'hni', label: 'HNI (₹1-5Cr)' },
                  { id: 'emerging', label: 'Emerging' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTierFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      tierFilter === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clients Table / Cards Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Client Name & Tier</th>
                      <th className="py-3 px-4">Net Worth</th>
                      <th className="py-3 px-4">Health Score</th>
                      <th className="py-3 px-4 hidden md:table-cell">Asset Allocation</th>
                      <th className="py-3 px-4">Key Diagnostic Flag</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium">
                    {filteredClients.map((client) => {
                      const isAlert = (client.healthScore && client.healthScore < 75) || (client.criticalFlags && client.criticalFlags.length >= 2);

                      return (
                        <tr
                          key={client.id}
                          onClick={() => handleOpenClient(client)}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                        >
                          {/* Client Name */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={client.avatar}
                                alt={client.name}
                                className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                              />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {client.name}
                                  </span>
                                  {client.isLiveClient && (
                                    <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase">
                                      Active Demo
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                  <span>{client.tier}</span>
                                  <span>•</span>
                                  <span>{client.city}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Net Worth */}
                          <td className="py-3.5 px-4">
                            <p className="font-black text-slate-900">{formatINR(client.netWorth)}</p>
                            <p className="text-[10px] text-slate-400">Assets: {formatINR(client.totalAssets)}</p>
                          </td>

                          {/* Health Score */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                                client.healthScore >= 80 
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : client.healthScore >= 70
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {client.healthScore}/100
                              </span>
                              <span className="text-[10px] text-slate-500 hidden sm:inline">
                                {client.scoreBand}
                              </span>
                            </div>
                          </td>

                          {/* Asset Allocation Bar */}
                          <td className="py-3.5 px-4 hidden md:table-cell">
                            {client.assetAllocation ? (
                              <div className="w-32">
                                <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                                  <div style={{ width: `${client.assetAllocation.equity}%` }} className="bg-blue-600" title={`Equity ${client.assetAllocation.equity}%`} />
                                  <div style={{ width: `${client.assetAllocation.mutualFunds}%` }} className="bg-indigo-500" title={`MF ${client.assetAllocation.mutualFunds}%`} />
                                  <div style={{ width: `${client.assetAllocation.gold}%` }} className="bg-amber-400" title={`Gold ${client.assetAllocation.gold}%`} />
                                  <div style={{ width: `${client.assetAllocation.liquid}%` }} className="bg-emerald-500" title={`Liquid ${client.assetAllocation.liquid}%`} />
                                </div>
                                <div className="text-[9px] text-slate-400 mt-1">
                                  Eq {client.assetAllocation.equity}% • MF {client.assetAllocation.mutualFunds}%
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-[11px]">—</span>
                            )}
                          </td>

                          {/* Primary Flag */}
                          <td className="py-3.5 px-4">
                            {client.criticalFlags && client.criticalFlags.length > 0 ? (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${
                                isAlert 
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${isAlert ? 'bg-rose-500' : 'bg-slate-400'}`} />
                                <span className="truncate max-w-[200px]">{client.criticalFlags[0]}</span>
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs">No alerts</span>
                            )}
                          </td>

                          {/* Action */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenClient(client);
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
                              >
                                Review
                              </button>

                              {!client.isLiveClient && (
                                <button
                                  onClick={(e) => handleDeleteClient(e, client.id, client.name)}
                                  className="p-1 text-slate-300 hover:text-rose-600 rounded-lg transition-colors"
                                  title="Delete Client"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SCHEDULED CONSULTATIONS */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Upcoming Private Consultations</h3>
                  <p className="text-xs text-slate-500">
                    Live schedule synced with client portal bookings (RMConnectModal).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {appointments.map((apt) => (
                  <div 
                    key={apt.id} 
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold text-[10px] uppercase">
                        {apt.type === 'video' ? '📹 Video Call' : '🏢 In-Person'}
                      </span>
                      {apt.isLiveBooking && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Manoj Pal Live Booking
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{apt.clientName}</h4>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">{apt.topic}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-indigo-900 bg-indigo-50/70 p-2 rounded-xl font-bold">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{apt.date}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 italic">
                      "{apt.notes || 'Routine portfolio health review'}"
                    </p>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-700">{apt.status}</span>
                      <button
                        onClick={() => {
                          updateAppointmentStatus(apt.id, apt.status === 'Confirmed' ? 'Completed' : 'Confirmed');
                          refreshData();
                          showToast(`Appointment status updated to ${apt.status === 'Confirmed' ? 'Completed' : 'Confirmed'}`);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
                      >
                        {apt.status === 'Confirmed' ? 'Mark Completed' : 'Re-open'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADVISORY TASK & INTERVENTION QUEUE */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Institutional Advisory Queue</h3>
                  <p className="text-xs text-slate-500">
                    Track client debt avalanche, tax harvesting, and risk hedging protocols.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddTaskOpen(true)}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Action Item</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      task.completed 
                        ? 'bg-slate-50/70 border-slate-200 opacity-60' 
                        : 'bg-white border-slate-200 hover:border-blue-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-extrabold ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                            {task.title}
                          </span>
                          <span className={`px-2 py-0.2 rounded text-[10px] font-extrabold uppercase ${
                            task.priority === 'Urgent' 
                              ? 'bg-rose-100 text-rose-800' 
                              : task.priority === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                          <span className="font-semibold text-slate-600">Client: {task.clientName}</span>
                          <span>•</span>
                          <span>Category: {task.category}</span>
                          <span>•</span>
                          <span className="text-amber-700 font-medium">Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-xs font-bold shrink-0 ${task.completed ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BOOK ALLOCATION & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Asset Allocation Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-600" />
                  <span>Book Multi-Asset Distribution</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Aggregated across all {metrics.totalClients} client balance sheets in real-time.
                </p>

                {/* Progress bar visual */}
                <div className="h-5 w-full bg-slate-100 rounded-full flex overflow-hidden shadow-inner">
                  <div style={{ width: `${metrics.assetDistribution?.equity}%` }} className="bg-blue-600" title={`Equity: ${metrics.assetDistribution?.equity}%`} />
                  <div style={{ width: `${metrics.assetDistribution?.mutualFunds}%` }} className="bg-indigo-500" title={`Mutual Funds: ${metrics.assetDistribution?.mutualFunds}%`} />
                  <div style={{ width: `${metrics.assetDistribution?.gold}%` }} className="bg-amber-400" title={`Gold/SGB: ${metrics.assetDistribution?.gold}%`} />
                  <div style={{ width: `${metrics.assetDistribution?.liquid}%` }} className="bg-emerald-500" title={`Liquid: ${metrics.assetDistribution?.liquid}%`} />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                    <p className="text-xs text-blue-900 font-bold">Direct Equity</p>
                    <p className="text-lg font-black text-blue-700 mt-0.5">{metrics.assetDistribution?.equity}%</p>
                    <p className="text-[10px] text-blue-600">Large, Mid & Small Cap Stocks</p>
                  </div>
                  <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl">
                    <p className="text-xs text-indigo-900 font-bold">Mutual Funds & AIF</p>
                    <p className="text-lg font-black text-indigo-700 mt-0.5">{metrics.assetDistribution?.mutualFunds}%</p>
                    <p className="text-[10px] text-indigo-600">Active SIPs & Pre-IPO Tranches</p>
                  </div>
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                    <p className="text-xs text-amber-900 font-bold">Gold & Sovereign Bonds</p>
                    <p className="text-lg font-black text-amber-800 mt-0.5">{metrics.assetDistribution?.gold}%</p>
                    <p className="text-[10px] text-amber-700">Inflation & Macro Hedge</p>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                    <p className="text-xs text-emerald-900 font-bold">Liquid & Fixed Deposits</p>
                    <p className="text-lg font-black text-emerald-700 mt-0.5">{metrics.assetDistribution?.liquid}%</p>
                    <p className="text-[10px] text-emerald-600">Emergency & Arbitrage Funds</p>
                  </div>
                </div>
              </div>

              {/* Client Tier & Risk Telemetry */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Book Health & Tier Telemetry</span>
                </h3>
                <p className="text-xs text-slate-500">
                  SEBI RIA compliance score benchmarks.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Ultra-HNI Clients (&gt; ₹5.0 Cr)</p>
                      <p className="text-[11px] text-slate-500">Family Office & Alternative Investment Funds</p>
                    </div>
                    <span className="text-base font-black text-purple-700">{metrics.tierBreakdown?.uhni}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">HNI Clients (₹1.0 Cr - ₹5.0 Cr)</p>
                      <p className="text-[11px] text-slate-500">Multi-Asset Wealth Accumulators</p>
                    </div>
                    <span className="text-base font-black text-amber-700">{metrics.tierBreakdown?.hni}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Emerging Affluent (&lt; ₹1.0 Cr)</p>
                      <p className="text-[11px] text-slate-500">High Growth & Debt Restructuring Mandates</p>
                    </div>
                    <span className="text-base font-black text-blue-700">{metrics.tierBreakdown?.emerging}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Average Health Score of <strong>{metrics.avgHealthScore}/100</strong> beats the industry benchmark (64/100).
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Slide-out Client Detail Drawer */}
      <RMClientDetailDrawer
        client={selectedClient}
        isOpen={isClientDrawerOpen}
        onClose={() => setIsClientDrawerOpen(false)}
        onOpenClientDashboard={() => {
          setIsClientDrawerOpen(false);
          if (onNavigateToClient) onNavigateToClient('dashboard');
        }}
        onRefreshData={refreshData}
      />

      {/* Add Client Modal */}
      <RMAddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onClientAdded={(newClient) => {
          refreshData();
          showToast(`Onboarded ${newClient.name} • Total AUM Recalculated!`);
        }}
      />

      {/* Add Task Modal */}
      <RMAddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        clients={clients}
        onTaskAdded={() => {
          refreshData();
          showToast("Task added to advisory queue");
        }}
      />

      {/* Login Modal */}
      <RMLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
