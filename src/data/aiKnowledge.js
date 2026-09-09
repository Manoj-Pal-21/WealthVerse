export const suggestedQuestions = [
  "Can I afford a ₹10L car?",
  "What should I fix first?",
  "What are my financial gaps?",
  "Am I on track for retirement?",
  "Why is my portfolio down?",
  "Show my portfolio risk",
  "How will my family manage my assets?"
];

export const cannedAiResponses = {
  "car": {
    question: "Can I afford a ₹10L car?",
    intro: "Based on your current financial picture, you can potentially afford it, but purchasing it immediately may reduce your emergency liquid reserve and slow down your future goals.",
    metrics: [
      { label: "Current Savings", value: "₹5.2L" },
      { label: "Monthly Income", value: "₹1.10L" },
      { label: "Monthly Expenses", value: "₹62,000" },
      { label: "Existing EMI", value: "₹18,000" }
    ],
    impact: {
      level: "Moderate",
      type: "warning",
      text: "A new ₹8L car loan (assuming ₹2L down payment) will introduce an additional EMI of ~₹17,200/mo, raising your total Debt-to-Income ratio from 16.3% to 32%."
    },
    recommendations: [
      "Wait 6 months to accumulate a larger down payment (₹4L) without touching emergency reserves.",
      "OR limit vehicle budget to ₹7.5L to keep your combined EMI comfortably below 25% of monthly income."
    ],
    nextAction: {
      label: "Simulate Goal in Goals Center",
      targetPage: "goals"
    }
  },

  "fix_first": {
    question: "What should I fix first?",
    intro: "Based on our cross-asset financial vulnerability scan, here is your prioritized action plan to maximize protection and eliminate critical exposure.",
    metrics: [
      { label: "Financial Health", value: "72 / 100" },
      { label: "Total Gap", value: "₹38.50 Lakhs" },
      { label: "Critical Vulnerability", value: "Insurance" },
      { label: "Secondary Gap", value: "Retirement" }
    ],
    impact: {
      level: "High Urgency",
      type: "danger",
      text: "Your ₹75L Life Insurance Gap is an unhedged catastrophe risk. If addressed first, your overall Financial Health score jumps from 72 to 90."
    },
    recommendations: [
      "1. Acquire a ₹75L pure term life policy (approx. ₹1,200/month premium).",
      "2. Increase monthly retirement SIP by ₹12,000 to reach the ₹2 Cr milestone.",
      "3. Register primary demat nominees and complete digital estate inventory."
    ],
    nextAction: {
      label: "Review Insurance Gap Breakdown",
      targetPage: "gaps"
    }
  },

  "gaps": {
    question: "What are my financial gaps?",
    intro: "We analyzed your investments, liabilities, living expenses, and goals. We detected two major gaps and one minor gap across your balance sheet.",
    metrics: [
      { label: "Insurance Shortfall", value: "₹75.0 Lakhs" },
      { label: "Retirement Shortfall", value: "₹58.0 Lakhs" },
      { label: "Emergency Reserve", value: "₹90K Short" },
      { label: "Estate Planning", value: "Unregistered Will" }
    ],
    impact: {
      level: "High Priority",
      type: "danger",
      text: "Your current asset base of ₹35.4L is growing well, but downside protection (insurance & emergency reserves) lags behind your family obligations."
    },
    recommendations: [
      "Bridge the ₹75L term insurance gap before increasing equity allocations.",
      "Step up retirement SIP by 10% annually to eliminate the ₹58L shortfall without straining present cash flow."
    ],
    nextAction: {
      label: "Open Financial Gap Radar",
      targetPage: "gaps"
    }
  },

  "retirement": {
    question: "Am I on track for retirement?",
    intro: "Based on your current age, ₹32,000 monthly SIP, and 12% expected long-term CAGR, your projected retirement corpus at age 60 is ₹1.42 Cr against your ₹2.00 Cr target.",
    metrics: [
      { label: "Retirement Target", value: "₹2.00 Cr" },
      { label: "Projected Corpus", value: "₹1.42 Cr" },
      { label: "Current Progress", value: "71%" },
      { label: "Corpus Shortfall", value: "₹58.0 Lakhs" }
    ],
    impact: {
      level: "Moderate",
      type: "warning",
      text: "A ₹58L shortfall may require reducing post-retirement monthly lifestyle expenses or extending work tenure by 3 to 4 years if left unadjusted."
    },
    recommendations: [
      "Increase monthly investment from ₹32,000 to approximately ₹44,000 across your existing flexi-cap funds.",
      "Alternatively, enable an automatic 10% annual SIP step-up to achieve ₹2.04 Cr comfortably."
    ],
    nextAction: {
      label: "View Retirement Interactive Slider",
      targetPage: "goals"
    }
  },

  "portfolio_down": {
    question: "Why is my portfolio down?",
    intro: "Based on today's market movements, your portfolio is slightly pressured primarily by broader profit-taking in the IT sector (NIFTY IT -1.4%), where you hold a 32% concentration.",
    metrics: [
      { label: "Today's Equity P&L", value: "+₹12,450" },
      { label: "IT Sector Weight", value: "32% (High)" },
      { label: "Infosys Movement", value: "-0.3%" },
      { label: "Broad Market (NIFTY)", value: "+0.58%" }
    ],
    impact: {
      level: "Low Risk",
      type: "info",
      text: "Your overall portfolio remains up +18.7% (₹5.42L total gains) with a solid 14.8% XIRR. Short-term sector swings are normal and do not compromise your fundamental targets."
    },
    recommendations: [
      "Avoid panic-selling fundamentally strong large-caps like Infosys or TCS.",
      "Consider channeling future monthly SIPs into diversified flexi-caps or banking to naturally balance IT concentration."
    ],
    nextAction: {
      label: "Inspect Sector Exposure",
      targetPage: "equity"
    }
  },

  "portfolio_risk": {
    question: "Show my portfolio risk",
    intro: "Your aggregate portfolio exhibits a Moderate Risk profile. The primary risk vectors are tech sector concentration and mutual fund portfolio overlap.",
    metrics: [
      { label: "Overall Volatility", value: "Moderate" },
      { label: "IT Concentration", value: "32% (Overweight)" },
      { label: "Fund Overlap", value: "18% (Axis vs Mirae)" },
      { label: "Equity Allocation", value: "48% of Net Worth" }
    ],
    impact: {
      level: "Moderate",
      type: "warning",
      text: "Holding 18% duplicate stocks across large-cap mutual funds causes redundant fees without offering additional diversification benefits."
    },
    recommendations: [
      "Cap single sector exposure at 25% of total equity.",
      "Consolidate overlapping large-cap funds into a low-cost NIFTY 50 index fund."
    ],
    nextAction: {
      label: "View Fund Overlap Matrix",
      targetPage: "mutual-funds"
    }
  },

  "family_legacy": {
    question: "How will my family manage my assets?",
    intro: "360° Wealth organizes your complete financial inventory (₹35.4L assets, ₹8.5L liabilities, ₹50L insurance, across 5 institutions) into a single structured transmission dossier for your family.",
    metrics: [
      { label: "Legacy Score", value: "64 / 100" },
      { label: "Nominees Verified", value: "Completed ✓" },
      { label: "Will Registration", value: "Pending ⚠️" },
      { label: "Digital Inventory", value: "Logged" }
    ],
    impact: {
      level: "Important",
      type: "warning",
      text: "While your nominees are registered on bank and demat accounts, absence of a documented Will means distribution disputes could delay fund access."
    },
    recommendations: [
      "Download the Family Asset Summary Dossier and share emergency contact credentials with your trusted family member.",
      "Note: Legal claim verification and transmission are handled through the respective financial institutions and applicable succession laws."
    ],
    nextAction: {
      label: "Open Financial Legacy Dashboard",
      targetPage: "legacy"
    }
  }
};
