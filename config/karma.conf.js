// Config options https://karma-runner.github.io/3.0/config/configuration-file.html

// import webpack config
var webpackConfig = require('./webpack.dev.js');

module.exports = function(config) {
  config.set({
    // entry
    basePath: '../..',

    // tooling
    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'],
    autoWatch: false,

    // preprocessor loading
    // its pointing to the wrong directory, should be picture-analyzer in there
    files: ['./picture-analyzer/config/webpack.test.js'], // replace with __dirname__ and concat with the other stuff
    preprocessors: {
      // Run this through webpack
      './picture-analyzer/config/webpack.test.js': ['webpack'],
    },

    webpack: webpackConfig, // load the test module
    client: {
      // log console output in our test console
      captureConsole: true
    },

    reporters: ['dots', 'kjhtml'],
    singleRun: false, // exit after tests have completed

    webpackMiddleware: {
      noInfo: true
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 60000, // 60 seconds
  });
};