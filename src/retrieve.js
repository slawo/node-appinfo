"use strict";

let ListPackageFiles = require("./list-package-files");
let logger = require("./logger");

/**
 * takes the value passed to the main function and tries to retrieve
 * the package.json content out of it.
 */
module.exports.normalizeData = function (value) {
  if ("undefined" === typeof value) {
    let listPackageFiles = new ListPackageFiles();
    value = listPackageFiles.findPackageJson();
  }

  if ("string" === typeof value) {
    value = require(value);
  }

  if ("object" === typeof value) {
    return value;
  }

  return;
};

module.exports.copyPackageData = function(packageData, appInfo) {
  logger.log("copyPackageData", packageData, appInfo);
  if ("undefined" === typeof appInfo) {
    appInfo = {};
  }
  
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

  return appInfo;
};
