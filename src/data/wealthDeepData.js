// Comprehensive Institutional Wealth Data for Manoj Pal (Age 34)
// High-Net-Worth & Affluent Segment Prototype

export const DEEP_WEALTH_DATA = {
  client: {
    name: "Manoj Pal",
    age: 34,
    lifecycleStage: "Wealth Accumulation (Peak Earning)",
    retirementHorizonYears: 26,
    targetRetirementAge: 60,
    riskProfile: "Aggressive Growth",
    recommendedEquityAllocation: 66, // 100 - Age rule
    currentEquityAllocation: 77.5,
    panMasked: "ABCDE****F",
    dpIdMasked: "IN300*** / 1208****",
    city: "Mumbai, Maharashtra"
  },

  // Direct Equity / Stock Holdings (₹16,50,000 Total Value)
  equityPortfolio: {
    totalValue: 1650000,
    investedValue: 1410000,
    totalGainLoss: 240000,
    totalGainPercent: 17.02,
    holdings: [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        sector: "Energy & Conglomerate",
        shares: 180,
        avgPrice: 2450.00,
        currentPrice: 2980.50,
        currentValue: 536490,
        pnl: 95490,
        pnlPercent: 21.65,
        allocation: 32.5,
        allocationCategory: "Large Cap",
        dayChange: "+1.24%"
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        sector: "Information Technology",
        shares: 110,
        avgPrice: 3380.00,
        currentPrice: 3820.00,
        currentValue: 420200,
        pnl: 48400,
        pnlPercent: 13.02,
        allocation: 25.5,
        allocationCategory: "Large Cap",
        dayChange: "-0.45%"
      },
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        sector: "Banking & Financial Services",
        shares: 240,
        avgPrice: 1460.00,
        currentPrice: 1645.00,
        currentValue: 394800,
        pnl: 44400,
        pnlPercent: 12.67,
        allocation: 23.9,
        allocationCategory: "Large Cap",
        dayChange: "+0.80%"
      },
      {
        symbol: "INFY",
        name: "Infosys Ltd",
        sector: "Information Technology",
        shares: 130,
        avgPrice: 1420.00,
        currentPrice: 1590.00,
        currentValue: 206700,
        pnl: 22100,
        pnlPercent: 11.97,
        allocation: 12.5,
        allocationCategory: "Large Cap",
        dayChange: "+1.05%"
      },
      {
        symbol: "ICICIBANK",
        name: "ICICI Bank Ltd",
        sector: "Banking & Financial Services",
        shares: 80,
        avgPrice: 1040.00,
        currentPrice: 1147.60,
        currentValue: 91810,
        pnl: 8610,
        pnlPercent: 10.35,
        allocation: 5.6,
        allocationCategory: "Large Cap",
        dayChange: "+0.35%"
      }
    ]
  },

  // Mutual Funds Portfolio (₹12,80,000 Total Value)
  mutualFundsPortfolio: {
    totalValue: 1280000,
    investedValue: 1060000,
    totalGainLoss: 220000,
    totalGainPercent: 20.75,
    monthlySipTotal: 20000,
    schemes: [
      {
        schemeName: "Parag Parikh Flexi Cap Fund - Direct (G)",
        category: "Flexi Cap",
        folioNumber: "1098****23",
        nav: 84.62,
        units: 5436.06,
        currentValue: 460000,
        monthlySip: 7500,
        xirr: 18.4,
        allocation: 35.9,
        taxType: "Equity Oriented (80C / Growth)"
      },
      {
        schemeName: "HDFC Flexi Cap Fund - Direct (G)",
        category: "Flexi Cap",
        folioNumber: "3412****89",
        nav: 1742.30,
        units: 218.10,
        currentValue: 380000,
        monthlySip: 5000,
        xirr: 16.8,
        allocation: 29.7,
        taxType: "Equity Oriented (Growth)"
      },
      {
        schemeName: "Mirae Asset Large & Midcap Fund - Direct (G)",
        category: "Large & Mid Cap",
        folioNumber: "5674****11",
        nav: 132.80,
        units: 1957.83,
        currentValue: 260000,
        monthlySip: 4500,
        xirr: 15.2,
        allocation: 20.3,
        taxType: "Equity Oriented (Growth)"
      },
      {
        schemeName: "SBI Small Cap Fund - Direct (G)",
        category: "Small Cap",
        folioNumber: "8923****74",
        nav: 168.45,
        units: 1068.56,
        currentValue: 180000,
        monthlySip: 3000,
        xirr: 19.6,
        allocation: 14.1,
        taxType: "Equity Oriented (High Alpha)"
      }
    ]
  },

  // Debt & Liabilities Schedule (₹10,06,000 Total)
  liabilities: [
    {
      id: "hdfc-pl",
      name: "HDFC Bank Personal Loan",
      lender: "HDFC Bank Ltd",
      type: "Bank Term Loan",
      outstandingAmount: 600000,
      monthlyEmi: 18000,
      interestRate: "11.5% p.a.",
      tenureRemaining: "38 Months",
      priority: "Medium",
      status: "Active (Regular)",
      taxBenefit: "None"
    },
    {
      id: "icici-cc",
      name: "ICICI Sapphiro Credit Card",
      lender: "ICICI Bank Ltd",
      type: "Revolving Debt",
      outstandingAmount: 180000,
      creditLimit: 300000,
      utilizationRate: 60,
      interestRate: "36.0% p.a. (3.0% per mo)",
      minimumDue: 9000,
      priority: "CRITICAL #1",
      status: "High Finance Drag",
      taxBenefit: "None"
    },
    {
      id: "third-party-loan",
      name: "Third-Party Personal Loan (Private Borrowing)",
      lender: "Ramesh Sharma (Family Friend Hand Loan)",
      type: "Private Hand Loan / Promissory Note",
      outstandingAmount: 150000,
      monthlyEmi: 0, // Flexible mutually agreed repayment
      interestRate: "0.0% p.a. (Mutual Agreement)",
      agreedSettlementDate: "December 2026",
      priority: "Relationship Priority #2",
      status: "Informal Private Debt",
      taxBenefit: "Non-institutional borrowing"
    },
    {
      id: "consumer-loan",
      name: "Consumer Electronics Loan",
      lender: "Bajaj Finserv Ltd",
      type: "No-Cost EMI Loan",
      outstandingAmount: 76000,
      monthlyEmi: 6333,
      interestRate: "0.0% p.a. (Subvented)",
      tenureRemaining: "12 Months",
      priority: "Low",
      status: "Auto-debit active",
      taxBenefit: "None"
    }
  ],

  // Insurance Policies & Coverage Shortfall
  insurance: {
    life: {
      existingCover: 5000000, // ₹50 Lakhs
      requiredCover: 15000000, // ₹1.50 Crore (10x annual income)
      gap: 10000000, // ₹1.00 Crore Shortfall
      policyName: "HDFC Life Click 2 Protect Super",
      policyNumber: "POL-7821****90",
      annualPremium: 18500,
      coverageType: "Term Insurance",
      nominee: "Neha Pal (Spouse - 100%)",
      status: "CRITICAL GAP: ₹1.0 Crore protection gap detected"
    },
    health: {
      existingCover: 1500000, // ₹15 Lakhs
      policyName: "Care Supreme Family Floater",
      policyNumber: "CA-9932****41",
      annualPremium: 22400,
      membersCovered: ["Manoj Pal (Self)", "Neha Pal (Spouse)", "Aarav Pal (Son)"],
      noClaimBonus: "150% Super NCB Active",
      restorationBenefit: "100% Unlimited Recharge",
      status: "ADEQUATE (₹15 Lakhs cover covers major hospitalizations)"
    }
  },

  // Family Goals & 6% CPI Inflation Modeling
  familyGoals: [
    {
      id: "aarav-education",
      goalName: "Aarav Higher Education & University",
      targetYear: 2038,
      yearsToGoal: 12,
      currentCost: 2200000,
      inflationRate: 6.0,
      futureInflatedCost: 4426000, // ₹44.26 Lakhs (~₹45 Lakhs)
      currentMappedSavings: 650000,
      monthlyRequiredSip: 14500,
      status: "On Track (Needs dedicated child folio)"
    },
    {
      id: "retirement-corpus",
      goalName: "Retirement & Financial Freedom at 60",
      targetYear: 2052,
      yearsToGoal: 26,
      currentLivingCostYearly: 1104000, // ₹92k * 12
      inflationRate: 6.0,
      futureAnnualLivingCost: 5020000,
      targetCorpusRequired: 25000000, // ₹2.50 Crore
      currentMappedCorpus: 2930000,
      monthlyRequiredInvestment: 25000,
      status: "Healthy Compounding Glidepath"
    }
  ],

  // Nomination Register (Asset-by-Asset Estate Audit)
  nominationAudit: [
    {
      assetType: "Demat & Trading Account",
      institution: "Sharekhan / Finquest Securities",
      accountNumber: "IN300*** / 1208****",
      nomineeName: "Neha Pal",
      relationship: "Spouse",
      sharePercent: 100,
      status: "VERIFIED & REGISTERED",
      verifiedDate: "14 Jan 2026"
    },
    {
      assetType: "Mutual Funds Folios",
      institution: "CAMS & KFintech Consolidator",
      accountNumber: "PAN Linked (All 4 AMCs)",
      nomineeName: "Neha Pal",
      relationship: "Spouse",
      sharePercent: 100,
      status: "VERIFIED & REGISTERED",
      verifiedDate: "02 Feb 2026"
    },
    {
      assetType: "Primary Salary & Bank Account",
      institution: "HDFC Bank Ltd",
      accountNumber: "501002****98",
      nomineeName: "Neha Pal",
      relationship: "Spouse",
      sharePercent: 100,
      status: "VERIFIED & REGISTERED",
      verifiedDate: "20 Nov 2025"
    },
    {
      assetType: "Life Insurance Term Policy",
      institution: "HDFC Life Insurance Co",
      accountNumber: "POL-7821****90",
      nomineeName: "Neha Pal",
      relationship: "Spouse",
      sharePercent: 100,
      status: "VERIFIED & REGISTERED",
      verifiedDate: "10 Jun 2025"
    }
  ],

  // Dedicated Private Wealth Relationship Manager (HNI / UHNI Desk)
  relationshipManager: {
    name: "Vikram Malhotra",
    title: "Vice President & Senior Private Banker",
    division: "Private Wealth Management (HNI & UHNI Desk)",
    firm: "Finquest Securities Pvt. Ltd.",
    sebiRegNo: "INA000014820 (SEBI RIA Certified)",
    experience: "14+ Years in Multi-Asset Allocation & Family Office",
    phone: "+91 98200 45892",
    email: "vikram.malhotra@finquest.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80",
    qualifications: "MBA Finance (IIM Bangalore), CFA Charterholder",
    officeLocation: "Maker Chambers V, Nariman Point, Mumbai",
    bespokeOfferings: [
      "Portfolio Management Services (PMS) with 15%+ historic alpha",
      "Alternative Investment Funds (AIF Cat II & III - Pre-IPO)",
      "Unlisted Shares & Structured Debt Products",
      "Comprehensive Estate & Family Trust Structuring",
      "Tax Harvesting & Cross-Border Wealth Advisory"
    ]
  },

  // Family Digital Vault & Emergency Locker
  familyVault: {
    encryptionStandard: "256-bit AES End-to-End Encrypted",
    storageCompliance: "RBI Account Aggregator & Digilocker Certified",
    emergencyAccessContact: "Neha Pal (Authorized Family Nominee)",
    documents: [
      {
        id: "doc-1",
        title: "Demat Holding Statement (Consolidated CAS)",
        category: "Equities & Bonds",
        fileType: "PDF",
        size: "1.8 MB",
        lastUpdated: "01 Mar 2026",
        verified: true
      },
      {
        id: "doc-2",
        title: "Mutual Fund Consolidated Account Statement (CAS)",
        category: "Mutual Funds",
        fileType: "PDF",
        size: "2.4 MB",
        lastUpdated: "28 Feb 2026",
        verified: true
      },
      {
        id: "doc-3",
        title: "HDFC Life Term Insurance Policy Document",
        category: "Insurance",
        fileType: "PDF",
        size: "3.1 MB",
        lastUpdated: "15 Jan 2026",
        verified: true
      },
      {
        id: "doc-4",
        title: "Care Supreme Health Card & E-Claims Kit",
        category: "Health & Medical",
        fileType: "PDF",
        size: "1.2 MB",
        lastUpdated: "10 Feb 2026",
        verified: true
      },
      {
        id: "doc-5",
        title: "Third-Party Hand Loan Promissory & Settlement Note",
        category: "Debt & Promissory",
        fileType: "PDF",
        size: "850 KB",
        lastUpdated: "05 Jan 2026",
        verified: true
      },
      {
        id: "doc-6",
        title: "Draft Family Will & Succession Blueprint",
        category: "Estate & Succession",
        fileType: "PDF (Encrypted)",
        size: "4.2 MB",
        lastUpdated: "12 Dec 2025",
        verified: true
      }
    ]
  },

  // Tax Optimization Opportunities
  taxEngine: {
    section80C: {
      limit: 150000,
      claimed: 150000,
      breakdown: [
        { name: "EPF Statutory Deduction", amount: 96000 },
        { name: "ELSS Parag Parikh Tax Saver", amount: 35500 },
        { name: "Term Life Premium (80C)", amount: 18500 }
      ],
      remainingEligible: 0
    },
    section80D: {
      limit: 25000,
      claimed: 22400,
      breakdown: [
        { name: "Care Supreme Family Health Premium", amount: 22400 }
      ],
      remainingEligible: 2600
    },
    ltcgHarvesting: {
      annualExemptionLimit: 125000, // ₹1.25 Lakhs per FY
      realizedGainsThisYear: 32000,
      unrealizedLtcgEligible: 93000,
      recommendation: "Book ₹93,000 in long-term equity profits before March 31 to utilize the ₹1.25L tax-free threshold and reset acquisition cost base without paying 12.5% LTCG tax."
    },
    estimatedTaxSaved: 46800
  }
};
