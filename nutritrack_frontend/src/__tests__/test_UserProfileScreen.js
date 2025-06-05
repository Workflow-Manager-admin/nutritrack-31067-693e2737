import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProfileScreen } from "../nutritrack/screens";

describe("UserProfileScreen", () => {
  test("renders all profile input fields", () => {
    render(<UserProfileScreen />);
    expect(screen.getByLabelText(/Age/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Height/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Calories Goal/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Water Goal/)).toBeInTheDocument();
    expect(screen.getByText(/User Profile/)).toBeInTheDocument();
    expect(screen.getByText(/BMI \(mock\):/)).toBeInTheDocument();
  });

  test("edits age and saves, showing Saved! feedback", () => {
    jest.useFakeTimers();
    render(<UserProfileScreen />);
    const ageInput = screen.getByLabelText(/Age/);
    fireEvent.change(ageInput, { target: { value: "35" } });

    const saveBtn = screen.getByRole("button", { name: /Save Profile/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText(/Saved!/)).toBeInTheDocument();
    jest.runAllTimers();
    expect(screen.queryByText(/Saved!/)).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
