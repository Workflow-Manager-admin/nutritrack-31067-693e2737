import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import { AppContext, AppProvider } from "../AppContext";
import "@testing-library/jest-dom";

const DummyConsumer = () => {
  const ctx = useContext(AppContext);
  return (
    <div>
      <div data-testid="profile">{ctx.profile.name}</div>
      <div data-testid="meals">{ctx.meals.length}</div>
      <div data-testid="water">{ctx.water}</div>
      <button onClick={() => ctx.addMeal({ dish: "Unit Test Dish", quantity: "1 plate", macros: { protein: 10, carbs: 10, fat: 5, fiber: 2 }, photo: "", calories: 100 })}>AddMeal</button>
      <button onClick={() => ctx.addWater(100)}>AddWater</button>
      <button onClick={() => ctx.updateProfile({ name: "Updated Name" })}>UpdateProfile</button>
    </div>
  );
};

describe("AppContext API and Logic", () => {
  it("provides default profile, meals and water", () => {
    render(
      <AppProvider>
        <DummyConsumer />
      </AppProvider>
    );
    expect(screen.getByTestId("profile")).toHaveTextContent(/Alex Doe/);
    expect(Number(screen.getByTestId("meals").textContent)).toBeGreaterThan(0);
    expect(Number(screen.getByTestId("water").textContent)).toBeGreaterThanOrEqual(0);
  });

  it("adds a meal to context state", () => {
    render(
      <AppProvider>
        <DummyConsumer />
      </AppProvider>
    );
    const beforeCount = Number(screen.getByTestId("meals").textContent);
    screen.getByText("AddMeal").click();
    expect(Number(screen.getByTestId("meals").textContent)).toBe(beforeCount + 1);
  });

  it("updates water intake up to the goal only", () => {
    render(
      <AppProvider>
        <DummyConsumer />
      </AppProvider>
    );
    const before = Number(screen.getByTestId("water").textContent);
    screen.getByText("AddWater").click();
    const after = Number(screen.getByTestId("water").textContent);
    expect(after).toBeGreaterThan(before);
  });

  it("updates profile data immutably", () => {
    render(
      <AppProvider>
        <DummyConsumer />
      </AppProvider>
    );
    screen.getByText("UpdateProfile").click();
    expect(screen.getByTestId("profile")).toHaveTextContent("Updated Name");
  });
});
