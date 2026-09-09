import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Home, 
  GraduationCap, 
  Car, 
  Plane, 
  ShieldAlert, 
  Sparkles, 
  Sliders, 
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Modal from '../components/common/Modal';
import ProjectionChart from '../components/charts/ProjectionChart';
import { initialGoals, retirementProjection } from '../data/goalsData';
import { formatINR } from '../utils/formatters';

export default function GoalsPage({ onOpenAI }) {
  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState(initialGoals[0]); // Default to Retirement
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Interactive SIP simulation
  const [simulatedSip, setSimulatedSip] = useState(32000);
  
  // New goal state
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalCurrent, setNewGoalCurrent] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Medium Term');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'GraduationCap': return GraduationCap;
      case 'Car': return Car;
      case 'Plane': return Plane;
      default: return Target;
    }
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle || !newGoalTarget) return;

    const targetNum = parseFloat(newGoalTarget) || 100000;
    const currentNum = parseFloat(newGoalCurrent) || 0;
    const progress = Math.min(Math.round((currentNum / targetNum) * 100), 100);

    const newGoalObj = {
      id: `goal-${Date.now()}`,
      title: newGoalTitle,
      targetAmount: targetNum,
      currentAmount: currentNum,
      projectedAmount: targetNum * 0.85,
      progress,
      monthlySip: 10000,
      targetYear: 2029,
      status: progress >= 50 ? 'On Track' : 'Needs Boost',
      category: newGoalCategory,
      icon: 'Target'
    };

    setGoals([...goals, newGoalObj]);
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalCurrent('');
    setShowAddModal(false);
  };

  // Calculate simulated projection
  const sipBoostRatio = simulatedSip / 32000;
  const simulatedProjectedCr = 1.42 * (0.4 + 0.6 * sipBoostRatio);
  const isGoalAchieved = simulatedProjectedCr >= 2.0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your Goals</h1>
          <p className="text-sm text-slate-500 mt-1">
            Turn your financial plans into measurable, algorithmically tracked targets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onOpenAI("Am I on track for retirement?")}
            icon={Sparkles}
          >
            Ask AI Goal Audit
          </Button>

          <Button 
            variant="primary" 
            size="sm"
            onClick={() => setShowAddModal(true)}
            icon={Plus}
          >
            Add Goal
          </Button>
        </div>
      </div>

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {goals.map((g) => {
          const Icon = getIcon(g.icon);
          const isSelected = selectedGoal?.id === g.id;

          return (
            <div
              key={g.id}
              onClick={() => setSelectedGoal(g)}
              className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                  : 'border-slate-200/80 hover:border-slate-300 shadow-card hover:shadow-card-hover'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant={g.status === 'On Track' ? 'good' : 'warning'} size="sm">
                    {g.status}
                  </Badge>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-tight">{g.title}</h4>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Target: {formatINR(g.targetAmount, true)}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Progress</span>
                    <span className="text-brand-600">{g.progress}%</span>
                  </div>
                  <ProgressBar progress={g.progress} color="brand" showLabel={false} height="h-2" />
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>SIP: {formatINR(g.monthlySip)}/mo</span>
                <span className="font-semibold text-slate-700">{g.targetYear}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Projection Drawer / Panel for Selected Goal */}
      {selectedGoal && (
        <Card
          title={`${selectedGoal.title} Detailed Projection`}
          subtitle="Long-term wealth compounding curve and algorithmic SIP adjustment"
          action={
            <Badge variant="brand" size="md">
              Target Year {selectedGoal.targetYear}
            </Badge>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projection Chart & Simulator (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Target vs Projected KPI Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Goal Target</span>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {formatINR(selectedGoal.targetAmount, true)}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Current Projection</span>
                  <div className="text-lg font-extrabold text-slate-700 mt-0.5">
                    {formatINR(selectedGoal.projectedAmount, true)}
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] text-rose-600 uppercase font-bold">Projected Shortfall</span>
                  <div className="text-lg font-extrabold text-rose-600 mt-0.5">
                    {formatINR(Math.max(0, selectedGoal.targetAmount - selectedGoal.projectedAmount), true)}
                  </div>
                </div>
              </div>

              {/* Trajectory Area Chart */}
              <ProjectionChart 
                timeline={retirementProjection.timeline} 
                showOptimized={simulatedSip >= 44000}
              />

              {/* Interactive SIP Booster Slider */}
              <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-brand-700" />
                    <span className="text-xs font-bold text-slate-900">
                      Simulate SIP Step-Up Booster
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-brand-700">
                    {formatINR(simulatedSip)}/month
                  </span>
                </div>

                <input
                  type="range"
                  min="25000"
                  max="60000"
                  step="1000"
                  value={simulatedSip}
                  onChange={(e) => setSimulatedSip(Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>₹25K/mo (Shortfall ₹72L)</span>
                  <span className="font-bold text-brand-800">₹44K/mo (Recommended)</span>
                  <span>₹60K/mo (Surplus ₹35L)</span>
                </div>

                <div className="pt-2 border-t border-brand-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600">
                    Simulated Corpus at Age 60: <strong className="text-slate-900">₹{simulatedProjectedCr.toFixed(2)} Cr</strong>
                  </span>
                  <Badge variant={isGoalAchieved ? 'good' : 'warning'} size="sm">
                    {isGoalAchieved ? 'Goal Fully Funded ✓' : 'Shortfall Remaining'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* AI Recommendation Side Card (1 col) */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-brand-700 font-bold text-xs mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>360° AI Goal Copilot</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  Bridge the {formatINR(retirementProjection.shortfall, true)} Shortfall
                </h4>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  "{retirementProjection.aiInsight}"
                </p>

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Deploy incremental ₹12,000 into Flexi-Cap or NIFTY 50 index.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Assumes 12% equity CAGR and 6% inflation benchmark.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setSimulatedSip(44000)}
                >
                  Apply Recommended ₹44K/mo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onOpenAI("How do I optimize my retirement goal?")}
                >
                  Consult 360° AI
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Add Goal Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Financial Goal"
        subtitle="Define a milestone with target date and planned monthly investment"
      >
        <form onSubmit={handleAddGoal} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Goal Name</label>
            <input
              type="text"
              required
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="e.g. Higher Education Fund, Dream Villa"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Amount (₹)</label>
              <input
                type="number"
                required
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(e.target.value)}
                placeholder="e.g. 2500000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Saved (₹)</label>
              <input
                type="number"
                value={newGoalCurrent}
                onChange={(e) => setNewGoalCurrent(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Time Horizon</label>
            <select
              value={newGoalCategory}
              onChange={(e) => setNewGoalCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="Short Term">Short Term (&lt; 3 Years)</option>
              <option value="Medium Term">Medium Term (3 - 7 Years)</option>
              <option value="Long Term">Long Term (7+ Years)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Goal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
