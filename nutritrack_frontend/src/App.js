import React, { useState } from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import AddMeal from './components/AddMeal';
import WaterTracker from './components/WaterTracker';
import UserProfile from './components/UserProfile';
import MealHistory from './components/MealHistory';
import BottomNav from './components/BottomNav';

// PUBLIC_INTERFACE
function App() {
  // Navigation states: dashboard, addmeal, water, profile, history
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Local mock data states
  const [meals, setMeals] = useState([
    {
      id: 1,
      date: '2024-06-01',
      name: 'Oatmeal with fruits',
      quantity: 1,
      image: null,
      nutrition: { calories: 250, carbs: 40, protein: 7, fat: 5, fiber: 4 },
    },
    {
      id: 2,
      date: '2024-06-01',
      name: 'Grilled Chicken Salad',
      quantity: 1,
      image: null,
      nutrition: { calories: 320, carbs: 10, protein: 35, fat: 12, fiber: 5 },
    },
  ]);
  const [waterIntake, setWaterIntake] = useState([
    // Array of { amount: ml, timestamp }
    { amount: 250, timestamp: new Date().setHours(8,30) },
    { amount: 350, timestamp: new Date().setHours(11,15) },
  ]);
  const [profile, setProfile] = useState({
    name: "Alex",
    height: 175,
    weight: 70,
    age: 28,
    gender: "Male",
    goals: {
      calories: 2000,
      water: 2000,
      carbs: 250,
      protein: 100,
      fat: 60,
      fiber: 25,
    }
  });

  // Handler for meal add/edit
  const handleAddMeal = (meal) => {
    // meal: {name, quantity, image, nutrition}
    setMeals([
      ...meals,
      {
        ...meal,
        id: Date.now(),
        date: new Date().toISOString().slice(0,10),
      },
    ]);
  };
  const handleAddWater = (amount) => {
    setWaterIntake([
      ...waterIntake,
      { amount, timestamp: Date.now() }
    ]);
  };
  const handleProfileUpdate = (updated) => {
    setProfile(updated);
  };

  // Filter today's meals and water
  const todayStr = new Date().toISOString().slice(0,10);
  const todayMeals = meals.filter(m => m.date === todayStr);
  const totalWater = waterIntake.filter(w => {
    const dt = new Date(w.timestamp);
    return dt.toISOString().slice(0,10) === todayStr;
  }).reduce((sum, w) => sum + Number(w.amount), 0);

  // Navigation for AddMeal uses modal-like full screen on mobile
  return (
    <div className="nt-app">
      <main className="nt-main">
        {currentTab === 'dashboard' && (
          <Dashboard
            meals={todayMeals}
            water={totalWater}
            profile={profile}
          />
        )}
        {currentTab === 'addmeal' && (
          <AddMeal
            onAddMeal={handleAddMeal}
            onClose={() => setCurrentTab('dashboard')}
            mockProfile={profile}
          />
        )}
        {currentTab === 'water' && (
          <WaterTracker
            water={totalWater}
            onAddWater={handleAddWater}
            goal={profile.goals.water}
            onClose={() => setCurrentTab('dashboard')}
          />
        )}
        {currentTab === 'profile' && (
          <UserProfile
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        )}
        {currentTab === 'history' && (
          <MealHistory
            meals={meals}
          />
        )}
      </main>
      <BottomNav current={currentTab} onChange={setCurrentTab}/>
    </div>
  );
}

export default App;
