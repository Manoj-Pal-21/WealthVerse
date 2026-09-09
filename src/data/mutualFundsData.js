export const mutualFundsKPIs = {
  currentValue: 1520000,
  investedValue: 1150000,
  totalReturn: 370000,
  totalReturnPercent: 32.17,
  xirr: 13.9,
  monthlySip: 25000
};

export const activeSips = [
  {
    id: "mf-1",
    name: "Axis Bluechip Fund",
    category: "Large Cap",
    sipAmount: 5000,
    frequency: "Monthly",
    status: "Active",
    nextDate: "25 Sep 2026",
    invested: 240000,
    current: 312000,
    xirr: 14.2
  },
  {
    id: "mf-2",
    name: "HDFC Flexi Cap Fund",
    category: "Flexi Cap",
    sipAmount: 5000,
    frequency: "Monthly",
    status: "Active",
    nextDate: "05 Oct 2026",
    invested: 280000,
    current: 395000,
    xirr: 16.8
  },
  {
    id: "mf-3",
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    sipAmount: 5000,
    frequency: "Monthly",
    status: "Active",
    nextDate: "12 Oct 2026",
    invested: 180000,
    current: 264000,
    xirr: 18.5
  },
  {
    id: "mf-4",
    name: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap",
    sipAmount: 5000,
    frequency: "Monthly",
    status: "Active",
    nextDate: "15 Oct 2026",
    invested: 260000,
    current: 338000,
    xirr: 15.1
  },
  {
    id: "mf-5",
    name: "Mirae Asset Large Cap Fund",
    category: "Large Cap",
    sipAmount: 5000,
    frequency: "Monthly",
    status: "Active",
    nextDate: "20 Oct 2026",
    invested: 190000,
    current: 211000,
    xirr: 12.4
  }
];

export const fundAllocation = [
  { name: "Large Cap", percentage: 35, color: "#0D9488" },
  { name: "Flexi Cap", percentage: 30, color: "#3B82F6" },
  { name: "Mid Cap", percentage: 20, color: "#8B5CF6" },
  { name: "Small Cap", percentage: 10, color: "#F59E0B" },
  { name: "Debt", percentage: 5, color: "#10B981" }
];

export const mfGrowthHistory = [
  { month: "Jan 26", value: 1210000 },
  { month: "Feb 26", value: 1260000 },
  { month: "Mar 26", value: 1315000 },
  { month: "Apr 26", value: 1360000 },
  { month: "May 26", value: 1405000 },
  { month: "Jun 26", value: 1450000 },
  { month: "Jul 26", value: 1490000 },
  { month: "Aug 26", value: 1520000 }
];

export const fundOverlapData = {
  fundA: "Axis Bluechip Fund",
  fundB: "Mirae Asset Large Cap Fund",
  overlapPercentage: 18,
  commonHoldings: [
    { stock: "ICICI Bank Ltd", weightA: "9.2%", weightB: "8.8%" },
    { stock: "Reliance Industries", weightA: "8.5%", weightB: "7.9%" },
    { stock: "Infosys Ltd", weightA: "7.4%", weightB: "7.1%" },
    { stock: "HDFC Bank Ltd", weightA: "8.1%", weightB: "6.5%" }
  ],
  aiRecommendation: "Your Axis Bluechip Fund and Mirae Asset Large Cap Fund share an 18% portfolio overlap. Consider consolidating into a single large-cap strategy or reallocating to an index fund to reduce duplicate AMC expense ratios."
};
