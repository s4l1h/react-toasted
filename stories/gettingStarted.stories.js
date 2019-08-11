import { storiesOf } from "@storybook/react";
import installation from "../docs/installation.md";
import importStyle from "../docs/importStyle.md";
import configureDefaults from "../docs/configureDefaults.md";
import simpleInstallation from "../docs/simpleInstallation.md";
import howtouseit from "../docs/howtouseit.md";
import functions from "../docs/functions.md";

require("../lib/react-toasted.css");
require("animate.css");

storiesOf("Getting Started", module)
  // .addDecorator(withKnobs)
  .add("Installation", () => {}, {
    readme: {
      // Show readme before story
      content: installation
      // Show readme at the addons panel
      // sidebar: importStyle
    }
  })
  .add("Import Style File", () => {}, {
    readme: {
      // Show readme before story
      content: importStyle
    }
  })
  .add("Configure Defaults", () => {}, {
    readme: {
      // Show readme before story
      content: configureDefaults
    }
  })
  .add("Simple Installation", () => {}, {
    readme: {
      // Show readme before story
      content: simpleInstallation
    }
  })
  .add("How To Use It?", () => {}, {
    readme: {
      content: howtouseit
    }
  })
  .add("Functions", () => {}, {
    readme: {
      content: functions
    }
  })
  .add("Demo & Example", () => {}, {
    readme: {
      content: `I made a sample project. 
      You can access from [Here](https://codesandbox.io/s/react-toasted-demo-fvbm7)`
    }
  });
