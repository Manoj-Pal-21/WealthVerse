export const protectionKPIs = [
  {
    id: "emergency-fund",
    title: "Emergency Fund",
    score: 82,
    maxScore: 100,
    currentValue: 420000,
    targetValue: 510000,
    unit: "amount",
    status: "Good",
    statusType: "good",
    note: "6.8 months of mandatory expenses saved"
  },
  {
    id: "life-insurance",
    title: "Life Insurance",
    score: 45,
    maxScore: 100,
    currentValue: 5000000,
    targetValue: 12500000,
    unit: "amount",
    status: "Vulnerable",
    statusType: "danger",
    note: "Shortfall of ₹75L against liabilities and dependents"
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    score: 100,
    maxScore: 100,
    currentValue: 1000000,
    targetValue: 1000000,
    unit: "coverage",
    status: "Optimal",
    statusType: "good",
    note: "₹10L family floater policy active + employer cover"
  },
  {
    id: "debt-health",
    title: "Debt Health",
    score: 70,
    maxScore: 100,
    currentValue: 18000,
    targetValue: 26000,
    unit: "emi",
    status: "Manageable",
    statusType: "warning",
    note: "Current EMI is 16.3% of net monthly income"
  }
];

export const emergencyReadiness = {
  monthlyExpenses: 62000,
  currentReserve: 420000,
  recommendedReserve: 510000,
  monthsCovered: 6.8,
  targetMonths: 8.0,
  status: "Almost there",
  liquidBreakdown: [
    { source: "HDFC Savings Account", amount: 140000 },
    { source: "ICICI Prudential Liquid Fund", amount: 210000 },
    { source: "Short Term FD (Auto-Sweep)", amount: 70000 }
  ]
};

export const aiProtectionRecommendation = {
  headline: "Your biggest financial vulnerability",
  type: "Life Insurance Gap",
  currentCover: 5000000,
  estimatedRequired: 12500000,
  gapAmount: 7500000,
  advice: "Your existing ₹50L term policy was acquired 6 years ago. Since then, you have taken a home loan and family living expenses have scaled. In the event of an unforeseen loss, family goals would be exposed to immediate strain.",
  suggestedAction: "Evaluate an additional ₹75L pure term life policy with a 30-year tenure and waiver of premium."
};
