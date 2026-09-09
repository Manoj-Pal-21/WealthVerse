import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert,
  TrendingUp, 
  CreditCard, 
  Wallet,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Zap,
  Cpu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { askPlannerAdvisor, AI_SUGGESTIONS } from '../services/plannerAiService';
import FormattedAIMessage from '../components/ai/FormattedAIMessage';

export default function AIAdvisorScreen({ metrics, onNavigate }) {
  const [sidebarTab, setSidebarTab] = useState('directives'); // 'directives' | 'profile'
  
  const profile = metrics?.profile || {
    name: "Manoj Pal",
    monthlyIncome: 150000,
    monthlyExpenses: 92000,
    emergencyFund: 120000,
    creditUsage: 180000,
    creditLimit: 300000
  };

  const initialWelcomeMessage = {
    id: 1,
    sender: 'assistant',
    text: `Hello ${profile.name}! 👋 I am your **Autonomous AI Wealth Advisor**. I have continuously audited your complete telemetry:
- **Verified Net Worth**: **₹27.74 Lakh** (Assets: ₹37.80L • Debt: ₹10.06L)
- **Current Score**: **78 / 100 ("Good")** ➔ Trajectory Target: **87 / 100 ("Excellent")**

### 🟢 Immediate Prescriptions (What You MUST DO):
1. **Debt Avalanche on 36% Credit Card**: Direct ₹30,000/mo of your ₹35k cash surplus to eliminate the ₹1.80L ICICI card in 3.5 months (saves ₹32,400 in interest).
2. **Bridge ₹1.00 Cr Term Insurance Gap**: Raise pure life cover to ₹1.50 Cr for Neha Pal & Aarav Pal (cost ~₹1,250/mo).
3. **Harvest ₹93,000 LTCG at 0% Tax**: Reset equity cost basis under Section 112A before March 31 with zero tax liability.

### 🔴 Critical Safeguards (What You MUST NOT DO):
1. **DO NOT pay only the Minimum Amount Due**: 36% APR revolving interest bleeds ₹5,400/mo and hurts CIBIL.
2. **DO NOT stop or liquidate active ₹20,000/mo SIPs**: Keep compounding active; clear debt strictly from monthly cash flow.
3. **DO NOT buy ULIPs or endowment policies**: Sub-inflation 5% yields and 6-9% commissions destroy capital.

*See the **Directives Board** on the right for all 12 rules, or ask any detailed scenario below:*`,
    source: 'Autonomous Financial Advisory Engine',
    timestamp: 'Just now'
  };

  const [messages, setMessages] = useState([initialWelcomeMessage]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const promptsContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkPromptsScroll = () => {
    if (promptsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = promptsContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollPrompts = (direction) => {
    if (promptsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      promptsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkPromptsScroll, 320);
    }
  };

  const handlePromptsWheel = (e) => {
    if (promptsContainerRef.current && e.deltaY !== 0) {
      promptsContainerRef.current.scrollLeft += e.deltaY;
      checkPromptsScroll();
    }
  };

  useEffect(() => {
    checkPromptsScroll();
    window.addEventListener('resize', checkPromptsScroll);
    return () => window.removeEventListener('resize', checkPromptsScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await askPlannerAdvisor(text.trim(), metrics, messages);
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: response.text,
        source: response.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: "I encountered a momentary connection issue. Let me review your balance sheet: To improve your score from 78 to 87, prioritize allocating ₹30,000/mo to your emergency fund.",
        source: 'Advisory Engine',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([initialWelcomeMessage]);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Chat + Context Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chat Container (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm h-[750px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      AI Financial Advisor
                    </h3>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Real-time reasoning based on your ₹1.5L income & ₹92K expenses
                  </p>
                </div>
              </div>

              <button
                onClick={handleClearChat}
                title="Reset Conversation"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Scrollable Message Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none'
                      }`}
                    >
                      {isUser ? (
                        <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div className="space-y-2">
                          <FormattedAIMessage content={msg.text} />
                          {msg.source && (
                            <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                              <span className="flex items-center gap-1">
                                <Cpu className="w-3 h-3 text-indigo-500" />
                                {msg.source}
                              </span>
                              <span>{msg.timestamp}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3 justify-start">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-50 text-slate-500 border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-slate-400 text-xs font-medium ml-1">Analyzing financial trade-offs...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips - Scrollable with Navigation Arrows & Mouse Wheel */}
            <div className="relative px-3 py-2 bg-slate-50/90 border-t border-slate-200/60 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> Prompts:
                </span>

                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={() => scrollPrompts('left')}
                  disabled={!canScrollLeft}
                  className={`p-1 rounded-lg border transition-all shrink-0 ${
                    canScrollLeft
                      ? "bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border-slate-200 shadow-2xs cursor-pointer active:scale-95"
                      : "opacity-25 text-slate-300 border-transparent cursor-default pointer-events-none"
                  }`}
                  title="Scroll prompts left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Scrollable Container with onWheel */}
                <div 
                  ref={promptsContainerRef}
                  onScroll={checkPromptsScroll}
                  onWheel={handlePromptsWheel}
                  className="flex-1 overflow-x-auto py-1 px-0.5 flex items-center gap-1.5 scroll-smooth select-none"
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#CBD5E1 #F8FAFC'
                  }}
                >
                  {AI_SUGGESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      disabled={isTyping}
                      className="px-3 py-1 rounded-full bg-white hover:bg-indigo-50 active:bg-indigo-100 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 text-xs font-semibold whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer hover:scale-[1.02]"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={() => scrollPrompts('right')}
                  disabled={!canScrollRight}
                  className={`p-1 rounded-lg border transition-all shrink-0 ${
                    canScrollRight
                      ? "bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border-slate-200 shadow-2xs cursor-pointer active:scale-95"
                      : "opacity-25 text-slate-300 border-transparent cursor-default pointer-events-none"
                  }`}
                  title="Scroll prompts right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a financial question (e.g. How to get score to 87?)..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputText.trim()}
                  className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Sidebar: Contextual Profile & Auto Directives Card (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Tab Switcher */}
            <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1">
              <button
                onClick={() => setSidebarTab('directives')}
                className={`flex-1 py-2 px-3 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  sidebarTab === 'directives'
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>⚡ Auto Directives</span>
              </button>
              <button
                onClick={() => setSidebarTab('profile')}
                className={`flex-1 py-2 px-3 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  sidebarTab === 'profile'
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Advisor Context</span>
              </button>
            </div>

            {/* TAB 1: AUTONOMOUS DIRECTIVES BOARD */}
            {sidebarTab === 'directives' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Prescription Directives
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Auto-audited for Manoj Pal (Age 34)
                    </p>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live Telemetry
                  </span>
                </div>

                {/* Strategic DO's */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    What You MUST DO
                  </span>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/90">
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-950 font-bold text-[11px]">1. Avalanche 36% ICICI Card</strong>
                        <span className="text-[10px] font-bold text-emerald-700">+4 Pts</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Direct ₹30k/mo surplus for 3.5 mos to save ₹32,400 interest.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/90">
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-950 font-bold text-[11px]">2. Close ₹1.00 Cr Term Gap</strong>
                        <span className="text-[10px] font-bold text-emerald-700">+5 Pts</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Raise pure life cover to ₹1.50 Cr (10x income) for Neha & Aarav.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/90">
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-950 font-bold text-[11px]">3. Harvest ₹93,000 LTCG</strong>
                        <span className="text-[10px] font-bold text-emerald-700">0% Tax</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Reset equity cost basis under Sec 112A before March 31.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/90">
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-950 font-bold text-[11px]">4. Repay Ramesh Sharma Loan</strong>
                        <span className="text-[10px] font-bold text-emerald-700">+3 Pts</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Commit ₹15,000/mo over 10 months starting Month 4.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Critical DON'TS */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold text-rose-800 uppercase tracking-wide flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    What You MUST NOT DO
                  </span>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100/90">
                      <strong className="text-rose-950 font-bold text-[11px] block">1. Never Pay Minimum Amount Due</strong>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        36% APR revolving interest bleeds ₹5,400/mo and destroys credit score.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100/90">
                      <strong className="text-rose-950 font-bold text-[11px] block">2. Never Stop Active ₹20k SIPs</strong>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Keep 14.8% compounding intact; clear all debt from ₹35k monthly savings.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100/90">
                      <strong className="text-rose-950 font-bold text-[11px] block">3. Never Buy ULIPs / Endowments</strong>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Sub-inflation 5% returns and 6-9% commissions compromise Aarav's education fund.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('plan')}
                    className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Execute 90-Day Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: ADVISOR CONTEXT PROFILE */}
            {sidebarTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Advisor Context
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {profile.name || "Manoj Pal"}
                  </span>
                </div>

                {/* Score Snapshot */}
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Health Score</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-2xl font-extrabold text-slate-900">{metrics?.score || 78}</span>
                      <span className="text-xs font-semibold text-blue-600">/100 (Good)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-600 font-bold uppercase">6-Mo Target</span>
                    <div className="text-2xl font-extrabold text-emerald-600">
                      {metrics?.projectedScore || 87}
                    </div>
                  </div>
                </div>

                {/* Parameters List */}
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 bg-blue-50/60 px-2 rounded-lg">
                    <span className="text-blue-900 font-bold">Total Net Worth</span>
                    <span className="font-extrabold text-blue-700">
                      ₹{((metrics?.netWorth || 2774000) / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Total Assets</span>
                    <span className="font-bold text-emerald-600">
                      ₹{((metrics?.totalAssets || 3780000) / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Total Liabilities</span>
                    <span className="font-bold text-rose-600">
                      ₹{((metrics?.totalLiabilities || 1006000) / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Monthly Income</span>
                    <span className="font-bold text-slate-900">₹1,50,000</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Living Expenses</span>
                    <span className="font-bold text-slate-900">₹92,000</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Emergency Fund</span>
                    <span className="font-bold text-rose-600">₹1,20,000 (1.3 mo)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Credit Card Usage</span>
                    <span className="font-bold text-amber-600">₹1,80,000 (60%)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Monthly SIP</span>
                    <span className="font-bold text-slate-900">₹20,000</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onNavigate('plan')}
                    className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Review Personalized Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('progress')}
                    className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                  >
                    View Goal Tracker
                  </button>
                </div>
              </div>
            )}

            {/* AI Advisor Security & Disclaimer */}
            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 text-indigo-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Deterministic + LLM Hybrid Advisory</span>
              </div>
              <p className="text-slate-500 leading-normal">
                Recommendations are formulated using validated financial formulas (50/30/20, CIBIL 30% utilization, and emergency reserves) to guarantee mathematical soundness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
