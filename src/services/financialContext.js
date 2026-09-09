// Aggregates live data across all 10 modules into a unified context payload for Claude LLM

import { overviewKPIs, assetAllocation, userProfile, recentTransactions } from '../data/financialData';
import { equityKPIs, equityHoldings, sectorExposure, aiEquityAnalysis } from '../data/equityData';
import { mutualFundsKPIs, activeSips, fundAllocation, fundOverlapData } from '../data/mutualFundsData';
import { financialReadiness, gapCategories, priorityGaps, aiPriorityPlan } from '../data/gapsData';
import { initialGoals, retirementProjection } from '../data/goalsData';
import { protectionKPIs, emergencyReadiness, aiProtectionRecommendation } from '../data/protectionData';
import { legacyReadiness, legacyChecklist, familyAssetSummary, legacyProcessSteps } from '../data/legacyData';
import { documentCategories, documentList, aiDocumentInsight } from '../data/documentsData';

export function getFullPortfolioSnapshot() {
  return {
    client: {
      name: userProfile.name,
      email: userProfile.email,
      tier: userProfile.role,
      niftyIndex: userProfile.nifty
    },
    overview: {
      netWorth: overviewKPIs.netWorth.value,
      investments: overviewKPIs.investments.value,
      liabilities: overviewKPIs.liabilities.value,
      monthlyInvestment: overviewKPIs.monthlyInvestment.value,
      assetAllocation: assetAllocation.map(a => ({ name: a.name, percentage: `${a.percentage}%`, valueINR: a.value }))
    },
    cashFlow: {
      monthlyIncome: 110000,
      monthlyExpenses: emergencyReadiness.monthlyExpenses,
      existingEMI: 18000,
      currentLiquidSavings: emergencyReadiness.currentReserve,
      emergencyReserveMonths: emergencyReadiness.monthsCovered
    },
    equityPortfolio: {
      currentValue: equityKPIs.currentValue,
      investedValue: equityKPIs.investedValue,
      overallReturn: `${equityKPIs.overallReturnPercent}%`,
      sectorExposure: sectorExposure.map(s => ({ sector: s.name, weight: `${s.percentage}%` })),
      stocks: equityHoldings.map(s => ({
        name: s.name,
        symbol: s.symbol,
        qty: s.qty,
        avgPrice: s.avgPrice,
        ltp: s.ltp,
        currentValue: s.current,
        pnlPercent: `+${s.pnlPercent}%`
      }))
    },
    mutualFundsPortfolio: {
      currentValue: mutualFundsKPIs.currentValue,
      investedValue: mutualFundsKPIs.investedValue,
      xirr: `${mutualFundsKPIs.xirr}%`,
      monthlySip: mutualFundsKPIs.monthlySip,
      activeSips: activeSips.map(s => ({ name: s.name, category: s.category, amount: s.sipAmount, xirr: `${s.xirr}%` })),
      marketCapSplit: fundAllocation.map(f => ({ category: f.name, weight: `${f.percentage}%` })),
      detectedOverlap: {
        funds: `${fundOverlapData.fundA} and ${fundOverlapData.fundB}`,
        overlapFactor: `${fundOverlapData.overlapPercentage}%`,
        commonHoldings: fundOverlapData.commonHoldings
      }
    },
    financialGapRadar: {
      readinessScore: `${financialReadiness.overallScore}/100`,
      readinessStatus: financialReadiness.status,
      totalEstimatedGapINR: financialReadiness.totalEstimatedGap,
      categories: gapCategories.map(c => ({
        name: c.name,
        score: `${c.score}/100`,
        status: c.status,
        gapAmount: c.gapAmount,
        summary: c.summary
      })),
      highestPriorityGaps: priorityGaps.map(g => ({
        category: g.category,
        currentCover: g.currentCover,
        requiredCover: g.estimatedRequired,
        shortfall: g.shortfall,
        why: g.why
      }))
    },
    financialGoals: initialGoals.map(g => ({
      title: g.title,
      targetINR: g.targetAmount,
      currentSavedINR: g.currentAmount,
      projectedINR: g.projectedAmount,
      progressPercent: `${g.progress}%`,
      targetYear: g.targetYear,
      monthlySip: g.monthlySip
    })),
    retirementDeepDive: {
      targetINR: retirementProjection.target,
      projectedINR: retirementProjection.currentProjection,
      shortfallINR: retirementProjection.shortfall,
      currentSip: retirementProjection.currentSip,
      recommendedSip: retirementProjection.recommendedSip
    },
    protectionAndInsurance: {
      emergencyFundStatus: `${emergencyReadiness.monthsCovered} months of ₹62K/mo expenses`,
      termLifeInsurance: {
        currentSumAssured: aiProtectionRecommendation.currentCover,
        requiredBenchmark: aiProtectionRecommendation.estimatedRequired,
        uncoveredShortfall: aiProtectionRecommendation.gapAmount
      },
      healthInsurance: "₹10L comprehensive floater policy (100% adequate)"
    },
    familyLegacy: {
      readinessScore: `${legacyReadiness.score}/100`,
      checklistStatus: legacyChecklist.map(c => ({ item: c.title, completed: c.isCompleted })),
      institutionsLogged: familyAssetSummary.institutions
    },
    documentsVault: {
      totalDocuments: 48,
      actionItem: aiDocumentInsight.description
    }
  };
}
