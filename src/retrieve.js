"using strict";
/**
 * @fileOverview Tool functions.
 * @version 0.1.0
 */

let fs = require("fs");
let path = require("path");

module.exports = {
  /**
   * Retrieves the app's root folder.'
   * @function getRootName
   * @param {string} 
   */
  getRootName:getRootName,
  /**
   * Looks for a "package.json" file starting from the given app path.'
   * Tries to determin from where to start if currentPath is not passed.
   * @function findPackageJson
   * @param {string} [currentPath]
   */
  findPackageJson:findPackageJson,
};

function getRootName() {
  let root;
  if (require.main && require.main.filename) {
    root = path.dirname(require.main.filename);
  }

  //Hack for mocha
  if (root && root.endsWith("mocha"+path.sep+"bin")) {
    root = process.cwd();
  }
  
  if(!root) {
    root = path.dirname(process.argv[1]);
  }

  return root;
}

function findPackageJson(currentPath)
{
  if (!currentPath) {
    currentPath = getRootName();
  }

  let packagePath = path.join(currentPath, "package.json");

  if (fs.existsSync(packagePath)) {
    return packagePath;
  } else {
    let newPath = path.join(currentPath, "..");
    if (newPath != currentPath) {
      return findPackageJson(newPath);
    }
    return;
  }
}
