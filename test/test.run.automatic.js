"use strict";

var expect = require("chai").expect;
var controlPackage = require ("./tools/control-package");

describe("Automatic application info retrieval", function() {
  var appInfo = require("../src/node-appinfo")();

  it("has the right name.", function() {
    expect(appInfo.name).to.equal(controlPackage.data.name);
  });
  
  it("has the right version.", function() {
    expect(appInfo.version).to.equal(controlPackage.data.version);
  });
  
  it("has the right description.", function() {
    expect(appInfo.description).to.equal(controlPackage.data.description);
  });
});
