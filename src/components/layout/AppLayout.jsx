import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AIDrawer from '../ai/AIDrawer';

export default function AppLayout({ 
  children, 
  currentPage, 
  onNavigate 
}) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState(null);

  const handleOpenAiWithQuery = (query) => {
    setAiQuery(query);
    setIsAiOpen(true);
  };

  const handleTriggerSearch = (query) => {
    handleOpenAiWithQuery(query);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={onNavigate}
        onOpenAI={() => {
          setAiQuery(null);
          setIsAiOpen(true);
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <Header 
          onTriggerSearch={handleTriggerSearch}
          onOpenNotifications={() => {}}
        />

        <main className="flex-1 mt-16 p-8 max-w-7xl w-full mx-auto pb-16">
          {children}
        </main>
      </div>

      {/* Global Slide-Out AI Copilot */}
      <AIDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialQuery={aiQuery}
        activeContext={currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
