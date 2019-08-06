import React from "react";
import ToastProgress from "./ToastProgress";
import IntervalTimeManager from "../utils/IntervalTimeManager";
import PropsType from "prop-types";
class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.progressBarTimer = null;
    this.timeoutTimer = null;
    this.showProgressBar = false;
    this.state = { percent: 100 };

    this.classNames = ["toast", "toast-" + props.type]
      .concat(props.classNames)
      .join(" ");
  }
  getPercent = () => {
    if (this.props.progressBarValue != null) {
      return this.props.progressBarValue;
    }
    return this.state.percent;
  };
  componentDidMount() {
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
  componentWillMount() {
    if (this.props.timeout !== 0) {
      // SetUP timeout Manager
      this.timeoutTimer = IntervalTimeManager({
        totalTime: this.props.timeout,
        callbackFunctions: {
          "after:finish": () => {
            this.props.remove(this.props);
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
        this.showProgressBar = true;
        this.progressBarTimer = IntervalTimeManager({
          totalTime: this.props.timeout
        });
      }
    } else if (
      this.props.progressBarValue !== null &&
      this.props.progressBar !== false
    ) {
      this.showProgressBar = true;
    }
  }
  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    if (this.props.removeOnClick) {
      this.props.remove(this.props);
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
        className={this.classNames}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {this.showProgressBar && <ToastProgress percent={this.getPercent()} />}
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
  timeout: 5000
};
Toast.propTypes = {
  title: PropsType.string,
  msg: PropsType.string.isRequired,
  classNames: PropsType.array,
  style: PropsType.object,
  position: PropsType.string.isRequired,
  type: PropsType.oneOf(["success", "warning", "error", "info"]).isRequired,
  removeOnClick: PropsType.bool,
  onClick: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  onMouseOver: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  onMouseOut: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  onCreated: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  onDestroyed: PropsType.oneOfType([PropsType.bool, PropsType.func]),
  timeout: PropsType.number
};
export default Toast;
