'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropsType = _interopDefault(require('prop-types'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var ToastedContext = React__default.createContext({});

var position = ["toast-top-right", "toast-bottom-right", "toast-bottom-left", "toast-top-left", "toast-top-full-width", "toast-bottom-full-width", "toast-top-center", "toast-bottom-center"];

var ToastProgress = function ToastProgress(props) {
  return React__default.createElement("div", {
    className: "toast-progress",
    style: {
      width: props.percent.toString() + "%"
    }
  });
};

var IntervalTimeManager = function IntervalTimeManager(params) {
  return {
    id: false,
    times: {},
    estimated: null,
    remaning: null,
    totalTime: params.totalTime || 5000,
    stepTime: params.stepTime || 50,
    callbackFunctions: params.callbackFunctions || {},
    callback: function callback() {
      this.times["callback"] = this.getTime();
      this.remaning = this.remaning - this.stepTime;
      this.estimated = this.estimated + this.stepTime;
      this.callCallbackFN("callback");

      if (this.remaning <= 0) {
        return this.finish();
      }
    },
    getTime: function getTime() {
      return new Date().getTime();
    },
    getPercent: function getPercent() {
      return Math.floor(this.remaning / this.totalTime * 100);
    },
    start: function start() {
      this.times["started"] = this.getTime();
      this.callCallbackFN("before:start");
      this.remaning = this.totalTime;

      this._setupInterval();

      this.callCallbackFN("after:start");
    },
    finish: function finish() {
      this.times["finished"] = this.getTime();
      this.callCallbackFN("before:finish");

      this._clearInterval(this.id);

      this.callCallbackFN("after:finish");
    },
    stop: function stop() {
      this.times["stoped"] = this.getTime(); // People can stop manualy

      this.callCallbackFN("before:stop");

      this._clearInterval(this.id);

      this.callCallbackFN("after:stop");
    },
    pause: function pause() {
      this.times["paused"] = this.getTime();
      this.callCallbackFN("before:pause");

      this._clearInterval(this.id);

      this.callCallbackFN("after:pause");
    },
    resume: function resume() {
      this.times["resumed"] = this.getTime();
      this.callCallbackFN("before:resume");

      this._setupInterval();

      this.callCallbackFN("after:resume");
    },
    callCallbackFN: function callCallbackFN(type) {
      // console.log(this.callbackFunctions, type);
      if (typeof this.callbackFunctions[type] === "function") {
        this.callbackFunctions[type]();
      }
    },
    _clearInterval: function _clearInterval() {
      clearInterval(this.id);
    },
    _setupInterval: function _setupInterval() {
      var _this = this;

      this.id = setInterval(function () {
        _this.callback();
      }, this.stepTime);
    }
  };
};

var Toast =
/*#__PURE__*/
function (_Component) {
  _inherits(Toast, _Component);

  function Toast(props) {
    var _this;

    _classCallCheck(this, Toast);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toast).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getPercent", function () {
      if (_this.props.progressBarValue != null) {
        return _this.props.progressBarValue;
      }

      return _this.state.percent;
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      if (_this.props.onClick) {
        _this.props.onClick();
      }

      if (_this.props.removeOnClick) {
        _this.props.remove(_this.props);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function () {
      if (_this.progressBarTimer != null) {
        _this.progressBarTimer.pause();
      }

      if (_this.timeoutTimer != null) {
        _this.timeoutTimer.pause();
      }

      if (_this.props.onMouseOver) {
        _this.props.onMouseOver();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOut", function () {
      if (_this.progressBarTimer != null) {
        _this.progressBarTimer.resume();
      }

      if (_this.timeoutTimer != null) {
        _this.timeoutTimer.resume();
      }

      if (_this.props.onMouseOut) {
        _this.props.onMouseOut();
      }
    });

    _this.progressBarTimer = null;
    _this.timeoutTimer = null;
    _this.showProgressBar = false;
    _this.state = {
      percent: 100
    };
    _this.classNames = ["toast", "toast-" + props.type].concat(props.classNames).join(" ");
    return _this;
  }

  _createClass(Toast, [{
    key: "componentDidMount",
    value: function componentDidMount() {
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
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
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
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      if (this.props.timeout !== 0) {
        // SetUP timeout Manager
        this.timeoutTimer = IntervalTimeManager({
          totalTime: this.props.timeout,
          callbackFunctions: {
            "after:finish": function afterFinish() {
              _this2.props.remove(_this2.props); // console.log("Timeout Fired");

            },
            callback: function callback() {
              _this2.setState({
                percent: _this2.progressBarTimer.getPercent()
              });
            }
          }
        }); // SetUP progressbar Time Manager

        if (this.props.progressBar !== false) {
          this.showProgressBar = true;
          this.progressBarTimer = IntervalTimeManager({
            totalTime: this.props.timeout
          });
        }
      } else if (this.props.progressBarValue !== null && this.props.progressBar !== false) {
        this.showProgressBar = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        style: _objectSpread2({}, this.props.style),
        className: this.classNames,
        onClick: this.onClick,
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut
      }, this.showProgressBar && React__default.createElement(ToastProgress, {
        percent: this.getPercent()
      }), this.props.title !== "" && React__default.createElement("div", {
        className: "toast-title"
      }, this.props.title), React__default.createElement("div", {
        className: "toast-message"
      }, this.props.msg));
    }
  }]);

  return Toast;
}(React.Component);

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

var lastId = 0;
var newID = (function () {
  lastId++;
  return lastId;
});

var generateList = function generateList(positions) {
  var list = {};

  for (var i = 0; i <= positions.length - 1; i++) {
    list[positions[i]] = [];
  }

  return list;
}; // Thanks Dan
// hhttps://twitter.com/dan_abramov/status/824308413559668744

var addToast = function addToast(newData) {
  return function (state) {
    var list = state.list,
        savedNames = state.savedNames;

    if (typeof newData.name !== "undefined") {
      savedNames[newData.name] = newData.index;
    }

    list[newData.position] = newData.newestOnTop ? [newData].concat(_toConsumableArray(list[newData.position])) : [].concat(_toConsumableArray(list[newData.position]), [newData]);
    return {
      list: list,
      savedNames: savedNames
    };
  };
};
var removeToast = function removeToast(item) {
  return function (state) {
    var list = _objectSpread2({}, state.list);

    var savedNames = _objectSpread2({}, state.savedNames);

    list[item.position] = list[item.position].filter(function (toast) {
      return toast.index !== item.index;
    });
    var indexList = Object.values(savedNames);
    var nameList = Object.keys(savedNames);

    if (indexList.includes(item.index)) {
      for (var i = 0; i <= nameList.length - 1; i++) {
        var name = nameList[i];

        if (savedNames[name] === item.index) {
          delete savedNames[name];
        }
      }
    } //delete list[item.position][item.index];


    return {
      list: list,
      savedNames: savedNames
    };
  };
};
var findToastByIndex = function findToastByIndex(list, index) {
  var item = [];
  var positions = Object.keys(list);

  for (var i = 0; i <= positions.length - 1; i++) {
    var position = positions[i];
    item = list[position].filter(function (toast) {
      return toast.index === index;
    });

    if (item.length !== 0) {
      break;
    }
  }

  return item;
};

var ToastContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(ToastContainer, _Component);

  function ToastContainer(props) {
    var _this;

    _classCallCheck(this, ToastContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToastContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "processObjectData", function (data) {
      var newData = {}; // if Object

      if (_typeof(data) !== "object") {
        newData["msg"] = data.toString();
      } else if (typeof data.msg === "undefined") {
        throw Error("msg cannot be blank");
      } else {
        // it is an object and we need copy it
        newData = _objectSpread2({}, data);
      } // if String


      var options = ["classNames", "position", "newestOnTop", "type", "timeout", "progressBar", "progressBarValue", "removeOnClick", "preventDuplicates", "style"];
      options.forEach(function (key) {
        if (typeof newData[key] === "undefined") {
          newData[key] = _this.props["default".concat(key.charAt(0).toUpperCase()).concat(key.slice(1))];
        }
      });
      return newData;
    });

    _defineProperty(_assertThisInitialized(_this), "removeAll", function () {
      _this.setState({
        list: generateList(_this.props.defaultPositions),
        savedNames: {}
      });
    });

    _defineProperty(_assertThisInitialized(_this), "remove", function (data) {
      var item = []; // if is it an object

      if (_typeof(data) === "object") {
        if (typeof data.position !== "undefined") {
          item = _this.state.list[data.position].filter(function (toast) {
            return toast.index === data.index;
          });
        } else if (typeof data.index !== "undefined") {
          item = findToastByIndex(_objectSpread2({}, _this.state.list), data.index);
        } else {
          throw Error("Invalid Data Format for remove Toast ".concat(data.toString()));
        }
      } else if ( // if is it a toast name
      typeof data === "string" && typeof _this.state.savedNames[data] !== "undefined") {
        var index = _this.state.savedNames[data];
        item = findToastByIndex(_objectSpread2({}, _this.state.list), index);
      }

      if (item.length !== 0) {
        _this.setState(removeToast(item[0]));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addToast", function (data) {
      var found = [];

      if (data.preventDuplicates) {
        found = _this.state.list[data.position].filter(function (toast) {
          return toast.title === data.title && toast.msg === data.msg;
        });

        if (found.length > 0) {
          return {
            index: found[0]["index"]
          };
        }
      } // We can use props-type but they might use custom position list.


      if (!_this.state.positions.includes(data.position)) {
        throw Error("Invalid Toast Position ".concat(data.position));
      }

      var newData = _objectSpread2({}, data);

      newData["index"] = newID();

      _this.setState(addToast(newData));

      return {
        index: newData.index
      };
    });

    _defineProperty(_assertThisInitialized(_this), "add", function (d) {
      return _this._addData(_this.processObjectData(d));
    });

    _defineProperty(_assertThisInitialized(_this), "_addData", function (data) {
      if (_typeof(data) !== "object") {
        throw Error("_addData accept only Object", data.toString());
      }

      return _this.addToast(data);
    });

    _defineProperty(_assertThisInitialized(_this), "e", function (msg, title) {
      var data = _this.processObjectData(msg);

      data["type"] = "error";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return _this._addData(data);
    });

    _defineProperty(_assertThisInitialized(_this), "s", function (msg, title) {
      var data = _this.processObjectData(msg);

      data["type"] = "success";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return _this._addData(data);
    });

    _defineProperty(_assertThisInitialized(_this), "w", function (msg, title) {
      var data = _this.processObjectData(msg);

      data["type"] = "warning";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return _this._addData(data);
    });

    _defineProperty(_assertThisInitialized(_this), "i", function (msg, title) {
      var data = _this.processObjectData(msg);

      data["type"] = "info";

      if (typeof title !== "undefined") {
        data["title"] = title;
      }

      return _this._addData(data);
    });

    _this.state = {
      list: generateList(props.defaultPositions),
      positions: props.defaultPositions,
      savedNames: {}
    };
    return _this;
  }

  _createClass(ToastContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      //console.log("render provider");
      var _this$state = this.state,
          positions = _this$state.positions,
          list = _this$state.list;
      return React__default.createElement(React__default.Fragment, null, positions.map(function (position) {
        return React__default.createElement("div", {
          className: "toast-container ".concat(position),
          key: position
        }, list[position].map(function (toast) {
          return React__default.createElement(Toast, _extends({}, toast, {
            remove: _this2.remove,
            removeAll: _this2.removeAll,
            key: toast.index
          }));
        }));
      }));
    }
  }]);

  return ToastContainer;
}(React.Component);

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
  defaultPositions: position
};
ToastContainer.propTypes = {
  defaultPositions: PropsType.array.isRequired,
  defaultPosition: PropsType.string.isRequired,
  defaultNewestOnTop: PropsType.bool.isRequired,
  defaultClassNames: PropsType.array,
  defaultStyle: PropsType.object,
  defaultType: PropsType.oneOf(["success", "warning", "error", "info"]).isRequired,
  defaultRemoveOnClick: PropsType.bool,
  defaultTimeout: PropsType.number,
  defaultProgressBar: PropsType.bool,
  defaultPreventDuplicates: PropsType.bool
};

var Provider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Provider, _React$Component);

  function Provider(props) {
    var _this;

    _classCallCheck(this, Provider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Provider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "s", function () {
      var _this$container$curre;

      return (_this$container$curre = _this.container.current).s.apply(_this$container$curre, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "i", function () {
      var _this$container$curre2;

      return (_this$container$curre2 = _this.container.current).i.apply(_this$container$curre2, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "w", function () {
      var _this$container$curre3;

      return (_this$container$curre3 = _this.container.current).w.apply(_this$container$curre3, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "e", function () {
      var _this$container$curre4;

      return (_this$container$curre4 = _this.container.current).e.apply(_this$container$curre4, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "add", function () {
      var _this$container$curre5;

      return (_this$container$curre5 = _this.container.current).add.apply(_this$container$curre5, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "remove", function () {
      var _this$container$curre6;

      return (_this$container$curre6 = _this.container.current).remove.apply(_this$container$curre6, arguments);
    });

    _defineProperty(_assertThisInitialized(_this), "removeAll", function () {
      return _this.container.current.removeAll();
    });

    _this.state = {};
    _this.container = React__default.createRef();
    return _this;
  }

  _createClass(Provider, [{
    key: "render",
    value: function render() {
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(ToastContainer, _extends({
        ref: this.container
      }, this.props)), React__default.createElement(ToastedContext.Provider, {
        value: {
          s: this.s,
          i: this.i,
          w: this.w,
          e: this.e,
          add: this.add,
          remove: this.remove,
          removeAll: this.removeAll
        }
      }, this.props.children));
    }
  }]);

  return Provider;
}(React__default.Component);

var Consumer = ToastedContext.Consumer;

var withToasted = function withToasted(Component) {
  return function (props) {
    return React__default.createElement(ToastedContext.Consumer, null, function (toasted) {
      return React__default.createElement(Component, _extends({}, props, {
        toasted: toasted
      }));
    });
  };
};

exports.Consumer = Consumer;
exports.Provider = Provider;
exports.Toast = Toast;
exports.ToastContainer = ToastContainer;
exports.ToastProgress = ToastProgress;
exports.default = ToastedContext;
exports.withToasted = withToasted;
