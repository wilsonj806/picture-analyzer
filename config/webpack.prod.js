const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

let pathsToClean = [
  './dist/*'
];

module.exports = {
  entry:{
    index:'./src/index.js'
  },
  resolve: {
    alias: {
        Convert: path.resolve(__dirname, '../node_modules/@csstools/convert-color'), // doesn't resolve when you use webpack-dev-server
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
  module:{
    rules:[
        {
        test: /\.scss$/,
        use:[
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
          },
          {
            loader:'sass-loader'
          }
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CleanWebpackPlugin(
      pathsToClean,
      {
        root:path.resolve('./config/..'), // path.resolve() is a Node.js method that resolves a relative path as an absolute path
        exclude:['index.html']
      }
    ),
    new MiniCssExtractPlugin({
      filename: "main.css"
    })
  ],
};



/*
Docs for plugins
webpack official docs: https://webpack.js.org/configuration/
html-webpack-plugin: https://github.com/jantimon/html-webpack-plugin#options
webpack-dev-server: https://webpack.js.org/configuration/dev-server/




*/