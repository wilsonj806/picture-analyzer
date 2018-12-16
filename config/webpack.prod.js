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
  stats:"errors-only",
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
                presets: ['@babel/preset-env'],
              }
            }
          ]
        },
        {
        test: /\.scss$/,
        use:[
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
          },
          {
            loader: "postcss-loader", // used to add vendor prefixes to stuff, investigate other uses
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