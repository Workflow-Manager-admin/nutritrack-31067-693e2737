import React, { useState } from "react";
import {
  DashboardScreen,
  AddMealScreen,
  WaterTrackerScreen,
  UserProfileScreen,
  MealHistoryScreen,
  ComingSoonScreen,
} from "./screens";
import {
  HomeIcon,
  PlusCircleIcon,
  WaterDropIcon,
  UserCircleIcon,
  ClipboardListIcon,
  MoonIcon,
  FireIcon,
  BellIcon,
} from "./icons";

// PUBLIC_INTERFACE
/**
 * MainContainer is the root UI container for NutriTrack, controlling screen navigation
 * and holding the mobile-first layout & persistent bottom nav bar.
 */
const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: <HomeIcon />,
    screen: "dashboard",
    enabled: true,
  },
  {
    label: "Add Meal",
    icon: <PlusCircleIcon />,
    screen: "addMeal",
    enabled: true,
  },
  {
    label: "Water",
    icon: <WaterDropIcon />,
    screen: "water",
    enabled: true,
  },
  {
    label: "History",
    icon: <ClipboardListIcon />,
    screen: "history",
    enabled: true,
  },
  {
    label: "Profile",
    icon: <UserCircleIcon />,
    screen: "profile",
    enabled: true,
  },
];

const DISABLED_FEATURES = [
  { label: "Dark Mode", icon: <MoonIcon />, enabled: false },
  { label: "Streaks", icon: <FireIcon />, enabled: false },
  { label: "Reminders", icon: <BellIcon />, enabled: false },
];

export default function MainContainer() {
  // Manage active tab
  const [active, setActive] = useState("dashboard");

  // Dark mode state
  const [theme, setTheme] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
  );
  // Reminders modal state
  const [showReminder, setShowReminder] = useState(false);

  // Toggle theme and persist for session
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // Set dark/light mode on <body>
  React.useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  function renderScreen() {
    switch (active) {
      case "dashboard":
        return <DashboardScreen />;
      case "addMeal":
        return <AddMealScreen />;
      case "water":
        return <WaterTrackerScreen />;
      case "history":
        return <MealHistoryScreen />;
      case "profile":
        return <UserProfileScreen />;
      default:
        return <ComingSoonScreen name={active} />;
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "dark bg-[#0c1821]" : "bg-[#ffffff]"
      }`}
      data-testid="main-container"
      data-theme={theme}
    >
      {/* Header/Brand */}
      <header
        className={`flex justify-between items-center py-4 border-b shadow-sm fixed top-0 w-full z-10 ${
          theme === "dark" ? "bg-[#10213f] border-[#234]" : "bg-white"
        }`}
        data-testid="navbar-header"
        role="banner"
        aria-label="App Navigation Bar"
      >
        <span
          className="flex items-center gap-2 font-bold text-2xl tracking-tight text-[#22c55e]"
          data-testid="navbar-logo"
        >
          <img
            src="https://img.icons8.com/color/48/healthy-eating.png"
            alt="NutriTrack"
            className="w-7 h-7"
            data-testid="navbar-logo-img"
          />
          NutriTrack
        </span>
        <div className="flex items-center gap-2 mr-2">
          {/* Reminders button */}
          <button
            aria-label="Reminders"
            data-testid="reminder-btn"
            className={`px-2 py-2 rounded hover:bg-[#ecfdf5] dark:hover:bg-[#233]`}
            onClick={() => setShowReminder(true)}
            type="button"
            title="Show reminders"
          >
            <span className="w-6 h-6" aria-hidden="true">
              <BellIcon />
            </span>
          </button>
          {/* Dark mode toggle */}
          <button
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-testid="darkmode-btn"
            className={`px-2 py-2 rounded hover:bg-[#e0f2fe] dark:hover:bg-[#22344a]`}
            onClick={toggleTheme}
            type="button"
            title="Toggle dark mode"
          >
            <span className="w-6 h-6" aria-hidden="true">
              <MoonIcon />
            </span>
          </button>
        </div>
      </header>
      {/* Reminders Mock Modal */}
      {showReminder && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Reminders Modal"
          data-testid="reminder-modal"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 p-2"
        >
          <div
            className={`bg-white dark:bg-[#252d39] rounded-2xl shadow-lg border w-full max-w-xs md:max-w-sm p-6 flex flex-col items-center`}
          >
            <span
              className="mb-3 w-9 h-9 text-[#f59e42] dark:text-[#ffc362]"
              aria-hidden="true"
              data-testid="reminder-modal-icon"
            >
              <BellIcon />
            </span>
            <div
              className="text-lg font-semibold mb-2 text-[#3b82f6] dark:text-[#79b2f9]"
              data-testid="reminder-modal-title"
            >
              Set Reminders (Demo)
            </div>
            <div
              className="mb-3 text-sm text-gray-700 dark:text-gray-100"
              data-testid="reminder-modal-body"
            >
              Remind yourself to drink water, log meals, or celebrate streaks!<br />
              <span className="text-xs text-gray-400">(This is a mockup. Real reminders coming soon!)</span>
            </div>
            <button
              className="mt-2 px-5 py-2 bg-[#22c55e] dark:bg-[#17914f] text-white rounded font-bold tracking-tight shadow"
              aria-label="Close reminder modal"
              data-testid="reminder-modal-close"
              onClick={() => setShowReminder(false)}
              autoFocus
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Main content */}
      <main
        className="flex-1 pt-16 pb-20 sm:pb-0 max-w-md mx-auto w-full"
        role="main"
        data-testid={`main-content-${active}`}
        aria-live="polite"
      >
        {renderScreen()}
      </main>
      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 w-full border-t shadow-inner z-20 sm:max-w-md sm:mx-auto ${
          theme === "dark" ? "bg-[#16243a]" : "bg-[#f9fafb]"
        }`}
        role="navigation"
        aria-label="Primary bottom navigation"
        data-testid="bottom-nav"
      >
        <div className="flex justify-between items-center h-16">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.screen}
              className={`flex-1 flex flex-col items-center justify-center text-sm px-1 focus:outline-none
                ${active === item.screen ? "text-[#22c55e] font-bold" : (theme === "dark" ? "text-gray-300" : "text-gray-500")}
              `}
              onClick={() => setActive(item.screen)}
              aria-current={active === item.screen ? "true" : "false"}
              tabIndex={0}
              aria-label={item.label}
              data-testid={`nav-btn-${item.screen}`}
              id={`nav-item-${item.screen}`}
              type="button"
            >
              <span className="w-6 h-6 mb-1" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
