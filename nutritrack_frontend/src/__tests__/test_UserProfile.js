import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "../AppContext";
import UserProfile from "../components/UserProfile";
import "@testing-library/jest-dom";

describe("UserProfile Component", () => {
  it("renders user profile fields", () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    expect(screen.getByRole("heading", { name: /user profile/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Alex Doe/)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
  });

  it("enables and saves editable fields", () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    const weightInput = screen.getByLabelText(/weight/i);
    fireEvent.change(weightInput, { target: { value: "70" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(weightInput.value).toBe("70");
  });

  it("shows BMI and tooltips", () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    // BMI text
    expect(screen.getByText(/bmi/i)).toBeInTheDocument();
    const infoIcons = screen.getAllByLabelText(/info/i);
    fireEvent.mouseEnter(infoIcons[0]);
    expect(screen.getByText(/body mass index/i)).toBeInTheDocument();
  });
});
