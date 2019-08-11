import "@testing-library/jest-dom/extend-expect";
import { renderWithProvider } from "../test-utils";

describe("Toasted Provider Snapshot", () => {
  test("it has to match snapshot", () => {
    const { container } = renderWithProvider();
    expect(container).toMatchSnapshot();
  });
});
