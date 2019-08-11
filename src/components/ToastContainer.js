import React, { Component } from "react";
import PropsType from "prop-types";
import Toast from "./Toast";
import newID from "../utils/newid";
import basePositions from "../positions";
// for manupulation state
import {
  generateList,
  addToast,
  removeToast,
  findToastByIndex
} from "../utils/helper";

class ToastContainer extends Component {
  state = {
    list: {},
    positions: [],
    savedNames: {}
  };

  componentDidMount() {
    const { defaultPositions } = this.props;
    this.setState({
      list: generateList(defaultPositions),
      positions: defaultPositions,
      savedNames: {}
    });
  }

  processObjectData = data => {
    let newData = {};
    // if Object
    if (typeof data !== "object") {
      newData.msg = data.toString();
    } else if (typeof data.msg === "undefined") {
      throw Error("msg cannot be blank");
    } else {
      // it is an object and we need copy it
      newData = { ...data };
    }

    // if String
    const options = [
      "classNames",
      "position",
      "newestOnTop",
      "type",
      "timeout",
      "progressBar",
      "progressBarValue",
      "removeOnClick",
      "preventDuplicates",
      "style"
    ];
    const all = this.props;
    options.forEach(key => {
      if (typeof newData[key] === "undefined") {
        newData[key] =
          all[`default${key.charAt(0).toUpperCase()}${key.slice(1)}`];
      }
    });
    return newData;
  };

  removeAll = () => {
    const { defaultPositions } = this.props;
    this.setState({
      list: generateList(defaultPositions),
      savedNames: {}
    });
  };

  remove = data => {
    let item = [];
    const { list, savedNames } = this.state;

    // if is it an object
    if (typeof data === "object") {
      if (typeof data.position !== "undefined") {
        item = list[data.position].filter(toast => {
          return toast.index === data.index;
        });
      } else if (typeof data.index !== "undefined") {
        item = findToastByIndex({ ...list }, data.index);
      } else {
        throw Error(`Invalid Data Format for remove Toast ${data.toString()}`);
      }
    } else if (
      // if is it a toast name
      typeof data === "string" &&
      typeof savedNames[data] !== "undefined"
    ) {
      const index = savedNames[data];
      item = findToastByIndex({ ...list }, index);
    }

    if (item.length !== 0) {
      this.setState(removeToast(item[0]));
    }
  };

  addToast = data => {
    let found = [];
    const { list, positions } = this.state;

    if (data.preventDuplicates) {
      found = list[data.position].filter(toast => {
        return toast.title === data.title && toast.msg === data.msg;
      });
      if (found.length > 0) {
        return { index: found[0].index };
      }
    }
    // We can use props-type but they might use custom position list.
    if (!positions.includes(data.position)) {
      throw Error(`Invalid Toast Position ${data.position}`);
    }
    const newData = { ...data };
    newData.index = newID();
    this.setState(addToast(newData));

    return {
      index: newData.index
    };
  };

  add = d => {
    return this.addData(this.processObjectData(d));
  };

  addData = data => {
    if (typeof data !== "object") {
      throw Error("addData accept only Object", data.toString());
    }
    return this.addToast(data);
  };

  e = (msg, title) => {
    const data = this.processObjectData(msg);
    data.type = "error";
    if (typeof title !== "undefined") {
      data.title = title;
    }
    return this.addData(data);
  };

  s = (msg, title) => {
    const data = this.processObjectData(msg);
    data.type = "success";
    if (typeof title !== "undefined") {
      data.title = title;
    }
    return this.addData(data);
  };

  w = (msg, title) => {
    const data = this.processObjectData(msg);
    data.type = "warning";
    if (typeof title !== "undefined") {
      data.title = title;
    }
    return this.addData(data);
  };

  i = (msg, title) => {
    const data = this.processObjectData(msg);
    data.type = "info";
    if (typeof title !== "undefined") {
      data.title = title;
    }
    return this.addData(data);
  };

  render() {
    // console.log("render provider");
    const { positions, list } = this.state;
    return (
      <React.Fragment>
        {positions.map(position => (
          <div className={`toast-container ${position}`} key={position}>
            {list[position].map(toast => {
              return (
                <Toast {...toast} _remove={this.remove} key={toast.index} />
              );
            })}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

ToastContainer.defaultProps = {
  defaultClassNames: [],
  defaultPosition: "toast-top-right",
  defaultNewestOnTop: false,
  defaultType: "success",
  defaultRemoveOnClick: true,
  defaultTimeout: 5000,
  defaultProgressBar: true,
  defaultProgressBarValue: 0,
  defaultPreventDuplicates: false,
  defaultStyle: {},
  defaultPositions: basePositions
};
ToastContainer.propTypes = {
  defaultPositions: PropsType.array,
  defaultPosition: PropsType.string,
  defaultNewestOnTop: PropsType.bool,
  defaultClassNames: PropsType.array,
  defaultStyle: PropsType.object,
  defaultType: PropsType.oneOf(["success", "warning", "error", "info"]),
  defaultRemoveOnClick: PropsType.bool,
  defaultTimeout: PropsType.number,
  defaultProgressBar: PropsType.bool,
  defaultProgressBarValue: PropsType.number,
  defaultPreventDuplicates: PropsType.bool
};
ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
