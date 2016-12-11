"use strict";

let retrieve = require("./src/retrieve");

/**
 * The object containing all the app info as retrieved from the package.json
 */
let appInfo = module.exports = {};

let packagePath = retrieve.findPackageJson();
if (packagePath) {
  let packageData = require(packagePath);
  appInfo.name = packageData.name;
  appInfo.version = packageData.version;
  appInfo.description = packageData.description;
} else {
  throw new Error("failed to retrieve the path to the package.json");
}
