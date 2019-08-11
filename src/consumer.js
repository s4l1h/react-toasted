import React from "react";
import PropTypes from "prop-types";
import ToastedContext from "./context";
// const Consumer = ToastedContext.Consumer;
const Consumer = ({ children }) => {
  return <ToastedContext.Consumer>{children}</ToastedContext.Consumer>;
};
Consumer.propTypes = {
  children: PropTypes.elementType.isRequired
};
Consumer.displayName = "Consumer";
export default Consumer;
