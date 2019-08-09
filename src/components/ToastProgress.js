import React from "react";
import PropsType from "prop-types";
const ToastProgress = props => {
  return (
    props.percent > 0 && (
      <div
        className="toast-progress"
        style={{ width: parseInt(props.percent, 10) + "%" }}
      />
    )
  );
};
ToastProgress.displayName = "ToastProgress";
ToastProgress.defaultProps = {
  percent: 0
};
ToastProgress.propTypes = {
  percent: PropsType.number
};
export default ToastProgress;
