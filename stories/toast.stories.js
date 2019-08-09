import React from "react";
import { storiesOf, setAddon } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

import JSXAddon from "storybook-addon-jsx";
setAddon(JSXAddon);

import {
  withKnobs,
  number,
  text,
  select,
  boolean,
  object,
  array
} from "@storybook/addon-knobs";

import { Toast, Provider, Consumer, ToastContainer } from "../src/index";
import positions from "../src/positions";

require("../lib/react-toasted.css");
require("animate.css");

const BasicButton = props => {
  return <button {...props}>{props.children}</button>;
};
const types = ["success", "warning", "error", "info"];
const actions = {
  onClick: action("onClicked"),
  onMouseOver: action("onMouseOver"),
  onMouseOut: action("onMouseOut"),
  onCreated: action("onCreated"),
  onDestroyed: action("onDestroyed")
};
// TODO: I need to force rerender stories when timeout changed.
storiesOf("Toast", module)
  .addDecorator(story => {
    let props = story();
    let className = `toast-container ${props.position}`;
    return (
      <div className={className}>
        <Toast {...props} />
      </div>
    );
  })
  //  .addDecorator(jsxDecorator)
  .addDecorator(withInfo)

  .addDecorator(withKnobs)

  .add(
    "Basic Toast",
    () => {
      return {
        ...actions,
        msg: text("msg", "Toast Message"),
        title: text("title", "Toast Title"),
        position: select("position", positions, "toast-top-left"),
        type: select("type", types, "warning"),
        removeOnClick: boolean("removeOnClick", false),
        style: object("style", {}),
        classNames: array("classNames", ["animated", "zoomInUp"]),
        timeout: number("timeout", 5000),
        progressBar: boolean("progressBar", true),
        progressBarValue: number("progressBarValue", 0)
      };
    },
    {
      readme: {
        // Show readme before story
        sidebar: require("../docs/toastOptions.md").default
      }
    }
  );
storiesOf("Toast", module)
  .addDecorator(withKnobs)

  .addWithJSX("Global Options", () => {
    return (
      <Provider
        {...{
          defaultClassNames: array("defaultClassNames", [
            "animated",
            "zoomInUp"
          ]), // need animated.css
          defaultPosition: select(
            "defaultPosition",
            [...positions],
            "toast-top-right"
          ),
          defaultNewestOnTop: boolean("defaultNewestOnTop", false),
          defaultType: select("defaultType", [...types], "warning"),
          defaultRemoveOnClick: boolean("defaultRemoveOnClick", false),
          defaultTimeout: number("defaultTimeout", 5000),
          defaultProgressBar: boolean("defaultProgressBar", true),
          defaultProgressBarValue: number("defaultProgressBarValue", 0),
          defaultPreventDuplicates: boolean("defaultPreventDuplicates", false),
          defaultStyle: object("defaultStyle", {})
          //      defaultPositions: positions
        }}
      >
        <Consumer>
          {({ add, remove, removeAll }) => {
            return (
              <React.Fragment>
                <BasicButton
                  onClick={() => {
                    add({
                      name: "mytoast",
                      msg: "Toast Message",
                      title: "Toast Title"
                    });
                  }}
                >
                  Create Toast
                </BasicButton>
                <BasicButton
                  onClick={() => {
                    remove("mytoast");
                  }}
                >
                  Remove Toast
                </BasicButton>
                <BasicButton
                  onClick={() => {
                    removeAll();
                  }}
                >
                  Remove All Toast
                </BasicButton>
              </React.Fragment>
            );
          }}
        </Consumer>
      </Provider>
    );
  });
storiesOf("Toast", module)
  .addParameters({
    info: {
      text: `
_Probably you won't use this component directly._
The **provider** manages to this component and passes props..
`
    }
  })
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addWithJSX("ToastContainer", () => {
    return (
      <ToastContainer
        {...{
          defaultClassNames: array("defaultClassNames", [
            "animated",
            "zoomInUp"
          ]), // need animated.css
          defaultPosition: select(
            "defaultPosition",
            [...positions],
            "toast-top-right"
          ),
          defaultNewestOnTop: boolean("defaultNewestOnTop", false),
          defaultType: select("defaultType", [...types], "warning"),
          defaultRemoveOnClick: boolean("defaultRemoveOnClick", false),
          defaultTimeout: number("defaultTimeout", 5000),
          defaultProgressBar: boolean("defaultProgressBar", true),
          defaultProgressBarValue: number("defaultProgressBarValue", 0),
          defaultPreventDuplicates: boolean("defaultPreventDuplicates", false),
          defaultStyle: object("defaultStyle", {})
          //      defaultPositions: positions
        }}
      />
    );
  });
