"use strict";

var path = require("path");

var package_path = path.join(__dirname, "..", "..", "package.json");

module.exports.path = package_path;
module.exports.data = require(package_path);
