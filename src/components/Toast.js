import React, { Component } from "react";
import PropsType from "prop-types";
import ToastProgress from "./ToastProgress";
import IntervalTimeManager from "../utils/IntervalTimeManager";

class Toast extends Component {
  state = { percent: 0, showProgressBar: false };

  progressBarTimer = null;

  timeoutTimer = null;

  componentDidMount() {
    this.setupProgressBarAndTimer();
    const { onCreated } = this.props;
    if (onCreated) {
      onCreated();
    }
    if (this.progressBarTimer != null) {
      this.progressBarTimer.start();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.start();
    }
  }

  componentWillUnmount() {
    const { onDestroyed } = this.props;
    if (onDestroyed) {
      onDestroyed();
    }
    if (this.progressBarTimer != null) {
      this.progressBarTimer.stop();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.stop();
    }
  }

  getPercent = () => {
    const { progressBarValue } = this.props;
    const { percent } = this.state;
    if (progressBarValue !== 0) {
      return progressBarValue;
    }
    return percent;
  };

  setupProgressBarAndTimer() {
    const { timeout, _remove, progressBar, progressBarValue } = this.props;
    if (timeout !== 0) {
      // SetUP timeout Manager
      this.timeoutTimer = IntervalTimeManager({
        totalTime: timeout,
        callbackFunctions: {
          "after:finish": () => {
            if (typeof _remove === "function") {
              _remove(this.props);
            }
            // console.log("Timeout Fired");
          },
          callback: () => {
            this.setState({
              percent: this.progressBarTimer.getPercent()
            });
          }
        }
      });
      // SetUP progressbar Time Manager
      if (progressBar !== false) {
        this.setState({
          showProgressBar: true
        });
        this.progressBarTimer = IntervalTimeManager({
          totalTime: timeout
        });
      }
    } else if (progressBar !== false && progressBarValue !== 0) {
      this.setState({
        showProgressBar: true
      });
    }
  }

  onClick = () => {
    const { onClick, removeOnClick, _remove } = this.props;
    if (onClick) {
      onClick();
    }
    if (removeOnClick) {
      if (typeof _remove === "function") {
        _remove(this.props);
      }
    }
  };

  onMouseOver = () => {
    if (this.progressBarTimer != null) {
      this.progressBarTimer.pause();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.pause();
    }
    const { onMouseOver } = this.props;
    if (onMouseOver) {
      onMouseOver();
    }
  };

  onMouseOut = () => {
    if (this.progressBarTimer != null) {
      this.progressBarTimer.resume();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.resume();
    }
    const { onMouseOut } = this.props;
    if (onMouseOut) {
      onMouseOut();
    }
  };

  render() {
    const { title, msg, style, classNames, type } = this.props;
    const { showProgressBar } = this.state;
    return (
      <div
        style={{
          ...style
        }}
        className={["toast", `toast-${type}`].concat(classNames).join(" ")}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onBlur={this.onMouseOut}
        role="presentation"
      >
        {showProgressBar && <ToastProgress percent={this.getPercent()} />}
        {title !== "" && <div className="toast-title">{title}</div>}
        <div className="toast-message">{msg}</div>
      </div>
    );
  }
}
Toast.defaultProps = {
  type: "success",
  title: "",
  msg: "",
  classNames: [],
  style: {},
  removeOnClick: true,
  onClick: false,
  onMouseOver: false,
  onMouseOut: false,
  onCreated: false,
  onDestroyed: false,
  timeout: 5000,
  progressBar: true,
  progressBarValue: 0,
  _remove: false
};
Toast.propTypes = {
  /** Toast Title */
  title: PropsType.string,
  /** Toast Message */
  msg: PropsType.string,
  /** Toast Injected Class Names */
  classNames: PropsType.array,
  /** Toast Injected Style */
  style: PropsType.object,
  /** Toast Type */
  type: PropsType.oneOf(["success", "warning", "error", "info"]),
  /* Close Toast When it clicked */
  removeOnClick: PropsType.bool,
  /** Toast onClick event */
  onClick: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  /** Toast onMouseOver event function */
  onMouseOver: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  /** Toast onMouseOut event function */
  onMouseOut: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  /** Toast onCreated event function */
  onCreated: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  /** Toast onDestroyed event function */
  onDestroyed: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  /** Toast Timeout time */
  timeout: PropsType.number,
  /** Show Progress Bar? */
  progressBar: PropsType.bool,
  /** Static Progress Bar Value */
  progressBarValue: PropsType.number,
  /** Toast onDestroyed event function */
  _remove: PropsType.oneOfType([PropsType.bool, PropsType.func])
};
Toast.displayName = "Toast";
export default Toast;
