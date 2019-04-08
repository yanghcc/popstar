const path = require('path');
module.exports = {
  entry: [
    "babel-polyfill",
    path.join(__dirname, './src/script/Popstar.js')
  ],
  module: {
    rules: [{
      test: /\.js|es6$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  }
}