import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

/**
 * PUBLIC_INTERFACE
 * UserProfile component: view and edit user profile, updates via context.
 */
function UserProfile() {
  const { profile, updateProfile } = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);
  const [toolTip, setToolTip] = useState({ bmi: false, calorie: false });

  // When profile in context changes (i.e. elsewhere), sync edit fields
  React.useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  // Calculate BMI (mock formula)
  const bmi =
    localProfile.height > 0
      ? ((localProfile.weight / Math.pow(localProfile.height / 100, 2)).toFixed(1))
      : "—";

  function handleChange(e) {
    const { name, value } = e.target;
    setLocalProfile((p) => ({
      ...p,
      [name]:
        name === "age" ||
        name === "height" ||
        name === "weight" ||
        name === "calorieGoal" ||
        name === "waterGoal"
          ? parseInt(value, 10)
          : value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    updateProfile(localProfile);
    setEdit(false);
  }

  return (
    <div className="w-full max-w-md mx-auto px-3 py-2">
      <h2 className="text-primary text-xl font-bold flex items-center gap-2 mb-3">
        <span role="img" aria-label="Profile">
          👤
        </span>
        User Profile
      </h2>
      <div className="bg-white rounded-xl shadow p-4">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSave}
          autoComplete="off"
        >
          {/* Name (readonly) */}
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-secondary">Name</span>
            <input
              value={profile.name}
              disabled
              className="rounded border px-2 py-1 bg-gray-100 text-gray-600"
            />
          </label>
          {/* Editable fields */}
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-secondary">Age</span>
              <input
                name="age"
                type="number"
                value={profile.age}
                min={1}
                disabled={!edit}
                onChange={handleChange}
                className="rounded border px-2 py-1"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-secondary">Gender</span>
              <select
                name="gender"
                value={profile.gender}
                disabled={!edit}
                onChange={handleChange}
                className="rounded border px-2 py-1"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-secondary">Height (cm)</span>
              <input
                name="height"
                type="number"
                min={100}
                max={250}
                value={profile.height}
                disabled={!edit}
                onChange={handleChange}
                className="rounded border px-2 py-1"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-secondary">Weight (kg)</span>
              <input
                name="weight"
                type="number"
                min={25}
                max={200}
                value={profile.weight}
                disabled={!edit}
                onChange={handleChange}
                className="rounded border px-2 py-1"
              />
            </label>
          </div>
          {/* BMI (mock) */}
          <div
            className="flex items-center gap-1 text-sm text-gray-600 mt-2"
            tabIndex={0}
            onMouseEnter={() => setToolTip((s) => ({ ...s, bmi: true }))}
            onMouseLeave={() => setToolTip((s) => ({ ...s, bmi: false }))}
          >
            <span className="font-semibold text-primary">BMI:</span>
            <span className="font-mono font-bold">{bmi}</span>
            <span className="relative">
              <svg
                className="w-4 h-4 text-secondary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-label="Info"
              >
                <circle cx={12} cy={12} r={10} />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
              {toolTip.bmi && (
                <span className="absolute left-5 bottom-0 bg-gray-800 text-xs rounded px-2 py-1 text-white z-10">
                  Body Mass Index = weight / height² (kg/m²)
                </span>
              )}
            </span>
          </div>
          {/* Goal settings */}
          <div className="grid grid-cols-2 gap-2">
            <label
              className="flex flex-col gap-1"
              tabIndex={0}
              onMouseEnter={() => setToolTip((s) => ({ ...s, calorie: true }))}
              onMouseLeave={() => setToolTip((s) => ({ ...s, calorie: false }))}
            >
              <span className="font-semibold text-secondary">
                Calorie Goal
                <svg
                  className="inline-block w-3 h-3 ml-1 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  style={{ display: "inline", verticalAlign: "middle" }}
                  aria-label="Info"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                </svg>
              </span>
              {toolTip.calorie && (
                <span className="absolute left-36 -mt-5 bg-gray-800 text-xs rounded px-2 py-1 text-white z-10">
                  This sets your daily calorie target.
                </span>
              )}
              <input
                name="calorieGoal"
                type="number"
                value={profile.calorieGoal}
                disabled={!edit}
                onChange={handleChange}
                className="rounded border px-2 py-1"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-secondary">Water Goal (ml)</span>
              <input
                name="waterGoal"
                type="number"
                value={profile.waterGoal}
                disabled={!edit}
                onChange={handleChange}
                className="rounded border px-2 py-1"
              />
            </label>
          </div>
          {/* Action buttons */}
          <div className="mt-4 flex justify-end gap-2">
            {edit ? (
              <button
                type="submit"
                className="bg-primary text-white px-4 py-1 rounded font-semibold hover:bg-secondary transition"
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="bg-secondary text-white px-4 py-1 rounded font-semibold hover:bg-primary transition"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
