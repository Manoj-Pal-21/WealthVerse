import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Cpu, 
  ShieldCheck, 
  ShieldAlert,
  MessageSquare, 
  ExternalLink, 
  X, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { askPlannerAdvisor } from '../../services/plannerAiService';
import FormattedAIMessage from '../ai/FormattedAIMessage';

export default function DashboardChatbotCopilot({ 
  metrics, 
  onOpenRM,
  onNavigateToPage,
  onClose,
  isDocked = true,
  isExpandedWidth = false,
  onToggleExpandWidth
}) {
  const [activeCopilotTab, setActiveCopilotTab] = useState('chat'); // 'chat' | 'directives'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: `Hello Manoj Pal! 👋 I have automatically scanned your entire balance sheet and telemetry. **You do not even need to ask me — here is your instant autonomous diagnostic summary:**

### ✅ Top 3 Things You MUST DO:
1. **Debt Avalanche on 36% APR Credit Card**: Allocate ₹30,000/mo of your ₹35k surplus to wipe out ₹1.80L ICICI card in 3.5 months (saves ₹32,400 interest).
2. **Bridge ₹1.00 Cr Term Insurance Gap**: Raise cover to ₹1.50 Cr (10x income) for Neha & Aarav.
3. **Harvest ₹93,000 LTCG Tax-Free**: Reset cost basis before March 31 with ₹0 tax liability under Section 112A.

### ⛔ Top 3 Things You MUST NOT DO:
1. **DO NOT pay only the Minimum Amount Due**: 36% APR revolving debt compounds viciously and damages CIBIL.
2. **DO NOT stop or liquidate active ₹20,000/mo SIPs**: Preserve compounding; pay debts from monthly cash flow.
3. **DO NOT buy ULIPs or endowment policies**: Sub-inflation 5% yields and 8% agent commission drag destroy long-term wealth.

*Switch to the **"⚡ Directives"** tab above to see all 12 rules, or type any question below:*`,
      source: 'Autonomous Financial Advisory Engine',
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Horizontal scroll state for prompts
  const promptsContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const suggestedPrompts = [
    "How to repay ₹1.5L Third-Party loan & credit card?",
    "How does my Age (34) affect my 77.5% equity?",
    "How do I close my ₹1.0 Cr life insurance gap?",
    "How to save ₹46,800 tax under 80C & LTCG?",
    "Connect me with RM Vikram Malhotra",
    "Rebalance my portfolio for inflation",
    "Analyze my emergency fund buffer (6.5 mos)",
    "Check nomination & Family Vault status"
  ];

  const checkPromptsScroll = () => {
    if (promptsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = promptsContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollPrompts = (direction) => {
    if (promptsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
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

    if (text.toLowerCase().includes("vikram") || text.toLowerCase().includes("rm") || text.toLowerCase().includes("relationship manager")) {
      if (onOpenRM) {
        onOpenRM();
      }
    }

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
      const fallback = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `### 🎯 Action Plan for Manoj Pal:
1. **Third-Party Personal Loan (₹1.50 Lakh)**: Since this is an interest-free hand loan from Ramesh Sharma, set a structured repayment of ₹15,000/mo to preserve trust.
2. **ICICI Credit Card (₹1.80 Lakh)**: Carry an aggressive Avalanche payoff at ₹25,000/mo to save 36% APR finance charges.
3. **Age 34 Glidepath**: Your 77.5% equity allocation is within growth limits, but new surplus should flow to your liquid emergency fund.`,
        source: 'Advisory Engine',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, fallback]);
    } finally {
      setIsTyping(false);
    }
  };

  const compactDos = [
    {
      id: 'cd-1',
      title: "Avalanche 36% ICICI Card First",
      detail: "Direct ₹30k/mo from ₹35k surplus for 3.5 mos",
      impact: "Saves ₹32,400 interest • +4 Pts",
      actionTarget: "debt-section",
      actionLabel: "View Debt Plan"
    },
    {
      id: 'cd-2',
      title: "Repay Ramesh Sharma Hand Loan",
      detail: "Commit ₹15,000/mo starting Month 4 for 10 mos",
      impact: "Zero informal risk • +3 Pts",
      actionTarget: "debt-section",
      actionLabel: "View Schedule"
    },
    {
      id: 'cd-3',
      title: "Bridge ₹1.00 Cr Life Insurance Gap",
      detail: "Raise pure term cover to ₹1.50 Cr for Neha & Aarav",
      impact: "Total protection for ~₹1,250/mo • +5 Pts",
      actionRM: true,
      actionLabel: "Book RM"
    },
    {
      id: 'cd-4',
      title: "Harvest ₹93,000 LTCG at 0% Tax",
      detail: "Reset acquisition cost before March 31 under 112A",
      impact: "0% tax liability • Saves ₹11,625 • +2 Pts",
      actionTarget: "tax-section",
      actionLabel: "View Tax Card"
    },
    {
      id: 'cd-5',
      title: "Build 3.2-Mo Emergency Buffer",
      detail: "Scale liquid reserve from ₹1.2L to ₹3.0L in liquid funds",
      impact: "Shields equities from distress selling • +5 Pts",
      actionTarget: "rebalance-section",
      actionLabel: "View Buffer"
    },
    {
      id: 'cd-6',
      title: "Claim Full 80D via Preventive Checkup",
      detail: "Utilize remaining ₹2,600 health checkup deduction",
      impact: "Saves ₹811 additional tax • +1 Pt",
      actionTarget: "tax-section",
      actionLabel: "View 80D"
    }
  ];

  const compactDonts = [
    {
      id: 'cdont-1',
      title: "DO NOT Pay Minimum Amount Due",
      danger: "36% APR revolving interest bleeds ₹5,400/mo and hurts CIBIL score."
    },
    {
      id: 'cdont-2',
      title: "DO NOT Stop Active ₹20k SIPs",
      danger: "Preserve 14.8% compounding; service debt purely from monthly savings."
    },
    {
      id: 'cdont-3',
      title: "DO NOT Buy ULIPs / Endowments",
      danger: "Sub-inflation 5% yields and 6-9% agent commission drag destroy capital."
    },
    {
      id: 'cdont-4',
      title: "DO NOT Exceed 50% in Single Stocks",
      danger: "77.5% total equity is near capacity; channel new inflows to debt/cash."
    },
    {
      id: 'cdont-5',
      title: "DO NOT Leave Hand Loan Unwritten",
      danger: "Unscheduled loans create social tension if lender has sudden emergency."
    },
    {
      id: 'cdont-6',
      title: "DO NOT Keep Cash in 3% Savings",
      danger: "Idle cash loses ~3.0% yearly to 6% inflation; use Liquid Mutual Funds."
    }
  ];

  const handleDirectiveAction = (item) => {
    if (item.actionRM && onOpenRM) {
      onOpenRM();
      return;
    }
    if (item.actionTarget) {
      const el = document.getElementById(item.actionTarget);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden transition-all duration-300 ${
      isDocked ? "h-[calc(100vh-8.5rem)] max-h-[760px]" : "h-[600px]"
    }`}>
      {/* Header - Compact & Clean without Clipping */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-extrabold text-xs sm:text-sm tracking-tight truncate">
                AI Wealth Copilot
              </h3>
              <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.2 rounded-full border border-emerald-500/30 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[10px] text-slate-300 truncate">
              Manoj Pal (Age 34 • NW ₹{(Number(metrics?.netWorth || 2774000) / 100000).toFixed(2)}L)
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onToggleExpandWidth && (
            <button
              onClick={onToggleExpandWidth}
              title={isExpandedWidth ? "Switch to Standard Width (540px)" : "Expand to Extra Wide (670px+)"}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-all"
            >
              <span>{isExpandedWidth ? "⤡ Standard" : "⤢ Extra Wide"}</span>
            </button>
          )}

          {onNavigateToPage && (
            <button
              onClick={onNavigateToPage}
              title="Open in Dedicated New Page"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-indigo-200 hover:text-white bg-indigo-800/50 hover:bg-indigo-700/60 border border-indigo-400/30 rounded-lg transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              <span>New Page</span>
            </button>
          )}

          <button
            onClick={() => setMessages([messages[0]])}
            title="Reset Chat"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              title="Close / Hide Sidebar"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-Header Tabs: Chat vs Auto Directives */}
      <div className="px-3 py-2 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-xl">
          <button
            onClick={() => setActiveCopilotTab('chat')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeCopilotTab === 'chat'
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setActiveCopilotTab('directives')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeCopilotTab === 'directives'
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>⚡ Do's & Don'ts (12)</span>
          </button>
        </div>
        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md hidden sm:inline-block">
          Auto Telemetry
        </span>
      </div>

      {/* DIRECTIVES VIEW (AUTO-READOUT) */}
      {activeCopilotTab === 'directives' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
          {/* Top Auto-Readout Alert Banner */}
          <div className="p-3 bg-gradient-to-r from-blue-900 to-indigo-950 rounded-xl text-white shadow-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <h4 className="text-xs font-extrabold">Autonomous Diagnostic Directives</h4>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Auto-derived from Manoj Pal's ₹27.74L net worth & ₹10.06L debt telemetry. Zero input required.
            </p>
          </div>

          {/* Section: WHAT YOU MUST DO */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                What You MUST DO (6 Actions)
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                Strategic
              </span>
            </div>

            <div className="space-y-2">
              {compactDos.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs font-extrabold text-slate-900 leading-snug">
                        {item.title}
                      </h5>
                    </div>
                    {item.actionLabel && (
                      <button
                        onClick={() => handleDirectiveAction(item)}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 shrink-0 hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 pl-5 leading-normal">
                    {item.detail}
                  </p>
                  <div className="mt-1.5 pl-5">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/70 inline-block">
                      {item.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: WHAT YOU MUST NOT DO */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="text-[11px] font-extrabold text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                What You MUST NOT DO (6 Warnings)
              </span>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                Critical Pitfalls
              </span>
            </div>

            <div className="space-y-2">
              {compactDonts.map((item, idx) => (
                <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-rose-300 transition-all">
                  <div className="flex items-start gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h5 className="text-xs font-extrabold text-rose-900 leading-snug">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 pl-5 leading-normal">
                    {item.danger}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Switch to Chat helper */}
          <div className="pt-2">
            <button
              onClick={() => {
                setActiveCopilotTab('chat');
                handleSendMessage("Can you break down the Debt Avalanche on my ICICI card and Ramesh Sharma hand loan step-by-step?");
              }}
              className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI Copilot to Simulate Avalanche Payoff</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* CHAT VIEW */}
      {activeCopilotTab === 'chat' && (
        <>
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[92%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="space-y-1.5">
                        <FormattedAIMessage content={msg.text} />
                        {msg.source && (
                          <div className="pt-1.5 mt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
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
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-2 justify-start">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white text-slate-600 border border-slate-200 px-3 py-2 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-slate-500 text-[11px] font-medium ml-1">
                    Analyzing portfolio & liabilities...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips - Fully Scrollable with Wheel, Drag & Arrow Buttons */}
          <div className="relative bg-slate-100/95 border-t border-slate-200/90 px-2 py-2 shrink-0">
            <div className="flex items-center gap-1.5">
              {/* Label */}
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
                <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> Prompts:
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

              {/* Scrollable Container with onWheel & fine-line scrollbar */}
              <div 
                ref={promptsContainerRef}
                onScroll={checkPromptsScroll}
                onWheel={handlePromptsWheel}
                className="flex-1 overflow-x-auto py-1 px-0.5 flex items-center gap-1.5 scroll-smooth select-none"
                style={{ 
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E1 #F1F5F9'
                }}
              >
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isTyping}
                    className="px-3 py-1 rounded-full bg-white hover:bg-indigo-50 active:bg-indigo-100 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 text-[11px] font-medium whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer hover:scale-[1.02]"
                  >
                    {prompt}
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

          {/* Chat Input Bar */}
          <div className="p-2.5 bg-white border-t border-slate-200 shrink-0">
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
                placeholder="Ask about net worth, loan payoff, tax strategies..."
                disabled={isTyping}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
              />
              <button
                type="submit"
                disabled={isTyping || !inputText.trim()}
                className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
