import React, { useState, useEffect } from 'react';
import { Compass, X, Send, Sparkles, AlertCircle, Key, Check } from 'lucide-react';
import AIChatBubble from './AIChatBubble';
import { suggestedQuestions } from '../../data/aiKnowledge';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { askClaudeAdvisor, isClaudeConfigured, getActiveApiKey, setStoredApiKey } from '../../services/claudeService';

export default function AIDrawer({
  isOpen,
  onClose,
  initialQuery = null,
  activeContext = 'Overview',
  onNavigate
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello Manoj! I'm 360° AI, your financial intelligence copilot. I have live access to your complete portfolio (Net Worth, Equity, Mutual Funds, Goals, and Gaps). Ask me anything!",
      data: null
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(getActiveApiKey());
  const [keySaved, setKeySaved] = useState(false);

  const hasLiveClaude = isClaudeConfigured();

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleSend = async (queryText) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const result = await askClaudeAdvisor(query, messages);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.data?.intro || 'Analysis complete.',
        data: result.data,
        source: result.source
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Error:', err);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-slate-50 h-full shadow-drawer z-10 flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5 animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">360° AI Copilot</h3>
                <Badge variant={hasLiveClaude ? 'brand' : 'good'} size="sm" dot={true}>
                  {hasLiveClaude ? 'Claude 3.5 Sonnet' : 'Online'}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">Context: {activeContext} • Analyzing full balance sheet</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setShowKeyModal(true)}
              title="Configure Claude API Key"
              className="p-2 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              <Key className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <AIChatBubble 
              key={msg.id} 
              message={msg} 
              onNavigate={(page) => {
                onClose();
                if (onNavigate) onNavigate(page);
              }} 
            />
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-3 bg-white rounded-xl border border-slate-200/80 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
              <span>{hasLiveClaude ? 'Claude 3.5 is analyzing your entire portfolio...' : '360° AI is analyzing your financial context...'}</span>
            </div>
          )}
        </div>

        {/* Suggested Queries Chips */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200/80 px-4 py-2.5">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2">Suggested Inquiries</p>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {suggestedQuestions.slice(0, 5).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs text-slate-700 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200/60 px-2.5 py-1 rounded-full transition-all text-left truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-white p-4 border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about your finances, goals, or gaps..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
            <span>{hasLiveClaude ? 'Powered by Claude 3.5 Sonnet' : 'Deterministic Wealth Engine'}</span>
            <button onClick={() => setShowKeyModal(true)} className="text-brand-600 font-semibold hover:underline">
              {hasLiveClaude ? 'Key Active' : 'Add Claude Key'}
            </button>
          </div>
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
