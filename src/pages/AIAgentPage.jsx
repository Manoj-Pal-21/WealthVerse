import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Send, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  ShieldAlert, 
  Target, 
  PieChart,
  Key
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import AIChatBubble from '../components/ai/AIChatBubble';
import { suggestedQuestions } from '../data/aiKnowledge';
import { overviewKPIs } from '../data/financialData';
import { formatINR } from '../utils/formatters';
import { askClaudeAdvisor, isClaudeConfigured, getActiveApiKey, setStoredApiKey } from '../services/claudeService';

export default function AIAgentPage({ onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 'initial-user',
      sender: 'user',
      text: 'Can I afford a ₹10L car?'
    },
    {
      id: 'initial-ai',
      sender: 'ai',
      text: 'Based on your current financial picture, you can potentially afford it, but buying it now may reduce your emergency reserve and slow down your future goals.',
      data: {
        intro: 'Based on your current financial picture, you can potentially afford it, but buying it now may reduce your emergency reserve and slow down your future goals.',
        metrics: [
          { label: 'Current Savings', value: '₹5.2L' },
          { label: 'Monthly Income', value: '₹1.10L' },
          { label: 'Monthly Expenses', value: '₹62,000' },
          { label: 'Existing EMI', value: '₹18,000' }
        ],
        impact: {
          level: 'Moderate',
          type: 'warning',
          text: 'A new ₹8L car loan (assuming ₹2L down payment) will introduce an additional EMI of ~₹17,200/mo, raising your total Debt-to-Income ratio from 16.3% to 32%.'
        },
        recommendations: [
          'Wait 6 months to accumulate a larger down payment (₹4L) without touching emergency reserves.',
          'OR limit vehicle budget to ₹7.5L to keep your combined EMI comfortably below 25% of monthly income.'
        ],
        nextAction: {
          label: 'Simulate Goal in Goals Center',
          targetPage: 'goals'
        }
      }
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(getActiveApiKey());
  const [keySaved, setKeySaved] = useState(false);

  const hasLiveClaude = isClaudeConfigured();

  const handleSend = async (queryText) => {
    const q = queryText || inputVal;
    if (!q.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const result = await askClaudeAdvisor(q, messages);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.data?.intro || 'Analysis complete.',
        data: result.data,
        source: result.source
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveKey = (e) => {
    e.preventDefault();
    setStoredApiKey(tempApiKey);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyModal(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20">
            <Compass className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">360° AI</h1>
              <Badge variant={hasLiveClaude ? 'brand' : 'good'} size="sm" dot={true}>
                {hasLiveClaude ? 'Claude 3.5 Sonnet Active' : 'Online'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Analyzing your complete financial picture • Personal wealth intelligence copilot
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowKeyModal(true)}
            icon={Key}
          >
            {hasLiveClaude ? 'Claude Key Set' : 'Add Claude Key'}
          </Button>
          <Badge variant={hasLiveClaude ? 'brand' : 'neutral'} size="md">
            {hasLiveClaude ? 'Live Claude 3.5' : 'Deterministic Engine'}
          </Badge>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Chat Console Area (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-card flex flex-col h-[700px] overflow-hidden">
          {/* Console Header Bar */}
          <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Financial Copilot Conversation</span>
            </div>
            <span className="text-[11px] text-slate-400">Context: Master Balance Sheet</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m) => (
              <AIChatBubble key={m.id} message={m} onNavigate={onNavigate} />
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200/80 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
                <span>360° AI is calculating balance sheet impact...</span>
              </div>
            )}
          </div>

          {/* Suggested Chips Bar */}
          <div className="px-6 py-2.5 bg-slate-50/50 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-[11px] text-slate-700 bg-white hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 px-2.5 py-1 rounded-full transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask anything about your finances, affordability, or gaps..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Financial Context Side Panel (1 col) */}
        <div className="space-y-4">
          <Card
            title="Live Financial Context"
            subtitle="Deterministic metrics ingested by AI"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500">Net Worth</span>
                <span className="text-sm font-extrabold text-slate-900">
                  {formatINR(overviewKPIs.netWorth.value, true)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500">Portfolio</span>
                <span className="text-sm font-extrabold text-slate-900">
                  {formatINR(overviewKPIs.investments.value, true)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500">Financial Health</span>
                <Badge variant="good" size="sm">72 / 100</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500">Top Vulnerability</span>
                <Badge variant="danger" size="sm">Insurance Gap (₹75L)</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500">Retirement Progress</span>
                <span className="text-sm font-bold text-brand-600">71% On Track</span>
              </div>
            </div>
          </Card>

          <Card
            title="Context Awareness"
            subtitle="How 360° AI responds"
          >
            <p className="text-xs text-slate-600 leading-relaxed">
              When opened from <strong>Portfolio</strong>, AI audits sector beta and fund overlaps. When opened from <strong>Financial Gaps</strong>, it optimizes your priority remediation plan.
            </p>
          </Card>
        </div>
      </div>

      {/* Claude Key Modal */}
      <Modal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        title="Anthropic Claude API Key"
        subtitle="Connect live Claude 3.5 Sonnet to read your entire balance sheet"
      >
        <form onSubmit={handleSaveKey} className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            You can enter your API key here, or add it directly to <code className="bg-slate-100 text-brand-700 px-1 py-0.5 rounded font-mono">src/services/claudeService.js</code> on <strong>Line 7</strong>.
          </p>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Anthropic API Key</label>
            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setShowKeyModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {keySaved ? 'Saved ✓' : 'Save Key'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
