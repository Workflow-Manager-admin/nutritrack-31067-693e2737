import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainContainer from "../nutritrack/MainContainer";

describe("MainContainer", () => {
  test("renders the header and Dashboard by default", () => {
    render(<MainContainer />);
    expect(screen.getByText("NutriTrack")).toBeInTheDocument();
    expect(screen.getByText("Today's Nutrition Summary")).toBeInTheDocument();
  });

  test("navigates between all tabs and renders corresponding screens", () => {
    render(<MainContainer />);
    // Dashboard
    expect(screen.getByText("Today's Nutrition Summary")).toBeInTheDocument();

    // Add Meal
    fireEvent.click(screen.getByRole("button", { name: /Add Meal/i }));
    expect(screen.getByText("Add Meal")).toBeInTheDocument();

    // Water Tracker
    fireEvent.click(screen.getByRole("button", { name: /Water/i }));
    expect(screen.getByText("Water Intake Tracker")).toBeInTheDocument();

    // History
    fireEvent.click(screen.getByRole("button", { name: /History/i }));
    expect(screen.getByText("Meal History")).toBeInTheDocument();

    // Profile
    fireEvent.click(screen.getByRole("button", { name: /Profile/i }));
    expect(screen.getByText("User Profile")).toBeInTheDocument();
  });

  test("the active button gets aria-current attribute", () => {
    render(<MainContainer />);
    const dashboardBtn = screen.getByRole("button", { name: /Dashboard/i });
    expect(dashboardBtn).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByRole("button", { name: /Water/i }));
    expect(screen.getByRole("button", { name: /Water/i })).toHaveAttribute("aria-current", "true");
    expect(dashboardBtn).toHaveAttribute("aria-current", "false");
  });
});
