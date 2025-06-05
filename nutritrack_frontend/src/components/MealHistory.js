import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

/**
 * PUBLIC_INTERFACE
 * MealHistory component for NutriTrack.
 * Shows list of logged meals from AppContext state.
 */
function MealHistory() {
  const { meals } = useContext(AppContext);
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
