// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)

// this regex matches any js files in __tests__ directories
var context = require.context('../src/', true, /tests\/.+\.js$/);
context.keys().forEach(context);

/* References
  * https://medium.com/@grrowl/testing-react-with-jasmine-and-karma-using-webpack-and-babel-18fc268f066a
  * https://github.com/paddlco/isomorphic-react-starter-kit/blob/master/webpack.config.js
  * https://github.com/webpack-contrib/karma-webpack
*/
