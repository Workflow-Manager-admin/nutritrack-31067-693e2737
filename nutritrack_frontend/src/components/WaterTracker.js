import React, { useState } from "react";

// PUBLIC_INTERFACE
function WaterTracker({ water, onAddWater, goal, onClose }) {
  /** Water intake tracker: add water (ml), show progress */
  const [amount, setAmount] = useState(250);
  const [inputMode, setInputMode] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);

  // Progress bar percent
  const percent = Math.min(100, Math.round((water / (goal || 2000)) * 100));

  // Accessible water bottle composition
  return (
    <div className="nt-modal nt-water-modal" role="dialog" aria-modal="true" aria-label="Water Intake Tracker">
      <button className="nt-close" aria-label="Close water tracker" onClick={onClose}>×</button>
      <h2>Water Tracker</h2>
      <div className="nt-water-progress-visual" aria-label="Water progress visual">
        <svg viewBox="0 0 48 80" width="48" height="80" aria-hidden>
          <rect x="12" y="16" width="24" height="60" rx="12" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="3"/>
          <rect
            x="12" y={16 + 60 * (1 - percent/100)}
            width="24"
            height={Math.round(60 * percent/100)}
            rx="12"
            fill="#3b82f6"
          />
        </svg>
        <div style={{marginLeft: 16}}>
          <strong>{water} ml</strong> / {goal} ml
          <div className="nt-water-bar-bg">
            <span className="nt-water-bar-fill" style={{width: percent + "%", background: "#3b82f6"}} />
          </div>
          <div className="nt-water-note">
            {percent >= 100 ? "Goal reached! 💧" : percent >= 80 ? "Almost there!" : "Keep sipping!"}
          </div>
        </div>
      </div>
      <div className="nt-water-form" role="form">
        <div className="nt-btn-group">
          {[250, 350, 500].map(v => (
            <button key={v} type="button" className="nt-btn-water" onClick={() => onAddWater(v)}>
              +{v} ml
            </button>
          ))}
          <button type="button" className="nt-btn-water" onClick={()=>setInputMode(m=>!m)}>{inputMode?"Cancel":"Custom"}</button>
        </div>
        {inputMode && (
          <form className="nt-water-custom" onSubmit={e => {
            e.preventDefault();
            if(customAmount > 0) { onAddWater(Number(customAmount)); setCustomAmount(0);}
            setInputMode(false);
          }}>
            <input
              type="number"
              aria-label="Enter custom ml"
              value={customAmount || ""}
              min="10"
              max="2000"
              onChange={e=>setCustomAmount(Math.max(0, Number(e.target.value)))}
              placeholder="ml"
              autoFocus
            />
            <button className="nt-btn-submit" type="submit">
              Add
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default WaterTracker;
