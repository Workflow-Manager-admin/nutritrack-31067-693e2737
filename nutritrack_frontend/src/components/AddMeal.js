import React, { useState, useRef } from "react";

// Helpers
const DEFAULT_NUTRITION = {
  calories: 300, carbs: 40, protein: 10, fat: 8, fiber: 3
};

// PUBLIC_INTERFACE
function AddMeal({ onAddMeal, onClose, mockProfile }) {
  /** Add Meal: upload photo, enter name, qty, edit nutrition, submit */
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [nutrition, setNutrition] = useState(DEFAULT_NUTRITION);
  const [image, setImage] = useState(null);
  const [showMacros, setShowMacros] = useState(false);
  const fileInput = useRef();

  // Handle image selection/preview
  const handleImage = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) return;
    onAddMeal({ name, quantity: Number(quantity), image, nutrition });
    onClose();
  };

  // Accessibility: focus trap, aria
  return (
    <div className="nt-modal nt-add-meal" role="dialog" aria-modal="true" aria-label="Add Meal">
      <button className="nt-close" aria-label="Close add meal" onClick={onClose}>×</button>
      <h2>Add New Meal</h2>
      <form onSubmit={handleSubmit} className="nt-meal-form">
        <label>
          Dish Image (optional)
          <div className="nt-image-upload">
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              aria-label="Upload dish image"
              onChange={handleImage}
              style={{display:"none"}}
            />
            <button
              type="button"
              className="nt-upload-btn"
              onClick={() => fileInput.current && fileInput.current.click()}
            >
              {image ? "Change Image" : "Upload Image"}
            </button>
            {image &&
              <img src={image} alt="Dish preview" className="nt-upload-preview" aria-label="Uploaded dish preview"/>
            }
          </div>
        </label>
        <label>
          Dish Name *
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={32}
            required
            placeholder="E.g. Grilled Salmon"
            autoFocus
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
            max="5"
            step="1"
            style={{width:"5em"}}
          />
        </label>
        <label>
          <button
            className="nt-show-macros"
            type="button"
            onClick={() => setShowMacros(s => !s)}
            aria-expanded={showMacros}
          >
            {showMacros ? "Hide Nutritional Details" : "Show/Edit Nutritional Details"}
          </button>
        </label>
        {showMacros && (
          <div className="nt-macros-edit">
            {Object.keys(DEFAULT_NUTRITION).map(key => (
              <div key={key}>
                <label>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <input
                    type="number"
                    min="0"
                    max="999"
                    value={nutrition[key]}
                    onChange={e =>
                      setNutrition({ ...nutrition, [key]: Number(e.target.value) })
                    }
                  /> {key === "calories" ? "kcal" : "g"}
                </label>
              </div>
            ))}
          </div>
        )}
        <button className="nt-btn-submit" type="submit" aria-label="Log meal">Log Meal</button>
      </form>
    </div>
  );
}

export default AddMeal;
