import React, { createContext, useState, useMemo, useCallback } from "react";

// PUBLIC_INTERFACE
/**
 * AppContext provides global application state (meals, water intake, user profile)
 * and handler functions to manage them.
 */
export const AppContext = createContext();

/**
 * PUBLIC_INTERFACE
 * AppProvider wraps NutriTrack and supplies core app state + handler functions to all children.
 */
export function AppProvider({ children }) {
  // User Profile State (mock/simple example)
  const [profile, setProfile] = useState({
    name: "Alex Doe",
    age: 29,
    gender: "other",
    height: 170,
    weight: 68,
    calorieGoal: 2000,
    waterGoal: 2000,
  });

  // Meals state (array of meal objects, can be initialized with a few for demo)
  const [meals, setMeals] = useState([
    {
      id: 1,
      date: "2024-06-01",
      time: "08:15",
      dish: "Oatmeal & Berries",
      photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80",
      quantity: "1 bowl (200g)",
      macros: { protein: 8, carbs: 34, fat: 4, fiber: 6 },
      calories: 190,
    },
    {
      id: 2,
      date: "2024-06-01",
      time: "12:35",
      dish: "Grilled Chicken Salad",
      photo: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=80&q=80",
      quantity: "1 plate",
      macros: { protein: 32, carbs: 10, fat: 6, fiber: 4 },
      calories: 285,
    },
    {
      id: 3,
      date: "2024-06-01",
      time: "19:00",
      dish: "Salmon with Veggies",
      photo: "https://images.unsplash.com/photo-1514512364185-4c2b678ad623?auto=format&fit=crop&w=80&q=80",
      quantity: "250g serving",
      macros: { protein: 34, carbs: 14, fat: 13, fiber: 3 },
      calories: 345,
    },
    {
      id: 4,
      date: "2024-05-31",
      time: "18:45",
      dish: "Veggie Stir Fry",
      photo: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80",
      quantity: "1 bowl",
      macros: { protein: 12, carbs: 28, fat: 10, fiber: 6 },
      calories: 220,
    },
  ]);

  // Water intake (ml/day, resets on new day – for mock, just a single running tally)
  const [water, setWater] = useState(1000);

  // PUBLIC_INTERFACE
  // Add meal (expects a meal object, auto-assign id, date, time)
  const addMeal = useCallback((mealData) => {
    setMeals((meals) => [
      {
        ...mealData,
        id: Date.now(),
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      ...meals,
    ]);
  }, []);

  // PUBLIC_INTERFACE
  // Update water intake by amount (ml to add)
  const addWater = useCallback((amount) => {
    setWater((water) => Math.min(profile.waterGoal, water + amount));
  }, [profile.waterGoal]);

  // PUBLIC_INTERFACE
  // Update user profile
  const updateProfile = useCallback((updates) => {
    setProfile((p) => ({ ...p, ...updates }));
  }, []);

  // Reset water intake for a new day (could add real date logic)
  // Here, shown for potential completeness
  const resetWater = useCallback(() => setWater(0), []);

  // Aggregate nutrition summary for the dashboard (today only)
  const today = new Date().toISOString().slice(0, 10);
  const todaysMeals = meals.filter((m) => m.date === today);

  const summary = useMemo(() => {
    // Reduce meals to nutrition totals for the current day
    const totals = {
      calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0
    };
    todaysMeals.forEach((m) => {
      totals.calories += m.calories || 0;
      totals.protein += m.macros?.protein || 0;
      totals.carbs += m.macros?.carbs || 0;
      totals.fat += m.macros?.fat || 0;
      totals.fiber += m.macros?.fiber || 0;
    });
    return {
      calories: { current: totals.calories, goal: profile.calorieGoal },
      protein: { current: totals.protein, goal: 120 },
      carbs: { current: totals.carbs, goal: 230 },
      fat: { current: totals.fat, goal: 70 },
      fiber: { current: totals.fiber, goal: 30 },
      water: { current: water, goal: profile.waterGoal },
    };
  }, [todaysMeals, water, profile.calorieGoal, profile.waterGoal]);

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
      meals,
      addMeal,
      water,
      addWater,
      resetWater,
      summary,
    }),
    [profile, updateProfile, meals, addMeal, water, addWater, resetWater, summary]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
