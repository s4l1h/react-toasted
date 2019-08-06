var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "react-toasted.css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  entry: ["./src/index.js", "./src/index.scss"],

  output: {
    path: path.resolve("lib"),
    filename: "react-toasted.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|example|lib)/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              name: "lib/[name].css"
            }
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
};
