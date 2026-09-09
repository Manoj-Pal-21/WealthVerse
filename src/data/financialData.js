export const userProfile = {
  name: "Manoj Pal",
  email: "manoj.pal@finquest.in",
  avatar: "MP",
  role: "Private Wealth Client",
  nifty: {
    value: "24,850.30",
    change: "+142.10",
    percent: "+0.58%",
    isPositive: true
  }
};

export const overviewKPIs = {
  netWorth: {
    value: 4286420,
    change: "+12.4%",
    period: "vs last month",
    isPositive: true
  },
  investments: {
    value: 3542200,
    change: "+8.7%",
    period: "vs last month",
    isPositive: true
  },
  liabilities: {
    value: 856000,
    change: "+2.1%",
    period: "vs last month",
    isPositive: false // liability increase
  },
  monthlyInvestment: {
    value: 32000,
    status: "On track",
    target: 35000,
    isPositive: true
  }
};

export const assetAllocation = [
  { name: "Equity", percentage: 48, value: 1700256, color: "#0D9488" }, // Brand Teal
  { name: "Mutual Funds", percentage: 22, value: 779284, color: "#3B82F6" }, // Blue
  { name: "FD / Debt", percentage: 12, value: 425064, color: "#8B5CF6" }, // Purple
  { name: "Gold", percentage: 6, value: 212532, color: "#F59E0B" }, // Amber
  { name: "Cash", percentage: 8, value: 283376, color: "#10B981" }, // Emerald
  { name: "Others", percentage: 4, value: 141688, color: "#64748B" } // Slate
];

export const portfolioHistory = {
  "1M": [
    { date: "01 Aug", value: 3380000 },
    { date: "08 Aug", value: 3420000 },
    { date: "15 Aug", value: 3410000 },
    { date: "22 Aug", value: 3495000 },
    { date: "29 Aug", value: 3510000 },
    { date: "08 Sep", value: 3542200 }
  ],
  "3M": [
    { date: "Jun 26", value: 3210000 },
    { date: "Jul 26", value: 3350000 },
    { date: "Aug 26", value: 3480000 },
    { date: "Sep 26", value: 3542200 }
  ],
  "6M": [
    { date: "Apr 26", value: 2950000 },
    { date: "May 26", value: 3080000 },
    { date: "Jun 26", value: 3210000 },
    { date: "Jul 26", value: 3350000 },
    { date: "Aug 26", value: 3480000 },
    { date: "Sep 26", value: 3542200 }
  ],
  "1Y": [
    { date: "Oct 25", value: 2680000 },
    { date: "Jan 26", value: 2890000 },
    { date: "Apr 26", value: 2950000 },
    { date: "Jul 26", value: 3350000 },
    { date: "Sep 26", value: 3542200 }
  ],
  "3Y": [
    { date: "2023", value: 1850000 },
    { date: "2024", value: 2420000 },
    { date: "2025", value: 2950000 },
    { date: "2026", value: 3542200 }
  ]
};

export const aiFinancialBrief = [
  {
    id: "brief-1",
    title: "Sector Concentration",
    description: "32% of equity portfolio is concentrated in IT. A tech pullback could create outsized drawdowns.",
    priority: "High Priority",
    priorityLevel: "high",
    actionText: "View Exposure",
    actionTarget: "equity"
  },
  {
    id: "brief-2",
    title: "Retirement Gap",
    description: "Current projection is ₹1.42 Cr against target ₹2.0 Cr. Shortfall of ₹58 Lakh at age 60.",
    priority: "Medium Priority",
    priorityLevel: "medium",
    actionText: "Fix Retirement",
    actionTarget: "gaps"
  },
  {
    id: "brief-3",
    title: "Emergency Fund",
    description: "6.8 months of mandatory living expenses saved in liquid funds. Well hedged against shocks.",
    priority: "On Track",
    priorityLevel: "good",
    actionText: "Check Reserves",
    actionTarget: "protection"
  }
];

export const recentTransactions = [
  {
    id: "tx-1",
    asset: "HDFC Flexi Cap Fund",
    type: "SIP Installment",
    category: "Mutual Fund",
    date: "05 Sep 2026",
    amount: -5000,
    status: "Completed"
  },
  {
    id: "tx-2",
    asset: "TCS Dividend Payout",
    type: "Dividend Credit",
    category: "Equity",
    date: "01 Sep 2026",
    amount: 1420,
    status: "Completed"
  },
  {
    id: "tx-3",
    asset: "Reliance Industries",
    type: "Stock Purchase (5 Qty)",
    category: "Equity",
    date: "28 Aug 2026",
    amount: -14850,
    status: "Completed"
  },
  {
    id: "tx-4",
    asset: "Axis Bluechip Fund",
    type: "SIP Installment",
    category: "Mutual Fund",
    date: "25 Aug 2026",
    amount: -5000,
    status: "Completed"
  },
  {
    id: "tx-5",
    asset: "HDFC Home Loan EMI",
    type: "Loan EMI",
    category: "Liability",
    date: "20 Aug 2026",
    amount: -18000,
    status: "Completed"
  }
];
