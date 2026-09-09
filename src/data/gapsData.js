export const financialReadiness = {
  overallScore: 72,
  maxScore: 100,
  status: "Good",
  totalEstimatedGap: 3850000,
  description: "We analyzed your investments, income, expenses, liabilities, goals and protection to detect unhedged financial vulnerabilities."
};

export const gapCategories = [
  {
    id: "emergency",
    name: "Emergency Fund",
    score: 82,
    status: "Good",
    statusType: "good",
    current: "₹4.2L",
    target: "₹5.1L",
    gapAmount: "₹90K",
    summary: "6.8 months covered against recommended 8 months reserve.",
    priorityRank: 4
  },
  {
    id: "retirement",
    name: "Retirement",
    score: 68,
    status: "Needs Attention",
    statusType: "warning",
    current: "₹1.42 Cr",
    target: "₹2.00 Cr",
    gapAmount: "₹58 Lakhs",
    summary: "Current trajectory leaves a ₹58L shortfall at target age 60.",
    priorityRank: 2
  },
  {
    id: "insurance",
    name: "Insurance",
    score: 45,
    status: "High Priority",
    statusType: "danger",
    current: "₹50 Lakhs",
    target: "₹1.25 Cr",
    gapAmount: "₹75 Lakhs",
    summary: "Life cover inadequate to clear ₹8.5L liabilities and protect family.",
    priorityRank: 1
  },
  {
    id: "debt",
    name: "Debt Health",
    score: 70,
    status: "Moderate",
    statusType: "warning",
    current: "₹18K/mo EMI",
    target: "< 25% Income",
    gapAmount: "Balanced",
    summary: "EMI to income ratio is 16.3%, well within healthy limits.",
    priorityRank: 5
  },
  {
    id: "tax",
    name: "Tax Planning",
    score: 78,
    status: "Good",
    statusType: "good",
    current: "₹1.5L utilized",
    target: "Optimal",
    gapAmount: "₹46K saved",
    summary: "Section 80C and 80D deductions optimized. NPS 80CCD(1B) pending.",
    priorityRank: 6
  },
  {
    id: "estate",
    name: "Estate Planning",
    score: 40,
    status: "High Priority",
    statusType: "danger",
    current: "Nominees updated",
    target: "Will & Trust",
    gapAmount: "Unregistered",
    summary: "No formal Will created; digital asset instructions missing.",
    priorityRank: 3
  }
];

export const priorityGaps = [
  {
    id: "gap-insurance",
    category: "Insurance Gap",
    priority: "Highest Priority",
    currentCover: 5000000,
    estimatedRequired: 12500000,
    shortfall: 7500000,
    why: "Your current protection may not fully cover your liabilities (₹8.56L), future children education, and household expenses in your absence.",
    recommendation: "Acquire a ₹75L - ₹1Cr pure term insurance policy with critical illness rider. Estimated premium is ~₹1,200/month."
  },
  {
    id: "gap-retirement",
    category: "Retirement Gap",
    priority: "High Priority",
    currentCover: 14200000,
    estimatedRequired: 20000000,
    shortfall: 5800000,
    why: "Inflation-adjusted retirement corpus target is ₹2 Cr. Under the current ₹32,000 monthly SIP rate, the projected maturity corpus reaches ₹1.42 Cr.",
    recommendation: "Increase monthly investment from ₹32,000 to approximately ₹44,000 (or add a 10% annual step-up SIP) to bridge the ₹58L shortfall."
  }
];

export const aiPriorityPlan = [
  {
    step: 1,
    title: "Review insurance coverage",
    description: "Close the ₹75L term life cover shortfall immediately to hedge core downside risk.",
    impact: "Boosts Health Score by +18 pts",
    status: "Action Required",
    targetPage: "protection"
  },
  {
    step: 2,
    title: "Increase retirement contribution",
    description: "Step-up monthly SIP from ₹32K to ₹44K across existing index and flexi-cap funds.",
    impact: "Closes ₹58L maturity shortfall",
    status: "Recommended",
    targetPage: "goals"
  },
  {
    step: 3,
    title: "Complete estate planning",
    description: "Draft digital asset instructions and formalize secondary nominees for demat accounts.",
    impact: "Ensures seamless family succession",
    status: "Action Required",
    targetPage: "legacy"
  },
  {
    step: 4,
    title: "Maintain emergency reserve",
    description: "Channel remaining ₹90K surplus into liquid funds to achieve the full 8-month benchmark.",
    impact: "Provides 100% emergency readiness",
    status: "In Progress",
    targetPage: "protection"
  }
];
