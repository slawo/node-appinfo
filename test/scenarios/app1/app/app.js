"use strict";

var nodeAppinfo = require("node-appinfo");

console.log(JSON.stringify(nodeAppinfo({
  name : "app1",
  version : (require("./package.json").version),
  author : (require("./package.json").author),
  description : (require("./package.json").description),
})));
