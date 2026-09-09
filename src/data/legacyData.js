export const legacyReadiness = {
  score: 64,
  maxScore: 100,
  status: "Needs Attention",
  legalDisclaimer: "Important Notice: 360° Wealth and its AI assistant help organize financial information and guide family preparedness. The platform does NOT legally verify death, nor does it initiate or execute direct asset transfers. Legal claim verification and transmission are handled strictly through the respective financial institutions and applicable succession laws."
};

export const legacyChecklist = [
  {
    id: "chk-1",
    title: "Nominee Information",
    description: "Primary and secondary nominees assigned across bank & demat accounts",
    status: "Completed",
    isCompleted: true
  },
  {
    id: "chk-2",
    title: "Asset Inventory",
    description: "Complete list of equity, mutual funds, FDs, and real estate documented",
    status: "Completed",
    isCompleted: true
  },
  {
    id: "chk-3",
    title: "Insurance Information",
    description: "Policy numbers, sum assured, and insurer claim contacts logged",
    status: "Completed",
    isCompleted: true
  },
  {
    id: "chk-4",
    title: "Important Documents",
    description: "PAN, Aadhaar, original certificates, and property titles centralized",
    status: "Incomplete",
    isCompleted: false
  },
  {
    id: "chk-5",
    title: "Estate Instructions",
    description: "Registered Will or formal distribution instructions to eliminate ambiguity",
    status: "Incomplete",
    isCompleted: false
  },
  {
    id: "chk-6",
    title: "Emergency Contact",
    description: "Designated trusted contact person and legal representative verified",
    status: "Completed",
    isCompleted: true
  }
];

export const familyAssetSummary = {
  investments: 3542200,
  liabilities: 856000,
  insurance: 5000000,
  bankAccounts: 3,
  dematAccounts: 2,
  mutualFundsCount: 4,
  institutions: [
    { name: "HDFC Bank Ltd", type: "Savings & Salary Account", ref: "A/C ...4819" },
    { name: "ICICI Bank Ltd", type: "Savings & Fixed Deposit", ref: "A/C ...9201" },
    { name: "Zerodha Broking Ltd", type: "Demat & Trading Account", ref: "BOID ...7190" },
    { name: "Groww / Nextbillion", type: "Mutual Fund Investment Platform", ref: "Folios (4)" },
    { name: "HDFC Life Insurance", type: "Term Life Protection Policy", ref: "Pol #892104" }
  ]
};

export const legacyProcessSteps = [
  {
    step: 1,
    title: "Request Submission",
    description: "Authorized nominee or legal heir notifies the institution with claim notification forms."
  },
  {
    step: 2,
    title: "Document Submission",
    description: "Official documents (Death Certificate, Succession Certificate / Will, KYC) are submitted."
  },
  {
    step: 3,
    title: "Institutional Verification",
    description: "Legal team & compliance officers at the bank/depository verify legitimacy of the claim."
  },
  {
    step: 4,
    title: "Transmission of Assets",
    description: "Securities and funds are transferred to nominee's registered demat or bank account."
  },
  {
    step: 5,
    title: "AI Guidance for Next Steps",
    description: "360° AI assists the family in understanding ongoing tax, restructuring, and long-term allocations."
  }
];
