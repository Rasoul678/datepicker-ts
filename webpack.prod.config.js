const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "lib"),
    clean: true,
    library: "date-peacker",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
