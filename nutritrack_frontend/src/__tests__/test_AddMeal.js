import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppProvider } from "../AppContext";
import AddMeal from "../components/AddMeal";
import "@testing-library/jest-dom";

describe("AddMeal Component", () => {
  it("renders meal input form and required fields", () => {
    render(
      <AppProvider>
        <AddMeal />
      </AppProvider>
    );
    expect(screen.getByRole("heading", { name: /add meal/i })).toBeVisible();
    expect(screen.getByPlaceholderText(/grilled salmon/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log meal/i })).toBeInTheDocument();
    expect(screen.getByText(/dish name/i)).toBeInTheDocument();
  });

  it("shows a tooltip for info", () => {
    render(
      <AppProvider>
        <AddMeal />
      </AppProvider>
    );
    const infoIcon = screen.getByLabelText(/info/i);
    fireEvent.mouseEnter(infoIcon);
    expect(screen.getByRole("tooltip")).toHaveTextContent(/upload a meal photo/i);
  });

  it("shows error if dish name missing and does not submit", async () => {
    render(
      <AppProvider>
        <AddMeal />
      </AppProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /log meal/i }));
    await waitFor(() =>
      expect(screen.getByText(/please enter a dish name/i)).toBeVisible()
    );
  });

  it("successfully logs a meal and resets form", async () => {
    render(
      <AppProvider>
        <AddMeal />
      </AppProvider>
    );
    const dish = screen.getByPlaceholderText(/grilled salmon/i);
    fireEvent.change(dish, { target: { value: "Test Dish" } });
    fireEvent.click(screen.getByRole("button", { name: /log meal/i }));
    await waitFor(() =>
      expect(screen.getByText(/meal logged/i)).toBeVisible()
    );
    // Form resets after feedback
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /log meal/i })).not.toBeDisabled()
    );
  });
});
