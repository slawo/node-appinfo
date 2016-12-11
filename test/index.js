"using strict";

var expect = require("chai").expect;
var path = require("path");

describe("Node application information", function() {

  let retrieve = require("../src/retrieve");
  let appInfo = require("../index");

  describe("package.json finder", function() {

    it("finds the path to the app's root.", function() {

      var appTestPath = path.join(path.dirname(__filename), "..");
      var foundPath = path.dirname(retrieve.findPackageJson());
      expect(foundPath).to.equal(appTestPath);
    });

    it("finds the path to the package.json.", function() {

      var appTestPath = path.join(path.dirname(__filename), "..", "package.json");
      var foundPath = retrieve.findPackageJson();
      expect(foundPath).to.equal(appTestPath);
    });
  });

  describe("Application information", function() {
    var packageData = require(path.join("..", "package.json"));

    it("has the right name.", function() {
      expect(appInfo.name).to.equal(packageData.name);
    });
    
    it("has the right version.", function() {
      expect(appInfo.version).to.equal(packageData.version);
    });
    
    it("has the right description.", function() {
      expect(appInfo.description).to.equal(packageData.description);
    });
  });
});
