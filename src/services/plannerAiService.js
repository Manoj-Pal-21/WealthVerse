// Financial Health Planner - AI Advisor Service
// Integrates with Sharekhan Qwen-3-4B / Claude LLM with real-time profile awareness
// and robust deterministic fallbacks for Manoj Pal's comprehensive wealth profile.

import { LLM_API_URL, LLM_MODEL, getActiveApiKey } from './claudeService';
import { DEEP_WEALTH_DATA } from '../data/wealthDeepData';

export const AI_SUGGESTIONS = [
  "How to repay ₹1.5L Third-Party loan & credit card?",
  "How does my Age (34) affect my 77.5% equity?",
  "How do I close my ₹1.0 Cr life insurance gap?",
  "How to save ₹46,800 tax under 80C, 80D & LTCG?",
  "Connect me with Private Wealth RM Vikram Malhotra"
];

export async function askPlannerAdvisor(userPrompt, profileMetrics, conversationHistory = []) {
  const profile = profileMetrics?.profile || {
    name: "Manoj Pal",
    age: 34,
    monthlyIncome: 150000,
    monthlyExpenses: 92000,
    emergencyFund: 120000,
    creditUsage: 180000,
    creditLimit: 300000,
    monthlyEmi: 18000,
    monthlyInvestment: 20000,
    thirdPartyLoan: 150000
  };

  const netWorth = profileMetrics?.netWorth || 2774000;
  const totalAssets = profileMetrics?.totalAssets || 3780000;
  const totalLiabilities = profileMetrics?.totalLiabilities || 1006000;
  const age = profileMetrics?.age || profile.age || 34;

  const endpoint = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? '/api/sharekhan'
    : LLM_API_URL;

  const apiKey = getActiveApiKey();
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) {
    headers['Authorization'] = apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`;
  }

  const systemPrompt = `You are the Financial Health Planner AI Advisor for ${profile.name}, Age ${age}.
Live 360° Balance Sheet & Institutional Wealth Context:
- Net Worth: ₹${netWorth.toLocaleString('en-IN')} (₹${(netWorth / 100000).toFixed(2)} Lakhs)
- Total Assets: ₹${totalAssets.toLocaleString('en-IN')} (Equity: ₹16.5L [43.7%], Mutual Funds: ₹12.8L [33.9%], Gold: ₹3.2L [8.5%], FD/Debt: ₹4.1L [10.8%], Liquid Cash: ₹1.2L [3.1%])
- Total Liabilities: ₹${totalLiabilities.toLocaleString('en-IN')} (HDFC Personal Loan: ₹6.0L, ICICI Credit Card: ₹1.8L [60% used], Third-Party Personal Loan: ₹1.5L [0% Hand loan from Ramesh Sharma], Consumer Loan: ₹76K)
- Debt-to-Asset Ratio: ${profileMetrics?.debtToAssetRatio || 26.6}%
- Financial Health Score: ${profileMetrics?.score || 78}/100 ("Good") ➔ 6-Mo Target: ${profileMetrics?.projectedScore || 87}/100 ("Excellent")
- Age Factor Benchmark: At Age ${age}, recommended equity is ${100 - age}%. Current is 77.5% (Peak Earning / Accumulation stage).
- Life Insurance Shortfall: Existing ₹50L cover vs ₹1.50 Cr recommended = ₹1.00 Crore protection gap.
- Tax Optimization: 80C utilized, ₹2,600 buffer in 80D, and ₹93,000 LTCG harvesting ready (up to ₹1.25L exemption). Saves ₹46,800.
- Relationship Manager: Vikram Malhotra (VP, Private Wealth Management - Finquest Securities).

Provide empathetic, concise, and highly actionable financial advice formatted with clear bullet points, bold highlights, Indian Rupee figures (₹), tables or cards when comparing trade-offs, and unambiguous priority rankings.`;

  const messages = [
    {
      role: 'system',
      content: [{ type: 'text', text: systemPrompt }]
    },
    ...conversationHistory.slice(-4).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: [{ type: 'text', text: typeof msg.text === 'string' ? msg.text : msg.text.content || JSON.stringify(msg.text) }]
    })),
    {
      role: 'user',
      content: [{ type: 'text', text: userPrompt }]
    }
  ];

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: LLM_MODEL,
        messages,
        max_tokens: 650,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`LLM HTTP ${response.status}`);
    }

    const data = await response.json();
    let text = '';
    const choiceMsg = data?.choices?.[0]?.message?.content;
    if (typeof choiceMsg === 'string') {
      text = choiceMsg.trim();
    } else if (Array.isArray(choiceMsg)) {
      text = choiceMsg.map(c => c.text || '').join('').trim();
    }

    if (text) {
      return {
        success: true,
        text,
        source: 'Sharekhan Qwen-3 AI (Live)'
      };
    }
  } catch (err) {
    console.warn('[Planner AI Advisor] Using specialized deterministic financial engine:', err.message);
  }

  // Tailored Deterministic Advisor Responses
  const fallback = getDeterministicPlannerAdvice(userPrompt, profile, profileMetrics);
  return {
    success: true,
    text: fallback,
    source: 'Financial Health Advisory Engine'
  };
}

function getDeterministicPlannerAdvice(query, profile, metrics) {
  const q = query.toLowerCase();
  const age = metrics?.age || profile?.age || 34;
  const nw = metrics?.netWorth || 2774000;
  const assets = metrics?.totalAssets || 3780000;
  const debt = metrics?.totalLiabilities || 1006000;

  // 1. Third-Party Hand Loan & Debt Repayment
  if (q.includes('third party') || q.includes('third-party') || q.includes('hand loan') || q.includes('ramesh') || q.includes('debt') || q.includes('avalanche') || q.includes('snowball') || q.includes('credit card')) {
    return `### 🎯 Strategic Debt Payoff Plan for Manoj Pal:

Your total outstanding debt is **₹10.06 Lakh** across 4 obligations:

| Debt Instrument | Amount | Interest Rate | Recommended Strategy |
|:----------------|:-------|:--------------|:---------------------|
| **ICICI Credit Card** | **₹1.80 Lakh** | **36% APR (Revolving)** | **Priority #1 (Pay Down Immediately)** |
| **Third-Party Personal Loan** | **₹1.50 Lakh** | **0% p.a. (Hand Loan)** | **Priority #2 (₹15,000/mo structured payoff)** |
| **HDFC Personal Loan** | **₹6.00 Lakh** | **11.5% p.a.** | **Priority #3 (Maintain ₹18K regular EMI)** |
| **Consumer Loan** | **₹76,000** | **0% No-Cost EMI** | **Priority #4 (Auto-debit ₹6,333/mo)** |

#### 💡 Key Action Steps:
1. **Attack the 36% Credit Drag First**: Pay down ₹90,000 to slash utilization from 60% to 29%. This saves ~₹32,400 in finance charges annually.
2. **Third-Party Hand Loan Protocol**: While Ramesh Sharma provided this at 0% interest, set aside **₹15,000/mo** so the loan is resolved before December 2026 without straining family relationships.
3. **Total Interest Saved**: Following the **Debt Avalanche** strategy saves **₹58,400** compared to standard minimum payments.`;
  }

  // 2. Age Factor & Portfolio Glidepath
  if (q.includes('age') || q.includes('glidepath') || q.includes('allocation') || q.includes('77') || q.includes('rebalance') || q.includes('stocks') || q.includes('equity')) {
    return `### ⚖️ Age Factor & Portfolio Rebalancing Analysis (Age ${age}):

Under the traditional **100 - Age rule**, your benchmark allocation is:
- **Recommended Equity**: **${100 - age}%** (₹25.0 Lakh)
- **Recommended Debt & Cash Buffer**: **${age}%** (₹12.8 Lakh)

#### 📊 Current vs Target Model:
- **Your Current Growth Exposure**: **77.5%** (Direct Equities: ₹16.5L + Mutual Funds: ₹12.8L = ₹29.3L)
- **Asset Drift**: **+11.5% Overweight in Equity**

> **Advisor Verdict**: At Age 34, you are in your **Peak Wealth Accumulation Window** with **26 years** until retirement at age 60. Having a 77.5% equity exposure is completely acceptable, provided your liquid cash buffer is fortified.

#### 🛠️ Tax-Efficient Rebalancing:
- **Do not sell stocks** like Reliance or TCS (avoids triggering capital gains tax).
- **Glidepath Action**: Direct your **₹30,000/mo surplus** into your liquid emergency fund (to reach ₹3.0L) and credit paydown over the next 6 months to automatically glide toward 70% equity.`;
  }

  // 3. Insurance Gap & Family Protection
  if (q.includes('insurance') || q.includes('gap') || q.includes('life cover') || q.includes('protection') || q.includes('term') || q.includes('shortfall')) {
    return `### 🚨 Urgent Protection Audit: ₹1.00 Crore Life Insurance Gap

| Metric | Amount | Status |
|:-------|:-------|:-------|
| **Existing Term Cover** | **₹50.00 Lakh** (HDFC Life) | ⚠️ Vulnerable |
| **Recommended Cover (10x Salary)** | **₹1.50 Crore** | Comprehensive Benchmark |
| **Coverage Shortfall** | **₹1.00 Crore** | **Urgent Top-Up Required** |
| **Family Health Floater** | **₹15.00 Lakh** (Care Supreme) | ✅ Adequate (150% Super NCB) |

#### 🔍 Why This Matters for Manoj Pal:
- Total liabilities stand at **₹10.06 Lakh** (including the ₹1.50L Third-Party loan).
- If something unexpected happens, the ₹50L cover leaves only ~₹40L for Neha and Aarav's university education (projected at **₹44.26L** with 6% inflation).
- **Action**: Add a **₹1.00 Crore Term Insurance Top-up** for ~₹950/month (eligible for additional tax deductions under Section 80C).`;
  }

  // 4. Tax Optimization & LTCG Harvesting
  if (q.includes('tax') || q.includes('80c') || q.includes('80d') || q.includes('ltcg') || q.includes('harvest') || q.includes('save tax')) {
    return `### 💰 Tax Optimization & Capital Gains Strategy:

You can save an estimated **₹46,800** using these 3 strategies:

1. **Section 80C (₹1,50,000 Limit)**:
   - **Status**: **100% Utilized** (EPF: ₹96K + Parag Parikh ELSS: ₹35.5K + Term Premium: ₹18.5K = ₹1.50L).
2. **Section 80D Health Insurance (₹25,000 Limit)**:
   - **Current Claim**: ₹22,400 (Care Supreme Floater).
   - **Opportunity**: Claim **₹2,600** for annual preventive health checkups for yourself and Neha before March 31.
3. **LTCG Tax Harvesting (₹1.25 Lakh Exemption)**:
   - You have **₹93,000** in unrealized long-term capital gains in Reliance & TCS.
   - **Execute 1-Click Harvest**: Sell and instantly rebuy before March 31. This resets your purchase cost basis with **₹0 tax**, saving **₹11,625** in future LTCG taxes!`;
  }

  // 5. Relationship Manager Connect (HNI / UHNI Desk)
  if (q.includes('rm') || q.includes('vikram') || q.includes('malhotra') || q.includes('relationship manager') || q.includes('advisor') || q.includes('hni') || q.includes('uhni')) {
    return `### 🤝 Dedicated Private Wealth Relationship Manager:

**Vikram Malhotra** (VP, Private Wealth Management - Finquest Securities) has been assigned to your profile.

- **Credentials**: MBA Finance (IIM Bangalore), CFA Charterholder, SEBI RIA (INA000014820)
- **Experience**: 14+ Years advising HNI & Family Office clients
- **Direct Phone**: +91 98200 45892
- **Direct WhatsApp Desk**: Available for instant chat
- **Office Location**: Maker Chambers V, Nariman Point, Mumbai

#### Bespoke Solutions Available:
- High-Alpha Portfolio Management Services (PMS)
- Alternative Investment Funds (AIF Pre-IPO)
- Family Trust & Succession Structuring

Click **"Connect with RM Vikram Malhotra"** on your dashboard toolbar to schedule a 1:1 video consultation or WhatsApp chat.`;
  }

  // 6. Net Worth & Balance Sheet Overview
  return `### 📊 360° Financial Snapshot for Manoj Pal (Age ${age}):

- **Net Worth**: **₹${(nw / 100000).toFixed(2)} Lakh** (Assets: ₹${(assets / 100000).toFixed(2)}L • Liabilities: ₹${(debt / 100000).toFixed(2)}L)
- **Financial Health Score**: **${metrics?.score || 78}/100 ("Good")** ➔ Projected: **${metrics?.projectedScore || 87}**
- **Assets**: Equity (₹16.5L), Mutual Funds (₹12.8L), Gold (₹3.2L), Fixed Deposits (₹4.1L), Liquid Cash (₹1.2L)
- **Liabilities**: HDFC Loan (₹6.0L), Credit Card (₹1.8L), Third-Party Loan (₹1.5L), Consumer Loan (₹76K)

#### 🚀 Recommended Action Sequence:
1. **Fortify Liquidity**: Scale cash buffer from ₹1.2L to ₹3.0L (+₹30K/mo).
2. **Avalanche Debt Payoff**: Eliminate 36% APR credit card balance and structure ₹15K/mo toward the Third-Party hand loan.
3. **Close Protection Gap**: Add ₹1.00 Cr term cover top-up for complete family peace of mind.`;
}
