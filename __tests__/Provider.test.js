// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
// import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

import { renderWithProvider } from "../src/utils/test-utils";

describe("Toasted Provider Snapshot", () => {
  test("it has to match snapshot", () => {
    const { container } = renderWithProvider();
    expect(container).toMatchSnapshot();
  });
});
