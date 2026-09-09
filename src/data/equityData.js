export const equityKPIs = {
  currentValue: 1842600,
  investedValue: 1420000,
  todayPnL: 12450,
  todayPnLPercent: 0.68,
  overallReturn: 422600,
  overallReturnPercent: 29.75
};

export const equityHoldings = [
  {
    id: "eq-1",
    name: "Reliance Industries",
    symbol: "RELIANCE",
    sector: "Energy",
    qty: 180,
    avgPrice: 2450.00,
    ltp: 2980.50,
    invested: 441000,
    current: 536490,
    pnl: 95490,
    pnlPercent: 21.65,
    todayChange: "+1.2%"
  },
  {
    id: "eq-2",
    name: "Tata Consultancy Services",
    symbol: "TCS",
    sector: "IT",
    qty: 110,
    avgPrice: 3520.00,
    ltp: 4250.00,
    invested: 387200,
    current: 467500,
    pnl: 80300,
    pnlPercent: 20.74,
    todayChange: "+0.8%"
  },
  {
    id: "eq-3",
    name: "HDFC Bank Ltd",
    symbol: "HDFCBANK",
    sector: "Banking",
    qty: 240,
    avgPrice: 1480.00,
    ltp: 1680.00,
    invested: 355200,
    current: 403200,
    pnl: 48000,
    pnlPercent: 13.51,
    todayChange: "+1.4%"
  },
  {
    id: "eq-4",
    name: "Infosys Ltd",
    symbol: "INFY",
    sector: "IT",
    qty: 130,
    avgPrice: 1410.00,
    ltp: 1910.00,
    invested: 183300,
    current: 248300,
    pnl: 65000,
    pnlPercent: 35.46,
    todayChange: "-0.3%"
  },
  {
    id: "eq-5",
    name: "ICICI Bank Ltd",
    symbol: "ICICIBANK",
    sector: "Banking",
    qty: 150,
    avgPrice: 890.00,
    ltp: 1247.40,
    invested: 133500,
    current: 187110,
    pnl: 53610,
    pnlPercent: 40.16,
    todayChange: "+0.5%"
  }
];

export const sectorExposure = [
  { name: "IT", percentage: 32, value: 589632, color: "#0D9488" },
  { name: "Banking", percentage: 25, value: 460650, color: "#3B82F6" },
  { name: "Energy", percentage: 18, value: 331668, color: "#F59E0B" },
  { name: "Finance", percentage: 15, value: 276390, color: "#8B5CF6" },
  { name: "Others", percentage: 10, value: 184260, color: "#64748B" }
];

export const equityPerformanceHistory = {
  "1D": [
    { time: "09:15", value: 1830150 },
    { time: "11:00", value: 1834200 },
    { time: "12:30", value: 1838500 },
    { time: "14:00", value: 1840100 },
    { time: "15:30", value: 1842600 }
  ],
  "1W": [
    { time: "Mon", value: 1812000 },
    { time: "Tue", value: 1821000 },
    { time: "Wed", value: 1828000 },
    { time: "Thu", value: 1835000 },
    { time: "Fri", value: 1842600 }
  ],
  "1M": [
    { time: "W1", value: 1780000 },
    { time: "W2", value: 1795000 },
    { time: "W3", value: 1815000 },
    { time: "W4", value: 1842600 }
  ],
  "6M": [
    { time: "Apr", value: 1540000 },
    { time: "May", value: 1610000 },
    { time: "Jun", value: 1690000 },
    { time: "Jul", value: 1740000 },
    { time: "Aug", value: 1810000 },
    { time: "Sep", value: 1842600 }
  ],
  "1Y": [
    { time: "Q3 25", value: 1420000 },
    { time: "Q4 25", value: 1510000 },
    { time: "Q1 26", value: 1640000 },
    { time: "Q2 26", value: 1750000 },
    { time: "Q3 26", value: 1842600 }
  ],
  "5Y": [
    { time: "2022", value: 890000 },
    { time: "2023", value: 1120000 },
    { time: "2024", value: 1380000 },
    { time: "2025", value: 1590000 },
    { time: "2026", value: 1842600 }
  ]
};

export const aiEquityAnalysis = {
  concentrationRisk: "Medium",
  diversification: "Good",
  volatility: "Moderate",
  insight: "Your IT exposure (32%) is higher than your preferred allocation. Consider reviewing concentration before adding new IT positions to limit vulnerability to tech industry downcycles."
};
