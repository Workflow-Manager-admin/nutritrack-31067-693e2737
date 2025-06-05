import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddMealScreen } from "../nutritrack/screens";

describe("AddMealScreen", () => {
  test("renders meal form and elements", () => {
    render(<AddMealScreen />);
    expect(screen.getByText(/Add Meal/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Grilled Chicken/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. 1 plate/)).toBeInTheDocument();
    expect(screen.getByText(/Log Meal/)).toBeInTheDocument();
  });

  test("can click Log Meal button", () => {
    render(<AddMealScreen />);
    fireEvent.click(screen.getByText(/Log Meal/));
    // Since no side effect in UI, just check the button is present and clickable
    expect(screen.getByText(/Log Meal/)).toBeInTheDocument();
  });
});
