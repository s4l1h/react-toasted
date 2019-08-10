// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
// import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Toast from "../src/components/Toast";

describe("Toast Component Snapshot", () => {
  test("basic toast snapshot", () => {
    const { container } = render(<Toast position="toast-top-left" />);
    expect(container).toMatchSnapshot();
  });
  test("it has to match snapshot", () => {
    const { container } = render(
      <Toast
        {...{
          name: "SampleFull",
          position: "toast-bottom-full-width",
          title: "Full",
          type: "success",
          msg: "Look at the console",
          removeOnClick: false,
          classNames: ["animated"],
          style: { color: "red" },
          timeout: 10000,
          progressBar: true,
          progressBarValue: 0
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
describe("Toast Events", () => {
  let toastMessage = "Message";
  let onCreated = jest.fn();
  let onClicked = jest.fn();
  let onMouseOver = jest.fn();
  let onMouseOut = jest.fn();
  let onDestroyed = jest.fn();
  const { getByText, unmount } = render(
    <Toast
      msg={toastMessage}
      position="toast-top-right"
      onCreated={onCreated}
      onClick={onClicked}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onDestroyed={onDestroyed}
    />
  );
  test("onCreated", () => {
    expect(onCreated).toHaveBeenCalledTimes(1);
  });
  test("onClicked", () => {
    fireEvent.click(getByText(toastMessage));
    expect(onClicked).toHaveBeenCalledTimes(1);
  });

  test("mouseOver", () => {
    fireEvent.mouseOver(getByText(toastMessage));
    expect(onMouseOver).toBeCalled();
  });

  test("onMouseOut", () => {
    fireEvent.mouseOut(getByText(toastMessage));
    expect(onMouseOut).toBeCalled();
  });
  test("onDestroyed", () => {
    unmount();
    expect(onDestroyed).toBeCalled();
    expect(onDestroyed).toHaveBeenCalledTimes(1);
  });
});
