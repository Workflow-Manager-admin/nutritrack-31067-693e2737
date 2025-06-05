import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";

/**
 * PUBLIC_INTERFACE
 * AddMeal component lets users log meals with photo, name, and macro details.
 * Now uses AppContext to add meals to global state.
 */
function AddMeal() {
  const { addMeal } = useContext(AppContext);

  // Local state for input and feedback
  const [state, setState] = useState({
    dish: "",
    quantity: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    photo: null,
    showTooltip: false,
    submitting: false,
    submitted: false,
    error: "",
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length) {
      setState((s) => ({
        ...s,
        photo: URL.createObjectURL(files[0]),
        photoFile: files[0], // keep file for upload, here for future (not used)
      }));
    } else {
      setState((s) => ({ ...s, [name]: value }));
    }
  }

  // Handles form submit, calls global addMeal
  function handleSubmit(e) {
    e.preventDefault();
    setState((s) => ({
      ...s,
      submitting: true,
      submitted: false,
      error: "",
    }));
    setTimeout(() => {
      if (!state.dish) {
        setState((s) => ({
          ...s,
          submitting: false,
          error: "Please enter a dish name",
        }));
        return;
      }

      // Prepare meal object for context (mock, some values converted)
      addMeal({
        dish: state.dish,
        quantity: state.quantity,
        macros: {
          protein: Number(state.protein) || 0,
          carbs: Number(state.carbs) || 0,
          fat: Number(state.fat) || 0,
          fiber: Number(state.fiber) || 0,
        },
        photo: state.photo || "",
        calories:
          (Number(state.protein) || 0) * 4 +
          (Number(state.carbs) || 0) * 4 +
          (Number(state.fat) || 0) * 9,
      });
      setState((s) => ({
        ...s,
        submitting: false,
        submitted: true,
        dish: "",
        quantity: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        photo: null,
        error: "",
      }));
      setTimeout(() => {
        setState((s) => ({
          ...s,
          submitted: false,
        }));
      }, 1200);
    }, 800);
  }

  return (
    <div className="w-full max-w-lg mx-auto px-3 py-2">
      <h2 className="text-primary text-xl font-bold flex items-center gap-2 mb-3">
        <span role="img" aria-label="Plate">
          🍽️
        </span>
        Add Meal
        <span
          tabIndex={0}
          onMouseEnter={() => setState((s) => ({ ...s, showTooltip: true }))}
          onMouseLeave={() => setState((s) => ({ ...s, showTooltip: false }))}
          className="relative inline-block ml-1 group"
        >
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
          {state.showTooltip && (
            <span
              className="absolute left-5 bottom-0 -translate-y-2 bg-gray-800 text-xs rounded px-2 py-1 text-white z-10"
              role="tooltip"
            >
              You can upload a meal photo and input the dish name and nutrition.
            </span>
          )}
        </span>
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-4 flex flex-col gap-3"
      >
        {/* Photo preview */}
        {state.photo && (
          <img
            src={state.photo}
            alt="Meal preview"
            className="mb-2 w-24 h-24 object-cover rounded-lg border mx-auto"
          />
        )}

        {/* Image upload */}
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-secondary">Dish Photo (optional)</span>
          <input
            type="file"
            accept="image/*"
            name="photo"
            onChange={handleChange}
            className="text-xs file:mr-2 file:py-1 file:px-3 file:bg-accent file:border file:rounded file:text-sm file:text-primary"
          />
        </label>

        {/* Dish name */}
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-secondary">Dish Name*</span>
          <input
            required
            name="dish"
            className="rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="E.g. Grilled Salmon"
            value={state.dish}
            onChange={handleChange}
          />
        </label>

        {/* Quantity */}
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-secondary">Quantity</span>
          <input
            name="quantity"
            placeholder="E.g. 150g, 2 cups"
            value={state.quantity}
            onChange={handleChange}
            className="rounded border px-2 py-1 focus:outline-none"
          />
        </label>

        {/* Macros */}
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-primary">Protein (g)</span>
            <input
              name="protein"
              type="number"
              value={state.protein}
              onChange={handleChange}
              className="rounded border px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-primary">Carbs (g)</span>
            <input
              name="carbs"
              type="number"
              value={state.carbs}
              onChange={handleChange}
              className="rounded border px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-primary">Fat (g)</span>
            <input
              name="fat"
              type="number"
              value={state.fat}
              onChange={handleChange}
              className="rounded border px-2 py-1"
            />
          </label>
          <label className="flex flex-col text-sm">
            <span className="font-semibold text-primary">Fiber (g)</span>
            <input
              name="fiber"
              type="number"
              value={state.fiber}
              onChange={handleChange}
              className="rounded border px-2 py-1"
            />
          </label>
        </div>

        {state.error && (
          <div className="text-red-500 text-sm font-semibold">{state.error}</div>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-2 rounded bg-primary text-accent font-bold hover:bg-secondary transition"
          disabled={state.submitting}
        >
          {state.submitting ? "Logging..." : "Log Meal"}
        </button>
        {/* Visual feedback on submit */}
        {state.submitted && (
          <div className="text-center mt-2 text-green-600 font-semibold">
            Meal logged! 🎉
          </div>
        )}
      </form>
    </div>
  );
}

export default AddMeal;
