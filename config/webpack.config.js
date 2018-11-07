const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  resolve: {
    alias: {
        'node_modules': path.join(__dirname, 'node_modules'),
    }
  },
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
    overlay: true, // error reporting
  },

  plugins: [
    new HtmlWebpackPlugin({ // FIGURE OUT IF YOU NEED THIS BEFORE RUNNING WEBPACK
      title: "Picture Analyzer",
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },

    }),
  ],
};



/*
Docs for plugins
webpack official docs: https://webpack.js.org/configuration/
html-webpack-plugin: https://github.com/jantimon/html-webpack-plugin#options
webpack-dev-server: https://webpack.js.org/configuration/dev-server/




*/