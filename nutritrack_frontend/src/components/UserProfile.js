import React, { useState } from "react";

// Calculate BMI
function getBMI(weight, height) {
  if (!weight || !height) return 0;
  return (weight / ((height / 100) ** 2)).toFixed(1);
}

const GENDERS = ["Male", "Female", "Other"];

// PUBLIC_INTERFACE
function UserProfile({ profile, onUpdate }) {
  // Form local state
  const [form, setForm] = useState({...profile});
  const [showGoals, setShowGoals] = useState(false);
  // Handler
  function handleChange(e, field) {
    setForm(f => ({ ...f, [field]: e.target.value }));
  }
  function handleGoalChange(e, goalKey) {
    setForm(f => ({
      ...f,
      goals: { ...f.goals, [goalKey]: Number(e.target.value) }
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(form);
  }

  return (
    <section className="nt-profile" aria-label="User Profile">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="nt-profile-form">
        <label>
          Name:
          <input
            type="text"
            value={form.name || ""}
            required
            onChange={e => handleChange(e, "name")}
            maxLength={24}
            autoFocus
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            value={form.height || ""}
            required
            min="120"
            max="250"
            onChange={e => handleChange(e, "height")}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            value={form.weight || ""}
            required
            min="30"
            max="300"
            onChange={e => handleChange(e, "weight")}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={form.age || ""}
            required
            min="2"
            max="120"
            onChange={e => handleChange(e, "age")}
          />
        </label>
        <label>
          Gender:
          <select
            value={form.gender || ""}
            required
            onChange={e => handleChange(e, "gender")}
          >
            <option value="">Select</option>
            {GENDERS.map(g=> (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>
        <div className="nt-bmi-row">
          <strong>BMI:</strong>{" "}
          <span className="nt-bmi" aria-label="Calculated BMI">
            {getBMI(form.weight, form.height)}
          </span>
        </div>
        <button type="button" className="nt-show-goals"
          onClick={() => setShowGoals(g => !g)}
          aria-expanded={showGoals}
        >
          {showGoals ? "Hide Daily Goals" : "Edit Daily Goals"}
        </button>
        {showGoals && (
          <div className="nt-goals-edit">
            {Object.keys(form.goals || {}).map(k => (
              <label key={k}>{k.charAt(0).toUpperCase()+k.slice(1)}: 
                <input
                  type="number"
                  min="0"
                  max="9999"
                  value={form.goals[k]}
                  onChange={e => handleGoalChange(e, k)}
                />
                {k==="calories"?"kcal":k==="water"?"ml":"g"}
              </label>
            ))}
          </div>
        )}
        <button className="nt-btn-submit" type="submit" aria-label="Save profile">Save Profile</button>
      </form>
      <div className="nt-profile-note" aria-live="polite">
        Your profile helps personalize your nutrition summary.
      </div>
    </section>
  );
}

export default UserProfile;
