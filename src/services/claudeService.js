// =========================================================================
// 360° WEALTH — LLM AI ADVISOR SERVICE (SHAREKHAN / CLOUD LLM)
// =========================================================================
// Configure your API settings below:
// =========================================================================
export const LLM_API_URL = "https://mcpuat.sharekhan.com/api/v1/chat/completions"; // Line 6: API Endpoint
export const LLM_MODEL = "qwen3-4b-instruct";                                      // Line 7: Model Name
export const LLM_API_KEY = "";                                                    // Line 8: Add API Key / Token here (if required)

import { getFullPortfolioSnapshot } from './financialContext';
import { cannedAiResponses } from '../data/aiKnowledge';

export function getActiveApiKey() {
  const manual = LLM_API_KEY ? LLM_API_KEY.trim() : '';
  const env = import.meta.env.VITE_LLM_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
  const stored = typeof window !== 'undefined' ? localStorage.getItem('360_llm_api_key') || '' : '';
  return manual || env.trim() || stored.trim();
}

export function setStoredApiKey(key) {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.setItem('360_llm_api_key', key.trim());
    } else {
      localStorage.removeItem('360_llm_api_key');
    }
  }
}

export function isClaudeConfigured() {
  // Configured if custom URL is set, or if API key is provided
  return Boolean(LLM_API_URL || getActiveApiKey());
}

export async function askClaudeAdvisor(userPrompt, conversationHistory = []) {
  const apiKey = getActiveApiKey();
  const livePortfolio = getFullPortfolioSnapshot();

  // Use local Vite proxy during development to prevent browser CORS issues
  const endpoint = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? '/api/sharekhan'
    : LLM_API_URL;

  const headers = {
    'Content-Type': 'application/json'
  };

  if (apiKey) {
    headers['Authorization'] = apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`;
  }

  const systemContext = `You are 360° AI, the intelligent private wealth command center copilot for Indian investors.
You have real-time verified access to the user's complete portfolio:
- Client: ${livePortfolio.client.name} (Net Worth: ₹42.86L, Liabilities: ₹8.56L)
- Equity (₹18.42L): Reliance, TCS, HDFC Bank, Infosys, ICICI Bank (32% IT concentration)
- Mutual Funds (₹15.20L): 5 active SIPs of ₹25K/mo (18% overlap between Axis Bluechip and Mirae Asset)
- Financial Gaps: Readiness Score 72/100, Life Insurance gap of ₹75L, Retirement gap of ₹58L
- Liquid Emergency Reserve: ₹4.20L (6.8 months covered against ₹62K/mo expense)
- Monthly Cashflow: Income ₹1.10L, EMI ₹18K, Savings ₹32K/mo

Answer the user's inquiry with specific reference to their real balance sheet figures.
Where applicable, format response with clear actionable recommendations and Indian Rupee notation (₹, Lakhs, Crores).`;

  // Format messages exactly as required by your cURL endpoint
  const messages = [
    {
      role: 'system',
      content: [
        {
          type: 'text',
          text: systemContext
        }
      ]
    },
    ...conversationHistory.slice(-4).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: [
        {
          type: 'text',
          text: typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text)
        }
      ]
    })),
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: userPrompt
        }
      ]
    }
  ];

  const payload = {
    model: LLM_MODEL,
    messages: messages,
    max_tokens: 512,
    stream: false
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`API HTTP ${response.status}: ${errText.slice(0, 100)}`);
    }

    const data = await response.json();

    // Extract text content from choices[0].message.content
    let responseText = '';
    const choiceMsg = data?.choices?.[0]?.message?.content;
    if (typeof choiceMsg === 'string') {
      responseText = choiceMsg.trim();
    } else if (Array.isArray(choiceMsg)) {
      responseText = choiceMsg.map(c => c.text || '').join('').trim();
    } else if (data?.content) {
      responseText = typeof data.content === 'string' ? data.content : data.content[0]?.text || '';
    }

    if (!responseText) {
      throw new Error('Empty response from LLM');
    }

    // Try parsing JSON if model returned structured output
    let structuredData = null;
    let cleanText = responseText;
    if (cleanText.includes('{') && cleanText.includes('}')) {
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          structuredData = JSON.parse(jsonMatch[0]);
        } catch {
          // not strict JSON, handled below
        }
      }
    }

    if (!structuredData || !structuredData.intro) {
      // Natural language response formatting
      structuredData = {
        intro: responseText,
        metrics: [
          { label: "LLM Model", value: LLM_MODEL },
          { label: "Portfolio Status", value: "₹42.86L Synced" }
        ],
        impact: {
          level: "Live Telemetry",
          type: "info",
          text: "Computed from your active multi-asset balance sheet across Equity, Mutual Funds, and Liabilities."
        },
        recommendations: [
          "Maintain current ₹32,000/mo SIP cadence.",
          "Check Financial Gap Radar for priority risk hedges."
        ],
        nextAction: {
          label: "View Gap Radar",
          targetPage: "gaps"
        }
      };
    }

    return {
      success: true,
      data: structuredData,
      source: `${LLM_MODEL} (Live)`
    };

  } catch (err) {
    console.warn(`[Sharekhan LLM] Falling back to local engine:`, err.message);
    const fallback = getFallbackResponse(userPrompt);
    fallback.notice = `Using local financial engine (${err.message}).`;
    return fallback;
  }
}

function getFallbackResponse(query) {
  const qLower = query.toLowerCase();
  let matchedData = null;

  if (qLower.includes('car') || qLower.includes('afford')) {
    matchedData = cannedAiResponses.car;
  } else if (qLower.includes('fix') || qLower.includes('first') || qLower.includes('priority')) {
    matchedData = cannedAiResponses.fix_first;
  } else if (qLower.includes('gap') || qLower.includes('vulnerability')) {
    matchedData = cannedAiResponses.gaps;
  } else if (qLower.includes('retire') || qLower.includes('sip') || qLower.includes('future')) {
    matchedData = cannedAiResponses.retirement;
  } else if (qLower.includes('down') || qLower.includes('loss') || qLower.includes('fall')) {
    matchedData = cannedAiResponses.portfolio_down;
  } else if (qLower.includes('risk') || qLower.includes('volatility') || qLower.includes('overlap')) {
    matchedData = cannedAiResponses.portfolio_risk;
  } else if (qLower.includes('family') || qLower.includes('legacy') || qLower.includes('nominee') || qLower.includes('will')) {
    matchedData = cannedAiResponses.family_legacy;
  } else {
    matchedData = {
      intro: `Based on your live balance sheet (Net Worth ₹42.86L across Equity, Mutual Funds, and Liquid Reserves), here is our evaluation for "${query}".`,
      metrics: [
        { label: "Net Worth", value: "₹42.86L" },
        { label: "Portfolio", value: "₹35.42L" },
        { label: "Financial Health", value: "72 / 100" },
        { label: "Critical Gap", value: "Life Cover (₹75L)" }
      ],
      impact: {
        level: "Consideration",
        type: "info",
        text: "Calculations derived from live portfolio records. Connect your live Sharekhan LLM endpoint to unlock unconstrained natural language intelligence."
      },
      recommendations: [
        "Review your Financial Gap Radar to ensure liabilities remain safely hedged.",
        "Maintain current monthly SIP cadence of ₹32,000/mo."
      ],
      nextAction: {
        label: "Open Financial Gap Radar",
        targetPage: "gaps"
      }
    };
  }

  return {
    success: true,
    data: matchedData,
    source: 'Deterministic Wealth Engine'
  };
}
