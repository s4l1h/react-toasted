import React from "react";
import ToastedContext from "./context";

const withToasted = Component => {
  return props => (
    <ToastedContext.Consumer>
      {toasted => <Component {...props} {...{ toasted }} />}
    </ToastedContext.Consumer>
  );
};

export default withToasted;
