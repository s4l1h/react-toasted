import React, { useContext } from "react";
import { render } from "@testing-library/react";
import ToastedContext, { Provider, Consumer, withToasted } from "../index";

export const SampleConsumerUseContext = () => {
  // Acces toast from context
  const toasted = useContext(ToastedContext);
  return <BasicComponent toasted={toasted} />;
};
export class SampleConsumerContextType extends React.Component {
  // use toasted contextType
  static contextType = ToastedContext;
  render() {
    // get toasted from context
    let toasted = this.context;
    return <BasicComponent toasted={toasted} />;
  }
}
export const SampleConsumerContext = () => {
  return (
    <Consumer>
      {toasted => {
        return <BasicComponent toasted={toasted} />;
      }}
    </Consumer>
  );
};
export const BasicComponent = ({ toasted: { add, remove, removeAll } }) => {
  return (
    <React.Fragment>
      <button
        onClick={() => {
          add({
            name: "mytoast",
            title: "First Toast",
            msg: "First Toast Message"
          });
          add({
            title: "Second Toast",
            msg: "Second Toast Message"
          });
        }}
      >
        Create Toasts
      </button>
      <button
        onClick={() => {
          remove("mytoast");
        }}
      >
        Remove Toast
      </button>
      <button
        onClick={() => {
          removeAll();
        }}
      >
        Remove All
      </button>
    </React.Fragment>
  );
};

export const WithToastedComponent = withToasted(BasicComponent);

export const ProviderWrapper = ({ children }) => {
  return (
    <Provider
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
    >
      {children}
    </Provider>
  );
};

const renderWithProvider = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

// override render method
export { renderWithProvider };
