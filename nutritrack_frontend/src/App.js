import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import { AppProvider } from './AppContext';

// Lazy load core views
import { Dashboard, AddMeal, WaterTracker, UserProfile, MealHistory } from './components';

/**
 * PUBLIC_INTERFACE
 * Main container component for NutriTrack, now with centralized application state.
 * Handles navigation between feature pages and manages context/provider for state.
 */
function App() {
  // Navigation state (tab-key; must match NavBar and feature keys)
  const [activeTab, setActiveTab] = useState('dashboard');
  // Optionally: scroll to top or handle mobile nav focus when changing tab

  // Renders the selected page/component with context (features use useContext)
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-meal':
        return <AddMeal />;
      case 'water':
        return <WaterTracker />;
      case 'profile':
        return <UserProfile />;
      case 'history':
        return <MealHistory />;
      default:
        return (
          <div className="w-full rounded-xl shadow bg-white min-h-[60vh] flex items-center justify-center text-center p-6">
            <span className="text-gray-400 text-lg">
              Welcome to <span className="font-bold text-primary">NutriTrack</span>!<br />
              Start building your health tracking dashboard.
            </span>
          </div>
        );
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-accent text-primary font-sans">
        {/* Header Navigation */}
        <header className="w-full px-4 py-3 shadow-sm bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block text-2xl font-black text-primary">*</span>
            <span className="font-bold tracking-tight text-secondary text-xl">NutriTrack</span>
          </div>
          {/* Reserved for profile/icon/nav actions */}
          <div className="flex items-center space-x-2">
            {/* Navigation actions, avatar, etc. */}
          </div>
        </header>

        {/* Navigation (prop drills state updater for sync) */}
        <NavBar activeKey={activeTab} onNav={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6">
          {renderActivePage()}
        </main>
        {/* Bottom navigation for mobile is handled by NavBar and spacer */}
      </div>
    </AppProvider>
  );
}

export default App;