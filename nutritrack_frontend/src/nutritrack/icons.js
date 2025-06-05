import React from "react";

/** Home (Dashboard) Icon */
export function HomeIcon() {
  // PUBLIC_INTERFACE
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 9.75L12 4.5l9 5.25M4.5 10.5V19a.75.75 0 0 0 .75.75h13.5a.75.75 0 0 0 .75-.75V10.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
/** Add Meal Icon */
export function PlusCircleIcon() {
  // PUBLIC_INTERFACE
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" /><path d="M12 8v8M8 12h8" strokeLinecap="round"/>
    </svg>
  );
}
/** Water Drop Icon */
export function WaterDropIcon() {
  // PUBLIC_INTERFACE
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <path d="M12 3C12 3 6 8.88 6 14a6 6 0 0 0 12 0c0-5.12-6-11-6-11z" strokeLinejoin="round"/>
    </svg>
  );
}
/** User (Profile) Icon */
export function UserCircleIcon() {
  // PUBLIC_INTERFACE
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="12" cy="8.5" r="4" stroke="currentColor"/>
      <path d="M4 19c0-2.5 3.58-4 8-4s8 1.5 8 4" strokeLinecap="round"/>
    </svg>
  );
}
/** Clipboard List (History) Icon */
export function ClipboardListIcon() {
  // PUBLIC_INTERFACE
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <rect x="6" y="7" width="12" height="13" rx="2" stroke="currentColor"/>
      <rect x="9" y="2" width="6" height="4" rx="1.5" stroke="currentColor"/>
      <path d="M9 11h6M9 15h4" strokeLinecap="round"/>
    </svg>
  );
}
/** Disabled Icons */
export function MoonIcon() {
  // PUBLIC_INTERFACE
  return <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M20 15A8 8 0 1 1 9 4c0 .5 0 1-.1 1.5A7.02 7.02 0 0 0 20 15z" strokeLinejoin="round"/>
  </svg>;
}
export function FireIcon() {
  // PUBLIC_INTERFACE
  return <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M14 3s3.17 2.61 3.82 6.28C18.59 11.8 15.53 14 13 14c-3.5 0-5-5-5-5s-.21 4.17 3.06 8.5C13.98 20.37 20 19.04 20 15.5c0-1.68-1.18-3.34-2-5.5z" strokeLinejoin="round"/>
  </svg>;
}
export function BellIcon() {
  // PUBLIC_INTERFACE
  return <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3}>
    <path d="M14 20c0 .55-.45 1-1 1h-2a1 1 0 0 1-1-1" />
    <path d="M18 16v-4c0-2.97-2.16-5.43-5-5.92V5a1 1 0 0 0-2 0v1.08C8.16 6.57 6 9.03 6 12v4l-1 1v1h16v-1l-1-1z" strokeLinejoin="round"/>
  </svg>;
}
