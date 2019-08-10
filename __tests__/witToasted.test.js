// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
// import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from "react";
import { fireEvent } from "@testing-library/react";
import {
  renderWithProvider,
  WithToastedComponent
} from "../src/utils/test-utils";

describe("Toasted withToasted", () => {
  const { container, getByText } = renderWithProvider(<WithToastedComponent />);
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
