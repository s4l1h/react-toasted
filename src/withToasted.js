import React from "react";
import ToastedContext from "./context";

function withToasted(Component) {
  return function WrappedWithToast(props) {
    return (
      <ToastedContext.Consumer>
        {toasted => <Component {...props} {...{ toasted }} />}
      </ToastedContext.Consumer>
    );
  };
}
withToasted.displayName = "withToasted";
export default withToasted;
