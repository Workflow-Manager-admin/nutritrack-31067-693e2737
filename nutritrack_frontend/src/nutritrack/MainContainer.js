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
  // Show add meal/water as modal on mobile? Optional, handled as route/tab here

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
      className="min-h-screen flex flex-col bg-[#ffffff]"
      data-testid="main-container"
    >
      {/* Header/Brand */}
      <header
        className="flex justify-center items-center py-4 border-b bg-white shadow-sm fixed top-0 w-full z-10"
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
      </header>
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
        className="fixed bottom-0 left-0 right-0 w-full bg-[#f9fafb] border-t shadow-inner z-20 sm:max-w-md sm:mx-auto"
        role="navigation"
        aria-label="Primary bottom navigation"
        data-testid="bottom-nav"
      >
        <div className="flex justify-between items-center h-16">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.screen}
              className={`flex-1 flex flex-col items-center justify-center text-sm px-1 focus:outline-none
                ${active === item.screen ? "text-[#22c55e] font-bold" : "text-gray-500"}
              `}
              onClick={() => setActive(item.screen)}
              aria-current={active === item.screen ? "true" : "false"}
              tabIndex={0}
              aria-label={item.label}
              data-testid={`nav-btn-${item.screen}`}
              id={`nav-item-${item.screen}`}
            >
              <span className="w-6 h-6 mb-1" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      {/* Disabled Features Stub (optionally visible in overflow menu or ignore for now) */}
      {/* <div className="hidden">{DISABLED_FEATURES.map(...</div> */}
    </div>
  );
}
