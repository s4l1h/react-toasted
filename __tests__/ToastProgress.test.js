// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
// import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

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
