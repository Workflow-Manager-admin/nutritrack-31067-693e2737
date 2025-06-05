import React from 'react';
import './App.css';
import NavBar from './NavBar';

/**
 * PUBLIC_INTERFACE
 * Main container component for NutriTrack.
 * Sets up responsive app shell using Tailwind for layout and theming.
 * Navigation is handled via the NavBar component: mobile bottom nav & desktop tab nav.
 * Does not implement routing or feature logic yet.
 */
function App() {
  return (
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

      {/* Desktop Tabs Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Dynamic content, feature pages/components will be rendered here */}
        <div className="w-full rounded-xl shadow bg-white min-h-[60vh] flex items-center justify-center text-center p-6">
          <span className="text-gray-400 text-lg">
            {/* Placeholder illustration or logo can go here */}
            Welcome to <span className="font-bold text-primary">NutriTrack</span>!<br />
            Start building your health tracking dashboard.
          </span>
        </div>
      </main>

      {/* Bottom navigation for mobile is handled by NavBar and spacer */}
    </div>
  );
}

export default App;