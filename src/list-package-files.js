"use strict";

/**
 * @fileOverview Tool functions.
 * @version 0.1.0
 */

let fs = require("fs");
let path = require("path");
let logger = require("./logger");

/**
 * @class ListPackageFiles
 * Provides a system for 
 */
module.exports = function ListPackageFiles (applicationPath) {
  this.applicationPath = applicationPath;

  /**
   * Finds the best package.json file.
   * @return {string} the path to the most plausible json file for the given application.
   */
  this.findPackageJson = function () {
    if (applicationPath) {
      throw new Error("Not implemented yet.");
    }
    else {
      let sources = findPackageJsonFromDefaultSources();
      sources = sources.map(function (el) {
        if (el.path.includes("/node_modules/")) {
          return { path: el.path, value: el.value/10 };
        } else {
          return el;
        }
      }).sort (function (a, b) {
        return b.value - a.value;
      });

      logger.log(sources);

      return sources[0].path;
    }
  };
};


function findPackageJsonFromDefaultSources () {
  let sources = [];
  if("undefined" !==  typeof __dirname) {
    let fromLocal = listPackageJson(__dirname);
    if (fromLocal.length === 1) {
      //The package is installed globaly 
      //or is is being tested on its own
      sources.push({path:fromLocal[0], value : 10});
    }
    else if (fromLocal.length === 2) {
      //Probably installed in an application
      sources.push({path:fromLocal[0], value : 5});
      sources.push({path:fromLocal[1], value : 50});
    }
    else if (fromLocal.length > 2) {
      //Probably installed in an application hierarchy
      sources.push({path:fromLocal[0], value : 5});
      sources.push({path:fromLocal[1], value : 15});
      for (let i = 2; i < fromLocal.length; ++i) {
        sources.push({path:fromLocal[i], value : 15/i});
      }
    }
  }

  if ("undefined" !== typeof require && require.main && require.main.filename) {
    let mainPath = path.dirname(require.main.filename);
    let fromMain = listPackageJson(mainPath);

    if (fromMain.length === 1) {
      //either the true application or a launcher (ie mocha)
      sources.push({path:fromMain[0], value : 10});
    }
    else if (fromMain.length > 1) {
      //Probably installed in an application hierarchy
      sources.push({path:fromMain[0], value : 12});
      for (let i = 1; i < fromMain.length; ++i) {
        sources.push({path:fromMain[i], value : 12/i});
      }
    }
  }
  return sources;
}

function listPackageJson(searchPath) {
  logger.log("listPackageJson", searchPath);
  let packageList = [];
  if (!searchPath) {
    throw new Error("Missing parameter searchPath.");
  }

  let looking = true;
  let currentPath = searchPath;
  while(looking) {
    logger.log("listPackageJson", currentPath);
    let packagePath = path.join(currentPath, "package.json");
    if (fs.existsSync(packagePath)) {
      packageList.push(packagePath);
    } 
    let newPath = path.join(currentPath, "..");
    if (newPath == currentPath) {
      looking = false;
    }
    currentPath = newPath;
  }

  return packageList;
}
