"use strict";

let retrieve = require ("./retrieve");

let appInfo;

/**
 * Retrieves the application info from the best possible source.
 * @example
 * // if in the local package.json the application name 
 * // is my-node-app and the version is 1.1.0
 * // returns { name: "my-node-app", version: "1.1.0" }
 * appInfo = require("node-appinfo")();
 * @example
 * // returns { name: "the-app-name", version: "v1.1.0" }
 * appInfo = require("node-appinfo")({
 *   name:"the-app-name",
 *   version: (require("package.json").version)
 * });
 */
module.exports = function (value) {
  if ("undefined" === typeof appInfo) {
    let packageData = retrieve.normalizeData(value);

    if (packageData) {
      appInfo = retrieve.copyPackageData(packageData, appInfo);
    }
  }

  let result = {};

  if ("undefined" !== typeof appInfo) {
    //copies all the keys from appInfo to this.
    for (let k in appInfo) {
      result[k] = appInfo[k];
    }
  }

  //returns the current function.
  return result;
};
