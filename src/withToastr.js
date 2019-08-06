import React from "react";
import ToastrContext from "./context";

const withToastr = Component => {
  return props => (
    <ToastrContext.Consumer>
      {toastr => <Component {...props} {...{ toastr }} />}
    </ToastrContext.Consumer>
  );
};

export default withToastr;
