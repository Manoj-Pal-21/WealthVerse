import React, { useState } from 'react';
import PlannerNavbar from './components/layout/PlannerNavbar';
import PlannerFooter from './components/layout/PlannerFooter';
import WelcomeScreen from './screens/1_WelcomeScreen';
import ProfileScreen from './screens/2_ProfileScreen';
import AnalysisLoadingScreen from './screens/3_AnalysisLoadingScreen';
import DashboardScreen from './screens/4_DashboardScreen';
import PersonalizedPlanScreen from './screens/5_PersonalizedPlanScreen';
import AIAdvisorScreen from './screens/6_AIAdvisorScreen';
import ProgressGoalsScreen from './screens/7_ProgressGoalsScreen';
import { defaultProfileData, calculateHealthMetrics } from './services/healthScoreCalculator';

export default function App() {
  // Planner Journey Screens: 'journey' (Default) | 'loading' | 'dashboard' | 'plan' | 'advisor' | 'progress' | 'welcome'
  const [plannerScreen, setPlannerScreen] = useState('journey');
  const [journeyStep, setJourneyStep] = useState(1);
  const [hasCompletedJourney, setHasCompletedJourney] = useState(false);
  
  // Profile Data & Metrics Engine
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [metrics, setMetrics] = useState(() => calculateHealthMetrics(defaultProfileData));
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Ensure view starts from top on every screen change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [plannerScreen, journeyStep]);

  // Profile submission: updates metrics and starts 2s animated analysis loading
  const handleProfileSubmit = (newProfileData) => {
    setProfileData(newProfileData);
    const updatedMetrics = calculateHealthMetrics(newProfileData);
    setMetrics(updatedMetrics);
    setPlannerScreen('loading');
  };

  // Loading screen completes -> go to Dashboard (78 score)
  const handleLoadingComplete = () => {
    setHasCompletedJourney(true);
    setPlannerScreen('dashboard');
    showToast("Diagnosis Complete: Score 78/100 • Net Worth ₹27.74L");
  };

  // Start Journey Demo: loads Manoj Pal and routes to Step 1 of Intake Journey
  const handleStartDemo = () => {
    setProfileData(defaultProfileData);
    setMetrics(calculateHealthMetrics(defaultProfileData));
    setJourneyStep(1);
    setPlannerScreen('journey');
    showToast("Loaded Manoj Pal's Profile — Proceed through the 4-step journey");
  };

  // Reset demo back to defaults
  const handleResetDemo = () => {
    setProfileData(defaultProfileData);
    setMetrics(calculateHealthMetrics(defaultProfileData));
    setJourneyStep(1);
    setPlannerScreen('journey');
    showToast("Reset to Manoj Pal defaults (Step 1)");
  };

  // Update Profile Data directly (from Dashboard quick actions or outside holdings edits)
  const handleUpdateProfileData = (updater) => {
    setProfileData(prev => {
      const updated = typeof updater === 'function' ? updater(prev) : updater;
      const updatedMetrics = calculateHealthMetrics(updated);
      setMetrics(updatedMetrics);
      return updated;
    });
    showToast("Balance Sheet & Net Worth Updated Live");
  };

  // Navigation router for Financial Health Planner
  const renderPlannerScreen = () => {
    switch (plannerScreen) {
      case 'journey':
      case 'profile':
        return (
          <ProfileScreen 
            initialData={profileData} 
            onSubmit={handleProfileSubmit} 
            onBack={() => setPlannerScreen('welcome')}
            step={journeyStep}
            onStepChange={setJourneyStep}
          />
        );
      case 'welcome':
        return (
          <WelcomeScreen 
            onNavigate={(screen) => {
              if (screen === 'profile') setPlannerScreen('journey');
              else setPlannerScreen(screen);
            }} 
            onStartDemo={handleStartDemo} 
          />
        );
      case 'loading':
        return (
          <AnalysisLoadingScreen 
            onComplete={handleLoadingComplete} 
          />
        );
      case 'dashboard':
        return (
          <DashboardScreen 
            metrics={metrics} 
            onNavigate={setPlannerScreen} 
            onUpdateProfileData={handleUpdateProfileData}
          />
        );
      case 'plan':
        return (
          <PersonalizedPlanScreen 
            metrics={metrics} 
            onNavigate={setPlannerScreen} 
          />
        );
      case 'advisor':
        return (
          <AIAdvisorScreen 
            metrics={metrics} 
            onNavigate={setPlannerScreen} 
          />
        );
      case 'progress':
        return (
          <ProgressGoalsScreen 
            metrics={metrics} 
            onNavigate={setPlannerScreen} 
          />
        );
      default:
        return (
          <ProfileScreen 
            initialData={profileData} 
            onSubmit={handleProfileSubmit} 
            onBack={() => setPlannerScreen('welcome')}
            step={journeyStep}
            onStepChange={setJourneyStep}
          />
        );
    }
  };

  // Primary: Financial Health Planner App
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <PlannerNavbar 
        activeScreen={plannerScreen}
        onNavigate={setPlannerScreen}
        score={metrics.score}
        netWorth={metrics.netWorth}
        userName={profileData.name}
        onResetDemo={handleResetDemo}
        journeyStep={journeyStep}
        onSetJourneyStep={setJourneyStep}
        hasCompletedJourney={hasCompletedJourney}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {renderPlannerScreen()}
      </main>

      {/* Footer */}
      <PlannerFooter 
        onNavigate={setPlannerScreen} 
      />
    </div>
  );
}
