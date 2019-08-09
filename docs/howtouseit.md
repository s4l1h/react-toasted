## How to use it?

Toasted component communication via React.js Context.

### In Class Component via Context

```js
import React from "react";
import ToastedContext from "react-toasted";
class SampleClassContext extends React.Component {
  // Access toasted contextType
  static contextType = ToastedContext;
  render() {
    // get toasted from context
    let toasted = this.context;
    return (
      <button
        onClick={() => {
          toasted.add({
            title: "SampleClassContext",
            msg: "React Class Context Message"
          });
        }}
      >
        Create Toast
      </button>
    );
  }
}
//SampleClassContext.contextType=ToastedContext
```

### Access toasted via Consumer

```js
import React from "react";
import { Consumer } from "react-toasted";
const SampleContextConsumer = () => {
  return (
    <Consumer>
      {({ add }) => {
        return (
          <button
            onClick={() => {
              add({
                title: "SampleContextConsumer",
                msg: "React Context Consumer Message"
              });
            }}
          >
            Sample Context Consumer
          </button>
        );
      }}
    </Consumer>
  );
};
export default SampleContextConsumer;
```

### Access toasted via HOC

```js
import { withToasted } from "react-toasted";
import React from "react";
const SampleFull = ({ toasted }) => {
  const trigger = () => {
    toasted.add({
      name: "SampleFull",
      position: "toast-bottom-full-width",
      title: "Full",
      type: "success",
      msg: "Look at the console",
      removeOnClick: false,
      onCreated: () => {
        console.log("Toast onCreated");
      },
      onDestroyed: () => {
        console.log("Toast onDestroyed");
      },
      onClick: () => {
        console.log("Toast Clicked");
      },
      onMouseOver: () => {
        console.log("Toast onMouseOver");
      },
      onMouseOut: () => {
        console.log("Toast onMouseOut");
      }
    });
  };
  return <button onClick={trigger}>Sample Full Toast</button>;
};
// HOC
export default withToasted(SampleFull);
```
