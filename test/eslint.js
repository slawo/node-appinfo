"use strict";

var paths = [
  "index.js",
  "src",
];

// avoids linting on io.js
if((typeof process !== "undefined")
&& (process.release.name.search(/io.js/) === -1)) {
  var lint = require("mocha-eslint");

  var options = {
    formatter: "compact",
    alwaysWarn: true,
    timeout: 5000,
    slow: 500,
    strict: false
  };
  
  // Run the tests 
  lint(paths, options);
}
