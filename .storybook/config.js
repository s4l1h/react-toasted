import { configure, addDecorator } from "@storybook/react";
import { addReadme } from "storybook-readme";
addDecorator(addReadme);

//addDecorator(withInfo);
// automatically import all files ending in *.stories.js
// const req = require.context("../stories", true, /\.stories\.js$/);
// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }
function loadStories() {
  require("../stories/gettingStarted.stories");
  require("../stories/toast.stories");
}
configure(loadStories, module);
