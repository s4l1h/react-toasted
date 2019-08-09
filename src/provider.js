import React from "react";
import ToastedContext from "./context";
import ToastContainer from "./components/ToastContainer";

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.container = React.createRef();
  }
  static displayName = "Provider";

  s = (...params) => {
    return this.container.current.s(...params);
  };
  i = (...params) => {
    return this.container.current.i(...params);
  };
  w = (...params) => {
    return this.container.current.w(...params);
  };
  e = (...params) => {
    return this.container.current.e(...params);
  };
  add = (...params) => {
    return this.container.current.add(...params);
  };
  remove = (...params) => {
    return this.container.current.remove(...params);
  };
  removeAll = () => {
    return this.container.current.removeAll();
  };
  render() {
    return (
      <React.Fragment>
        {/*We could avoid react.js re-render.*/}
        <ToastContainer ref={this.container} {...this.props} />
        <ToastedContext.Provider
          value={{
            s: this.s,
            i: this.i,
            w: this.w,
            e: this.e,
            add: this.add,
            remove: this.remove,
            removeAll: this.removeAll
          }}
        >
          {this.props.children}
        </ToastedContext.Provider>
      </React.Fragment>
    );
  }
}

export default Provider;
