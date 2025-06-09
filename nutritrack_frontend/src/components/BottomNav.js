import React from "react";

// PUBLIC_INTERFACE
function BottomNav({ current, onChange }) {
  /** This renders the bottom navigation bar. */
  // Simple SVG icons for better accessibility (aria-label for screen readers)
  const items = [
    { key: "dashboard", label: "Dashboard", icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="5" height="11" rx="1"/><rect x="11" y="6" width="5" height="15" rx="1"/><rect x="18" y="2" width="5" height="19" rx="1"/></svg>
    )},
    { key: "addmeal", label: "Add Meal", icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="14" cy="14" r="11"/><line x1="14" y1="9" x2="14" y2="19"/><line x1="9" y1="14" x2="19" y2="14"/></svg>
    )}, 
    { key: "water", label: "Water", icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 4C13 4 21 16 13 22C5 16 13 4 13 4Z"/><circle cx="13" cy="17" r="2.3"/></svg>
    )},
    { key: "profile", label: "Profile", icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13" cy="9" r="5"/><path d="M3.5 22c1.5-4 6-7 9.5-7s8 3 9.5 7"/></svg>
    )},
    { key: "history", label: "History", icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13" cy="13" r="10"/><path d="M13 7v6l4 2"/></svg>
    )},
  ];
  return (
    <nav className="nt-bottom-nav" aria-label="Main navigation">
      {items.map(item => (
        <button
          key={item.key}
          className={`nt-nav-btn${current === item.key ? " nt-nav-active" : ""}`}
          onClick={() => onChange(item.key)}
          aria-label={item.label}
          tabIndex={0}
        >
          <span className="nt-nav-icon">{item.icon}</span>
          <span className="nt-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
