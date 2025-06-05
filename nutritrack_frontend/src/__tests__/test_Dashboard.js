import React from "react";
import { render, screen } from "@testing-library/react";
import { AppProvider } from "../AppContext";
import Dashboard from "../components/Dashboard";
import "@testing-library/jest-dom";

describe("Dashboard Component", () => {
  it("renders the nutrition summary and progress visuals from context", () => {
    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/calories/i)).toBeInTheDocument();

    // Calories progress
    expect(screen.getByText(/\d+\s*\/\s*\d+\s*kcal/i)).toBeInTheDocument();

    // Macro breakdown (protein, carbs, fat, fiber) and goals
    ["protein", "carbs", "fat", "fiber"].forEach((macro) => {
      expect(screen.getByText(new RegExp(macro, "i"))).toBeInTheDocument();
      expect(screen.getByText(/goal/i)).toBeInTheDocument();
    });

    // Water intake
    expect(screen.getByLabelText(/water intake progress/i)).toBeInTheDocument();
    expect(screen.getByText(/ml/i)).toBeInTheDocument();
  });

  it("shows info tooltip triggers for accessibility", () => {
    render(
      <AppProvider>
        <Dashboard />
      </AppProvider>
    );
    // Tooltip exists in DOM but may be hidden unless hovered/focused
    expect(screen.getByLabelText(/info/i)).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});
