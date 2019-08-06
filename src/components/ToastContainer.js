import React from "react";
import PropsType from "prop-types";
import positions from "../positions";
import Toast from "./Toast";
import newID from "../utils/newid";
// for manupulation state
import {
  generateList,
  addToast,
  removeToast,
  findToastByIndex
} from "../utils/helper";

class ToastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: generateList(props.defaultPositions),
      positions: props.defaultPositions,
      savedNames: {}
    };
  }
  processObjectData = data => {
    let newData = {};
    // if Object
    if (typeof data !== "object") {
      newData["msg"] = data.toString();
    } else if (typeof data.msg === "undefined") {
      throw Error("msg cannot be blank");
    } else {
      // it is an object and we need copy it
      newData = { ...data };
    }

    // if String
    let options = [
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
    options.forEach(key => {
      if (typeof newData[key] === "undefined") {
        newData[key] = this.props[
          `default${key.charAt(0).toUpperCase()}${key.slice(1)}`
        ];
      }
    });
    return newData;
  };
  removeAll = () => {
    this.setState({
      list: generateList(this.props.defaultPositions),
      savedNames: {}
    });
  };
  remove = data => {
    let item = [];
    // if is it an object
    if (typeof data === "object") {
      if (typeof data.position !== "undefined") {
        item = this.state.list[data.position].filter(toast => {
          return toast.index === data.index;
        });
      } else if (typeof data.index !== "undefined") {
        item = findToastByIndex({ ...this.state.list }, data.index);
      } else {
        throw Error(`Invalid Data Format for remove Toast ${data.toString()}`);
      }
    } else if (
      // if is it a toast name
      typeof data === "string" &&
      typeof this.state.savedNames[data] !== "undefined"
    ) {
      let index = this.state.savedNames[data];
      item = findToastByIndex({ ...this.state.list }, index);
    }

    if (item.length !== 0) {
      this.setState(removeToast(item[0]));
    }
  };
  addToast = data => {
    var found = [];

    if (data.preventDuplicates) {
      found = this.state.list[data.position].filter(toast => {
        return toast.title === data.title && toast.msg === data.msg;
      });
      if (found.length > 0) {
        return { index: found[0]["index"] };
      }
    }
    // We can use props-type but they might use custom position list.
    if (!this.state.positions.includes(data.position)) {
      throw Error(`Invalid Toast Position ${data.position}`);
    }
    let newData = { ...data };
    newData["index"] = newID();
    this.setState(addToast(newData));

    return {
      index: newData.index
    };
  };
  add = d => {
    return this._addData(this.processObjectData(d));
  };
  _addData = data => {
    if (typeof data !== "object") {
      throw Error("_addData accept only Object", data.toString());
    }
    return this.addToast(data);
  };
  e = (msg, title) => {
    var data = this.processObjectData(msg);
    data["type"] = "error";
    if (typeof title !== "undefined") {
      data["title"] = title;
    }
    return this._addData(data);
  };
  s = (msg, title) => {
    var data = this.processObjectData(msg);
    data["type"] = "success";
    if (typeof title !== "undefined") {
      data["title"] = title;
    }
    return this._addData(data);
  };
  w = (msg, title) => {
    var data = this.processObjectData(msg);
    data["type"] = "warning";
    if (typeof title !== "undefined") {
      data["title"] = title;
    }
    return this._addData(data);
  };
  i = (msg, title) => {
    var data = this.processObjectData(msg);
    data["type"] = "info";
    if (typeof title !== "undefined") {
      data["title"] = title;
    }
    return this._addData(data);
  };

  render() {
    //console.log("render provider");
    let { positions, list } = this.state;
    return (
      <React.Fragment>
        {positions.map(position => (
          <div className={`toast-container ${position}`} key={position}>
            {list[position].map(toast => {
              return (
                <Toast
                  {...toast}
                  remove={this.remove}
                  removeAll={this.removeAll}
                  key={toast.index}
                />
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
  defaultProgressBarValue: null,
  defaultPreventDuplicates: false,
  defaultStyle: {},
  defaultPositions: positions
};
ToastContainer.propTypes = {
  defaultPositions: PropsType.array.isRequired,
  defaultPosition: PropsType.string.isRequired,
  defaultNewestOnTop: PropsType.bool.isRequired,
  defaultClassNames: PropsType.array,
  defaultStyle: PropsType.object,
  defaultType: PropsType.oneOf(["success", "warning", "error", "info"])
    .isRequired,
  defaultRemoveOnClick: PropsType.bool,
  defaultTimeout: PropsType.number,
  defaultProgressBar: PropsType.bool,
  defaultPreventDuplicates: PropsType.bool
};

export default ToastContainer;
