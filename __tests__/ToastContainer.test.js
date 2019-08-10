// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
// import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import ToastContainer from "../src/components/ToastContainer";

describe("ToastContainer Snapshot", () => {
  test("basic toast snapshot", () => {
    const { container } = render(<ToastContainer />);
    expect(container).toMatchSnapshot();
  });
  test("it has to match snapshot", () => {
    const { container } = render(
      <ToastContainer
        {...{
          defaultClassNames: ["animated", "zoomInUp"], // need animated.css
          defaultPosition: "toast-top-right",
          defaultNewestOnTop: false,
          defaultType: "error",
          defaultRemoveOnClick: true,
          defaultTimeout: 5000,
          defaultProgressBar: true,
          defaultProgressBarValue: 0,
          defaultPreventDuplicates: false,
          defaultStyle: {}
          //defaultPositions: positions
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

describe("ToastContainer Functions", () => {
  const ref = React.createRef();
  const { container } = render(
    <ToastContainer
      ref={ref}
      {...{
        defaultClassNames: ["animated", "zoomInUp"], // need animated.css
        defaultPosition: "toast-top-right",
        defaultNewestOnTop: false,
        defaultType: "error",
        defaultRemoveOnClick: true,
        defaultTimeout: 5000,
        defaultProgressBar: true,
        defaultProgressBarValue: 0,
        defaultPreventDuplicates: false,
        defaultStyle: {}
        //defaultPositions: positions
      }}
    />
  );
  let component = ref.current;
  test("it tests short functions", () => {
    component.s("Success Message");
    component.i("Information Message");
    component.w("Warning Message");
    component.e("Error Message");

    expect(container.innerHTML).toMatch(/Success Message/);
    expect(container.innerHTML).toMatch(/Information Message/);
    expect(container.innerHTML).toMatch(/Warning Message/);
    expect(container.innerHTML).toMatch(/Error Message/);

    component.removeAll();
    expect(container.innerHTML).not.toMatch(/Success Message/);
    expect(container.innerHTML).not.toMatch(/Information Message/);
    expect(container.innerHTML).not.toMatch(/Warning Message/);
    expect(container.innerHTML).not.toMatch(/Error Message/);
  });

  test("it tests  add and remove function", () => {
    let msg = "Hello Dear";
    component.add({
      name: "mytoast",
      msg: msg
    });
    expect(container.innerHTML).toMatch(msg);

    component.remove("mytoast");

    expect(container.innerHTML).not.toMatch(msg);
  });
});
