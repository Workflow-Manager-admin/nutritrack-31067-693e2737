import React from "react";
import { render, screen } from "@testing-library/react";
import { DashboardScreen } from "../nutritrack/screens";

describe("DashboardScreen", () => {
  test("renders Today's Nutrition Summary", () => {
    render(<DashboardScreen />);
    expect(screen.getByText(/Today's Nutrition Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Calories/)).toBeInTheDocument();
    expect(screen.getByText(/Protein/)).toBeInTheDocument();
    expect(screen.getByText(/Carbs/)).toBeInTheDocument();
    expect(screen.getByText(/Fat/)).toBeInTheDocument();
    expect(screen.getByText(/Fiber/)).toBeInTheDocument();
    expect(screen.getByText(/Water/)).toBeInTheDocument();
  });

  test("renders calorie and macro values", () => {
    render(<DashboardScreen />);
    expect(screen.getByText(/1650 \/ 2000 kcal/)).toBeInTheDocument();
    expect(screen.getByText(/95\/120 g/)).toBeInTheDocument();
    expect(screen.getByText(/180\/250 g/)).toBeInTheDocument();
    expect(screen.getByText(/51\/70 g/)).toBeInTheDocument();
    expect(screen.getByText(/22\/30 g/)).toBeInTheDocument();
    expect(screen.getByText(/1450\/2000 ml/)).toBeInTheDocument();
  });
});
