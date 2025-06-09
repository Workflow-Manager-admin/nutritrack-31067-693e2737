import React from "react";

// Helper for percent progress
function percent(val, goal) {
  if (!goal) return 0;
  return Math.min(100, Math.round((val / goal) * 100));
}

// PUBLIC_INTERFACE
function Dashboard({ meals, water, profile }) {
  /** Dashboard summary of today's nutrition and water */
  // Sum up macros and calories
  let sum = { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0 };
  for (const meal of meals) {
    for (const key in sum) {
      sum[key] += (meal.nutrition?.[key] || 0) * Number(meal.quantity || 1);
    }
  }
  const goals = profile?.goals || {};
  const macroList = [
    { key: "calories", label: "Calories", color: "var(--primary)" },
    { key: "carbs", label: "Carbs (g)", color: "#f59e42" },
    { key: "protein", label: "Protein (g)", color: "#3b82f6" },
    { key: "fat", label: "Fat (g)", color: "#f43f5e" },
    { key: "fiber", label: "Fiber (g)", color: "#a3e635" }
  ];

  // Themed accent color for water
  const waterPercent = percent(water, Number(goals.water) || 2000);

  // Responsive card layout
  return (
    <section className="nt-dashboard" aria-label="Dashboard nutritional summary">
      <h1 className="nt-d-title">Today's Summary</h1>
      <div className="nt-card-row">
        {macroList.map(macro => (
          <div className="nt-card" key={macro.key} style={{borderBottom: `3px solid ${macro.color}`}}>
            <div className="nt-m-label">{macro.label}</div>
            <div className="nt-m-value">{sum[macro.key] || 0}
              {macro.key === "calories" ? " kcal" : ""}
            </div>
            <div className="nt-bar-bg" aria-hidden>
              <span
                className="nt-bar-fill"
                style={{
                  width: percent(sum[macro.key], goals[macro.key] || 1) + "%",
                  background: macro.color
                }}
              />
            </div>
            <span className="nt-card-goal">{goals[macro.key] ? 
              `${sum[macro.key] || 0} / ${goals[macro.key]}` : ""}</span>
          </div>
        ))}
      </div>
      <div className="nt-water-card" aria-label="Water Intake Progress">
        <div className="nt-m-label">
          <span role="img" aria-label="Water glass">💧</span> Water Intake
        </div>
        <div className="nt-water-stats">
          <span className="nt-m-value">{water || 0} ml</span>
          <span className="nt-card-goal"> / {goals.water || 2000} ml</span>
        </div>
        <div className="nt-water-bar-bg">
          <span
            className="nt-water-bar-fill"
            style={{ width: waterPercent + "%", background: "var(--secondary)" }}
            aria-label={`Progress: ${waterPercent}%`}
          />
        </div>
      </div>
      <div className="nt-tip" role="note">
        <span role="img" aria-label="Tip">🧠</span>{" "}
        <span>
        Remember: Consistency beats perfection! Try to log your meals and water frequently.
        </span>
      </div>
    </section>
  );
}

export default Dashboard;
