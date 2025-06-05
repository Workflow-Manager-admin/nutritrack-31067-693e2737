import React from "react";

// PUBLIC_INTERFACE
export function DashboardScreen() {
  // Mock summary data
  const dailyGoals = { calories: 2000, protein: 100, carbs: 250, fat: 70, fiber: 30, water: 2000 };
  const actual = { calories: 1600, protein: 90, carbs: 180, fat: 50, fiber: 18, water: 1400 };
  // Simple progress calculations for bars
  const pct = (val, goal) => Math.min(100, Math.round((val / goal) * 100));

  return (
    <section className="p-4">
      <div className="mb-2 text-lg font-semibold text-[#22c55e]">Today's Summary</div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Summary cards */}
        {[
          ["Calories", actual.calories, dailyGoals.calories, "#22c55e"],
          ["Protein (g)", actual.protein, dailyGoals.protein, "#3b82f6"],
          ["Carbs (g)", actual.carbs, dailyGoals.carbs, "#a3e635"],
          ["Fat (g)", actual.fat, dailyGoals.fat, "#f59e42"],
          ["Fiber (g)", actual.fiber, dailyGoals.fiber, "#6ee7b7"],
          ["Water (ml)", actual.water, dailyGoals.water, "#38bdf8"],
        ].map(([k, actualVal, goalVal, color]) => (
          <div key={k}
               className="bg-white border rounded-lg p-3 shadow text-gray-700 flex flex-col justify-between min-h-[90px]">
            <div className="flex justify-between pb-1">
              <span className="font-medium">{k}</span>
              <span className={`font-bold`} style={{ color }}>{actualVal}/{goalVal}</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-1 mt-1">
              <div style={{
                width: `${pct(actualVal, goalVal)}%`,
                background: color,
              }} className="absolute h-2 left-0 top-0 rounded-full transition-all duration-300"
              />
            </div>
            <span className="text-xs text-gray-400">Goal progress: {pct(actualVal, goalVal)}%</span>
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-500 mb-1">Visual feedback and more charts coming soon.</div>
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
