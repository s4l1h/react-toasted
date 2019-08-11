import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithProvider, SampleConsumerContext } from "../test-utils";

describe("Toasted Consumer", () => {
  const { container, getByText } = renderWithProvider(
    <SampleConsumerContext />
  );
  test("add", () => {
    fireEvent.click(getByText(/Create Toast/));
    expect(container.innerHTML).toMatch("First Toast");
  });
  test("remove", () => {
    fireEvent.click(getByText(/Remove Toast/));
    expect(container.innerHTML).not.toMatch("First Toast");
  });
  test("removeAll", () => {
    expect(container.innerHTML).toMatch("Second Toast");
    fireEvent.click(getByText(/Remove All/));
    expect(container.innerHTML).not.toMatch("Second Toast");
  });
});
