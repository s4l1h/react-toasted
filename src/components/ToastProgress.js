import React from "react";

const ToastProgress = props => {
  return (
    <div
      className="toast-progress"
      style={{ width: props.percent.toString() + "%" }}
    />
  );
};
export default ToastProgress;
