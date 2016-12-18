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

  if(packageData.description) {
    appInfo.description = packageData.description;
  }

  if(packageData.author) {
    appInfo.author = packageData.author;
  }

  appInfo.toString = function () {
    return this.name + " " + appInfo.version;
  };
} else {
  throw new Error("failed to retrieve the path to the package.json");
}
