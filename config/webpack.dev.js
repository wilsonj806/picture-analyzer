const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
          test:/\.js$/,
          exclude: path.resolve('../node_modules/'),
          enforce:'pre',
          use:[
            {
              loader:'babel-loader',
              options:{
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        {
        test: /\.scss$/,
        use:[
          {
            loader:'style-loader'
          },
          {
            loader:'css-loader',
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => ([
                require("autoprefixer"),
              ]),
            },
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
      template: 'index.html'
    })
  ],
};



/*
Docs for plugins
webpack official docs: https://webpack.js.org/configuration/
html-webpack-plugin: https://github.com/jantimon/html-webpack-plugin#options
webpack-dev-server: https://webpack.js.org/configuration/dev-server/




*/