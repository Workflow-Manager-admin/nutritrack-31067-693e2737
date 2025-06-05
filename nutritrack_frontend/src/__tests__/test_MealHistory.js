import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "../AppContext";
import MealHistory from "../components/MealHistory";
import "@testing-library/jest-dom";

describe("MealHistory Component", () => {
  it("shows a list of logged meals from context", () => {
    render(
      <AppProvider>
        <MealHistory />
      </AppProvider>
    );
    expect(screen.getByRole("heading", { name: /meal history/i })).toBeInTheDocument();
    expect(screen.getAllByAltText(/meal/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/kcal/i).length).toBeGreaterThan(0);
  });

  it("shows macros tooltip on hover", () => {
    render(
      <AppProvider>
        <MealHistory />
      </AppProvider>
    );
    // Find first macros label
    const macrosEl = screen.getAllByText(/macros/i)[0];
    fireEvent.mouseEnter(macrosEl);
    expect(screen.getByText(/P:.*Fiber:/i)).toBeVisible();
  });
});
