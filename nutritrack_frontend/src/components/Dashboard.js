import React from "react";

/**
 * PUBLIC_INTERFACE
 * Dashboard component for NutriTrack.
 * Shows daily nutritional summary, water intake, and visual progress indicators with mock data.
 * Mobile-first and styled using Tailwind and NutriTrack colors.
 */
function Dashboard() {
  // Mock data for daily summary
  const summary = {
    calories: { current: 1520, goal: 2000 },
    protein: { current: 90, goal: 120 }, // grams
    carbs: { current: 180, goal: 230 },
    fat: { current: 50, goal: 70 },
    fiber: { current: 21, goal: 30 },
    water: { current: 1200, goal: 2000 }, // ml
  };

  // Progress calculation (0-100)
  const progress = (current, goal) =>
    Math.min(100, Math.round((current / goal) * 100));

  // For accessibility tooltip
  const tooltip =
    "Shows your progress towards today's nutrition and hydration goals.";

  return (
    <div
      className="w-full px-2 sm:px-4 py-2"
      aria-label="Daily Nutrition Summary"
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <span role="img" aria-label="dashboard">
            📊
          </span>
          Dashboard
        </h2>
        <span
          tabIndex={0}
          className="ml-2 cursor-pointer inline-block relative"
        >
          <svg
            className="w-4 h-4 text-secondary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-label="Info"
            data-tooltip-target="dashboard-tooltip"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          <span
            className="absolute left-5 bottom-0 transform -translate-y-2 bg-gray-800 text-xs rounded px-2 py-1 text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none z-10"
            id="dashboard-tooltip"
            role="tooltip"
          >
            {tooltip}
          </span>
        </span>
      </header>
      {/* Calorie Progress */}
      <div className="rounded-xl bg-accent shadow p-4 mb-3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-secondary">
            Calories
          </span>
          <span className="text-lg font-bold text-primary">
            {summary.calories.current} / {summary.calories.goal} kcal
          </span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="h-3 bg-primary rounded-full transition-all"
            style={{
              width: `${progress(
                summary.calories.current,
                summary.calories.goal
              )}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-400">
          <span>0</span>
          <span>{summary.calories.goal} kcal</span>
        </div>
      </div>

      {/* Macronutrient Breakdown */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-3">
        {["protein", "carbs", "fat", "fiber"].map((key) => (
          <div
            key={key}
            className="bg-white rounded-lg p-3 shadow flex flex-col items-center"
          >
            <span className="font-bold text-primary capitalize">
              {key}
            </span>
            <span className="text-secondary text-lg font-mono">
              {summary[key].current}g
            </span>
            <div className="w-full mt-1">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    key === "protein"
                      ? "bg-green-400"
                      : key === "carbs"
                      ? "bg-blue-400"
                      : key === "fat"
                      ? "bg-yellow-400"
                      : "bg-indigo-300"
                  }`}
                  style={{
                    width: `${progress(
                      summary[key].current,
                      summary[key].goal
                    )}%`,
                  }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-400 mt-1">
              Goal: {summary[key].goal}g
            </span>
          </div>
        ))}
      </div>

      {/* Water Intake Card */}
      <div
        className="rounded-xl bg-white shadow p-4 flex items-center gap-3"
        aria-label="Water Intake Progress"
      >
        <div className="flex flex-col items-center mr-3">
          <svg
            className="h-9 w-9 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              d="M7 17a5 5 0 0010 0c0-3.333-5-9.5-5-9.5S7 13.667 7 17z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-500">Water</span>
            <span className="font-mono text-sm text-gray-500">
              {summary.water.current} / {summary.water.goal} ml
            </span>
          </div>
          <div className="w-full bg-blue-100 h-2 rounded-full mt-1">
            <div
              className="h-2 bg-blue-400 rounded-full transition-all"
              style={{
                width: `${progress(
                  summary.water.current,
                  summary.water.goal
                )}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
