"use strict";

let fs = require("fs");
let path = require("path");
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
    let folderPath = getRootFolderFromString(value);
    if (folderPath) {
      let packagePath = path.join(folderPath, "package.json");
      value = JSON.parse(fs.readFileSync(packagePath));
    }
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

let getRootFolderFromString = function (value) {
  let filepath = path.join(value, ".");
  logger.log(__filename, "getRootFolderFromString", filepath);
  try {
    var stat = fs.lstatSync(filepath);
    if (stat.isDirectory()) {
      return filepath;
    } else if (stat.isFile()) {
      return getRootFolderFromString(path.dirname(filepath));
    }
  } catch(e) {
    logger.error(e);
  }
};
