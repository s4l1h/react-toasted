import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import ToastProgress from "../src/components/ToastProgress";

describe("ToastProgress Component", () => {
  test("it shows empty toast progress bar", () => {
    const { container } = render(<ToastProgress />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
  test("it shows toast progress bar", () => {
    const { container } = render(<ToastProgress percent={90} />);
    expect(container).toMatchSnapshot();
  });
});
