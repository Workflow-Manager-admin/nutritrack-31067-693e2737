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
    <section className="p-4 bg-[#f6f7fa] min-h-[93vh] flex flex-col">
      <h2 className="mb-1 text-lg font-semibold text-[#22c55e] leading-tight tracking-tight">Today's Nutrition Summary</h2>
      {/* Overall Calories Progress (big card) */}
      <div className="bg-white rounded-xl border shadow-md mb-4 p-4 flex items-center gap-4">
        <div className="flex-shrink-0">{items[0].icon}</div>
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1 font-medium text-gray-700">
            <span>Calories</span>
            <span className="font-bold text-[#22c55e]">{actual.calories} / {dailyGoals.calories} kcal</span>
          </div>
          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
            <div
              className="absolute h-3 left-0 top-0 rounded-full transition-all duration-300"
              style={{ width: `${getPct(actual.calories, dailyGoals.calories)}%`, background: items[0].color }}
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
          <div key={item.title}
            className="bg-white border rounded-lg p-3 shadow flex flex-col min-h-[98px] justify-between">
            <div className="flex justify-between items-center pb-1">
              <span className="font-medium flex items-center gap-1">{item.icon}<span>{item.title}</span></span>
              <span className="font-bold" style={{ color: item.color }}>
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

// PUBLIC_INTERFACE
export function WaterTrackerScreen() {
  // Basic glass-adding logic with state
  const [water, setWater] = React.useState(1400);
  const goal = 2000;
  function addWater(amount) {
    setWater((w) => Math.min(goal, w + amount));
  }
  return (
    <section className="flex flex-col items-center justify-center pt-8 gap-3">
      <div className="text-lg font-semibold text-[#38bdf8]">Water Intake</div>
      <div className="relative flex flex-col items-center my-4">
        {/* Water bottle visual: fill effect w/height by percent */}
        <div className="w-14 h-36 rounded-b-2xl border-4 border-[#3b82f6] bg-[#e0f2fe] flex flex-col justify-end overflow-hidden">
          <div
            className="bg-[#38bdf8] w-full transition-all"
            style={{ height: `${Math.round((water / goal) * 100)}%`, minHeight: 8 }}
          />
        </div>
        <span className="mt-2 font-bold text-base">{water} / {goal} ml</span>
        <span className="text-xs text-gray-500">Goal: {goal}ml</span>
      </div>
      <div className="flex gap-4 mt-2">
        <button className="bg-[#22c55e] px-4 py-2 rounded text-white" onClick={() => addWater(200)}>
          +200ml
        </button>
        <button className="bg-[#3b82f6] px-4 py-2 rounded text-white" onClick={() => addWater(100)}>
          +100ml
        </button>
      </div>
      <span className="text-xs text-gray-400 mt-2">Visual feedback is a placeholder.</span>
    </section>
  );
}

// PUBLIC_INTERFACE
export function UserProfileScreen() {
  // Local state for mock profile
  const [profile, setProfile] = React.useState({
    name: "Alex Example",
    age: 28,
    gender: "Other",
    height: 172,
    weight: 72,
    bmi: 24.3,
    goal_calories: 2000,
    goal_water: 2000,
  });

  return (
    <section className="p-5">
      <div className="text-lg font-semibold text-[#3b82f6] mb-3">User Profile</div>
      <div className="bg-white shadow border rounded-lg p-4 space-y-2">
        <div className="flex">
          <span className="mr-2 font-medium">Name:</span>
          <span>{profile.name}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">Age:</span>
          <input
            className="w-16 border rounded px-1"
            value={profile.age}
            onChange={e => setProfile({ ...profile, age: e.target.value })}
            type="number"
            min="0"
          />
          <span className="font-medium ml-2">Gender:</span>
          <select
            className="border rounded px-1"
            value={profile.gender}
            onChange={e => setProfile({ ...profile, gender: e.target.value })}
          >
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">Height:</span>
          <input className="w-16 border rounded px-1" value={profile.height}
            onChange={e => setProfile({ ...profile, height: e.target.value })}
            type="number" min="0" /> <span>cm</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">Weight:</span>
          <input className="w-16 border rounded px-1" value={profile.weight}
            onChange={e => setProfile({ ...profile, weight: e.target.value })}
            type="number" min="0" /> <span>kg</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">BMI:</span>
          <span>{profile.bmi}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">Goal Calories:</span>
          <input className="w-20 border rounded px-1" value={profile.goal_calories}
            onChange={e => setProfile({ ...profile, goal_calories: e.target.value })}
            type="number" min="0" /> <span>kcal/day</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">Goal Water:</span>
          <input className="w-20 border rounded px-1" value={profile.goal_water}
            onChange={e => setProfile({ ...profile, goal_water: e.target.value })}
            type="number" min="0" /> <span>ml/day</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">BMI calculation and profile persistence are placeholders.</div>
    </section>
  );
}

// PUBLIC_INTERFACE
export function MealHistoryScreen() {
  // Mock meal log, with date, dish, more
  const dummyMeals = [
    {
      id: 1,
      date: "2024-06-01",
      dish: "Omelette + Toast",
      image: "https://img.icons8.com/fluency/48/egg.png",
      quantity: "1 plate",
      calories: 280,
      protein: 18,
      carbs: 22,
      fat: 10,
    },
    {
      id: 2,
      date: "2024-06-01",
      dish: "Salad Bowl",
      image: "https://img.icons8.com/color/48/salad.png",
      quantity: "1 bowl",
      calories: 220,
      protein: 6,
      carbs: 30,
      fat: 8,
    },
    {
      id: 3,
      date: "2024-06-01",
      dish: "Grilled Chicken",
      image: "https://img.icons8.com/fluency/48/chicken-leg.png",
      quantity: "200g",
      calories: 400,
      protein: 35,
      carbs: 0,
      fat: 20,
    },
  ];

  return (
    <section className="p-4">
      <div className="text-lg font-semibold text-[#22c55e] mb-2">Meal History</div>
      <div className="flex flex-col gap-3 max-h-[62vh] overflow-y-auto pr-2">
        {dummyMeals.map((meal) => (
          <div key={meal.id} className="bg-white border rounded-lg flex items-center p-2 shadow">
            <img src={meal.image} alt={meal.dish} className="w-12 h-12 object-cover rounded-xl mr-3"/>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">{meal.dish}</span>
              <span className="text-xs text-gray-500">{meal.quantity} - {meal.date}</span>
              <div className="text-xs text-gray-600 flex flex-wrap gap-2 mt-1">
                <span>kcal:<b>{meal.calories}</b></span>
                <span>P:{meal.protein}g</span>
                <span>C:{meal.carbs}g</span>
                <span>F:{meal.fat}g</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-2">This is mock data; logging and scroll are live.</div>
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
