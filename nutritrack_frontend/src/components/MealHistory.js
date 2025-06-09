import React from "react";

// PUBLIC_INTERFACE
function MealHistory({ meals }) {
  /* Scrollable meal log history grouped by date */
  // Group meals by date
  const grouped = {};
  for (const meal of meals) {
    if (!grouped[meal.date]) grouped[meal.date] = [];
    grouped[meal.date].push(meal);
  }
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a)); // latest first

  return (
    <section className="nt-history" aria-label="Meal History">
      <h2>Meal History</h2>
      <div className="nt-history-list">
        {dates.length === 0 && <div className="nt-history-empty">No meals logged yet.</div>}
        {dates.map(date => (
          <div key={date} className="nt-history-day">
            <div className="nt-history-date">{date}</div>
            <ul className="nt-history-meals">
              {grouped[date].map(meal => (
                <li key={meal.id} className="nt-history-meal-card">
                  <div className="nt-history-imgwrap">
                    {meal.image ? (
                      <img src={meal.image} alt={meal.name} className="nt-history-img" />
                    ) : (
                      <span className="nt-history-placeholder" aria-label="No image">
                        🍽️
                      </span>
                    )}
                  </div>
                  <div className="nt-history-desc">
                    <div className="nt-history-name">{meal.name}</div>
                    <div className="nt-history-qty">Qty: {meal.quantity}</div>
                    <div className="nt-history-macros">
                      Calories: <strong>{meal.nutrition?.calories || 0}</strong> kcal,
                      C: <strong>{meal.nutrition?.carbs || 0}</strong>g,
                      P: <strong>{meal.nutrition?.protein || 0}</strong>g,
                      F: <strong>{meal.nutrition?.fat || 0}</strong>g,
                      Fi: <strong>{meal.nutrition?.fiber || 0}</strong>g
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MealHistory;
