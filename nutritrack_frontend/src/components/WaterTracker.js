import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * WaterTracker component for NutriTrack.
 * Lets users log water intake (ml), visualizes progress with a fillable bottle, and uses mock data/state.
 * Mobile-first, styled with Tailwind and NutriTrack palette, includes tooltips and feedback.
 */
function WaterTracker() {
  const WATER_GOAL = 2000; // ml, for mockup
  const [current, setCurrent] = useState(1000);
  const [input, setInput] = useState("");
  const [toolTip, setToolTip] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleAdd() {
    const amount = parseInt(input, 10);
    if (isNaN(amount) || amount <= 0) {
      setFeedback("Please enter a valid amount (ml).");
    } else if (current + amount > WATER_GOAL) {
      setFeedback("You've reached your daily goal!");
      setCurrent(WATER_GOAL);
    } else {
      setCurrent((prev) => prev + amount);
      setFeedback("Logged! Stay hydrated 💧");
    }
    setInput("");
    setTimeout(() => setFeedback(""), 1200);
  }

  // Bottle liquid height
  const bottleFill = Math.min(100, Math.round((current / WATER_GOAL) * 100));

  return (
    <div className="w-full max-w-md mx-auto px-3 py-2">
      <h2 className="text-primary text-xl font-bold flex items-center gap-2 mb-2">
        <span role="img" aria-label="Water">
          💧
        </span>
        Water Tracker
        <span
          tabIndex={0}
          onMouseEnter={() => setToolTip(true)}
          onMouseLeave={() => setToolTip(false)}
          className="relative inline-block ml-1"
        >
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-label="Info"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          {toolTip && (
            <span
              className="absolute left-5 bottom-0 -translate-y-2 bg-gray-800 text-xs rounded px-2 py-1 text-white z-10"
              role="tooltip"
            >
              Track water intake. Goal: {WATER_GOAL}ml
            </span>
          )}
        </span>
      </h2>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
        {/* Bottle visualization */}
        <div className="w-16 flex items-center justify-center relative">
          {/* Bottle SVG with blue fill */}
          <svg
            className="h-20 w-10"
            viewBox="0 0 40 80"
            style={{ minWidth: "40px" }}
          >
            {/* Outline */}
            <rect
              x={10}
              y={8}
              width={20}
              height={60}
              rx={10}
              fill="#e0e7ef"
              stroke="#22c55e"
              strokeWidth={2}
            />
            {/* Fill */}
            <rect
              x={10}
              y={8 + (60 * (1 - bottleFill / 100))}
              width={20}
              height={60 * (bottleFill / 100)}
              rx={bottleFill > 5 ? 10 : 0}
              fill="#3b82f6"
              style={{ transition: "all 0.4s" }}
            />
            {/* Cap */}
            <rect
              x={13}
              y={2}
              width={14}
              height={10}
              rx={3}
              fill="#22c55e"
              stroke="#22c55e"
              strokeWidth={1}
            />
          </svg>
        </div>
        {/* Intake controls */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="water"
              value={input}
              min={10}
              step={10}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add ml (e.g. 250)"
              className="border rounded px-2 py-1 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Enter water amount"
            />
            <button
              type="button"
              className="bg-primary text-accent px-3 py-1 rounded font-semibold hover:bg-secondary focus:ring-2 focus:ring-primary transition"
              onClick={handleAdd}
              aria-label="Add water"
              disabled={!input}
            >
              +
            </button>
          </div>
          <div className="flex items-center text-blue-500 font-bold mt-1 text-sm">
            {current} ml / {WATER_GOAL} ml
          </div>
          {feedback && (
            <span className="text-xs text-green-600 mt-1">{feedback}</span>
          )}
          <div className="w-full h-2 bg-blue-100 rounded mt-2">
            <div
              className="h-2 bg-blue-400 rounded transition-all"
              style={{ width: `${bottleFill}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaterTracker;
