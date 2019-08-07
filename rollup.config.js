// rollup.config.js
import babel from "rollup-plugin-babel";
import scss from "rollup-plugin-scss";

export default [
  {
    input: "src/index.js",
    output: {
      file: "lib/react-toasted.js",
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      })
    ]
  },
  {
    // we don't want to include scss file in js
    input: "src/style.js",
    output: {
      file: "lib/style.js",
      format: "es"
    },
    plugins: [
      scss({
        output: "lib/react-toasted.css"
      })
    ]
  }
];
