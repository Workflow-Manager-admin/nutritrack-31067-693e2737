import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WaterTrackerScreen } from "../nutritrack/screens";

describe("WaterTrackerScreen", () => {
  test("renders water tracker components", () => {
    render(<WaterTrackerScreen />);
    expect(screen.getByText(/Water Intake Tracker/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\+200ml/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\+100ml/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Custom \(ml\)/)).toBeInTheDocument();
  });

  test("increment water by clicking +200ml and reset", () => {
    render(<WaterTrackerScreen />);
    const btn200 = screen.getByRole("button", { name: /\+200ml/i });
    const tally = () => screen.getByText(/\/ 2000 ml/);
    expect(tally().textContent).toMatch(/^0/);

    fireEvent.click(btn200);
    expect(tally().textContent).toMatch(/^200/);

    // Add custom amount (simulate user input, then submit)
    const input = screen.getByPlaceholderText(/Custom \(ml\)/);
    fireEvent.change(input, { target: { value: "150" } });
    const addBtn = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(addBtn);

    expect(tally().textContent).toMatch(/^350/);

    // Reset
    const resetBtn = screen.getByRole("button", { name: /Reset/i });
    fireEvent.click(resetBtn);
    expect(tally().textContent).toMatch(/^0/);
  });
});
