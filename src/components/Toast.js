import React, { Component } from "react";
import ToastProgress from "./ToastProgress";
import IntervalTimeManager from "../utils/IntervalTimeManager";
import PropsType from "prop-types";
class Toast extends Component {
  constructor(props) {
    super(props);

    this.progressBarTimer = null;
    this.timeoutTimer = null;
    this.state = { percent: 0, showProgressBar: false };
  }
  static displayName = "Toast";
  getPercent = () => {
    if (this.props.progressBarValue !== 0) {
      return this.props.progressBarValue;
    }
    return this.state.percent;
  };
  componentDidMount() {
    this.setupProgressBarAndTimer();
    if (this.props.onCreated) {
      this.props.onCreated();
    }
    if (this.progressBarTimer != null) {
      this.progressBarTimer.start();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.start();
    }
  }

  componentWillUnmount() {
    if (this.props.onDestroyed) {
      this.props.onDestroyed();
    }
    if (this.progressBarTimer != null) {
      this.progressBarTimer.stop();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.stop();
    }
  }
  setupProgressBarAndTimer() {
    if (this.props.timeout !== 0) {
      // SetUP timeout Manager
      this.timeoutTimer = IntervalTimeManager({
        totalTime: this.props.timeout,
        callbackFunctions: {
          "after:finish": () => {
            if (typeof this.props._remove !== "undefined") {
              this.props._remove(this.props);
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
      if (this.props.progressBar !== false) {
        this.setState({
          showProgressBar: true
        });
        this.progressBarTimer = IntervalTimeManager({
          totalTime: this.props.timeout
        });
      }
    } else if (
      this.props.progressBar !== false &&
      this.props.progressBarValue !== 0
    ) {
      this.setState({
        showProgressBar: true
      });
    }
  }
  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    if (this.props.removeOnClick) {
      if (typeof this.props._remove !== "undefined") {
        this.props._remove(this.props);
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
    if (this.props.onMouseOver) {
      this.props.onMouseOver();
    }
  };
  onMouseOut = () => {
    if (this.progressBarTimer != null) {
      this.progressBarTimer.resume();
    }
    if (this.timeoutTimer != null) {
      this.timeoutTimer.resume();
    }
    if (this.props.onMouseOut) {
      this.props.onMouseOut();
    }
  };
  render() {
    return (
      <div
        style={{
          ...this.props.style
        }}
        className={["toast", "toast-" + this.props.type]
          .concat(this.props.classNames)
          .join(" ")}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {this.state.showProgressBar && (
          <ToastProgress percent={this.getPercent()} />
        )}
        {this.props.title !== "" && (
          <div className="toast-title">{this.props.title}</div>
        )}
        <div className="toast-message">{this.props.msg}</div>
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
  progressBarValue: 0
};
Toast.propTypes = {
  /** Toast Title */
  title: PropsType.string,
  /** Toast Message */
  msg: PropsType.string.isRequired,
  /** Toast Injected Class Names */
  classNames: PropsType.array,
  /** Toast Injected Style */
  style: PropsType.object,
  /** Toast Position */
  position: PropsType.string.isRequired,
  /** Toast Type */
  type: PropsType.oneOf(["success", "warning", "error", "info"]).isRequired,
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
  progressBarValue: PropsType.number
};
export default Toast;
