import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppProvider } from "../AppContext";
import WaterTracker from "../components/WaterTracker";
import "@testing-library/jest-dom";

describe("WaterTracker Component", () => {
  it("renders water tracker UI and bottle progress", () => {
    render(
      <AppProvider>
        <WaterTracker />
      </AppProvider>
    );
    expect(screen.getByRole("heading", { name: /water tracker/i })).toBeVisible();
    expect(screen.getByLabelText(/enter water amount/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByText(/ml/i)).toBeInTheDocument();
  });

  it("shows a tooltip with daily water goal", () => {
    render(
      <AppProvider>
        <WaterTracker />
      </AppProvider>
    );
    const infoIcon = screen.getByLabelText(/info/i);
    fireEvent.mouseEnter(infoIcon);
    expect(screen.getByRole("tooltip")).toHaveTextContent(/goal:/i);
  });

  it("rejects invalid input and shows error feedback", async () => {
    render(
      <AppProvider>
        <WaterTracker />
      </AppProvider>
    );
    fireEvent.change(screen.getByLabelText(/enter water amount/i), {
      target: { value: "-15" }
    });
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    await waitFor(() =>
      expect(screen.getByText(/valid amount/i)).toBeInTheDocument()
    );
  });

  it("adds valid water intake and shows feedback", async () => {
    render(
      <AppProvider>
        <WaterTracker />
      </AppProvider>
    );
    fireEvent.change(screen.getByLabelText(/enter water amount/i), {
      target: { value: "250" }
    });
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    await waitFor(() =>
      expect(screen.getByText(/stay hydrated/i)).toBeInTheDocument()
    );
  });
});
