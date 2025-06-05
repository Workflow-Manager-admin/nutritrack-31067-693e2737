import React from "react";

/**
 * PUBLIC_INTERFACE
 * DashboardScreen provides a daily summary of calories, macros, water, and progress visuals.
 * Uses mock data and visually modern cards, charts, and progress bars.
 */
export function DashboardScreen() {
  // Mock: daily intake/goals
  const dailyGoals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 70,
    fiber: 30,
    water: 2000, // ml
  };
  const actual = {
    calories: 1650,
    protein: 95,
    carbs: 180,
    fat: 51,
    fiber: 22,
    water: 1450,
  };

  const items = [
    {
      title: "Calories",
      icon: (
        <svg viewBox="0 0 26 26" className="w-6 h-6 text-[#ff9f43]" fill="none">
          <circle cx="13" cy="13" r="12" stroke="#ff9f43" strokeWidth="2" fill="#fffceb"/>
          <path d="M13 7v6l4 2" stroke="#ff9f43" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      actual: actual.calories,
      goal: dailyGoals.calories,
      color: "#22c55e"
    },
    {
      title: "Protein",
      icon: (
        <svg viewBox="0 0 26 26" className="w-6 h-6 text-[#3b82f6]" fill="none">
          <circle cx="13" cy="13" r="12" stroke="#3b82f6" strokeWidth="2" fill="#f0f9ff"/>
          <path d="M10 18s0-7 3-10c1-1 3-1 4 0 1 2-3 5-3 10" stroke="#3b82f6" strokeWidth="1.3" fill="none"/>
        </svg>
      ),
      actual: actual.protein,
      goal: dailyGoals.protein,
      color: "#3b82f6"
    },
    {
      title: "Carbs",
      icon: (
        <svg viewBox="0 0 26 26" className="w-6 h-6 text-[#a3e635]" fill="none">
          <circle cx="13" cy="13" r="12" stroke="#a3e635" strokeWidth="2" fill="#f8fde5"/>
          <rect x="8" y="8" width="10" height="10" rx="3" fill="#a3e635" fillOpacity={0.15} stroke="#a3e635" strokeWidth="1"/>
        </svg>
      ),
      actual: actual.carbs,
      goal: dailyGoals.carbs,
      color: "#a3e635"
    },
    {
      title: "Fat",
      icon: (
        <svg viewBox="0 0 26 26" className="w-6 h-6 text-[#f59e42]" fill="none">
          <ellipse cx="13" cy="13" rx="11" ry="7" stroke="#f59e42" strokeWidth="2" fill="#fff7ec"/>
          <ellipse cx="13" cy="13" rx="5" ry="3" fill="#f59e42" fillOpacity={0.12}/>
        </svg>
      ),
      actual: actual.fat,
      goal: dailyGoals.fat,
      color: "#f59e42"
    },
    {
      title: "Fiber",
      icon: (
        <svg viewBox="0 0 26 26" className="w-6 h-6 text-[#6ee7b7]" fill="none">
          <rect x="3" y="7" width="20" height="12" rx="6" stroke="#6ee7b7" strokeWidth="2" fill="#edfcf9"/>
          <rect x="8" y="10" width="5" height="6" rx="3" fill="#6ee7b7" fillOpacity={0.12}/>
        </svg>
      ),
      actual: actual.fiber,
      goal: dailyGoals.fiber,
      color: "#6ee7b7"
    },
    {
      title: "Water",
      icon: (
        <svg viewBox="0 0 26 26" className="w-6 h-6 text-[#38bdf8]" fill="none">
          <ellipse cx="13" cy="16" rx="9" ry="6" stroke="#38bdf8" strokeWidth="2" fill="#e0f2fe"/>
          <path d="M13 4c0 4-4 9-4 12 0 3.3 7.75 3.4 8 0 .21-2.8-4-8-4-12z" fill="#38bdf8" fillOpacity={0.13} stroke="#38bdf8" strokeWidth="1"/>
        </svg>
      ),
      actual: actual.water,
      goal: dailyGoals.water,
      color: "#38bdf8"
    },
  ];

  // Compute percentage (<100 capped at 100%)
  function getPct(actualVal, goalVal) {
    return Math.min(100, Math.round((actualVal / goalVal) * 100));
  }

  // Format title suffix
  function unitSuffix(title) {
    if (title === "Water") return "ml";
    if (title === "Calories") return "kcal";
    return "g";
  }

  // Responsive: grid 2 on mobile, 3 on sm+
  return (
    <section
      className="p-4 bg-[#f6f7fa] min-h-[93vh] flex flex-col"
      data-testid="dashboard-section"
      aria-labelledby="dashboard-header"
    >
      <h2
        id="dashboard-header"
        className="mb-1 text-lg font-semibold text-[#22c55e] leading-tight tracking-tight"
        data-testid="dashboard-title"
      >
        Today's Nutrition Summary
      </h2>
      {/* Overall Calories Progress (big card) */}
      <div
        className="bg-white rounded-xl border shadow-md mb-4 p-4 flex items-center gap-4"
        data-testid="card-calories"
        aria-label="calories-goal-progress"
      >
        <div className="flex-shrink-0" aria-hidden="true">{items[0].icon}</div>
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1 font-medium text-gray-700">
            <span>Calories</span>
            <span
              className="font-bold text-[#22c55e]"
              data-testid="calories-value"
            >
              {actual.calories} / {dailyGoals.calories} kcal
            </span>
          </div>
          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
            <div
              className="absolute h-3 left-0 top-0 rounded-full transition-all duration-300"
              style={{ width: `${getPct(actual.calories, dailyGoals.calories)}%`, background: items[0].color }}
              aria-valuenow={getPct(actual.calories, dailyGoals.calories)}
              aria-valuemax={100}
              aria-label="calories-progress-bar"
              role="progressbar"
              data-testid="calories-progressbar"
            />
          </div>
          <div className="text-xs font-medium text-gray-400">
            {getPct(actual.calories, dailyGoals.calories)}% of your daily goal
          </div>
        </div>
      </div>

      {/* Macro progress cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {items.slice(1).map((item, i) => (
          <div
            key={item.title}
            className="bg-white border rounded-lg p-3 shadow flex flex-col min-h-[98px] justify-between"
            data-testid={`macro-card-${item.title.toLowerCase()}`}
            aria-label={`${item.title} goal card`}
          >
            <div className="flex justify-between items-center pb-1">
              <span className="font-medium flex items-center gap-1">
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.title}</span>
              </span>
              <span
                className="font-bold"
                style={{ color: item.color }}
                data-testid={`macro-value-${item.title.toLowerCase()}`}
              >
                {item.actual}/{item.goal} {unitSuffix(item.title)}
              </span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-1 mt-1">
              <div
                style={{
                  width: `${getPct(item.actual, item.goal)}%`,
                  background: item.color
                }}
                className="absolute h-2 left-0 top-0 rounded-full transition-all duration-300"
                aria-label={`${item.title} progress bar`}
                role="progressbar"
                aria-valuenow={getPct(item.actual, item.goal)}
                aria-valuemax={100}
                data-testid={`macro-bar-${item.title.toLowerCase()}`}
              />
            </div>
            <span className="text-xs text-gray-400">
              {getPct(item.actual, item.goal)}% goal
            </span>
          </div>
        ))}
      </div>

      {/* Water visual (simple circular chart style) */}
      <div className="flex items-center justify-between gap-4 mb-1 bg-white border rounded-xl shadow p-3">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 34 34" className="w-10 h-10" fill="none">
            <circle
              cx="17"
              cy="17"
              r="15"
              stroke="#dbeafe"
              strokeWidth={4}
              fill="#f0f9ff"
            />
            <circle
              cx="17"
              cy="17"
              r="15"
              stroke="#38bdf8"
              strokeWidth={4}
              strokeDasharray={94}
              strokeDashoffset={94 - (94 * getPct(actual.water, dailyGoals.water) / 100)}
              fill="none"
              transform="rotate(-90 17 17)"
            />
            {/* Simple drop icon */}
            <path d="M17 9C17 9 12 15.04 12 20a5 5 0 0 0 10 0c0-4.96-5-11-5-11z"
                  stroke="#38bdf8" strokeWidth={1.5} fill="#e0f2fe" />
          </svg>
          <div>
            <div className="text-md font-bold text-[#38bdf8]">{actual.water}/{dailyGoals.water} ml</div>
            <div className="text-xs text-gray-500">Water Intake</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 font-medium">
          {getPct(actual.water, dailyGoals.water)}% goal
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400 text-center">
        Data is mock. Icons are placeholders. Visual feedback will be enhanced over time.
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
export function AddMealScreen() {
  // All state is local mock; image upload/preview, macros input, log meal
  return (
    <section className="h-full flex flex-col p-5">
      <div className="text-lg font-semibold mb-2 text-[#3b82f6]">Add Meal</div>
      <div className="bg-white rounded-lg border shadow p-4 flex flex-col gap-2">
        <label className="text-xs mb-1">Upload Dish Image (mock)</label>
        <input type="file" accept="image/*" disabled className="opacity-60 cursor-not-allowed" />
        <div className="my-2 text-gray-400 text-xs">[Image upload is placeholder]</div>
        <label className="text-xs">Dish Name</label>
        <input className="border px-2 py-1 rounded" placeholder="e.g. Grilled Chicken" />
        <label className="text-xs">Quantity</label>
        <input className="border px-2 py-1 rounded" placeholder="e.g. 1 plate" />
        <div className="flex gap-1 text-gray-500 text-xs">
          <span>Estimated: 400 kcal | 30g P | 20g C | 12g F</span>
          <span className="pl-2">(Edit coming soon)</span>
        </div>
        <button className="bg-[#22c55e] text-white p-2 rounded mt-2">Log Meal</button>
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * WaterTrackerScreen - Responsive water intake tracker screen.
 * Lets users add set amounts or custom ml, shows a running tally,
 * and a visual animated water bottle fill. Layout and controls styled with TailwindCSS.
 * All logic is mock/state-only.
 */
export function WaterTrackerScreen() {
  const DAILY_GOAL = 2000; // In ml
  const [water, setWater] = React.useState(0); // ml log
  const [customML, setCustomML] = React.useState(""); // For custom input

  function addWater(amount) {
    setWater((prev) => Math.min(DAILY_GOAL, prev + amount));
  }

  function handleCustomInput(e) {
    const val = e.target.value.replace(/[^0-9]/g,"");
    setCustomML(val);
  }

  function addCustom() {
    const value = parseInt(customML, 10);
    if (!isNaN(value) && value > 0) {
      addWater(value);
      setCustomML("");
    }
  }

  // percent full capped at 100
  const pct = Math.min(100, Math.round((water / DAILY_GOAL) * 100));

  return (
    <section className="flex flex-col items-center justify-start pt-10 gap-6 min-h-[89vh] bg-[#f6f7fa] px-2">
      <div className="text-lg sm:text-xl font-bold tracking-tight text-[#38bdf8] mb-1">
        Water Intake Tracker
      </div>

      {/* Bottle Visual */}
      <div className="relative h-44 flex flex-col items-center mt-2 mb-2">
        <div className="w-16 sm:w-20 h-40 sm:h-48 rounded-b-3xl border-4 border-[#3b82f6] bg-[#e0f2fe] flex flex-col justify-end overflow-hidden shadow-inner">
          <div
            className="bg-[#38bdf8] w-full transition-all duration-500"
            style={{
              height: `${pct}%`,
              minHeight: (water === 0 ? 0 : 8),
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              opacity: pct > 0 ? 0.95 : 0.4,
            }}
          />
        </div>
        <span className="absolute inset-x-0 top-[60%] text-center font-semibold text-md text-[#3b82f6] select-none pointer-events-none drop-shadow">
          {water} <span className="text-xs font-normal">/ {DAILY_GOAL} ml</span>
        </span>
      </div>

      {/* Tally & Visual Feedback */}
      <div className="text-sm text-gray-500 mb-1">
        {pct >= 100 ? (
          <span className="text-[#22c55e] font-bold">🎉 Goal reached!</span>
        ) : (
          <>
            <span className="font-medium">{pct}%</span> of daily goal ({DAILY_GOAL} ml)
          </>
        )}
      </div>

      {/* Controls: preset buttons + custom */}
      <div className="flex flex-col gap-3 items-center w-full max-w-xs">
        <div className="flex gap-3 w-full">
          <button
            className="bg-[#22c55e] hover:bg-[#16a34a] transition-colors text-white font-semibold py-2 px-5 rounded flex-1"
            onClick={() => addWater(200)}
            disabled={pct >= 100}
          >+200ml</button>
          <button
            className="bg-[#3b82f6] hover:bg-[#1e56c6] transition-colors text-white font-semibold py-2 px-5 rounded flex-1"
            onClick={() => addWater(100)}
            disabled={pct >= 100}
          >+100ml</button>
        </div>
        <form
          className="flex gap-2 w-full"
          onSubmit={e => { e.preventDefault(); addCustom(); }}
        >
          <input
            type="number"
            min="1"
            max={DAILY_GOAL - water}
            inputMode="numeric"
            pattern="[0-9]*"
            value={customML}
            onChange={handleCustomInput}
            className="border border-[#3b82f6] text-[#222] px-2 py-1 rounded w-full flex-1 bg-white"
            placeholder="Custom (ml)"
            disabled={pct >= 100}
          />
          <button
            type="submit"
            className="bg-[#38bdf8] text-white px-3 py-1.5 rounded"
            disabled={!customML || pct >= 100}
          >Add</button>
        </form>
      </div>

      {/* Reset button for demo */}
      <button
        className="mt-3 text-xs text-gray-400 underline hover:text-[#3b82f6] transition"
        onClick={() => setWater(0)}
        style={{visibility: water > 0 ? "visible" : "hidden"}}
      >Reset</button>

      <div className="mt-6 text-xs text-gray-400 text-center px-2">
        Visual feedback is a placeholder. All logic is in-memory mock. Bottle and controls adapt for mobile or desktop.
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * UserProfileScreen provides a responsive user profile form (height, weight, age, gender, goals) and a BMI/goal summary card.
 * All fields are Tailwind-styled, adaptive for mobile/desktop, visually separated, and update local state. BMI is mock-calculated on-the-fly.
 * Main navigation integration is automatic (screen routed via MainContainer).
 */
export function UserProfileScreen() {
  // Profile state, with string defaults for input compatibility
  const [profile, setProfile] = React.useState({
    name: "Alex Example", // Hidden for now
    age: "28",
    gender: "Other",
    height: "172",
    weight: "72",
    goal_calories: "2000",
    goal_water: "2000",
  });

  // BMI calculation: weight (kg) / (height (m)^2)
  function calcBMI(height, weight) {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return "--";
    const bmi = w / (h * h);
    return bmi > 0 ? bmi.toFixed(1) : "--";
  }
  const bmi = calcBMI(profile.height, profile.weight);

  // Save handler (mock, provides visual feedback)
  const [saved, setSaved] = React.useState(false);
  function handleProfileChange(field, val) {
    setSaved(false);
    setProfile((prev) => ({ ...prev, [field]: val }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <section className="px-2 pb-20 pt-6 max-w-md mx-auto w-full flex flex-col gap-5 bg-[#f6f7fa] min-h-[93vh]">
      <div className="text-lg sm:text-xl font-bold tracking-tight text-[#22c55e] mb-2 text-center">User Profile</div>
      {/* Responsive two-column on desktop, single on mobile */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Profile Form */}
        <form
          className="flex-1 bg-white shadow border rounded-xl p-4 flex flex-col gap-3"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {/* Age, Gender, Height, Weight */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex gap-2 items-center">
              <label htmlFor="age" className="font-medium text-gray-700 w-20">Age</label>
              <input
                id="age"
                type="number"
                min="1"
                className="w-20 border border-gray-300 rounded px-2 py-1 text-base"
                value={profile.age}
                onChange={e => handleProfileChange("age", e.target.value)}
                required
              />
              <label htmlFor="gender" className="font-medium text-gray-700 ml-3 w-16 text-right">Gender</label>
              <select
                id="gender"
                className="border border-gray-300 rounded px-2 py-1"
                value={profile.gender}
                onChange={e => handleProfileChange("gender", e.target.value)}
                required
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="height" className="font-medium text-gray-700 w-20">Height</label>
              <input
                id="height"
                type="number"
                min="50"
                max="250"
                className="w-20 border border-gray-300 rounded px-2 py-1"
                value={profile.height}
                onChange={e => handleProfileChange("height", e.target.value)}
                required
              />
              <span className="ml-1 text-sm text-gray-500">cm</span>
              <label htmlFor="weight" className="font-medium text-gray-700 ml-3 w-16 text-right">Weight</label>
              <input
                id="weight"
                type="number"
                min="20"
                max="220"
                className="w-20 border border-gray-300 rounded px-2 py-1"
                value={profile.weight}
                onChange={e => handleProfileChange("weight", e.target.value)}
                required
              />
              <span className="ml-1 text-sm text-gray-500">kg</span>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-1">
            <label htmlFor="goal_calories" className="font-medium text-gray-700 w-32">Calories Goal</label>
            <input
              id="goal_calories"
              type="number"
              min="500"
              max="7000"
              className="w-28 border border-gray-300 rounded px-2 py-1"
              value={profile.goal_calories}
              onChange={e => handleProfileChange("goal_calories", e.target.value)}
              required
            />
            <span className="ml-1 text-sm text-gray-500">kcal/day</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="goal_water" className="font-medium text-gray-700 w-32">Water Goal</label>
            <input
              id="goal_water"
              type="number"
              min="500"
              max="10000"
              className="w-28 border border-gray-300 rounded px-2 py-1"
              value={profile.goal_water}
              onChange={e => handleProfileChange("goal_water", e.target.value)}
              required
            />
            <span className="ml-1 text-sm text-gray-500">ml/day</span>
          </div>
          <button
            className="mt-4 bg-[#22c55e] text-white px-4 py-2 rounded font-semibold shadow hover:bg-[#15803d] transition text-base"
            type="submit"
          >
            {saved ? "Saved!" : "Save Profile"}
          </button>
          <span className="block text-xs text-gray-400 mt-1 mb-2">Profile changes persist for this session only.</span>
        </form>

        {/* BMI & Goal Summary Card */}
        <div className="flex-1 rounded-xl bg-white border shadow p-4 flex flex-col items-center gap-3 max-w-xs mx-auto">
          <div className="w-full text-base font-semibold mb-1 flex items-center justify-center gap-2 text-[#3b82f6]">
            <svg className="w-5 h-5" viewBox="0 0 22 22" fill="none"><rect x="1" y="1" width="20" height="20" rx="5" fill="#e0f2fe"/><path d="M11 6v7.5l4 2" stroke="#3b82f6" strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg>
            Health Overview
          </div>
          {/* BMI Box */}
          <div className="flex flex-col items-center w-full mb-2">
            <div className="text-xs text-gray-500 mb-0.5">BMI (mock):</div>
            <div className="text-2xl font-bold text-[#38bdf8] mb-0">{bmi}</div>
            <span className="text-sm text-gray-400 font-medium">
              {bmi !== "--" ? (
                bmi < 18.5 ? "Underweight"
                  : bmi < 25 ? "Normal"
                  : bmi < 30 ? "Overweight"
                  : "Obese"
              ) : "(set height/weight)"}
            </span>
          </div>
          {/* Goal Quick Overview */}
          <div className="w-full flex flex-col gap-1 bg-[#f0f9ff] rounded-xl p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Calories Goal</span>
              <span className="font-semibold text-[#22c55e] text-sm">{profile.goal_calories || "--"} kcal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Water Goal</span>
              <span className="font-semibold text-[#38bdf8] text-sm">{profile.goal_water || "--"} ml</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">
            BMI and goals are for guidance only.<br />
            <span className="italic">No profile data is saved to a server.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * MealHistoryScreen - Scrollable, engaging meal log with images, macros, and quantities.
 * Uses mock data, mobile-friendly, modern TailwindCSS.
 */
export function MealHistoryScreen() {
  // Mock meals with a few dates
  const dummyMeals = [
    {
      id: 101,
      date: "2024-06-03",
      dish: "Berry Yogurt Parfait",
      image: "https://img.icons8.com/color/48/yogurt.png",
      quantity: "1 glass",
      calories: 190,
      protein: 7,
      carbs: 28,
      fat: 4,
    },
    {
      id: 102,
      date: "2024-06-03",
      dish: "Spinach Omelette",
      image: "https://img.icons8.com/fluency/48/egg.png",
      quantity: "2 eggs",
      calories: 210,
      protein: 16,
      carbs: 2,
      fat: 13,
    },
    {
      id: 103,
      date: "2024-06-02",
      dish: "Chicken Rice Bowl",
      image: "https://img.icons8.com/fluency/48/chicken-leg.png",
      quantity: "1 bowl",
      calories: 480,
      protein: 34,
      carbs: 52,
      fat: 14,
    },
    {
      id: 104,
      date: "2024-06-02",
      dish: "Greek Salad",
      image: "https://img.icons8.com/color/48/salad.png",
      quantity: "1 plate",
      calories: 175,
      protein: 6,
      carbs: 14,
      fat: 9,
    },
    {
      id: 105,
      date: "2024-06-01",
      dish: "Avocado Toast",
      image: "https://img.icons8.com/color/48/avocado.png",
      quantity: "2 slices",
      calories: 265,
      protein: 8,
      carbs: 32,
      fat: 12,
    },
    {
      id: 106,
      date: "2024-06-01",
      dish: "Banana",
      image: "https://img.icons8.com/color/48/banana.png",
      quantity: "1 pc",
      calories: 105,
      protein: 1,
      carbs: 27,
      fat: 0,
    },
  ];

  // Group meals by date (most recent first)
  const mealsByDate = {};
  for (const meal of dummyMeals) {
    if (!mealsByDate[meal.date]) mealsByDate[meal.date] = [];
    mealsByDate[meal.date].push(meal);
  }
  const sortedDates = Object.keys(mealsByDate).sort((a, b) => b.localeCompare(a));

  return (
    <section className="px-2 pb-20 pt-2 max-w-md mx-auto w-full bg-[#f6f7fa] min-h-[93vh] flex flex-col">
      <div className="text-lg sm:text-xl font-bold tracking-tight text-[#22c55e] mb-3 text-center">Meal History</div>
      <div className="flex-1 flex flex-col gap-3 max-h-[67vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#22c55e]/30 scrollbar-track-transparent pr-1">
        {sortedDates.map((date) => (
          <div key={date}>
            <div className="text-xs font-semibold mb-2 mt-2 text-gray-500 tracking-tight">{new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric"})}</div>
            {mealsByDate[date].map((meal) => (
              <div
                key={meal.id}
                className="group transition hover:ring-2 hover:ring-[#22c55e]/70 flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2 shadow-sm mb-1"
              >
                <img
                  src={meal.image}
                  alt={meal.dish}
                  className="w-14 h-14 object-cover rounded-xl border border-[#e5e7eb] bg-[#fafafc] group-hover:scale-105 group-hover:shadow transition"
                  loading="lazy"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <span className="font-bold text-gray-800 truncate">{meal.dish}</span>
                  <span className="text-[11px] text-gray-400 mb-1">{meal.quantity}</span>
                  <div className="flex flex-row gap-2 flex-wrap items-center text-xs text-gray-500 font-medium">
                    <span className="font-semibold text-[#22c55e] bg-[#e3ffe3] px-2 py-0.5 rounded mr-1">🔥 {meal.calories} kcal</span>
                    <span className="bg-[#e0f2fe] text-[#3b82f6] px-1.5 py-0.5 rounded">P:{meal.protein}g</span>
                    <span className="bg-[#f8fde5] text-[#a3e635] px-1.5 py-0.5 rounded">C:{meal.carbs}g</span>
                    <span className="bg-[#fff7ec] text-[#f59e42] px-1.5 py-0.5 rounded">F:{meal.fat}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-3 text-center">Mock data, for demo only – logging, scroll, & style are live.</div>
    </section>
  );
}

// PUBLIC_INTERFACE
/**
 * Placeholder for all not-yet-enabled features.
 */
export function ComingSoonScreen({ name }) {
  return (
    <section className="flex flex-col items-center justify-center pt-12 pb-20">
      <div className="text-3xl text-gray-300 mb-4">🚧</div>
      <div className="text-lg text-gray-500">"{name}" Coming Soon!</div>
    </section>
  );
}
