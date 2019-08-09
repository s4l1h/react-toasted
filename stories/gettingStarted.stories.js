import React from "react";
import marked from "marked";
import { storiesOf, setAddon } from "@storybook/react";
import { action } from "@storybook/addon-actions";

require("../lib/react-toasted.css");
require("animate.css");

storiesOf("Getting Started", module)
  //.addDecorator(withKnobs)
  .add(
    "Installation",
    () => {
      return;
    },
    {
      readme: {
        // Show readme before story
        content: require("../docs/installation.md").default
        // Show readme at the addons panel
        //sidebar: importStyle
      }
    }
  )
  .add(
    "Import Style File",
    () => {
      return;
    },
    {
      readme: {
        // Show readme before story
        content: require("../docs/importStyle.md").default
      }
    }
  )
  .add(
    "Configure Defaults",
    () => {
      return;
    },
    {
      readme: {
        // Show readme before story
        content: require("../docs/configureDefaults.md").default
      }
    }
  )
  .add(
    "Simple Installation",
    () => {
      return;
    },
    {
      readme: {
        // Show readme before story
        content: require("../docs/simpleInstallation.md").default
      }
    }
  )
  .add(
    "How To Use It?",
    () => {
      return;
    },
    {
      readme: {
        content: require("../docs/howtouseit.md").default
      }
    }
  )
  .add(
    "Functions",
    () => {
      return;
    },
    {
      readme: {
        content: require("../docs/functions.md").default
      }
    }
  )
  .add("Demo & Example", () => {}, {
    readme: {
      content: `I made a sample project. You can access from [Here](https://codesandbox.io/s/react-toasted-demo-fvbm7)`
    }
  });
