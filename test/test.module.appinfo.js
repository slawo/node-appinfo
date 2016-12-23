"use strict";

var expect = require("chai").expect;
var controlPackage = require ("./tools/control-package");

describe("Set app info automatically", function() {
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

describe("Prohibit overriding existing values", function() {
  var fakePackage = {
    data: {
      name: "toto",
      author: "tutu",
      version: "tata"
    }
  };

  var appInfo = require("../src/node-appinfo")(fakePackage.data);
  
  it("has the previous name.", function() {
    expect(appInfo.name).to.equal(controlPackage.data.name);
  });
  
  it("has the previous version.", function() {
    expect(appInfo.version).to.equal(controlPackage.data.version);
  });
  
  it("has the previous description.", function() {
    expect(appInfo.description).to.equal(controlPackage.data.description);
  });
});
