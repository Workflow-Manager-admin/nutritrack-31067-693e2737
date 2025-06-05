import React from "react";
import { render, screen } from "@testing-library/react";
import { MealHistoryScreen } from "../nutritrack/screens";

describe("MealHistoryScreen", () => {
  test("renders meal history header and dishes", () => {
    render(<MealHistoryScreen />);
    expect(screen.getByText(/Meal History/)).toBeInTheDocument();

    // Should see all mock dishes
    const dishes = [
      "Berry Yogurt Parfait",
      "Spinach Omelette",
      "Chicken Rice Bowl",
      "Greek Salad",
      "Avocado Toast",
      "Banana"
    ];
    dishes.forEach(dish =>
      expect(screen.getByText(dish)).toBeInTheDocument()
    );
  });
});
