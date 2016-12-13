"use strict";

var lint = require("mocha-eslint");

var paths = [
  "index.js",
  "src",
];

var options = {
  formatter: "compact",
  alwaysWarn: true,
  timeout: 5000,
  slow: 500,
  strict: false
};
 
// Run the tests 
lint(paths, options);
