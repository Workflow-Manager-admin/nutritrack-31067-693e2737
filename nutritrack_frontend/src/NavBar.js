import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Responsive, reusable navigation bar for NutriTrack.
 * Shows a bottom nav on mobile and tabbed nav on desktop.
 * Uses TailwindCSS and NutriTrack color palette.
 * 
 * Nav items: Dashboard, Add Meal, Water Tracker, User Profile, Meal History.
 * Example usage: <NavBar /> in App.js
 */
const NAV_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    // Placeholder SVG icon (replace with FontAwesome if installed)
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v7a2 2 0 002 2h4a2 2 0 002-2v-7m-6 0H5a2 2 0 00-2 2v3a2 2 0 002 2h1" />
      </svg>
    ),
  },
  {
    key: 'add-meal',
    label: 'Add Meal',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    key: 'water',
    label: 'Water Tracker',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17a5 5 0 0010 0c0-3.333-5-9.5-5-9.5S7 13.667 7 17z" />
      </svg>
    ),
  },
  {
    key: 'profile',
    label: 'User Profile',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c3.866 0 7 1.343 7 3v2H5v-2c0-1.657 3.134-3 7-3zm0-4a4 4 0 100-8 4 4 0 000 8z"/>
      </svg>
    ),
  },
  {
    key: 'history',
    label: 'Meal History',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M12 21a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
    ),
  },
];

/**
 * NavBar component manages its own active tab for demo; 
 * in a routed app, the active state would come from a router/path.
 */
function NavBar({ activeKey, onNav }) {
  // Local state fallback if parent does not control active nav
  const [active, setActive] = useState(activeKey || 'dashboard');

  const setActiveTab = (key) => {
    setActive(key);
    if (onNav) onNav(key);
  };

  // Colors for active state, fallback to palette
  const primary = 'text-primary';
  const secondary = 'text-secondary';
  const accentBg = 'bg-accent';
  const activeBg = 'bg-primary';
  const activeText = 'text-white';
  const inactiveText = 'text-gray-400';

  // Shared classes (tailwind)
  const itemBase =
    'flex flex-col items-center justify-center px-2 py-1 cursor-pointer transition duration-150 group';
  const iconBase =
    'w-7 h-7 mb-0.5';

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed z-50 left-0 right-0 bottom-0 border-t shadow-inner bg-white flex md:hidden justify-around py-1 px-1"
        aria-label="Bottom navigation"
        role="navigation"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`${itemBase} ${
              active === item.key
                ? `text-white ${activeBg} rounded-2xl shadow text-xs`
                : `text-secondary hover:bg-primary/10 rounded-2xl`
            } flex-1 mx-1`}
            aria-current={active === item.key ? 'page' : undefined}
          >
            <span className={`transition ${iconBase}`}>
              {React.cloneElement(item.icon, {
                className:
                  `h-6 w-6 transition ${active === item.key ? 'text-white' : 'text-secondary group-hover:text-primary'}`,
              })}
            </span>
            <span
              className={`text-xs mt-0.5 font-medium tracking-tight ${active === item.key ? 'text-white' : 'text-secondary'}`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Desktop Tabbed Navigation */}
      <nav
        className="hidden md:flex w-full max-w-3xl mx-auto mt-5 mb-10 px-6 bg-white shadow-sm rounded-lg"
        aria-label="Tabbed navigation"
        role="navigation"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`${itemBase} flex-row space-x-2 py-2 px-4 flex-1
              ${
                active === item.key
                  ? `border-b-4 border-primary text-primary bg-accent`
                  : 'text-gray-500 hover:text-primary hover:bg-primary/5'
              }`}
            aria-current={active === item.key ? 'page' : undefined}
            style={{ borderRadius: 0 }}
          >
            <span>
              {React.cloneElement(item.icon, {
                className: `h-5 w-5
                  ${active === item.key ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`
              })}
            </span>
            <span
              className={`font-semibold text-sm ${
                active === item.key ? 'text-primary' : 'text-gray-500 group-hover:text-primary'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Spacer div for fixed bottom nav (mobile only) */}
      <div className="block md:hidden h-16" aria-hidden="true"></div>
    </>
  );
}

export default NavBar;
