import React from "react";
import ToastedContext from "./context";
//const Consumer = ToastedContext.Consumer;
const Consumer = props => {
  return <ToastedContext.Consumer>{props.children}</ToastedContext.Consumer>;
};
Consumer.displayName = "Consumer";
export default Consumer;
