### Simple Installation

When you decided about style and default options.
The code will look like this.

#### After Than you will be able to access your toasted library with context or HOC.

```js
import React from "react";
import ReactDOM from "react-dom";
// just import Toasted Provider and Change Component Name to ToastedProvider
import { Provider as ToastedProvider } from "react-toasted";
// CSS file
import "react-toasted/lib/react-toasted.css";
// you can import scss file if you like
//import "react-toasted/src/index.scss";

import "animate.css"; // we need it for animation

function App() {
  return <div className="App" />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ToastedProvider
    // you can overwrite to default Options
    {...{
      defaultClassNames: ["animated", "zoomInUp"], // need animated.css
      defaultPosition: "toast-top-right",
      defaultNewestOnTop: false,
      defaultType: "error",
      defaultRemoveOnClick: true,
      defaultTimeout: 5000,
      defaultProgressBar: true,
      defaultProgressBarValue: 0,
      defaultPreventDuplicates: false,
      defaultStyle: {}
      //      defaultPositions: positions // default positions in "react-toasted/src/positions.js"
    }}
  >
    <App />
  </ToastedProvider>,
  rootElement
);
```
