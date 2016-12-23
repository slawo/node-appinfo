"use strict";

var expect = require("chai").expect;
var controlPackage = require ("./tools/control-package");

describe("Retrieve", function() {
  var retrieve = require("../src/retrieve");
  
  it("normalize a path string into package.json data.", function() {
    var testAppInfo = retrieve.normalizeData(controlPackage.path);

    expect(testAppInfo.name).to.equal(controlPackage.data.name);
    expect(testAppInfo.version).to.equal(controlPackage.data.version);
    expect(testAppInfo.author).to.equal(controlPackage.data.author);
  });

  it("copies the relevant data from the package.json to the appInfo.", function() {
    var testAppInfo = retrieve.copyPackageData(controlPackage.data);

    expect(testAppInfo.name).to.equal(controlPackage.data.name);
    expect(testAppInfo.version).to.equal(controlPackage.data.version);
    expect(testAppInfo.author).to.equal(controlPackage.data.author);
  });
});
