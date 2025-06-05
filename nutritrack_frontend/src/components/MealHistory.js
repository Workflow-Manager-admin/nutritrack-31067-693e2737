import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * MealHistory component for NutriTrack.
 * Shows a scrollable, styled list of logged meals with images, dates, macros, and tooltips.
 * Uses mock data for demonstration.
 */
function MealHistory() {
  // Mock meal entries
  const [meals] = useState([
    {
      id: 1,
      date: "2024-06-01",
      time: "08:15",
      dish: "Oatmeal & Berries",
      photo:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80",
      quantity: "1 bowl (200g)",
      macros: { protein: 8, carbs: 34, fat: 4, fiber: 6 },
      calories: 190,
    },
    {
      id: 2,
      date: "2024-06-01",
      time: "12:35",
      dish: "Grilled Chicken Salad",
      photo:
        "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=80&q=80",
      quantity: "1 plate",
      macros: { protein: 32, carbs: 10, fat: 6, fiber: 4 },
      calories: 285,
    },
    {
      id: 3,
      date: "2024-06-01",
      time: "19:00",
      dish: "Salmon with Veggies",
      photo:
        "https://images.unsplash.com/photo-1514512364185-4c2b678ad623?auto=format&fit=crop&w=80&q=80",
      quantity: "250g serving",
      macros: { protein: 34, carbs: 14, fat: 13, fiber: 3 },
      calories: 345,
    },
    {
      id: 4,
      date: "2024-05-31",
      time: "18:45",
      dish: "Veggie Stir Fry",
      photo:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80",
      quantity: "1 bowl",
      macros: { protein: 12, carbs: 28, fat: 10, fiber: 6 },
      calories: 220,
    },
  ]);
  const [macroTip, setMacroTip] = useState(null);

  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-2">
      <h2 className="text-primary text-xl font-bold flex items-center gap-2 mb-3">
        <span role="img" aria-label="History">
          📅
        </span>
        Meal History
      </h2>
      <div className="bg-white rounded-xl shadow p-2 max-h-[60vh] overflow-y-auto">
        {meals.length === 0 && (
          <div className="text-gray-400 p-6 text-center">
            No meals logged yet.
          </div>
        )}
        <ul className="flex flex-col gap-3">
          {meals.map((meal, i) => (
            <li
              key={meal.id}
              className="flex gap-3 items-center border-b last:border-b-0 pb-3 pt-2"
            >
              <img
                src={meal.photo}
                alt={meal.dish}
                className="w-16 h-16 rounded-lg object-cover border"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary text-lg">
                    {meal.dish}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {meal.quantity}
                  </span>
                </div>
                <div className="text-xs text-secondary">
                  <span>{meal.date}</span>
                  <span className="mx-1 text-gray-300">|</span>
                  <span>{meal.time}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs bg-gray-50 px-2 py-0.5 rounded border text-gray-700">
                    {meal.calories} kcal
                  </span>
                  {/* Macros with hoverable tooltips */}
                  <span
                    className="text-xs text-green-600 cursor-pointer underline"
                    onMouseEnter={() => setMacroTip(i)}
                    onMouseLeave={() => setMacroTip(null)}
                  >
                    Macros
                  </span>
                  {macroTip === i && (
                    <span className="ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs shadow z-10 absolute">
                      P: {meal.macros.protein}g, C: {meal.macros.carbs}g, F: {meal.macros.fat}g, Fiber: {meal.macros.fiber}g
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MealHistory;
