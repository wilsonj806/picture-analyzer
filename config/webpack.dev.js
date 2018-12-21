const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const _ = require('lodash');

// config isn't defined because the way that the example config works, they didn't declare one singular module.export
// instead they've defined several variables as config pieces and put them together later in the module.export

// Input output paths
const inputPath = path.join(__dirname, 'src');
const outputPath = path.join(__dirname, 'dist');


const config = {
  mode: 'development',
  entry:{
    index:'./src/index.js'
  },
  output: {
    path: outputPath,
    publicPath: '/', // check this
    filename: '[name].js', // checks name of input file
    chunkFilename: '[name].[id].js' // overkill?
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
          test: function() {
            return {
              entry: 'webpack.tests.js',
              output: _.assign({}, outputPath, {
                // client assets are output to dist/test/
                path: path.join(outputPath, 'test'),
                publicPath: undefined // no assets CDN
              }),
              devtool: 'inline-source-map', // sourcemap support
              /*
              // check what the below does
              plugins: [
                new webpack.DefinePlugin({
                  'typeof window': JSON.stringify("object")
                })
              ]
              */
            };
          },
        },
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

module.exports = config;

/*
Docs for plugins
webpack official docs: https://webpack.js.org/configuration/
html-webpack-plugin: https://github.com/jantimon/html-webpack-plugin#options
webpack-dev-server: https://webpack.js.org/configuration/dev-server/




*/