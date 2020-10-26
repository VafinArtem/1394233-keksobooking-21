const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/activate.js",
    "./js/filter.js",
    "./js/reset.js",
    "./js/backend.js",
    "./js/card.js",
    "./js/move.js",
    "./js/form.js",
    "./js/images.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
