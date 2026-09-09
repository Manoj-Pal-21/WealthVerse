export const documentCategories = [
  { id: "all", name: "All Documents", count: 48 },
  { id: "insurance", name: "Insurance", count: 12 },
  { id: "mutual-funds", name: "Mutual Funds", count: 8 },
  { id: "demat", name: "Demat", count: 5 },
  { id: "bank", name: "Bank", count: 7 },
  { id: "loans", name: "Loans", count: 4 },
  { id: "tax", name: "Tax", count: 10 },
  { id: "estate", name: "Estate Planning", count: 2 }
];

export const documentList = [
  {
    id: "doc-1",
    name: "HDFC Life Click 2 Protect 3D Plus Policy.pdf",
    category: "insurance",
    categoryLabel: "Insurance",
    size: "2.4 MB",
    uploadedDate: "12 Aug 2026",
    status: "Verified",
    statusType: "verified",
    notes: "Sum Assured ₹50L. Premium due annually on Nov 15."
  },
  {
    id: "doc-2",
    name: "CAMS Consolidated Account Statement (CAS).pdf",
    category: "mutual-funds",
    categoryLabel: "Mutual Funds",
    size: "4.1 MB",
    uploadedDate: "08 Aug 2026",
    status: "Verified",
    statusType: "verified",
    notes: "Active folios across Axis, HDFC, Parag Parikh, Mirae."
  },
  {
    id: "doc-3",
    name: "HDFC Home Loan Outstanding Statement Q2.pdf",
    category: "loans",
    categoryLabel: "Loans",
    size: "1.2 MB",
    uploadedDate: "02 Aug 2026",
    status: "Needs Review",
    statusType: "review",
    notes: "Interest reset notice detected. Rate adjusted to 8.75% p.a."
  },
  {
    id: "doc-4",
    name: "Zerodha Client Master Report (CMR).pdf",
    category: "demat",
    categoryLabel: "Demat",
    size: "1.8 MB",
    uploadedDate: "28 Jul 2026",
    status: "Verified",
    statusType: "verified",
    notes: "Nominee registration confirmed on CDSL records."
  },
  {
    id: "doc-5",
    name: "Income Tax Return (ITR-2) Ack AY 2026-27.pdf",
    category: "tax",
    categoryLabel: "Tax",
    size: "890 KB",
    uploadedDate: "20 Jul 2026",
    status: "Verified",
    statusType: "verified",
    notes: "E-verified. Capital gains and 80C deductions recorded."
  },
  {
    id: "doc-6",
    name: "Draft Family Succession & Will Memo.pdf",
    category: "estate",
    categoryLabel: "Estate Planning",
    size: "1.5 MB",
    uploadedDate: "15 Jun 2026",
    status: "Needs Review",
    statusType: "review",
    notes: "Draft copy pending formal notarization and witnesses signoff."
  }
];

export const aiDocumentInsight = {
  title: "AI Document Audit Found 1 Actionable Item",
  description: "Your 'HDFC Home Loan Outstanding Statement' shows an interest rate reset from 8.50% to 8.75%. This adds approximately ₹920 to your monthly EMI or extends your tenure by 7 months if unaddressed.",
  actionText: "Review Loan Impact"
};
