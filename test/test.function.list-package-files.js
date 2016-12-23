"use strict";

var expect = require("chai").expect;

var controlPackage = require ("./tools/control-package");
var ListPackageFiles = require("../src/list-package-files");

describe("List Package Files", function() {
  it("finds the best package.json.", function() {
    var listPackageFiles = new ListPackageFiles();
    var value = listPackageFiles.findPackageJson();

    expect(value).to.equal(controlPackage.path);
  });
});
