import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  TrendingUp, 
  ChevronDown, 
  Sparkles, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { userProfile } from '../../data/financialData';
import Badge from '../common/Badge';

export default function Header({ 
  onTriggerSearch, 
  onOpenNotifications 
}) {
  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: "Insurance Shortfall Alert", text: "₹75L protection gap detected against family liabilities.", time: "10m ago", unread: true },
    { id: 2, title: "TCS Dividend Credited", text: "₹1,420 credited directly to your HDFC bank account.", time: "2h ago", unread: true },
    { id: 3, title: "Fund Overlap Warning", text: "18% holding overlap found between Axis and Mirae large-cap funds.", time: "1d ago", unread: false }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onTriggerSearch(searchVal);
      setSearchVal('');
    }
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 fixed top-0 right-0 left-64 z-20 px-8 flex items-center justify-between">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search stocks, mutual funds, goals, or ask a question..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl pl-10 pr-24 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-inner/10"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <span className="text-[10px] font-medium text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
              Press ↵
            </span>
          </div>
        </div>
      </form>

      {/* Right Side Widgets */}
      <div className="flex items-center gap-4">
        {/* NIFTY 50 Mini Market Ticker */}
        <div className="hidden lg:flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            NIFTY 50
          </div>
          <span className="text-xs font-bold text-slate-900">{userProfile.nifty.value}</span>
          <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            {userProfile.nifty.change} ({userProfile.nifty.percent})
          </span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-30 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-brand-600 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 mt-1 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2 px-1 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-semibold text-slate-800">{n.title}</h5>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Card */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {userProfile.avatar}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">{userProfile.name}</div>
              <div className="text-[10px] text-slate-400 font-medium">{userProfile.role}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-30 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">{userProfile.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{userProfile.email}</div>
              </div>
              <div className="py-1 text-xs text-slate-700">
                <div className="px-3 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between">
                  <span>Client Tier</span>
                  <Badge variant="brand" size="sm">Private</Badge>
                </div>
                <div className="px-3 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">Account Settings</div>
                <div className="px-3 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">Financial Advisor</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
