import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
  const toastMessage = "Message";
  const onCreated = jest.fn();
  const onClicked = jest.fn();
  const onMouseOver = jest.fn();
  const onMouseOut = jest.fn();
  const onDestroyed = jest.fn();
  const { getByText, unmount } = render(
    <Toast
      msg={toastMessage}
      position="toast-top-right"
      onCreated={onCreated}
      onClick={onClicked}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
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
