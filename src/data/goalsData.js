export const initialGoals = [
  {
    id: "goal-retirement",
    title: "Retirement",
    targetAmount: 20000000,
    currentAmount: 14200000,
    projectedAmount: 14200000,
    progress: 71,
    monthlySip: 32000,
    targetYear: 2042,
    status: "On Track",
    category: "Long Term",
    icon: "ShieldAlert"
  },
  {
    id: "goal-home",
    title: "Home Purchase",
    targetAmount: 5000000,
    currentAmount: 3200000,
    projectedAmount: 4800000,
    progress: 64,
    monthlySip: 20000,
    targetYear: 2028,
    status: "On Track",
    category: "Medium Term",
    icon: "Home"
  },
  {
    id: "goal-education",
    title: "Child Education",
    targetAmount: 3000000,
    currentAmount: 1200000,
    projectedAmount: 2400000,
    progress: 40,
    monthlySip: 10000,
    targetYear: 2034,
    status: "Needs Boost",
    category: "Long Term",
    icon: "GraduationCap"
  },
  {
    id: "goal-car",
    title: "New Car",
    targetAmount: 1000000,
    currentAmount: 400000,
    projectedAmount: 850000,
    progress: 40,
    monthlySip: 15000,
    targetYear: 2027,
    status: "Needs Boost",
    category: "Short Term",
    icon: "Car"
  },
  {
    id: "goal-travel",
    title: "European Vacation",
    targetAmount: 300000,
    currentAmount: 120000,
    projectedAmount: 280000,
    progress: 40,
    monthlySip: 8000,
    targetYear: 2027,
    status: "On Track",
    category: "Short Term",
    icon: "Plane"
  }
];

export const retirementProjection = {
  currentProjection: 14200000,
  target: 20000000,
  shortfall: 5800000,
  currentSip: 32000,
  recommendedSip: 44000,
  aiInsight: "Increase monthly investment from ₹32K to approximately ₹44K (or apply an annual 10% step-up SIP) to bridge the ₹58L shortfall and reach your ₹2 Cr target comfortably by age 60.",
  timeline: [
    { age: "35 (Current)", currentTrajectory: 14.2, optimizedTrajectory: 14.2, targetLine: 20 },
    { age: "40", currentTrajectory: 32.5, optimizedTrajectory: 39.0, targetLine: 45 },
    { age: "45", currentTrajectory: 58.0, optimizedTrajectory: 72.4, targetLine: 80 },
    { age: "50", currentTrajectory: 92.4, optimizedTrajectory: 120.5, targetLine: 130 },
    { age: "55", currentTrajectory: 118.0, optimizedTrajectory: 165.0, targetLine: 170 },
    { age: "60 (Target)", currentTrajectory: 142.0, optimizedTrajectory: 204.0, targetLine: 200 }
  ]
};
